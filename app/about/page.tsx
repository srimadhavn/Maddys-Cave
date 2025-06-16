import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Brain,
  Cloud,
  Database,
  MapPin,
  Zap,
  Cpu,
  Rocket,
} from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const skills = [
    {
      category: "Languages",
      items: ["C++", "Python3"],
      icon: Code,
      color: "bg-blue-500/10 text-blue-600 border-blue-200",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      category: "ML Libraries",
      items: ["Scikit-learn", "TensorFlow", "OpenCV", "PyTorch"],
      icon: Brain,
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      category: "Computer Science",
      items: ["Data Structures", "Algorithms", "DBMS", "Computer Networking", "Operating Systems"],
      icon: Database,
      color: "bg-green-500/10 text-green-600 border-green-200",
      gradient: "from-green-400 to-emerald-400",
    },
    {
      category: "Tools & Cloud",
      items: ["Docker", "AWS", "OCI"],
      icon: Cloud,
      color: "bg-orange-500/10 text-orange-600 border-orange-200",
      gradient: "from-orange-400 to-red-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 relative overflow-hidden">
      {/* Creative Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-secondary/40 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-accent/50 rotate-45 animate-pulse-slow"></div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}

        {/* Gradient mesh */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl animate-morph"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-secondary/10 to-transparent rounded-full blur-3xl animate-morph-delayed"></div>
        </div>

        {/* Circuit-like lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10h80v80h-80z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="90" cy="90" r="2" fill="currentColor" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" className="animate-pulse-slow" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-20 relative">
        {/* Hero Section with Creative Layout */}
        <section className="text-center space-y-12 animate-fade-in">
          {/* Avatar with Creative Frame */}
          <div className="relative inline-block animate-bounce-in">
            <div className="relative">
              {/* Rotating rings */}
              <div className="absolute inset-0 w-48 h-48 border-2 border-primary/20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 w-44 h-44 border border-secondary/30 rounded-full animate-spin-reverse"></div>

              {/* Main avatar container */}
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-2xl group">
                <Image
                  src="https://avatars.githubusercontent.com/u/138619431?v=4"
                  alt="Srimadhavan G"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  priority
                  sizes="160px"
                />
                {/* Remove all overlay divs - no gradients on the image */}
              </div>

              {/* Orbiting elements - positioned outside the image circle */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 animate-orbit">
                <div className="w-3 h-3 bg-primary rounded-full shadow-lg"></div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 animate-orbit-reverse">
                <div className="w-2 h-2 bg-secondary rounded-full shadow-lg"></div>
              </div>
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 animate-orbit-slow">
                <Zap className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 animate-orbit-slow-reverse">
                <Cpu className="w-4 h-4 text-secondary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Name with Typewriter Effect */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="inline-block animate-typewriter bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent bg-300% animate-gradient-x">
                  Srimadhavan G
                </span>
              </h1>
            </div>

            {/* Animated Role Badge */}
            <div
              className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-primary/20 animate-bounce-in overflow-hidden"
              style={{ animationDelay: "400ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 animate-shimmer"></div>
              <Brain className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-semibold text-primary relative z-10">Machine Learning Engineer</span>
              <Rocket className="w-5 h-5 text-secondary animate-bounce" />
            </div>

            {/* Status Indicators */}
            <div
              className="flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in-delayed"
              style={{ animationDelay: "600ms" }}
            >
            </div>
          </div>
        </section>

        {/* About Section with Creative Quote */}
        <section className="space-y-8 animate-fade-in-up" style={{ animationDelay: "800ms" }}>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative">
              <span className="relative z-10">About Me</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-xl animate-pulse-slow"></div>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-primary mx-auto rounded-full animate-expand-rainbow"></div>
          </div>

          <Card className="relative border-0 shadow-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm overflow-hidden group">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 animate-border-flow"></div>
            <div className="absolute inset-[1px] bg-card/90 rounded-lg"></div>

            <CardContent className="relative p-8 z-10">
              <div className="relative">
                {/* Floating quote marks */}
                <div className="absolute -top-4 -left-4 text-6xl text-primary/20 animate-float-quote">"</div>
                <div className="absolute -bottom-8 -right-4 text-6xl text-secondary/20 animate-float-quote-delayed">
                  "
                </div>

                <blockquote className="text-lg sm:text-xl text-center leading-relaxed text-muted-foreground relative z-10">
                  <span className="inline-block animate-text-reveal">
                    A relentless builder of systems unseen — Machine learning forged in logic, deployed in the clouds,
                    guided by purpose.
                  </span>
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technical Expertise with Creative Grid */}
        <section className="space-y-10 animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative">
              <span className="relative z-10">Technical Expertise</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent blur-xl animate-pulse-slow"></div>
            </h2>
            <p className="text-muted-foreground text-lg">Technologies and tools I work with</p>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary via-primary to-secondary mx-auto mt-4 rounded-full animate-expand-rainbow"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <Card
                  key={skill.category}
                  className="group relative border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-2 bg-card/50 backdrop-blur-sm overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${1200 + index * 200}ms` }}
                >
                  {/* Animated background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-glow"></div>

                  <CardContent className="relative p-6 space-y-6 z-10">
                    <div className="flex items-center gap-4">
                      <div
                        className={`relative p-4 rounded-xl ${skill.color} group-hover:scale-110 transition-all duration-500 overflow-hidden`}
                      >
                        <IconComponent className="w-6 h-6 relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">
                          {skill.category}
                        </h3>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-secondary mt-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, itemIndex) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="relative bg-muted/50 hover:bg-muted transition-all duration-300 transform hover:scale-105 animate-bounce-in overflow-hidden group/badge"
                          style={{ animationDelay: `${1400 + index * 200 + itemIndex * 100}ms` }}
                        >
                          <span className="relative z-10">{item}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Contact Section with Creative CTA */}
        <section className="space-y-10 animate-fade-in-up" style={{ animationDelay: "1600ms" }}>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative">
              <span className="relative z-10">Let's Connect</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-xl animate-pulse-slow"></div>
            </h2>
            <p className="text-muted-foreground text-lg">Ready to build cool stuffs ?</p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-primary mx-auto mt-4 rounded-full animate-expand-rainbow"></div>
          </div>

          <Card className="relative border-0 shadow-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 animate-shimmer"></div>

            <CardContent className="relative p-8 z-10">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transform hover:scale-105 animate-bounce-in"
                  style={{ animationDelay: "2000ms" }}
                >
                  <Link href="mailto:srimadhavan93@gmail.com">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                    <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10">Email</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="group relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transform hover:scale-105 animate-bounce-in"
                  style={{ animationDelay: "2200ms" }}
                >
                  <Link href="/blog">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Code className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10">Explore Blog</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Social Links with Creative Hover Effects */}
        <section className="animate-fade-in-up" style={{ animationDelay: "2400ms" }}>
          <div className="flex justify-center space-x-12 pt-8">
            <a
              href="https://www.linkedin.com/in/srimadhavn/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 text-blue-600 transition-all duration-500 transform hover:scale-125 hover:-translate-y-4 shadow-xl hover:shadow-2xl animate-bounce-in overflow-hidden"
              style={{ animationDelay: "2600ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              <Linkedin className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="sr-only">LinkedIn</span>
            </a>

            <a
              href="https://github.com/Srimadhavn"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-full bg-gradient-to-br from-gray-500/10 to-gray-600/10 hover:from-gray-500/20 hover:to-gray-600/20 text-gray-600 transition-all duration-500 transform hover:scale-125 hover:-translate-y-4 shadow-xl hover:shadow-2xl animate-bounce-in overflow-hidden"
              style={{ animationDelay: "2800ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              <Github className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
