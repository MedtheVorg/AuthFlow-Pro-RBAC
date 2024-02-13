import { apiSlice } from './apiSlice'

const PERMISSIONS_URL = '/api/permissions'
const permissionsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllPermissions: builder.query({
			query: () => ({
				url: `${PERMISSIONS_URL}`,
				method: 'GET',
			}),
			providesTags: ['Permission'],
		}),
		createPermission: builder.mutation({
			query: (permissionInput) => ({
				url: `${PERMISSIONS_URL}`,
				method: 'POST',
				body: permissionInput,
			}),
			invalidatesTags: ['Permission'],
		}),
	}),
})

//hooks
export const { useGetAllPermissionsQuery, useCreatePermissionMutation } = permissionsApiSlice
