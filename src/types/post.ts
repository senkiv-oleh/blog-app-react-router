import { Timestamp } from 'firebase/firestore'

export interface Post {
  id: string
  title: string
  content: string
  createdAt: Timestamp | null | string
  updatedAt?: Timestamp | null | string
  author: string
  commentsCount?: number
}

// types/comment.ts
export interface Comment {
  id: string
  content: string
  author?: string
  createdAt: Timestamp | null | string
}
