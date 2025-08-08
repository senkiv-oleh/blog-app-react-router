import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../utils/firebase'
import { Post } from '../../types/post'
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore'

interface PostsState {
  items: Post[]
  loading: boolean
}

const initialState: PostsState = {
  items: [],
  loading: false
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map(docSnap => {
    const data = docSnap.data() as Omit<Post, 'id'>
    
    return {
      id: docSnap.id,
      ...data
    }
  })
})

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (data: { title: string; content: string; author: string }) => {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...data,
      createdAt: serverTimestamp()
    })

    const snapshot = await getDoc(doc(db, 'posts', docRef.id))
    if (snapshot.exists()) {
      const data = snapshot.data() as Omit<Post, 'id'>
      return {
        id: snapshot.id,
        ...data
      }
    }

    return { id: docRef.id, ...data, createdAt: new Date().toISOString() }
  }
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, data }: { id: string; data: Partial<Post> }) => {
    const ref = doc(db, 'posts', id)
    await updateDoc(ref, data)
    return { id, data }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: string) => {
    const ref = doc(db, 'posts', id)
    await deleteDoc(ref)
    return id
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, data } = action.payload
        const index = state.items.findIndex(p => p.id === id)
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...data }
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload)
      })
  }
})

export default postsSlice.reducer
