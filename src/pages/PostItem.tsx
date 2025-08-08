import { Post } from '@/types/post'

interface PostItemProps {
  post: Post
  handleReadMore: (id: string) => void
  handleEdit: (id: string) => void
  handleDelete: (id: string) => void
}

const PostItem = ({
  post,
  handleReadMore,
  handleEdit,
  handleDelete
}: PostItemProps) => {
  return (
    <li
      key={post.id}
      className='cursor-pointer group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-2xl transition-all p-px h-full duration-300 '
    >
      <div className='bg-white rounded-xl overflow-hidden flex-1 h-full flex flex-col justify-between w-full'>
        <div onClick={() => handleReadMore(post.id)} className='p-5 flex-1'>
          <h2
            className='text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2 overflow-hidden text-ellipsis'
            title={post.title}
          >
            {post.title}
          </h2>
          <p className='text-gray-600 mt-2 text-sm leading-relaxed line-clamp-3 overflow-hidden text-ellipsis'>
            {post.content}
          </p>
        </div>

        <div className='p-4 flex justify-end gap-4 items-center'>
          <button
            onClick={() => handleEdit(post.id)}
            className='cursor-pointer bg-yellow-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-yellow-600 hover:shadow-lg active:scale-95 transition-all w-[40px] flex items-center justify-center'
          >
            <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
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
                d='m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z'
              />
            </svg>
          </button>

          <button
            onClick={() => handleDelete(post.id)}
            className='cursor-pointer bg-red-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-red-600 hover:shadow-lg active:scale-95 transition-all w-[40px] flex items-center justify-center'
          >
            <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
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
                d='M6 18 17.94 6M18 18 6.06 6'
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  )
}

export default PostItem