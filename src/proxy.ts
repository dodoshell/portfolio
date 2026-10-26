import { NextResponse, type NextRequest } from 'next/server'

// Italian browsers land on /it, everyone else on /en.
export function proxy(request: NextRequest) {
  const accepted = request.headers.get('accept-language') ?? ''
  const preferred = accepted.split(',')[0]?.trim().slice(0, 2).toLowerCase()
  const lang = preferred === 'it' ? 'it' : 'en'
  return NextResponse.redirect(new URL(`/${lang}${request.nextUrl.search}`, request.url))
}

export const config = {
  matcher: '/',
}
