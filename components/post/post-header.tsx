"use client";

import { Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "./share-button";
import { BackButton } from "./back-button";

interface PostHeaderProps {
  title: string;
  date: string;
  readingTime: string;
  category: string;
  slug: string;
}

export function PostHeader({ title, date, readingTime, category, slug }: PostHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <BackButton className="md:hidden" />
        <ShareButton title={title} slug={slug} />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <time dateTime={date}>{date}</time>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{readingTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="h-4 w-4" />
          <Link 
            href={`/categories/${category.toLowerCase()}`}
            className="hover:text-primary transition-colors"
          >
            {category}
          </Link>
        </div>
      </div>
    </div>
  );
}