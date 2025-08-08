import { useNavigate } from 'react-router-dom'
import PostList from './PostList'

export default function HomePage () {
  const navigate = useNavigate()

  return (
    <>
      <div className='flex justify-between items-center mb-6 w-full'>
        <h1 className='text-5xl font-bold'>Blog App</h1>
        <button
          onClick={() => navigate('/create')}
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
        >
          + Add new Post
        </button>
      </div>
      <PostList />
    </>
  )
}
