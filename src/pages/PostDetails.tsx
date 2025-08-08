'use client'

import { useEffect, useState } from 'react'
import { db } from '../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Post } from '../types/post'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { Timestamp } from 'firebase/firestore'
import { format } from 'date-fns'
import { useParams, useNavigate } from 'react-router-dom'

export default function PostDetails () {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost () {
      if (!id) {
        setLoading(false)
        return
      }
      const docRef = doc(db, 'posts', id)
      const snapshot = await getDoc(docRef)
      if (snapshot.exists()) {
        const data = snapshot.data() as Post
        setPost({ ...data, id: snapshot.id })
      }
      setLoading(false)
    }

    loadPost()
  }, [id])

  const formatDate = (date: Timestamp | string | null | undefined) => {
    if (!date) return null
    const d = typeof date === 'string' ? new Date(date) : date.toDate()
    return format(d, 'dd MMM yyyy HH:mm')
  }

  if (loading)
    return (
      <div className='flex justify-center items-center py-16 bg-gradient-to-br from-purple-50 via-white to-green-50 rounded-xl'>
        <div className='w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin'></div>
      </div>
    )

  if (!post)
    return (
      <div className=' text-center text-gray-500 text-lg mt-10'>
        Post not found
      </div>
    )

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className='mt-4 inline-flex items-center px-4 py-2 bg-purple-100 border-purple-600 border-2 rounded-md text-sm font-medium text-purple-600 hover:bg-gray-100'
      >
        <svg
          className='w-6 h-6 text-gray-800 text-purple-600'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M5 12h14M5 12l4-4m-4 4 4 4'
          />
        </svg>
        Go Back
      </button>
      <div className='mt-10 p-px rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg'>
        <div className='bg-white rounded-xl p-8 space-y-6'>
          <h1 className='text-4xl font-bold text-gray-800'>{post.title}</h1>

          <div className='text-sm text-gray-500'>
            <p>
              By{' '}
              <span className='font-medium text-gray-700'>
                {post.author ? post.author : 'Anonymous'}
              </span>
            </p>
            <p>
              Created: {formatDate(post.createdAt)}
              {post.updatedAt && (
                <>
                  {' · '}
                  Updated: {formatDate(post.updatedAt)}
                </>
              )}
            </p>
          </div>

          <p className='text-lg leading-relaxed text-gray-700'>
            {post.content}
          </p>

          <hr className='border-gray-200 my-4' />

          <div className='mt-12'>
            <h2 className='text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2'>
              Comments
              <span className='text-sm bg-purple-100 text-purple-600 font-medium px-3 py-1 rounded-full'>
                Share your thoughts
              </span>
            </h2>

            <div className='bg-white border border-purple-200 rounded-2xl shadow-sm p-6 space-y-6'>
              <CommentList postId={post.id} />

              <hr className='border-t border-gray-200' />

              <div className='pt-2'>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                  Add a comment
                </h3>
                <CommentForm postId={post.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
