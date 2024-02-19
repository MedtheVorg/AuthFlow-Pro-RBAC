import {
	useAssignRoleMutation,
	useGetAllRolesQuery,
	useGetRoleByIdQuery,
	useUpdateRoleMutation,
} from '@/redux/slices/api/rolesApiSlice'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ScrollArea } from './ui/scroll-area'
import { Permission, Role } from '@/types/types'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { RotateCcw } from 'lucide-react'
import { useGetUserQuery } from '@/redux/slices/api/usersApiSlice'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { setUserCredentials } from '@/redux/slices/authSlice'

type RolesFormProps = {
	userRole: Role
	permissionsList: Permission[] | []
	targetUserId: string
}
const RolesForm = ({ userRole, permissionsList, targetUserId }: RolesFormProps) => {
	const [selectedRoleId, setSelectedRoleId] = useState(userRole?._id)
	const [selectedPermissions, setSelectedPermissions] = useState(userRole?.permissions)
	const { userInfo } = useSelector((state: RootState) => state.auth)
	const [updateRole, { isLoading: isUpdatingRole }] = useUpdateRoleMutation()
	const { data: fetchedRoleData = { role: {} }, isLoading: roleIsLoading } = useGetRoleByIdQuery(selectedRoleId)
	const dispatch = useDispatch()
	const [assignRole, { isLoading: isAssigning }] = useAssignRoleMutation()
	const {
		data = {
			roles: [],
		},
		isLoading,
		isFetching,
	} = useGetAllRolesQuery('')
	const { data: userData = {}, refetch } = useGetUserQuery(userInfo?._id as string)

	function isPermissionChecked(searchedPermission: string) {
		return selectedPermissions?.findIndex((pr: Permission) => pr._id === searchedPermission) !== -1
	}
	function handleCheckboxChange(isChecked: boolean, permission: Permission) {
		if (isChecked) {
			setSelectedPermissions((prev) => [...prev, permission])
		} else {
			setSelectedPermissions((prev) => prev.filter((pr: Permission) => pr._id !== permission._id))
		}
	}
	async function RoleFormSubmitHandler(event: FormEvent<HTMLFormElement>) {
		try {
			event.preventDefault()

			await updateRole({ roleID: selectedRoleId, roleInput: { permissions: selectedPermissions } }).unwrap()
			await assignRole({ roleID: selectedRoleId, userID: targetUserId }).unwrap()

			if (selectedRoleId === userInfo?.role._id) {
				//refetch user data if the modified role is Admin
				refetch().then((userData) => {
					dispatch(setUserCredentials(userData.data.user))
				})
			}
			toast.success('Role updated')
		} catch (err: any) {
			toast.error(err.errMessage)
		}
	}

	useEffect(() => {
		//update selected permissions on selected role change
		// after  useGetRoleByIdQuery finishes
		setSelectedPermissions(fetchedRoleData.role.permissions)
	}, [fetchedRoleData])

	return (
		<form onSubmit={RoleFormSubmitHandler}>
			<Card>
				<CardHeader>
					<CardTitle>Role</CardTitle>
					<CardDescription>Choose a role and assign it permissions.</CardDescription>
					<Select
						disabled={
							isFetching || isLoading || roleIsLoading || isUpdatingRole || isAssigning || isAssigning
						}
						onValueChange={(selectedRoleId) => {
							setSelectedRoleId(selectedRoleId)
							setSelectedPermissions(fetchedRoleData.role.permissions)
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder={userRole?.name} />
						</SelectTrigger>
						<SelectContent>
							{data?.roles?.length > 0 &&
								data.roles.map((role: Role) => (
									<SelectItem value={role._id} key={role._id}>
										{role.name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</CardHeader>
				<CardContent className="space-y-2">
					<ScrollArea className="h-72">
						<ul>
							{permissionsList.length > 0 &&
								permissionsList.map((permission: Permission) => (
									<li key={permission._id}>
										<div className="flex items-center  gap-x-4 p-2 uppercase ">
											<Checkbox
												name={permission.name}
												id={permission.name}
												checked={isPermissionChecked(permission._id)}
												onCheckedChange={(isChecked) =>
													handleCheckboxChange(isChecked as boolean, permission)
												}
												disabled={
													isFetching ||
													isLoading ||
													roleIsLoading ||
													isUpdatingRole ||
													isAssigning
												}
											/>
											<Label htmlFor={permission.name}>{permission.name}</Label>
										</div>
										<Separator />
									</li>
								))}
						</ul>
					</ScrollArea>
				</CardContent>
				<CardFooter>
					<Button type="submit">
						{isUpdatingRole || isAssigning ? <RotateCcw className="animate-spin" /> : 'Save changes'}
					</Button>
				</CardFooter>
			</Card>
		</form>
	)
}
export default RolesForm
