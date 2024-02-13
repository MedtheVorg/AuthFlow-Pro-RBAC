import { apiSlice } from './apiSlice'
import { SignInInput } from '@/schemas/signIn.schema'

const AUTHENTICATION_URL = '/api/auth'

//this will append users endpoint to the parent apiSlice endpoints
//in what is known as 'Dependency Injection'
export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (signInData: SignInInput) => ({
				url: `${AUTHENTICATION_URL}/login`,
				method: 'POST',
				body: signInData,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${AUTHENTICATION_URL}/logout`,
				method: 'POST',
			}),
		}),
	}),
})

//convention use + <query/mutation> name + Mutation/query
export const { useLoginMutation, useLogoutMutation } = authApiSlice
