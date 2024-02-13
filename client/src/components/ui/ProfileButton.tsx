import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { clearUserCredentials } from '@/redux/slices/authSlice'
import { useLogoutMutation } from '@/redux/slices/api/authApiSlice'

const ProfileButton = () => {
	// placeholder for testing
	const { userInfo } = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch()
	const [logout] = useLogoutMutation()
	const navigate = useNavigate()
	async function logOutHandler() {
		try {
			await logout(null).unwrap()
			dispatch(clearUserCredentials({}))
			navigate('/')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src="/img/shadcn.jpg" />
					<AvatarFallback>{userInfo.username}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{/* //TODO: Add a Profile page */}
				<DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
				{userInfo?.role?.name?.toLowerCase() == 'admin' && (
					<Link to={'/dashboard'}>
						<DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
					</Link>
				)}
				<DropdownMenuSeparator />
				{/* //TODO: implement log out logic */}
				<DropdownMenuItem className="cursor-pointer" onClick={logOutHandler}>
					Log Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ProfileButton
