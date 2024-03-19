import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SignUpValidation } from '@/lib/validation'
import Loader from '@/components/shared/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import {
 useCreateUserAccount,
 useSignInAccount,
} from '@/lib/react-query/queryAndMutation'
import { useUserContext } from '@/Context/AuthContext'

const SignUpForm = () => {
 const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

 const { toast } = useToast()

 const navigate = useNavigate()

 const form = useForm<z.infer<typeof SignUpValidation>>({
  resolver: zodResolver(SignUpValidation),
  defaultValues: {
   name: '',
   username: '',
   email: '',
   password: '',
  },
 })

 // Queries
 const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
  useCreateUserAccount()
 //  const { mutateAsync: signInAccount, isPending: isSignInAccount } =
 //   useSignInAccount()

 // Handler
 async function onSubmit(user: z.infer<typeof SignUpValidation>) {
  try {
   const newUser = await createUserAccount(user)

   if (!newUser) {
    toast({ title: 'Sign up failed. Please try again.' })

    return
   }

   //    const session = await signInAccount({
   //     email: user.email,
   //     password: user.password,
   //    })

   //    if (!session) {
   //     toast({ title: 'Something went wrong. Please login your new account' })

   //     navigate('/sign-in')

   //     return
   //    }

   const isLoggedIn = await checkAuthUser()

   if (isLoggedIn) {
    form.reset()
    navigate('/')
   } else {
    return toast({ title: 'SignUp failed' })
   }
  } catch (error) {
   console.log(error)
  }
 }
 return (
  <Form {...form}>
   <div className="sm:w-420 flex-center flex-col">
    <img src="/assets/images/logo.svg" alt="logo" />

    <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create an account</h2>
    <p className="text-light-3 small-medium md:base-regular">
     To use span enter details
    </p>

    <form
     onSubmit={form.handleSubmit(onSubmit)}
     className="space-y-8 flex flex-col gap-5 w-full"
    >
     <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
       <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
         <Input type="text" className="shad-input" {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />

     <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
       <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
         <Input type="text" className="shad-input" {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />

     <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
       <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
         <Input type="text" className="shad-input" {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
       <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
         <Input type="password" className="shad-input" {...field} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <Button type="submit" className="shad-button_primary">
      {isCreatingUser ? (
       <div className="flex-center gap-2 ">
        <Loader />
       </div>
      ) : (
       'SignUp'
      )}
     </Button>

     <p className="text-small-regular text-light-2 text-center mt-2 ">
      Already have an account?
      <Link
       to={'/sign-in'}
       className="text-samll-semibold ml-1 text-primary-500 "
      >
       Log in
      </Link>
     </p>
    </form>
   </div>
  </Form>
 )
}

export default SignUpForm
