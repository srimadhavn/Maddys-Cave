import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"

const postsDirectory = path.join(process.cwd(), "posts")

export interface PostData {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
}

// Enhanced plugin to handle images with better path resolution
function remarkImages() {
  return (tree: any) => {
    visit(tree, "image", (node) => {
      if (node.url) {
        // Handle different image path formats
        let imagePath = node.url

        // Remove 'public/' prefix if present
        if (imagePath.startsWith("public/")) {
          imagePath = imagePath.replace("public/", "/")
        }
        // Handle backslashes (Windows paths)
        else if (imagePath.includes("public\\")) {
          imagePath = imagePath.replace("public\\", "/").replace(/\\/g, "/")
        }
        // If it's just a filename, assume it's in /images/
        else if (!imagePath.startsWith("/") && !imagePath.startsWith("http")) {
          imagePath = `/images/${imagePath}`
        }

        node.url = imagePath

        // Add enhanced properties for better rendering
        if (!node.data) node.data = {}
        if (!node.data.hProperties) node.data.hProperties = {}

        node.data.hProperties.loading = "lazy"
        node.data.hProperties.className = "blog-image"
        node.data.hProperties.style = `
          max-width: 100%; 
          height: auto; 
          border-radius: 12px; 
          margin: 2rem auto; 
          display: block;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        `
        
        // Add alt text if missing
        if (!node.alt || node.alt.trim() === "") {
          node.alt = "Blog image"
        }
      }
    })

    // Also handle HTML img tags in the content
    visit(tree, "html", (node) => {
      if (node.value && node.value.includes("<img")) {
        // Fix image paths in HTML img tags
        node.value = node.value.replace(
          /src=["']([^"']+)["']/g,
          (match: string, src: string) => {
            let imagePath = src
            if (imagePath.startsWith("public/")) {
              imagePath = imagePath.replace("public/", "/")
            } else if (imagePath.includes("public\\")) {
              imagePath = imagePath.replace("public\\", "/").replace(/\\/g, "/")
            } else if (!imagePath.startsWith("/") && !imagePath.startsWith("http")) {
              imagePath = `/images/${imagePath}`
            }
            return `src="${imagePath}"`
          }
        )
      }
    })
  }
}

// Custom plugin to handle code blocks
function remarkCodeBlocks() {
  return (tree: any) => {
    visit(tree, "code", (node) => {
      if (!node.data) node.data = {}
      if (!node.data.hProperties) node.data.hProperties = {}

      node.data.hProperties.className = `language-${node.lang || "text"}`
    })
  }
}

export function getSortedPostsData(): PostData[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn("Posts directory does not exist, returning empty array")
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const id = fileName.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const matterResult = matter(fileContents)

        return {
          id,
          title: matterResult.data.title || "Untitled",
          date: matterResult.data.date || new Date().toISOString(),
          excerpt: matterResult.data.excerpt || "",
          content: matterResult.content,
          coverImage: matterResult.data.coverImage || "/placeholder.svg?height=400&width=600",
          category: matterResult.data.category || "General",
          tags: matterResult.data.tags || [],
        }
      })

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

export function getAllPostIds() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        return {
          params: {
            id: fileName.replace(/\.md$/, ""),
          },
        }
      })
  } catch (error) {
    console.error("Error getting post IDs:", error)
    return []
  }
}

export async function getPostData(id: string): Promise<PostData> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`)

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post with id "${id}" not found`)
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    // Process markdown with enhanced plugins
    const processedContent = await remark()
      .use(remarkGfm) // GitHub Flavored Markdown
      .use(remarkImages) // Custom image handling
      .use(remarkCodeBlocks) // Custom code block handling
      .use(html, { sanitize: false }) // Allow HTML in markdown
      .process(matterResult.content)

    let contentHtml = processedContent.toString()

    // Additional post-processing for image paths
    contentHtml = contentHtml.replace(
      /src=["']public\/([^"']+)["']/g,
      'src="/$1"'
    )
    contentHtml = contentHtml.replace(
      /src=["']public\\([^"']+)["']/g,
      (match, path) => `src="/${path.replace(/\\/g, "/")}"`
    )

    return {
      id,
      title: matterResult.data.title || "Untitled",
      date: matterResult.data.date || new Date().toISOString(),
      excerpt: matterResult.data.excerpt || "",
      content: contentHtml,
      coverImage: matterResult.data.coverImage || "/placeholder.svg?height=400&width=600",
      category: matterResult.data.category || "General",
      tags: matterResult.data.tags || [],
    }
  } catch (error) {
    console.error(`Error getting post data for id "${id}":`, error)
    throw error
  }
}
export function getPostsByCategory(category: string): PostData[] {
  const allPosts = getSortedPostsData()
  return allPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}