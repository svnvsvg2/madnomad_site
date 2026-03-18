import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Block all access to the admin area in production
        if (process.env.NODE_ENV === 'production') {
            return new NextResponse('Not Found', { status: 404 });
        }

        // Local development basic auth
        const basicAuth = request.headers.get('authorization');

        if (basicAuth) {
            const authValue = basicAuth.split(' ')[1];
            const [user, pwd] = atob(authValue).split(':');

            if (user === 'baza' && pwd === 'sana') {
                return NextResponse.next();
            }
        }

        return new NextResponse('Auth Required.', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"',
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
