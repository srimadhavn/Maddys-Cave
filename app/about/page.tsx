import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Mail, Github, Twitter, Linkedin } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <section className="space-y-6">
        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
          <Image
            src="https://avatars.githubusercontent.com/u/138619431?v=4"
            alt="Srimadhavan G"
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Srimadhavan G</h1>
            <Link 
              href="https://srimadhavan.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              title="Visit my portfolio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>
          </div>
          <p className="text-xl text-muted-foreground">
            Machine Learning Engineer 
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">About Me</h2>
        <p className="text-muted-foreground leading-relaxed">
          I'm a passionate Machine Learning Engineer with an interest in cloud technologies. I enjoy building scalable and efficient ML models and exploring new tools and libraries. My goal is to create efficient and impactful solutions that make a positive impact.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Technical Expertise</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium">Languages</h3>
            <p className="text-sm text-muted-foreground">
              C++, Python3
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">ML libraries</h3>
            <p className="text-sm text-muted-foreground">
              Scikit-learn, Tensorflow, Keras
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Computer Science</h3>
            <p className="text-sm text-muted-foreground">
              Data Structures, Algorithms, Database Management, Computer Networking, Operating Systems, Object Oriented Programming
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Tools & Practices</h3>
            <p className="text-sm text-muted-foreground">
              Git, Docker, AWS, Linux
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Get in Touch</h2>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="mailto:srimadhavan93@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Email Me
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">
              Read My Blog
            </Link>
          </Button>
        </div>
      </section>

      <section className="flex justify-center space-x-6 pt-8">
        <a
          href="https://www.linkedin.com/in/srimadhavn/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary"
        >
          <Linkedin className="h-6 w-6" />
          <span className="sr-only">Twitter</span>
        </a>
        <a
          href="https://github.com/Srimadhavn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary"
        >
          <Github className="h-6 w-6" />
          <span className="sr-only">GitHub</span>
        </a>
      </section>
    </div>
  )
}