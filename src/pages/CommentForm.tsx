'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../store/hook'
import { addComment } from '../store/features/commentsSlice'
import { commentSchema, CommentFormData } from '../utils/validationComment'

export default function CommentForm ({ postId }: { postId: string }) {
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema)
  })

  const onSubmit = async (data: CommentFormData) => {
    await dispatch(
      addComment({ postId, ...data, author: data.author || 'Anonymous' })
    )
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      <input
        type='text'
        placeholder='Your name (optional)'
        {...register('author')}
        className='w-full border border-gray-300 rounded px-3 py-2 text-sm'
      />
      <div>
        <textarea
          placeholder='Write a comment...'
          {...register('content')}
          rows={3}
          className='w-full border border-gray-300 rounded px-3 py-2 text-sm'
        />
        {errors.content && (
          <p className='text-red-500 text-sm mt-1'>{errors.content.message}</p>
        )}
      </div>
      <button
        type='submit'
        className='cursor-pointer bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition'
      >
        Submit
      </button>
    </form>
  )
}
