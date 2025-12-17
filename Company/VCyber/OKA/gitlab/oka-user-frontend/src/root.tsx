import React from 'react'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'
import './app.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { TranslateProvider } from '@/contexts/TranslateContext'
import { t } from '@/services/translate'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap'
  }
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='vi' data-theme='dark'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{t('app.name')}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <TranslateProvider>
      <ThemeProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </ThemeProvider>
    </TranslateProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = t('pages.error.message')

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : t('pages.error.title')
    details = error.status === 404 ? t('pages.notFound.message') : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
  }

  return (
    <html lang='vi' data-theme='dark'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{message === '404' ? t('pages.notFound.title') : t('pages.error.title')}</title>
      </head>
      <body className='bg-background text-foreground'>
        <main className='pt-16 p-4 container mx-auto'>
          <h1 className='text-2xl font-bold mb-4'>{message}</h1>
          <p className='text-muted-foreground'>{details}</p>
        </main>
      </body>
    </html>
  )
}
