import { Link } from 'react-router-dom'
import Container from '../components/ui/container'
import { Button } from '../components/ui/button'
import { Moon, Sun } from 'lucide-react'
import ProfileButton from '../components/ui/ProfileButton'
import { useTheme } from '../components/theme-provider'
import MobileMenu from '../components/ui/MobileMenu'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const Header = () => {
	const { setTheme, theme } = useTheme()
	const { userInfo } = useSelector((state: RootState) => state.auth)
	return (
		<header className="sm:flex sm:justify-between py-3 px-4 border-b  w-full shadow-sm">
			<Container>
				<div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
					<div className="flex items-center justify-between">
						{/* mobile menu */}
						<MobileMenu />

						{/* logo */}
						<div className="flex items-center ml-4 lg:ml-0">
							<Link to={'/'}>
								<h1 className="text-xl font-bold">AuthFlow Pro</h1>
							</Link>
						</div>
					</div>

					{/* toggles */}
					<div className="flex items-center justify-center">
						{/* Theme toggler */}
						<Button
							variant={'ghost'}
							size={'icon'}
							aria-label="Toggle Theme"
							className="mr-6"
							onClick={() => {
								setTheme(theme === 'dark' ? 'light' : 'dark')
							}}
						>
							<Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						</Button>
						{/* profile toggler */}
						{userInfo ? (
							<ProfileButton />
						) : (
							<Button>
								<Link to={'/signin'}>Sign in</Link>
							</Button>
						)}
					</div>
				</div>
			</Container>
		</header>
	)
}
export default Header
