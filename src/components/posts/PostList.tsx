import React from 'react'
import PostCard from './PostCard'
import PostNotfound from './PostNotfound'
import { PostDetail } from '@/types/response/post.type'
import { useAuthStore } from '@/stores/authStore'
import { LoadMore } from '../common/LoadMore'
interface PostListProps {
    onEditPost: (postId: string) => void
    onDeletePost: (postId: string) => void
    posts: PostDetail[]
    isPrivatePage?: boolean
    isLoading?: boolean;
    isFetchingMore?: boolean;
    loadMoreRef?: (node?: Element | null) => void;
    hasNextPage?: boolean;
}

const PostList: React.FC<PostListProps> = ({
    onEditPost,
    onDeletePost,
    posts,
    isPrivatePage = false,
    isFetchingMore,
    loadMoreRef,
    hasNextPage,
}) => {
    const { user } = useAuthStore()
    return (
        <div className="mt-6 space-y-4">
            <article className="flex flex-col rounded-lg bg-white shadow transition-shadow hover:shadow-md">
                {posts.length === 0 ? <PostNotfound /> : null}
                {posts.map((post, idx) => (
                    <React.Fragment key={post.id}>
                        <PostCard
                            onEditPost={onEditPost}
                            onDeletePost={onDeletePost}
                            post={post}
                            isAuthor={isPrivatePage && user?.id === post.user.id}
                        />
                        {idx < posts.length - 1 && <div className="h-px bg-gray-100" />}
                    </React.Fragment>
                ))}
            </article>
            {
                (hasNextPage && isFetchingMore && loadMoreRef) && (
                    <LoadMore
                        isFetchingMore={isFetchingMore}
                        loadMoreRef={loadMoreRef}
                    />
                )
            }
        </div>
    )
}

export default PostList
