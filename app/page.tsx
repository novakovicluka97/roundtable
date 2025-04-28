import { Button } from "@/components/ui/button"
import { Github, Linkedin, Instagram, Youtube } from "lucide-react"
import { TikTokIcon } from "./components/tiktok-icon"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import StarryBackground from "./components/starry-background"
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-stone-200">
      <StarryBackground />

      <header className="sticky top-0 z-50 w-full border-b border-stone-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold uppercase tracking-wider sm:inline-block">Colosseum.io</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium uppercase tracking-wider">
              <Link href="#about" className="transition-colors hover:text-stone-400">
                About
              </Link>
              <Link href="#projects" className="transition-colors hover:text-stone-400">
                Projects
              </Link>
              <Link href="#contact" className="transition-colors hover:text-stone-400">
                Contact
              </Link>
            </nav>
          </div>
          <Button variant="outline" className="ml-auto uppercase tracking-wider border-stone-700 hover:bg-stone-800">
            Resume
          </Button>
        </div>
      </header>

      <main className="container px-4 md:px-6">
        <section id="about" className="py-8 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none uppercase">
                  Colosseum
                </h1>
                <p className="mx-auto max-w-[700px] text-stone-400 md:text-xl italic">
                  Transformation begins with a look in the mirror.
                </p>
              </div>
              <div className="space-x-4 py-4">
                <Link href="https://instagram.com" target="_blank">
                  <Button variant="outline" size="icon" className="border-stone-700 hover:bg-stone-800">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
                <Link href="https://youtube.com" target="_blank">
                  <Button variant="outline" size="icon" className="border-stone-700 hover:bg-stone-800">
                    <Youtube className="h-4 w-4" />
                    <span className="sr-only">YouTube</span>
                  </Button>
                </Link>
                <Link href="https://tiktok.com" target="_blank">
                  <Button variant="outline" size="icon" className="border-stone-700 hover:bg-stone-800">
                    <TikTokIcon className="h-4 w-4" />
                    <span className="sr-only">TikTok</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="relative w-full max-w-3xl mx-auto my-8 md:my-16">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          <Image src="/images/colosseum.png" alt="Colosseum" width={800} height={800} className="mx-auto" />
        </div>

        <section id="projects" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center uppercase">
              <span className="border-b-2 border-stone-700 pb-2">Projects</span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Roundtable app"
                description="AI powered conversations between select figures. Get different opinions from historical figures!"
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com"
                tags={["Next.js", "N8N"]}
              />
              <ProjectCard
                title="Reddit Summary App"
                description="A fast scraping app that will deliver a summary of a desired topic based on all reddit comments and posts about it"
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com"
                tags={["React", "Node.js", "N8N"]}
              />
              <ProjectCard
                title="AI Chat Interface"
                description="An AI-powered chat interface with natural language processing capabilities."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com"
                tags={["OpenAI", "Next.js", "TailwindCSS"]}
              />
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center uppercase">
                <span className="border-b-2 border-stone-700 pb-2">Get in Touch</span>
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-800">
        <div className="container flex flex-col gap-4 py-6 w-full shrink-0 items-center px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="https://github.com" target="_blank" className="hover:opacity-80 transition-opacity">
              <Button variant="outline" size="icon" className="border-stone-700 hover:bg-stone-800">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:opacity-80 transition-opacity">
              <Button variant="outline" size="icon" className="border-stone-700 hover:bg-stone-800">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row w-full justify-between items-center">
            <p className="text-xs text-stone-500">© 2025 Colosseum.io. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
              <Link className="text-xs hover:underline underline-offset-4 text-stone-500 hover:text-stone-300" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline underline-offset-4 text-stone-500 hover:text-stone-300" href="#">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
