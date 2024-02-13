import CustomDataTable from '@/components/CustomDataTable'
import { columns } from '@/components/tasks/TasksTableColumns'
import { useGetTasksQuery } from '@/redux/slices/api/tasksApiSlice'

const TasksTable = () => {
	const { data = { tasks: [] }, isFetching, isLoading } = useGetTasksQuery(null, {})

	return <CustomDataTable data={data.tasks} columns={columns} isTaskTable={true} status={{ isFetching, isLoading }} />
}
export default TasksTable
