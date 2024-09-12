import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@mantine/core/styles.css'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  display: 'swap',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
})

import { ColorSchemeScript, MantineProvider } from '@mantine/core'

export const metadata: Metadata = {
  title: 'Table football',
  description: 'Simple app to track table football games',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}
