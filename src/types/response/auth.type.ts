import { UserProfileResponse } from './user.type';

export interface AuthResponse {
  user: UserProfileResponse;
  accessToken: string;
}
