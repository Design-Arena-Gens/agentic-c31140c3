import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NBA Game Center',
  description: 'Live NBA scores, schedules, and standings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
