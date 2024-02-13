import { useCreatePermissionMutation } from '@/redux/slices/api/permissionsApiSlice'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { Permission } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreatePermissionInput, createPermissionSchema } from '@/schemas/permission.schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { RotateCcw } from 'lucide-react'
import { toast } from 'react-toastify'

type PermissionsFormProps = {
	permissionsList: Permission[] | []
}
const PermissionsForm = ({ permissionsList }: PermissionsFormProps) => {
	const formHandler = useForm<CreatePermissionInput>({
		resolver: zodResolver(createPermissionSchema),
		defaultValues: { name: '' },
	})
	const [createPermission, { isLoading }] = useCreatePermissionMutation()

	async function onFormSubmit(values: CreatePermissionInput) {
		try {
			await createPermission(values).unwrap()
			formHandler.reset()
			toast.success('Permission Created')
		} catch (err: any) {
			if (err?.data?.success == false) {
				formHandler.setError('name', { message: err.data.errMessage }, { shouldFocus: true })
			}
		}
	}
	return (
		<Form {...formHandler}>
			<form onSubmit={formHandler.handleSubmit(onFormSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>Add Permission</CardTitle>
						<CardDescription>add your own permission </CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<FormField
							name="name"
							control={formHandler.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Permission</FormLabel>
									<FormControl>
										<Input placeholder="permission..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button type="submit">{isLoading ? <RotateCcw className="animate-spin" /> : 'Add'}</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	)
}
export default PermissionsForm
