import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Mohamed Safwat — Full Stack & Android Developer',
  description: 'Portfolio of Mohamed Safwat Mahdy, a full stack and Android developer building production-ready web and mobile applications.',
  openGraph: {
    title: 'Mohamed Safwat — Full Stack & Android Developer',
    description: 'Portfolio of Mohamed Safwat Mahdy, a full stack and Android developer.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
