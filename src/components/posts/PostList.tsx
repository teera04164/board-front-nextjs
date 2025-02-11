import React, { useEffect, useMemo, useState } from 'react'
import PostCard from './PostCard';
import { usePostsQuery } from '@/hooks/query/usePosts';
import { useDebounce } from '@/hooks/useDebounce';
import PostNotfound from './PostNotfound';
import { PostsResponse } from '@/types/response/post.type';
import { ISearchState } from '@/hooks/usePostManagement';
import { useAuthStore } from '@/stores/authStore';

export type Post = {
    id: string;
    author: {
        id: string;
        name: string;
        avatar: string;
    };
    category: string;
    title: string;
    excerpt: string;
    commentCount: number;
};


interface PostListProps {
    onEditPost: (postId: string) => void;
    onDeletePost: (postId: string) => void;
    searchState: ISearchState
}

const PostList: React.FC<PostListProps> = ({
    onEditPost,
    onDeletePost,
    searchState,
}) => {
    const { user } = useAuthStore()
    const debouncedSearchText = useDebounce(searchState.searchText, 300);
    const { data: postResp } = usePostsQuery({
        page: 1,
        limit: 99999,
        search: debouncedSearchText,
        communityId: searchState.communityId,
    })

    const preparePostList = (postRest: Pick<PostsResponse, 'posts'>): Post[] => {
        const posts = postRest.posts.map(post => {
            return {
                id: post.id,
                author: {
                    id: post.user.id,
                    name: post.user.fullName,
                    avatar: post.user.image || '/default/avatar/path'
                },
                category: post.community.name,
                title: post.title,
                excerpt: post.content,
                commentCount: post.commentCount,
            }
        })
        return posts
    }

    const posts = useMemo(() =>
        postResp ? preparePostList(postResp) : [],
        [postResp]
    );

    return (
        <div className="space-y-4 mt-6">
            <article className="bg-white rounded-lg shadow hover:shadow-md transition-shadow flex flex-col pb-10">
                {
                    posts.length === 0 ? (<PostNotfound />) : null
                }
                {posts.map((post, idx) => (
                    <React.Fragment key={post.id}>
                        <PostCard
                            onEditPost={onEditPost}
                            onDeletePost={onDeletePost}
                            post={post}
                            isAuthor={user?.id === post.author.id}
                        />
                        {idx < posts.length - 1 && <div className='h-px bg-gray-100' />}
                    </React.Fragment>
                ))}
            </article>
        </div>
    )
}

export default PostList