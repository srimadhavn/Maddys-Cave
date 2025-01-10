"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  categories: string[];
  recentPosts: any[];
  archives: { month: string; count: number }[];
  allPosts: any[];
}

export function MobileSidebar({ categories, recentPosts, archives, allPosts }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "lg:hidden fixed right-4 top-4 z-40",
            "hover:bg-accent hover:text-accent-foreground",
            "transition-all duration-200 ease-in-out",
            "backdrop-blur-sm bg-background/50"
          )}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className={cn(
          "w-[85vw] sm:w-[380px] p-0",
          "border-l border-border/50",
          "backdrop-blur-xl bg-background/95"
        )}
      >
        <div className="py-4 px-2 h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar">
          <Sidebar
            categories={categories}
            recentPosts={recentPosts}
            archives={archives}
            allPosts={allPosts}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}