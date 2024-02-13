import { Task } from '@/types/types'
import { createSlice } from '@reduxjs/toolkit'

interface TasksState {
	tasks: Task[] | []
}

const initialState: TasksState = {
	tasks: [],
}

const tasksSlice = createSlice({
	name: 'tasks',
	initialState: initialState,
	reducers: {
		setTasks: (state, action) => {
			state.tasks = action.payload
		},
	},
})

export const { setTasks } = tasksSlice.actions
export default tasksSlice.reducer
