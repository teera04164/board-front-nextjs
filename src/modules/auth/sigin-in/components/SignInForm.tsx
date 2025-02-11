import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/utils/error-handler';
import { toast } from 'react-toastify';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/authStore';
import { ROUTE_PATH } from '@/constants/route';

export function SignInForm() {

    const [formData, setFormData] = useState<{
        username: string;
    }>({
        username: '',
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const authStore = useAuthStore();

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await authService.login(formData.username);
            if (response.user) {
                authStore.setAuth(response);
                toast.success('Login success');
                router.push(ROUTE_PATH.BORD);
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div className='h-[50vh] min-h-[50%] md:w-[60%] md:h-full md:min-h-screen'>
                <div className='w-full max-w-[384px] md:min-h-screen flex flex-col justify-center items-center mx-auto'>
                    <div className='w-full flex justify-start mb-10'>
                        <h1 className="text-3xl font-bold text-center mt-8 text-white">Sign In</h1>
                    </div>
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="username"
                            className="input input-bordered w-full mb-5"
                            disabled={isLoading}
                            onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                        />
                        <button
                            className="btn btn-primary w-full text-white"
                            onClick={onSubmit}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}