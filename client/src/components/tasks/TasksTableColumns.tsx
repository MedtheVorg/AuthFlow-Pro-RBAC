// Note: Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Author, Task } from '@/types/types'
import { DialogClose } from '../ui/dialog'
import Modal from '../Modal'
import TaskDetails from '../TaskDetails'
import { hasPermission } from '@/utils/utils'
import UpdateTaskForm from '../UpdateTaskForm'
import { useDeleteTaskMutation } from '@/redux/slices/api/tasksApiSlice'
import { toast } from 'react-toastify'

export const columns: ColumnDef<Task>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Title
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'author',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Author
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ getValue }) => {
			const author = getValue<Author>()
			return author?.username
		},
	},
	{
		accessorKey: 'priority',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Priority
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},
	{
		accessorKey: 'deadline',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Deadline
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
	},

	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => {
			const task = row.original
			const author = row.getAllCells()[1].getValue<Author>()
			const [deleteTask, { isLoading }] = useDeleteTaskMutation()
			async function deleteTaskHandler() {
				try {
					await deleteTask(task._id)
					toast.success('Task Deleted.')
				} catch (err: any) {
					toast.error(err.message)
				}
			}
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							disabled
							onClick={() => navigator.clipboard.writeText(task._id)}
							className="cursor-pointer"
						>
							Copy task ID
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						{/* Task details Modal */}
						{hasPermission('READ_TASK') && (
							<Modal
								dialogTrigger={
									<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Details</DropdownMenuItem>
								}
								children={<TaskDetails data={task} />}
							/>
						)}
						<DropdownMenuSeparator />

						{/* Update task Modal */}
						{hasPermission('UPDATE_TASK') && (
							<Modal
								dialogTrigger={
									<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Update</DropdownMenuItem>
								}
								title="Update Task "
								children={
									<UpdateTaskForm
										defaultValues={{
											author: author?._id,
											priority: task.priority,
											status: task.status,
											title: task.title,
											description: task.description,
											deadline: new Date(task.deadline),
										}}
										taskID={task._id}
									/>
								}
							/>
						)}
						<DropdownMenuSeparator />

						{/* Delete task  Modal*/}
						{hasPermission('DELETE_TASK') && (
							<Modal
								dialogTrigger={
									<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
										<span className="text-red-500">Delete</span>
									</DropdownMenuItem>
								}
								title="Delete Task"
								description="Are you sure you want to proceed? this action is permanent and can not be reversed !"
								footerContent={
									<>
										<DialogClose asChild>
											<Button
												variant={'destructive'}
												onClick={deleteTaskHandler}
												disabled={isLoading}
											>
												Delete
											</Button>
										</DialogClose>
										<DialogClose asChild>
											<Button variant={'outline'}>Close</Button>
										</DialogClose>
									</>
								}
							/>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
