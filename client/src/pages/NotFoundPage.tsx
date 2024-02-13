import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
	return (
		<div className="h-screen  grid  text-center">
			<Container>
				<h1 className="text-8xl font-bold mt-8 mb-4">404</h1>
				<p className="text-4xl">
					You seem to be lost, Go
					<Button size={'lg'} className="text-4xl" variant={'link'}>
						<Link to={'/'}>Home.</Link>
					</Button>
				</p>
			</Container>
		</div>
	)
}
export default NotFoundPage
