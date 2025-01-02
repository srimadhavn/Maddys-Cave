"use client";

import { Button } from "@/components/ui/button";
import { Share2, Copy } from "lucide-react";
import { useShare } from "@/lib/hooks/use-share";
import { useEffect, useState } from "react";

interface ShareButtonProps {
  title: string;
  slug: string;
}

export function ShareButton({ title, slug }: ShareButtonProps) {
  const { sharePost, isSharing } = useShare();
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setHasNativeShare('share' in navigator);
    setUrl(`${window.location.origin}/posts/${slug}`);
  }, [slug]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => sharePost(title, url)}
      disabled={isSharing || !url}
    >
      {hasNativeShare ? (
        <Share2 className="h-4 w-4 mr-2" />
      ) : (
        <Copy className="h-4 w-4 mr-2" />
      )}
      {hasNativeShare ? 'Share' : 'Copy Link'}
    </Button>
  );
}