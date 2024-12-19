"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { useState } from "react";

interface MobileSidebarProps {
  categories: string[];
  recentPosts: any[];
  archives: { month: string; count: number }[];
  allPosts: any[];
}

export function MobileSidebar({ categories, recentPosts, archives, allPosts }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[380px] overflow-y-auto">
        <div className="py-4">
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