import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkUnwrapImages from 'remark-unwrap-images'

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
  if (!fs.existsSync(postsDirectory)) {
    throw new Error('Posts directory does not exist')
  }

  const postFilePath = path.join(postsDirectory, `${id}.md`)
  
  if (!fs.existsSync(postFilePath)) {
    throw new Error(`Post with id ${id} not found`)
  }

  const fileContents = fs.readFileSync(postFilePath, 'utf8')

  const { data, content } = matter(fileContents)
  
  const processedContent = await remark()
    .use(html)
    .use(remarkUnwrapImages) // Add the unwrap images plugin
    .process(content)
  
  const contentHtml = processedContent.toString()

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

      if (!data.title || !data.date || !data.category) {
        console.warn(`Skipping invalid post: ${id}`)
        return null
      }
      let date = data.date
      if (date.length === 10) {  // If date is in "YYYY-MM-DD" format, append time
        date += '00:00:00'
      }
      return {
        id,
        title: data.title,
        date,
        excerpt: data.excerpt || '',
        category: data.category,
        coverImage: data.coverImage || '',
        tags: data.tags || [],
      }
    })
    .filter((post): post is Omit<Post, 'content'> => post !== null)

    return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }