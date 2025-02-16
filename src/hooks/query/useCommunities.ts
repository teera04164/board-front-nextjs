import { useQuery } from '@tanstack/react-query'
import { communityService } from '@/services/community.service'
import { QUERY_KEYS } from '@/constants/queryKey'

export const useCommunitiesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMMUNITIES],
    queryFn: () => communityService.getCommunities(),
  })
}
