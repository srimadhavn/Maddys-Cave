"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ShareButtonProps {
  url: string
  title: string
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const hasNativeShare = typeof navigator !== "undefined" && "share" in navigator

  const isMobile =
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy the URL manually.",
        variant: "destructive",
      })
    }
  }

  const handleNativeShare = async () => {
    if (hasNativeShare) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this article: ${title}`,
          url: url,
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          copyToClipboard()
        }
      }
    } else {
      copyToClipboard()
    }
  }

  const handleShare = () => {
    if (isMobile && hasNativeShare) {
      handleNativeShare()
    } else {
      copyToClipboard()
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 hover:bg-muted/50 transition-all duration-300"
      onClick={handleShare}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          Share
        </>
      )}
    </Button>
  )
}
