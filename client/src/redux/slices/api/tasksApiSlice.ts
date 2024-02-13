import { CreateTaskInput, UpdateTaskInput } from '@/schemas/task.Schema'
import { apiSlice } from './apiSlice'
const TASKS_URL = '/api/tasks'

const tasksApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: () => ({
				url: TASKS_URL,
				method: 'GET',
			}),
			providesTags: ['Task'],
		}),
		createTask: builder.mutation({
			query: (taskInput: CreateTaskInput) => ({
				url: `${TASKS_URL}`,
				method: 'POST',
				body: taskInput,
			}),
			invalidatesTags: ['Task'],
		}),
		updateTask: builder.mutation({
			query: ({ taskInput, taskID }: { taskInput: UpdateTaskInput; taskID: string }) => ({
				url: `${TASKS_URL}/${taskID}`,
				method: 'PATCH',
				body: taskInput,
			}),
			invalidatesTags: ['Task'],
		}),
		deleteTask: builder.mutation({
			query: (taskID: string) => ({
				url: `${TASKS_URL}/${taskID}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Task'],
		}),
	}),
})

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApiSlice
