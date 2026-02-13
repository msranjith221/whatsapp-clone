Reffer https://docs.convex.dev/auth/clerk

1. Sign up for Clerk
- Sign up for a free Clerk account at clerk.com/sign-up

2. Create an application in Clerk
- Application name: whatsapp-clone

3. Create a JWT Template
- In Clerk Dashboard | Configure | Sessions | JWT templates
- Copy the Issuer URL

4. Configure Convex with the Clerk issuer domain
- In your app's convex folder, create a new file auth.config.ts 
- In convex/auth.config.ts, change domain:
from, domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
to, domain: "Replace with your own Clerk Issuer URL from your "convex" JWT template"
example, domain: "https://your-issuer-url.clerk.accounts.dev",

5. Deploy your changes
```bash
npx convex dev
```

6. Install clerk
```bash
npm install @clerk/nextjs
```

7. Set your Clerk API keys
- In the Clerk Dashboard, navigate to the API keys page. Copy your Clerk Publishable and Secret Keys and set them as the NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY environment variables, respectively.

```.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_SECRET_KEY
```

8. Configure ConvexProviderWithClerk
- make below changes in /src/providers/convex-client-provider.tsx

```tsx
"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
```

9. Add Clerk middleware
- Create /src/middleware.ts

```ts
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
```
- Above gives error Middleware notation depricated
- By default, clerkMiddleware() will not protect any routes. All routes are public and you must opt-in to protection for routes
-  to learn how to require authentication for specific routes:
    - Reffer: https://clerk.com/docs/reference/nextjs/clerk-middleware
- If you're using Next.js ≤15, name your file middleware.ts instead of proxy.ts.
- current versions:
react 18.2.0
next.js 16.1.1
@clerk/nextjs@6.36.8

- Protect all routes, create /src/proxy.ts, delete /src/middleware.ts:
```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
```

10. Wrap your app in Clerk and Convex
- add to /src/app/layout.tsx
```tsx
- It's important that <ClerkProvider> wraps <ConvexClientProvider>, and not the other way around.
```

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ConvexClientProvider from "@/providers/convex-client-provider";
import { ClerkProvider } from '@clerk/nextjs'

...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <ClerkProvider>
            <ConvexClientProvider>
              {children}
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- change user icon, in /src/components/home/left-panel.tsx,
```tsx
[FROM]: <User size={24} />
[TO]: <UserButton />
import { UserButton } from "@clerk/nextjs";
remove logout icon, <LogOut size={20} className='cursor-pointer' />
```