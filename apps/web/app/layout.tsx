import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ReactNode } from 'react'
import Providers from './providers'
import '@mantine/core/styles.css'
// import './globals.css'

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

export const metadata: Metadata = {
  title: 'Table football',
  description: 'Simple app to track table football scores',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider>
          <Providers>{children}</Providers>
        </MantineProvider>
      </body>
    </html>
  )
}
