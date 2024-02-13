import { Task } from '@/types/types'

type TaskDetailsProps = {
	data: Task
}
const TaskDetails = ({ data }: TaskDetailsProps) => {
	return <div>{JSON.stringify(data)}</div>
}
export default TaskDetails
