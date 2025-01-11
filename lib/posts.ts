import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  id: string
  title: string
  date: string
  excerpt: string
  content: string
  category: string
  coverImage: string
  tags: string[]
}

export async function getPostData(id: string): Promise<Post> {
  // Ensure posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    throw new Error('Posts directory does not exist')
  }

  const postFilePath = path.join(postsDirectory, `${id}.md`)
  
  // Check if file exists
  if (!fs.existsSync(postFilePath)) {
    throw new Error(`Post with id ${id} not found`)
  }

  // Read the markdown file
  const fileContents = fs.readFileSync(postFilePath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents)
  
  const processedContent = await remark()
.use(html)
.process(content)
const contentHtml = processedContent.toString()

  // Validate required fields
  if (!data.title || !data.date || !data.category) {
    throw new Error(`Invalid post metadata for ${id}`)
  }

  return {
    id,
    content: contentHtml,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt || '',
    category: data.category,
    coverImage: data.coverImage || '',
    tags: data.tags || [],
  }
}

export function getAllPostIds() {
  // Ensure posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => ({
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }))
}

export function getSortedPostsData(): Omit<Post, 'content'>[] {
  // Ensure posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      // Validate required fields
      if (!data.title || !data.date || !data.category) {
        console.warn(`Skipping invalid post: ${id}`)
        return null
      }

      return {
        id,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || '',
        category: data.category,
        coverImage: data.coverImage || '',
        tags: data.tags || [],
      }
    })
    .filter((post): post is Omit<Post, 'content'> => post !== null)

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}