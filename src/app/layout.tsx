import type { Metadata } from 'next'
import './globals.css'
import ServiceWorkerRegistration from '../components/ServiceWorkerRegistration'
import LayoutWrapper from '@/components/Layoutwrapper'
import AxiosConfig from '@/components/AxiosConfig'
// import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'CharchaManch - Progressive Web App',
  description: 'A progressive web app for messaging and community',
  manifest: '/manifest.json',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CharchaManch',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CharchaManch" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="bg-gray-50">
          <AxiosConfig />
          <ServiceWorkerRegistration />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
      </body>
    </html>
  )
}