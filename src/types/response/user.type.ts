
export interface User {
    id: string;
    username: string;
    fullName: string;
    image?: string;
    lastLogin: string;
}

export interface UserProfileResponse extends User {}