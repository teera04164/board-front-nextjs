import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { SignInFormData } from '../types';
import { signInSchema, SignInSchema } from './schemas';

export function SignInForm() {
    const [formData, setFormData] = useState<SignInFormData>({
        username: '',
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: SignInSchema) => {
     
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="h-[50vh] min-h-[50%] md:w-[60%] md:h-full md:min-h-screen">
            <div className="w-full max-w-[384px] md:min-h-screen flex flex-col justify-center items-center mx-auto p-4">
                <div className="w-full flex justify-start mb-10">
                    <h1 className="text-3xl font-bold text-center mt-8 text-white">
                        Sign In
                    </h1>
                </div>

                <form onSubmit={onSubmit} className="w-full space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="input input-bordered w-full"
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}