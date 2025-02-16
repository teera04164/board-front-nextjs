import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getErrorMessage } from '@/utils/error-handler'
import { toast } from 'react-toastify'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/authStore'
import { ROUTE_PATH } from '@/constants/route'
import { Button } from '@/components/common/button/Button'
import { TextInput } from '@/components/common/input/TextInput'
import { signInSchema } from '@/constants/schemas'

type SignInFormData = z.infer<typeof signInSchema>

export const SignInForm: React.FC = () => {
  const router = useRouter()
  const authStore = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await authService.login(data.username)
      if (response.user) {
        authStore.setAuth(response)
        toast.success('Login success')
        router.push(ROUTE_PATH.BORD)
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage.message)
    }
  }

  return (
    <div className="h-[50vh] min-h-[50%] md:h-full md:min-h-screen md:w-[60%]">
      <div className="mx-auto flex w-full max-w-[384px] flex-col items-center justify-center md:min-h-screen">
        <div className="mb-10 flex w-full justify-start">
          <h1 className="mt-8 text-center text-3xl font-bold text-white">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <TextInput
            type="text"
            placeholder="username"
            containerClassName="mb-5"
            disabled={isSubmitting}
            register={register('username')}
            errorMsg={errors.username?.message}
          />
          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  )
}
