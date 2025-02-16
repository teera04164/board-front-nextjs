import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import AvatarImage from "../common/image/AvatarImage";
import { PostDetail } from "@/types/response/post.type";

interface PostCardProps {
    onEditPost: (postId: string) => void;
    onDeletePost: (postId: string) => void;
    post: PostDetail;
    isAuthor: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onEditPost, onDeletePost, isAuthor }) => {
    const router = useRouter();
    return (
        <div className="p-5 relative">
            <div className="flex flex-col">
                <div className="">
                    <div className="flex items-center space-x-2">
                        <AvatarImage src={post.user.image} alt={post.user.fullName} size={32} />
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-300">{post.user.fullName}</span>
                        </div>
                    </div>
                    <div className="badge bg-[#F3F3F3] text-[#4A4A4A] text-xs mt-4">{post.community.name}</div>
                </div>
                <div className="flex-1">
                    <h2 onClick={() => router.push(`/bord/${post.id}`)} className="font-semibold mt-2 cursor-pointer">{post.title}</h2>
                    <p className="text-gray-600 mt-1 line-clamp-2">{post.content}</p>
                    <div className="flex items-center mt-2 text-gray-500">
                        <span className="text-sm flex items-center gap-1">
                            <Image src="/icons/comment.svg" alt="Comment Icon" className="py-1" width={16} height={16} />
                            <span className="text-xs">
                                {post.commentCount} Comments
                            </span>
                        </span>
                    </div>
                </div>

            </div>
            {
                isAuthor && (<div className="absolute top-5 right-5">
                    <div className="flex gap-4">
                        <button className="flex items-center gap-1 text-gray-500" onClick={() => onEditPost(post.id)}>
                            <RiEditLine size={20} />
                        </button>
                        <button className="flex items-center gap-1 text-gray-500" onClick={() => onDeletePost(post.id)}>
                            <FaRegTrashAlt size={16} />
                        </button>
                    </div>
                </div>)
            }

        </div>
    )
}

export default PostCard;