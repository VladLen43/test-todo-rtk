import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../reducers/todoSlice'


const store = configureStore({
  reducer: todoReducer
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch