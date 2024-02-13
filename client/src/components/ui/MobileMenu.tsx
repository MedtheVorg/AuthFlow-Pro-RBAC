const routes = [
	{
		href: '/',
		label: 'Home',
	},
]
import { Menu } from 'lucide-react'
import { Button } from './button'
import { Link } from 'react-router-dom'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './sheet'

const MobileMenu = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu className="h-6 w-6 md:hidden" />
			</SheetTrigger>
			<SheetContent className="w-[300px] sm:w-[400px] p-8" side={'left'}>
				<nav className="flex flex-col gap-4">
					{routes.map((route, i) => (
						<Button asChild variant={'ghost'} key={i}>
							<Link to={route.href} className="text-sm font-medium transition-colors">
								<SheetClose className="w-full">{route.label}</SheetClose>
							</Link>
						</Button>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	)
}
export default MobileMenu
