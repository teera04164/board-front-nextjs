import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/authStore';

export const useAuthCheck = () => {
  const { accessToken } = useAuthStore()
  const { data: user, isLoading } = useQuery({
    queryKey: ['auth-check'],
    queryFn: () => authService.getProfile(),
    enabled: !!accessToken,
    retry: false,
  });

  return {
    isAuthenticated: !!user,
    isLoading,
    user
  };
};