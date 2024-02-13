import { cn } from '@/lib/utils'

interface ContainerProps {
	children: React.ReactNode
	maxW?: string
}

const Container = ({ children, maxW = 'max-w-6xl' }: ContainerProps) => {
	return <div className={cn('mx-auto w-full', maxW)}>{children}</div>
}
export default Container
