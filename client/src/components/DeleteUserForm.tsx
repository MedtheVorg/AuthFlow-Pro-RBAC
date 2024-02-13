import { useDeleteUserMutation } from '@/redux/slices/api/usersApiSlice'
import { Button } from './ui/button'
import { DialogClose } from './ui/dialog'
import { toast } from 'react-toastify'
import { FormEvent } from 'react'

const DeleteUserForm = ({ userID }: { userID: string }) => {
	const [deleteUser, { isError, isLoading }] = useDeleteUserMutation()

	async function deleteUserFormHandler(event: FormEvent<HTMLFormElement>) {
		try {
			event.preventDefault()
			await deleteUser(userID)
			toast.success('User Deleted')
		} catch (err: any) {
			toast.error(err.message)
		}
	}
	return (
		<form onSubmit={deleteUserFormHandler}>
			<Button variant={'destructive'} type="submit" disabled={isLoading}>
				Delete
			</Button>

			<DialogClose asChild>
				<Button variant={'outline'} disabled={isLoading}>
					Close
				</Button>
			</DialogClose>
		</form>
	)
}
export default DeleteUserForm
