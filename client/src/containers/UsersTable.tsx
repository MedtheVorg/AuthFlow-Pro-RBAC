import CustomDataTable from '@/components/CustomDataTable'
import { columns } from '@/components/users/UsersTableColumns'
import { useGetUsersQuery } from '@/redux/slices/api/usersApiSlice'
import { useEffect } from 'react'

const UsersTable = () => {
	const { data = { users: [] }, isFetching, isLoading } = useGetUsersQuery('')

	return <CustomDataTable status={{ isFetching, isLoading }} data={data.users} columns={columns} />
}
export default UsersTable
