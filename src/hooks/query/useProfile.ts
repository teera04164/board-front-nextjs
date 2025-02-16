import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { QUERY_KEYS } from '@/constants/queryKey';

export const useProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: () => authService.getProfile(),
    retry: false,
  });
};
