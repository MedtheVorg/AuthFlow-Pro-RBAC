import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SignInInput, signInSchema } from '@/schemas/signIn.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '@/redux/slices/api/authApiSlice'
import { setUserCredentials } from '@/redux/slices/authSlice'
import { RootState } from '@/redux/store'
import { useEffect } from 'react'
import { RotateCcw } from 'lucide-react'
import { toast } from 'react-toastify'

const SignInPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [login, { isLoading }] = useLoginMutation()
	const { userInfo } = useSelector((state: RootState) => state.auth)
	const signInForm = useForm<SignInInput>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	useEffect(() => {
		//navigate to home page if the user logged in successfully
		if (userInfo) {
			navigate('/')
		}
	}, [userInfo])

	async function onSubmit(values: SignInInput) {
		// sign in user
		try {
			const res = await login(values).unwrap()
			dispatch(setUserCredentials(res.userInfo))
		} catch (error: any) {
			toast.error(error.data.errMessage)
		}
	}

	return (
		<div>
			<Container maxW="max-w-2xl">
				<Form {...signInForm}>
					<form
						onSubmit={signInForm.handleSubmit(onSubmit)}
						className="mx-8 md:mx-0  space-y-8 mt-8 shadow-lg p-8 border rounded-md"
					>
						<h1 className="text-5xl text-center font-bold">Sign In</h1>
						<FormDescription className="text-center">Fill in the form below to Sign In</FormDescription>
						<FormField
							control={signInForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="email" type="email" {...field} disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={signInForm.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="password" type="password" {...field} disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? <RotateCcw className="animate-spin" /> : 'Submit'}
						</Button>
						<Separator />
						<Link to={'/signup'}>
							<Button className="w-full" type="button" variant={'link'} disabled={isLoading}>
								No account ? create one !
							</Button>
						</Link>
					</form>
				</Form>
			</Container>
		</div>
	)
}
export default SignInPage
