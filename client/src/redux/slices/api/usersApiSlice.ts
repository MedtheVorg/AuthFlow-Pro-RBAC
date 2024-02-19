import { SignUpInput } from '@/schemas/signup.schema'
import { apiSlice } from './apiSlice'

const USERS_URL = '/api/users'
const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => ({
				url: `${USERS_URL}`,
				method: 'GET',
			}),
			providesTags: ['User'],
		}),
		getUser: builder.query({
			query: (userID: string) => ({
				url: `${USERS_URL}/${userID}`,
				method: 'GET',
			}),
		}),
		createUser: builder.mutation({
			query: (signUpInput: SignUpInput) => ({
				url: `${USERS_URL}`,
				method: 'POST',
				body: signUpInput,
			}),
			invalidatesTags: ['User'],
		}),
		deleteUser: builder.mutation({
			query: (userID: string) => ({
				url: `${USERS_URL}/${userID}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['User'],
		}),
	}),
})

//hooks
export const { useCreateUserMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserQuery } = usersApiSlice
