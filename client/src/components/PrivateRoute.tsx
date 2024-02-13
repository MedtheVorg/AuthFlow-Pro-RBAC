import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
	children: React.ReactNode
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
	// check if user is an admin
	const { userInfo } = useSelector((state: RootState) => state.auth)

	return <>{userInfo?.role?.name === 'Admin' ? children : <Navigate to={'/'} />}</>
}
export default PrivateRoute
