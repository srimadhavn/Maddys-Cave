"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { List } from "lucide-react"

interface Heading {
  level: number
  text: string
  id: string
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" },
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (headings.length === 0) return null

  return (
    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <List className="w-5 h-5" />
          Table of Contents
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <nav>
          <ul className="space-y-2">
            {headings.map(({ level, text, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToHeading(id)}
                  className={`
                    block w-full text-left text-sm transition-all duration-200 hover:text-primary
                    ${level === 1 ? "font-semibold" : ""}
                    ${level === 2 ? "pl-4" : ""}
                    ${level === 3 ? "pl-8" : ""}
                    ${level === 4 ? "pl-12" : ""}
                    ${level === 5 ? "pl-16" : ""}
                    ${level === 6 ? "pl-20" : ""}
                    ${
                      activeId === id
                        ? "text-primary font-medium border-l-2 border-primary pl-2"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  )
}
