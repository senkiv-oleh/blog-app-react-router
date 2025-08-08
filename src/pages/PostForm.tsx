'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postSchema, PostFormData } from '../utils/validationPost'
import { useAppDispatch } from '../store/hook'
import { addPost } from '../store/features/postsSlice'
import { useNavigate } from 'react-router-dom'

const PostForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema)
  })

  const onSubmit = async (data: PostFormData) => {
    reset()
    await dispatch(addPost({ ...data, author: 'user_1' }))

    navigate('/')
  }

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
      <div className='flex justify-center items-center py-8 '>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white p-8 rounded-xl shadow-lg  flex-1 mt-8 space-y-6 w-full'
        >
          <h2 className='text-2xl font-bold text-gray-800 text-center'>
            Fill out the form below to create your post.
          </h2>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Title
            </label>
            <input
              {...register('title')}
              placeholder='Enter post title'
              className={`w-full p-3 rounded-lg border ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.title && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Content
            </label>
            <textarea
              {...register('content')}
              placeholder='Write your content here...'
              rows={6}
              className={`w-full p-3 rounded-lg border ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.content && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.content.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all'
          >
            Create Post
          </button>
        </form>
      </div>
    </>
  )
}

export default PostForm
