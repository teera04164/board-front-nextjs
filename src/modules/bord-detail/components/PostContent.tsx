import Image from 'next/image';
import AvatarImage from '@/components/common/image/AvatarImage';
import { fromNow } from '@/utils/date';
import { PostDetail } from '@/types/response/post.type';

interface PostContentProps {
  onBack: () => void;
  post: PostDetail;
}

export function PostContent({ onBack, post }: PostContentProps) {
    return (
        <section>
            <button
                onClick={onBack}
                className="h-11 w-11 rounded-full bg-green-100 flex justify-center items-center btn pl-0 pr-0 border-none shadow-none"
                aria-label="Go back"
            >
                <Image
                    src="/icons/arrow-left.svg"
                    alt="Back"
                    priority
                    height={24}
                    width={24}
                />
            </button>

            <div className="mt-10">
                <div className="flex items-center gap-3">
                    <figure className="avatar online">
                        <div className="w-12 h-12 rounded-full">
                            <AvatarImage
                                src={post.user.image}
                                alt={post.user.fullName}
                                size={100}
                            />
                        </div>
                    </figure>
                    <div className="flex gap-2 items-center">
                        <span className="text-center text-sm text-gray-500">{post.user.fullName}</span>
                        <span className="text-center text-xs text-gray-400">{fromNow(post.user.lastLogin)}</span>
                    </div>
                </div>
                <div className="badge bg-[#F3F3F3] text-[#4A4A4A] text-xs mt-4 border-none">
                    {post.community.name}
                </div>
            </div>

            <article className="mt-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    {post.title}
                </h1>
                <p className="text-gray-500 mt-2 text-xs">
                    {post.content}
                </p>
            </article>
            <div className="mt-6 flex items-center gap-1">
                <Image
                    src="/icons/comment.svg"
                    alt="Comments"
                    className="py-1"
                    width={16}
                    height={16}
                />
                <span className="text-gray-300 text-[12px]">{post.commentCount} Comments</span>
            </div>
        </section>
    );
}
