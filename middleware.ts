import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'es']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

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
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  
  request.nextUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.set(key, value)
  })

  return NextResponse.redirect(newUrl)
}

export const config = {
  // Matcher actualizado para excluir la carpeta de sonidos
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * - api (rutas de API)
     * - _next/static y _next/image (archivos internos de Next)
     * - sounds (tu carpeta de audio en public)
     * - favicon.ico, sw.js, assets
     */
    '/((?!api|_next/static|_next/image|sounds|assets|favicon.ico|sw.js).*)',
  ],
}