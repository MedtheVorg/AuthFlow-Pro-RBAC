import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CalendarIcon, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTaskMutation } from '@/redux/slices/api/tasksApiSlice'
import { CreateTaskInput, createTaskSchema } from '@/schemas/task.Schema'
import { useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import { RootState } from '@/redux/store'

const AddTaskForm = () => {
	const { userInfo } = useSelector((state: RootState) => state.auth)
	const formHandler = useForm<CreateTaskInput>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			author: userInfo!._id,
			priority: 'Normal',
			status: 'To Do',
			title: '',
			description: '',
			deadline: new Date(),
		},
	})
	const [createTask, { isLoading }] = useCreateTaskMutation()

	async function onFormSubmit(values: CreateTaskInput) {
		try {
			await createTask(values).unwrap()
			toast.success('Task created.')
			formHandler.reset()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<Form {...formHandler}>
			<form onSubmit={formHandler.handleSubmit(onFormSubmit)} className="space-y-2 px-2">
				<FormField
					name="title"
					control={formHandler.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="title..." {...field} disabled={isLoading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="description"
					control={formHandler.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder="write a brief description..." {...field} disabled={isLoading} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="priority"
					control={formHandler.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Priority</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
									<SelectTrigger className="">
										<SelectValue placeholder="Normal" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Low">Low</SelectItem>
										<SelectItem value="Normal">Normal</SelectItem>
										<SelectItem value="Urgent">Urgent</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="status"
					control={formHandler.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
									<SelectTrigger>
										<SelectValue placeholder="To Do" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="To Do">To Do</SelectItem>
										<SelectItem value="In Progress">in Progress</SelectItem>
										<SelectItem value="Completed">Completed</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="deadline"
					control={formHandler.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Deadline</FormLabel>
							<div>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-[280px] justify-start text-left font-normal',
													!field.value && 'text-muted-foreground',
												)}
												disabled={isLoading}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
											</Button>
										</FormControl>
									</PopoverTrigger>

									<PopoverContent className="w-auto p-0">
										<Calendar
											mode="single"
											initialFocus
											selected={field.value}
											onSelect={field.onChange}
										/>
									</PopoverContent>
								</Popover>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? <RotateCcw className="animate-spin" /> : 'Submit'}
				</Button>
			</form>
		</Form>
	)
}
export default AddTaskForm
