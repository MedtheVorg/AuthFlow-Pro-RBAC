import { Role, User } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { ArrowUpDown, Bolt, UserX } from 'lucide-react'
import { Separator } from '../ui/separator'
import Modal from '../Modal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import RolesForm from '../RolesForm'
import PermissionsForm from '../PermissionsForm'
import { useGetAllPermissionsQuery } from '@/redux/slices/api/permissionsApiSlice'
import DeleteUserForm from '../DeleteUserForm'

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'username',
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				Username
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
	},
	{
		accessorKey: 'role',
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
				Role
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ getValue }) => {
			const role = getValue<Role>()
			return role?.name
		},
	},
	{
		accessorKey: 'Actions',
		header: 'Actions',
		cell: ({ row }) => {
			const user = row.original
			const { data = { permissions: [] } } = useGetAllPermissionsQuery('')
			return (
				<div className="flex justify-around">
					{/* Modify Role */}
					<Modal
						dialogTrigger={
							<Button variant={'secondary'} className="">
								<Bolt className="mr-2" />
								Modify Role
							</Button>
						}
						children={
							<Tabs defaultValue="Roles">
								<TabsList className="grid w-full grid-cols-2">
									<TabsTrigger value="Roles">Roles</TabsTrigger>
									<TabsTrigger value="Permissions">Permissions</TabsTrigger>
								</TabsList>
								<TabsContent value="Roles">
									{/* Roles Form */}
									<RolesForm
										userRole={user?.role}
										targetUserId={user?._id}
										permissionsList={data.permissions}
									/>
								</TabsContent>
								<TabsContent value="Permissions">
									{/* Permissions Form */}
									<PermissionsForm permissionsList={data.permissions} />
								</TabsContent>
							</Tabs>
						}
					></Modal>
					<Separator orientation="vertical" className="mx-6" />
					{/* Delete User */}
					<Modal
						title="Delete User"
						dialogTrigger={
							<Button variant={'destructive'}>
								<UserX className="mr-2" />
								Remove User
							</Button>
						}
						description="Are you sure you want to proceed? this action is permanent and can not be reversed !"
						children={<DeleteUserForm userID={user._id} />}
					></Modal>
				</div>
			)
		},
	},
]
