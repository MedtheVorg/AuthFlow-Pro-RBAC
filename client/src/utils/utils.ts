import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

type AccessPermission =
	| 'UPDATE_TASK'
	| 'CREATE_TASK'
	| 'DELETE_TASK'
	| 'READ_TASK'
	| 'READ_TASKS'
	| 'READ_USERS'
	| 'DELETE_USER'
	| 'READ_PERMISSIONS'
	| 'CREATE_PERMISSION'

export function hasPermission(accessPermission: AccessPermission) {
	const { userInfo } = useSelector((state: RootState) => state.auth)
	if (!userInfo) {
		return
	}

	return (
		userInfo?.role?.permissions?.findIndex(
			(permission: { _id: string; name: string }) => permission.name === accessPermission,
		) !== -1
	)
}
