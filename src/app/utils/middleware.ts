import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Definim rutele protejate
  const isProtectedRoute = path.startsWith("/dashboard");

  // Verificăm dacă există un token de autentificare
  const token = request.cookies.get("auth_token")?.value;

  if (isProtectedRoute && !token) {
    // Dacă nu există token și ruta este protejată, redirecționăm către pagina de login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (path.startsWith("/auth/") && token) {
    // Dacă există token și încercăm să accesăm o pagină de autentificare, redirecționăm către dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Specificăm pentru care rute să se aplice middleware-ul
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
