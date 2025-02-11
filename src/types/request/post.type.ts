export interface PostSearchRequest {
    page?: number;
    limit?: number;
    search: string;
    communityId: string;
}

export interface PostRequest {
    title: string;
    content: string;
    communityId: string;
}

export interface UpdatePostRequest extends PostRequest {
    id: string;
}