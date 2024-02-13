import { apiSlice } from './apiSlice'
const ROLES_URL = '/api/roles'

const rolesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllRoles: builder.query({
			query: () => ({
				url: `${ROLES_URL}`,
				method: 'GET',
			}),
			providesTags: ['Role'],
		}),
		getRoleById: builder.query({
			query: (roleID: string) => ({
				url: `${ROLES_URL}/${roleID}`,
				method: 'GET',
			}),
			providesTags: ['Role'],
		}),
		createRole: builder.mutation({
			query: ({ roleID, roleInput }: { roleID: string; roleInput: Object }) => ({
				url: `${ROLES_URL}/${roleID}`,
				method: 'POST',
				body: roleInput,
			}),
			invalidatesTags: ['Role'],
		}),
		updateRole: builder.mutation({
			query: ({ roleID, roleInput }: { roleID: string; roleInput: Object }) => ({
				url: `${ROLES_URL}/${roleID}`,
				method: 'PATCH',
				body: roleInput,
			}),
			invalidatesTags: ['Role'],
		}),
		assignRole: builder.mutation({
			query: ({ roleID, userID }: { roleID: string; userID: string }) => ({
				url: `${ROLES_URL}/assign`,
				method: 'POST',
				body: { roleID, userID },
			}),
			invalidatesTags: ['User', 'Role'],
		}),
	}),
})

export const {
	useAssignRoleMutation,
	useCreateRoleMutation,
	useUpdateRoleMutation,
	useGetAllRolesQuery,
	useGetRoleByIdQuery,
} = rolesApiSlice
