import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import MuiThemeProvider from "@/components/providers/MuiThemeProvider"

import "./globals.css"

const poppins = Poppins({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "Order Management System",
  description: "Order Management",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <MuiThemeProvider>{children}</MuiThemeProvider>
      </body>
    </html>
  )
}
