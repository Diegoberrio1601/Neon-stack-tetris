// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { match } from '@formatjs/intl-localematcher'
// import Negotiator from 'negotiator'

// let locales = ['en', 'es']
// let defaultLocale = 'en'

// function getLocale(request: NextRequest) {
//   const negotiatorHeaders: Record<string, string> = {}
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  
//   let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
//   return match(languages, locales, defaultLocale)
// }

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   )

//   if (pathnameHasLocale) return

//   const locale = getLocale(request)
//   request.nextUrl.pathname = `/${locale}${pathname}`
//   return NextResponse.redirect(request.nextUrl)
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'es']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  // Extraemos los encabezados de forma que Negotiator los entienda correctamente
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Obtenemos los lenguajes preferidos del navegador
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  
  try {
    return match(languages, locales, defaultLocale)
  } catch (error) {
    return defaultLocale
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Verificar si el pathname ya tiene un locale soportado
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // 2. Si no tiene locale, obtener el preferido
  const locale = getLocale(request)

  // 3. Redirigir a la nueva URL con el locale incluido
  // Ejemplo: /products -> /en/products
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  
  // Mantenemos los parámetros de búsqueda (query params) si los hay
  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value)
  })

  return NextResponse.redirect(newUrl)
}

export const config = {
  // Matcher optimizado para ignorar archivos estáticos y rutas internas de Next.js
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (svg, png, etc)
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
}