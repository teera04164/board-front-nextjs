import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/utils/error-handler';
import { ERROR_CODES } from '@/constants/error';
import { useRouter } from 'next/navigation';
import { ROUTE_PATH } from '@/constants/route';

export const useErrorHandler = () => {
    const router = useRouter();

    const handleError = useCallback((error: unknown, isRedirect?: boolean) => {
        const errorResult = getErrorMessage(error);

        toast.error(errorResult.message);

        if (errorResult.code === ERROR_CODES.UNAUTHORIZED && isRedirect) {
            router.push(ROUTE_PATH.LOGIN);
        }

        return errorResult;
    }, [router]);

    return { handleError };
};