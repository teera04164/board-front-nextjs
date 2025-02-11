import { Community } from "./community.type";
import { Pagination } from "./pagination.type";
import { User } from "./user.type";

export interface PostDetail {
    id: string;
    title: string;
    content: string;
    user: User,
    community: Community,
    createdAt: Date;
    updatedAt: Date;
    commentCount: number;
}


export type PostDetailResponse = {
    post: PostDetail;
    comments: Comment[];
}

export interface PostsResponse {
    pagination: Pagination;
    posts: PostDetail[];
}
