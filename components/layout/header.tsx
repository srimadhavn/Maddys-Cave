import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-4 h-14 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold hover:text-primary transition-colors">
          Maddy's Cave
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}