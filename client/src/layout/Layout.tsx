import Header from '@/containers/Header'
import Dashboard from '@/pages/Dashboard'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import SignInPage from '@/pages/SignInPage'
import SignUpPage from '@/pages/SignUpPage'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from '@/components/theme-provider'
import PrivateRoute from '@/components/PrivateRoute'
import ProtectRoute from '@/components/ProtectRoute'

const Layout = () => {
	const appTheme = useTheme()

	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/signin" element={<ProtectRoute children={<SignInPage />} />} />
				<Route path="/signup" element={<ProtectRoute children={<SignUpPage />} />} />
				<Route path="/dashboard" element={<PrivateRoute children={<Dashboard />} />} />
				<Route path="/*" element={<NotFoundPage />} />
			</Routes>
			<ToastContainer position="bottom-center" theme={appTheme.theme} />
		</>
	)
}
export default Layout
