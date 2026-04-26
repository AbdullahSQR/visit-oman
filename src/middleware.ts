import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "ar"];
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static asset files (e.g. robots.txt, sitemap.xml) not covered by the matcher config.
  if (pathname.includes(".")) return;

  // Detect locale from pathname
  const detectedLocale = LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!detectedLocale) {
    // Redirect to default locale
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Forward locale to server components via a request header so <html dir/lang> can be set.
  // Using NextResponse.next({ request }) makes this middleware-controlled and not spoofable
  // by client fetch requests setting arbitrary headers.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", detectedLocale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
