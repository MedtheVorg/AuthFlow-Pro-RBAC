import { Button } from '@/components/ui/button'
import Container from '@/components/ui/container'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useCreateUserMutation } from '@/redux/slices/api/usersApiSlice'
import { signUpSchema } from '@/schemas'
import { SignUpInput } from '@/schemas/signup.schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

const SignUpPage = () => {
	const [createUser, { isLoading, isSuccess, isError }] = useCreateUserMutation()
	const navigate = useNavigate()
	const signUpForm = useForm<SignUpInput>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	})

	async function onSubmit(signUpInput: SignUpInput) {
		try {
			await createUser(signUpInput).unwrap()
			toast.success('User Created')
			navigate('/signin')
		} catch (err: any) {
			toast.error(err.message)
		}
	}
	return (
		<div>
			<Container maxW="max-w-2xl">
				<Form {...signUpForm}>
					<form
						onSubmit={signUpForm.handleSubmit(onSubmit)}
						className="mx-8 md:mx-0 space-y-8 mt-8 shadow-lg p-8 border rounded-md"
					>
						<h1 className="text-5xl text-center font-bold">Sign Up</h1>
						<FormDescription className="text-center">
							Fill in the form below to create a new account.
						</FormDescription>
						<FormField
							control={signUpForm.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="username" {...field} type="text" disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={signUpForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="email" {...field} type="email" disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={signUpForm.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="password" {...field} type="password" disabled={isLoading} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className=" w-full">
							Submit
						</Button>
						<Separator />
						<Link to={'/signin'}>
							<Button className="w-full" type="button" variant={'link'} disabled={isLoading}>
								Already have an account ? Sign in !
							</Button>
						</Link>
					</form>
				</Form>
			</Container>
		</div>
	)
}
export default SignUpPage
