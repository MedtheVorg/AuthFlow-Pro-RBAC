import Container from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import TasksTable from '@/containers/TasksTable'

const HomePage = () => {
	return (
		<main className="p-2">
			<Container>
				<h2 className="text-3xl font-bold">Tasks</h2>
				<Separator className="my-4" />
				<TasksTable />
			</Container>
		</main>
	)
}
export default HomePage
