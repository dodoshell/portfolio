// 3D simplex noise by Ian McEwan and Stefan Gustavson (Ashima Arts),
// MIT licensed: https://github.com/ashima/webgl-noise
const noise = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

// Half a step of noise per pixel, so dark gradients don't break into bands.
const dither = /* glsl */ `
float dither(vec2 pixel) {
  return fract(52.9829189 * fract(dot(pixel, vec2(0.06711056, 0.00583715)))) - 0.5;
}
`

export const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uTurbulence;
uniform vec2 uPointer;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vObject;
varying float vDisplacement;

${noise}

float displacement(vec3 p) {
  float slow = snoise(p * 0.9 + vec3(uTime * 0.1));
  float fine = snoise(p * 1.8 - vec3(uTime * 0.14)) * 0.08;
  // The surface swells toward the pointer, like something soft being pressed.
  float pull = max(dot(normalize(p), normalize(vec3(uPointer, 0.6))), 0.0);
  return (slow + fine) * (0.018 + uTurbulence * 0.028) + pull * pull * 0.04;
}

void main() {
  float d = displacement(position);
  vec3 displaced = position + normal * d;

  // Rebuild the normal from two neighbouring points so lighting follows the bumps.
  vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.001)));
  vec3 bitangent = normalize(cross(normal, tangent));
  float e = 0.01;
  vec3 a = position + tangent * e;
  vec3 b = position + bitangent * e;
  vec3 da = a + normalize(a) * displacement(a);
  vec3 db = b + normalize(b) * displacement(b);
  vec3 bentNormal = normalize(cross(da - displaced, db - displaced));

  vec4 world = modelViewMatrix * vec4(displaced, 1.0);
  vNormal = normalize(normalMatrix * bentNormal);
  vPosition = -world.xyz;
  vObject = position;
  vDisplacement = d;
  gl_Position = projectionMatrix * world;
}
`

// A pearl lit like a product shot. Its colour is real thin-film interference,
// its shine a small studio reflected in the surface. uFade dissolves the solid
// pearl into a thin bubble, so behind text only its rim and highlights remain.
export const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec2 uPointer;
uniform float uTime;
uniform float uFade;
uniform float uDetail;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vObject;
varying float vDisplacement;

${noise}
${dither}

// Light reflected by a film of the given thickness in nanometres, per wavelength.
vec3 interference(float cosine, float thickness) {
  float refracted = sqrt(1.0 - (1.0 - cosine * cosine) / 1.77);
  vec3 phase = 12.56637 * 1.33 * thickness * refracted / vec3(650.0, 510.0, 475.0);
  return 0.5 - 0.5 * cos(phase);
}

// The room the pearl reflects: a dim gradient, a large softbox and a thin strip light.
vec3 studio(vec3 ray, vec3 key) {
  vec3 room = mix(vec3(0.015, 0.02, 0.05), vec3(0.2, 0.2, 0.3), smoothstep(-0.5, 0.9, ray.y));
  float softbox = smoothstep(0.72, 0.9, dot(ray, normalize(vec3(-0.55, 0.65, 0.5))));
  float strip = smoothstep(0.07, 0.0, abs(ray.x - 0.74)) * smoothstep(-0.65, -0.1, ray.y) * smoothstep(0.75, 0.2, ray.y);
  float pointer = pow(max(dot(ray, key), 0.0), 260.0);
  return room + vec3(1.0, 0.98, 1.02) * (softbox * 1.05 + strip * 0.55 + pointer * 2.2);
}

void main() {
  vec3 view = normalize(vPosition);
  vec3 normal = normalize(vNormal);

  // Warped noise bent into fine bands, like the layers of a real shell.
  float drift = snoise(vObject * 1.1 * uDetail + vec3(uTime * 0.03));
  float warp = drift + snoise(vObject * 2.6 * uDetail - vec3(uTime * 0.02)) * 0.35;
  float bands = sin(warp * 26.0);

  // The slow part of those layers bends the reflections, like a liquid surface.
  // The relief is measured on the unit sphere, so small pearls get the same shape.
  vec3 dx = dFdx(vPosition);
  vec3 dy = dFdy(vPosition);
  float size = length(dx) / max(length(dFdx(vObject)), 0.00001);
  float relief = warp * 0.022 * size;
  vec3 r1 = cross(dy, normal);
  vec3 r2 = cross(normal, dx);
  float det = dot(dx, r1);
  normal = normalize(abs(det) * normal - sign(det) * (dFdx(relief) * r1 + dFdy(relief) * r2));

  float facing = clamp(dot(normal, view), 0.0, 1.0);
  float fresnel = pow(1.0 - facing, 3.0);

  vec3 film = interference(facing, 380.0 + warp * 110.0 + bands * 10.0 + vDisplacement * 500.0);
  vec3 palette = (uColorA * film.r + uColorB * film.g + uColorC * film.b) / max(film.r + film.g + film.b, 0.001);
  vec3 overtone = mix(film, palette, 0.6);

  vec3 key = normalize(vec3(uPointer * 0.9, 0.9));
  float wrap = dot(normal, key) * 0.5 + 0.5;
  vec3 mirror = reflect(-view, normal);
  vec3 reflection = studio(mirror, key);

  // A pale body shows through on the lit side; the film colours whatever it reflects.
  vec3 body = mix(overtone * 0.75, vec3(0.9, 0.88, 0.94), wrap * wrap * 0.38) * mix(0.12, 1.0, wrap * wrap);
  vec3 pearl = body + reflection * mix(overtone * 1.25, vec3(1.0), 0.6) * (0.32 + fresnel * 0.68) + overtone * fresnel * 0.5;

  float shine = dot(reflection, vec3(0.33));
  float bubble = 0.02 + (bands * 0.5 + 0.5) * 0.02 + fresnel * 0.5 + smoothstep(0.4, 1.3, shine) * 0.3;
  float alpha = mix(bubble, 1.0, smoothstep(0.32, 1.0, uFade));
  gl_FragColor = vec4(pearl + dither(gl_FragCoord.xy) / 255.0, alpha + dither(gl_FragCoord.yx) / 255.0);
}
`

// A soft light around the pearl, so its edge melts into the page. Drawn on the
// inside of a larger sphere: strongest behind the pearl, gone at the silhouette.
export const haloVertexShader = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;

void main() {
  vec4 world = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-world.xyz);
  gl_Position = projectionMatrix * world;
}
`

export const haloFragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uFade;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vView;

${dither}

void main() {
  vec3 normal = normalize(vNormal);
  float glow = pow(abs(dot(normal, normalize(vView))), 3.5);
  float sweep = atan(normal.y, normal.x) + uTime * 0.12;
  vec3 swept = mix(mix(uColorA, uColorB, 0.5 + 0.5 * sin(sweep)), uColorC, 0.5 + 0.5 * sin(sweep * 2.0 + 1.0) * 0.5);
  // The angle has no meaning at the centre, so the colours settle into their average there.
  vec3 color = mix((uColorA + uColorB + uColorC) / 3.0, swept, smoothstep(0.25, 0.85, length(normal.xy)));
  gl_FragColor = vec4(color, glow * mix(0.14, 0.42, smoothstep(0.32, 1.0, uFade)) + dither(gl_FragCoord.xy) * 1.5 / 255.0);
}
`
