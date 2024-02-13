import Container from '@/components/ui/container'
import UsersTable from '@/containers/UsersTable'

const Dashboard = () => {
	return (
		<Container>
			<h1 className="text-2xl font-bold p-4">User Management</h1>
			<UsersTable />
		</Container>
	)
}
export default Dashboard
