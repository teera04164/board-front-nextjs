import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { communityService } from '@/services/community.service';

export const useCommunitiesQuery = () => {
  return useQuery({
    queryKey: ['communities'],
    queryFn: () => communityService.getCommunities(),
  });
};
