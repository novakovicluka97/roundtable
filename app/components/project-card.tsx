import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

export default function ProjectCard({ title, description, image, link, tags }: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-stone-800 bg-stone-900/50 p-6 transition-all hover:bg-stone-900/80">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          <p className="text-sm text-stone-400">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-stone-800 px-3 py-1 text-xs font-medium text-stone-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {title === "Roundtable app" ? (
            <Link href="/roundtable">
              <Button variant="outline" className="border-stone-700 hover:bg-stone-800">
                Try it out
              </Button>
            </Link>
          ) : (
            <Link href={link} target="_blank">
              <Button variant="outline" className="border-stone-700 hover:bg-stone-800">
                View on GitHub
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
