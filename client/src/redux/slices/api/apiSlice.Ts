// this file serves as the Parent slice for all the slices that handle async calls
// this slice will handle async calls to the server :
//it uses RTQ Query under the hood
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	// equivalent to fetch api
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4500', credentials: 'include' }),
	//labels to
	tagTypes: ['User', 'Role', 'Task', 'Permission'],
	//Endpoints are just a set of operations that you want to perform against your server.
	// You define them as an object using the builder syntax.
	// There are two basic endpoint types: query and mutation.
	//query for fetching data GET
	// mutation for  mutating Data POST, PATCH, PUT
	endpoints: (builder) => ({}),
})
