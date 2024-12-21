"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("flex items-center gap-2", className)}
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </Button>
  );
}