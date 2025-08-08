'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { fetchPosts, deletePost } from '../store/features/postsSlice'
import { useNavigate } from 'react-router-dom'
import PostItem from './PostItem'

export default function PostList () {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { items, loading } = useAppSelector(state => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleReadMore = (id: string) => {
    navigate(`/post/${id}`)
  }

  const handleEdit = (id: string) => {
    console.log('Edit post with ID:', id)
    navigate(`/post/${id}/edit`)
  }

  const handleDelete = (id: string) => {
    dispatch(deletePost(id))
  }

  if (loading)
    return (
      <div className='flex justify-center items-center py-16 bg-gradient-to-br from-purple-50 via-white to-green-50 rounded-xl'>
        <div className='w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin'></div>
      </div>
    )

  return (
    <div className='py-8 px-4 flex-1 flex-col items-center'>
      <h1 className='text-3xl font-extrabold text-center mb-8 text-gray-800'>
        Latest <span className='text-purple-600'>Blog Posts</span>
      </h1>

      <ul className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {items.length === 0 && (
          <p className='col-span-full text-center text-gray-500 text-lg'>
            No posts yet
          </p>
        )}

        {items.map(post => (
          <PostItem
            key={post.id}
            post={post}
            handleReadMore={handleReadMore}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  )
}
