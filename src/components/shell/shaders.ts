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

export const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uTurbulence;
uniform vec2 uPointer;

varying vec3 vNormal;
varying vec3 vView;
varying float vDisplacement;

${noise}

float displacement(vec3 p) {
  float slow = snoise(p * 0.9 + vec3(uTime * 0.1));
  float fine = snoise(p * 1.8 - vec3(uTime * 0.14)) * 0.08;
  // The surface swells toward the pointer, like something soft being pressed.
  float pull = max(dot(normalize(p), normalize(vec3(uPointer, 0.6))), 0.0);
  return (slow + fine) * (0.05 + uTurbulence * 0.08) + pull * pull * 0.1;
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
  vView = normalize(-world.xyz);
  vDisplacement = d;
  gl_Position = projectionMatrix * world;
}
`

// Thin-film look: the hue shifts with the viewing angle, like nacre inside a shell.
export const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uTime;
uniform float uFade;

varying vec3 vNormal;
varying vec3 vView;
varying float vDisplacement;

void main() {
  float facing = clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
  float fresnel = pow(1.0 - facing, 2.2);

  float film = facing * 1.8 + vDisplacement * 1.5 + uTime * 0.04;
  vec3 wave = 0.5 + 0.5 * cos(6.28318 * (vec3(film) + vec3(0.0, 0.33, 0.67)));
  vec3 color = uColorA * wave.x + uColorB * wave.y + uColorC * wave.z;
  color /= max(wave.x + wave.y + wave.z, 0.001);

  vec3 light = normalize(vec3(-0.4, 0.8, 0.6));
  float spec = pow(max(dot(reflect(-light, normalize(vNormal)), normalize(vView)), 0.0), 40.0);

  color = mix(color * 0.55, color, facing) + fresnel * 0.55 + spec * 0.6;
  gl_FragColor = vec4(color, uFade);
}
`
