"use client";

import { useState } from 'react';
import { toast } from 'sonner';

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  const sharePost = async (title: string, url: string) => {
    setIsSharing(true);
    
    try {
      // Check if native share is available (mobile devices)
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        });
        toast.success('Shared successfully!');
      } else {
        // Fallback for desktop: copy to clipboard
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Failed to share post');
    } finally {
      setIsSharing(false);
    }
  };

  return { sharePost, isSharing };
}