'use client'

import { useState, useEffect, useRef } from 'react'
import { Share, Twitter, Facebook, Linkedin, Link, Check } from 'lucide-react'

interface ShareButtonProps {
  url: string
  title?: string
}

export default function ShareButton({ url, title = 'Check out this blog post!' }: ShareButtonProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobileDevice = () => {
      setIsMobile(window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent))
    }

    checkMobileDevice()
    window.addEventListener('resize', checkMobileDevice)

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('resize', checkMobileDevice)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMobileShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        url,
      }).catch((error) => console.log('Error sharing', error))
    } else {
      handleCopyLink()
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 3000)
    })
  }

  const shareOptions = [
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      action: () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank')
    },
    {
      name: 'Copy Link',
      icon: isCopied ? Check : Link,
      action: handleCopyLink
    }
  ]

  if (isMobile) {
    return (
      <button
        onClick={handleMobileShare}
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Share className="w-4 h-4 mr-2" />
        Share
      </button>
    )
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Share className="w-4 h-4 mr-2" />
        Share
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => {
                  option.action()
                  setIsOpen(false)
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <option.icon className="w-4 h-4 mr-3" />
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

