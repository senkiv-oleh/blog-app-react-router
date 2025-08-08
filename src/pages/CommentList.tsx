'use client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hook'
import { fetchComments } from '../store/features/commentsSlice'

export default function CommentList ({ postId }: { postId: string }) {
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector(state => state.comments)

  useEffect(() => {
    dispatch(fetchComments(postId))
  }, [dispatch, postId])

  if (loading) return <p>Loading comments...</p>

  if (items.length === 0)
    return <p className='text-gray-500'>No comments yet.</p>

  return (
    <ul className='space-y-4'>
      {items.map((comment, index) => (
        <li key={comment.id} className={`bg-gray-50 p-4 ${index % 2 === 0 ? 'bg-purple-100' : ''}`}>
          <p className='text-sm text-gray-700'>{comment.content}</p>
          <p className='text-xs text-gray-500 mt-1'>
            <span className='font-medium'><i>{comment.author ? comment.author : 'Anonymous'}</i></span>
          </p>
        </li>
      ))}
    </ul>
  )
}
