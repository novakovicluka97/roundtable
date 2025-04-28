import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Cinzel } from "next/font/google"
import "./globals.css"
import type React from "react"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Colosseum | Strength Through Discipline",
  description: "Transformation begins with a look in the mirror",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-black font-sans antialiased", cinzel.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="texture-overlay"></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
