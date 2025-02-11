import Image from 'next/image';
import type { Comment } from '../types';
import { useCommentsQuery } from '@/hooks/query/useComments';
import React from 'react';
import { CommentWithUser } from '@/types/response/comment.type';
import AvatarImage from '@/components/common/image/AvatarImage';

type ICommentList = {
  postId: string;
};

export const CommentList: React.FC<ICommentList> = ({
  postId,
}) => {

  const {
    data: respComments,
    isLoading,
    isError,
    error,
  } = useCommentsQuery(postId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );

  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error.message}</div>
      </div>
    );
  }

  if (!respComments?.comments) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">No comments found</div>
      </div>
    );
  }




  return (
    <div className="mt-8 space-y-6">
      {Array.isArray(respComments.comments) && respComments.comments.map((comment: CommentWithUser) => (
        <div key={comment.id} className="flex items-start space-x-4">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <AvatarImage
                src={comment.user.image}
                alt={comment.user.fullName}
                size={40}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-sm">{comment.user.fullName}</p>
              <p className="text-gray-300 text-xs">{comment.createdAt}</p>
            </div>
            <p className="mt-2 text-gray-500 text-xs">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}