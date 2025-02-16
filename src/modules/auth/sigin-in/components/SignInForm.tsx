import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getErrorMessage } from '@/utils/error-handler'
import { toast } from 'react-toastify'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/authStore'
import { ROUTE_PATH } from '@/constants/route'
import { Button } from '@/components/common/button/Button'

export const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<{
    username: string
  }>({
    username: '',
  })

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const authStore = useAuthStore()

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await authService.login(formData.username)
      if (response.user) {
        authStore.setAuth(response)
        toast.success('Login success')
        router.push(ROUTE_PATH.BORD)
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      toast.error(errorMessage.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="h-[50vh] min-h-[50%] md:h-full md:min-h-screen md:w-[60%]">
        <div className="mx-auto flex w-full max-w-[384px] flex-col items-center justify-center md:min-h-screen">
          <div className="mb-10 flex w-full justify-start">
            <h1 className="mt-8 text-center text-3xl font-bold text-white">Sign In</h1>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="username"
              className="input input-bordered mb-5 w-full"
              disabled={isLoading}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  username: event.target.value,
                })
              }
            />
            <Button onClick={onSubmit} className="w-full">
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
