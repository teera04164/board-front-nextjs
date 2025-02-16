import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/auth.service";
import { ROUTE_PATH } from "@/constants/route";
import { QUERY_KEYS } from "@/constants/queryKey";

interface IUseCheckAuth {
  isRedirect?: boolean;
  redirectPath?: string;
}

export const useCheckAuth = (props?: IUseCheckAuth) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { accessToken, logout } = useAuthStore();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.AUTH_USER],
    queryFn: () => authService.getProfile(),
    retry: false,
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isError && props?.isRedirect) {
      logout();
      queryClient.clear();
      router.push(props?.redirectPath || ROUTE_PATH.LOGIN);
    }
  }, [isError, logout, queryClient, router, props]);

  const handleLogout = async () => {
    // TODO: Implement logout API
    // if (refreshToken) {
    //   await authApi.logout(refreshToken)
    // }

    logout();
    queryClient.clear();
    router.push(props?.redirectPath || ROUTE_PATH.LOGIN);
  };

  return {
    user,
    logout: handleLogout,
    isLoading,
    isAuthenticated: !!user,
  };
};
