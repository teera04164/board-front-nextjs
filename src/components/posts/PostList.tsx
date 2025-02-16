import React from 'react'
import PostCard from './PostCard';
import PostNotfound from './PostNotfound';
import { PostDetail } from '@/types/response/post.type';
import { useAuthStore } from '@/stores/authStore';
interface PostListProps {
    onEditPost: (postId: string) => void;
    onDeletePost: (postId: string) => void;
    posts: PostDetail[];
    isPrivatePage?: boolean;
}

const PostList: React.FC<PostListProps> = ({
    onEditPost,
    onDeletePost,
    posts,
    isPrivatePage = false
}) => {
    const { user } = useAuthStore()
    return (
        <div className="space-y-4 mt-6">
            <article className="bg-white rounded-lg shadow hover:shadow-md transition-shadow flex flex-col">
                {
                    posts.length === 0 ? (<PostNotfound />) : null
                }
                {posts.map((post, idx) => (
                    <React.Fragment key={post.id}>
                        <PostCard
                            onEditPost={onEditPost}
                            onDeletePost={onDeletePost}
                            post={post}
                            isAuthor={isPrivatePage && (user?.id === post.user.id)}
                        />
                        {idx < posts.length - 1 && <div className='h-px bg-gray-100' />}
                    </React.Fragment>
                ))}
            </article>
        </div>
    )
}

export default PostList