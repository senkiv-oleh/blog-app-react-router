import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../../utils/firebase'
import { Comment } from '../../types/post'

interface CommentsState {
  items: Comment[]
  loading: boolean
}

const initialState: CommentsState = {
  items: [],
  loading: false
}

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId: string) => {
    const q = query(
      collection(db, 'posts', postId, 'comments'),
      orderBy('createdAt', 'asc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Comment, 'id'>)
    }))
  }
)

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (data: { postId: string; content: string; author: string }) => {
    const { postId, ...commentData } = data
    const docRef = await addDoc(collection(db, 'posts', postId, 'comments'), {
      ...commentData,
      createdAt: serverTimestamp()
    })
    return {
      id: docRef.id,
      ...commentData,
      createdAt: new Date().toISOString()
    }
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchComments.pending, state => {
        state.loading = true
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
  }
})

export default commentsSlice.reducer
