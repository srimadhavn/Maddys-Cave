import { getSortedPostsData } from "@/lib/posts"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const posts = getSortedPostsData()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
