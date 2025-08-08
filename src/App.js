import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import EditForm from './pages/EditForm'
import PostForm from './pages/PostForm'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:id' element={<PostDetails />} />
        <Route path='/post/:id/edit' element={<EditForm />} />
        <Route path='/create' element={<PostForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
