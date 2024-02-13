import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

type ProtectRouteProps = {
	children: React.ReactNode
}

const ProtectRoute = ({ children }: ProtectRouteProps) => {
	// check if user is an admin
	const { userInfo } = useSelector((state: RootState) => state.auth)

	return <>{userInfo == null ? children : <Navigate to={'/'} />}</>
}
export default ProtectRoute
