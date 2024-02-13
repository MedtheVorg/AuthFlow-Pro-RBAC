import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import { apiSlice } from './slices/api/apiSlice'
import TasksSlice from './slices/TasksSlice'

const store = configureStore({
	reducer: {
		auth: authSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
		tasks: TasksSlice,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

export default store

export type RootState = ReturnType<typeof store.getState>
