"use client";
import Image from "next/image";
import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { CommentSection } from "./components/CommentSection";
import { PostContent } from "./components/PostContent";
import { AddCommentModal } from "./components/AddCommentModal";
import { CommentList } from "./components/CommentList";
import { usePostQuery } from "@/hooks/query/usePosts";
import PostNotfound from "@/components/posts/PostNotfound";
import { useAddCommentMutation } from "@/hooks/query/useComments";
import { toast } from "react-toastify";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface IBordDetailPage {
    id: string;
}

const BordDetailPage: React.FC<IBordDetailPage> = ({ id }) => {

    const mdUp = useBreakpoint('md');

    const {
        data: post,
        isLoading,
        isError,
        error,
    } = usePostQuery(id);

    const {
        mutate: addComment,
        isPending: isAddCommentLoading,
        isError: isAddCommentError,
        error: addCommentError,

    } = useAddCommentMutation();

    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();
    const [commentText, setCommentText] = useState('');
    const [showAddCommentInput, setShowAddCommentInput] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    // if (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    //         </div>
    //     );
    // }

    // if (isError) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <div className="text-red-500">{error.message}</div>
    //         </div>
    //     );
    // }

    const onClickAddComment = async () => {
        try {
            if (commentText.trim().length > 0) {
                await addComment({ postId: id, content: commentText },
                    {
                        onSuccess: () => {
                            setCommentText('');
                            setIsCommentModalOpen(false);
                            if (mdUp) {
                                toast.success('Comment added successfully', {
                                    position: 'top-center',
                                    autoClose: 2000,
                                });
                            }

                        },
                    }
                )
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickAddComment = () => {
        if (mdUp) {
            setShowAddCommentInput(true);
        } else {
            setIsCommentModalOpen(true);
        }
    }

    const handleCancel = () => {
        setShowAddCommentInput(false);
    }

    if (!post) {
        return (
            <PostNotfound />
        );
    }

    return (
        <>
            <div className="w-full h-full pt-20 px-4 bg-white min-h-screen">
                <div className="flex flex-col justify-center items-center">
                    <div className="w-full max-w-[798px] h-full flex flex-col">
                        <PostContent post={post} onBack={() => router.push('/bord')} />
                        {
                            showAddCommentInput && (
                                <CommentSection onCancel={handleCancel} onClickAddComment={onClickAddComment} commentText={commentText} setCommentText={setCommentText} onAddComment={() => setIsCommentModalOpen(true)} />
                            )
                        }
                        {
                            mdUp && !showAddCommentInput && (
                                <div className="mt-8">
                                    <button
                                        onClick={() => handleClickAddComment()}
                                        className="btn btn-outline btn-success max-w-36"
                                    >
                                        Add Comments
                                    </button>
                                </div>)

                        }

                        <CommentList postId={id} />
                    </div>
                </div>
            </div>
            {
                isCommentModalOpen && (
                    <AddCommentModal
                        onAddComment={onClickAddComment}
                        comment={commentText}
                        setComment={setCommentText}
                        isOpen={isCommentModalOpen}
                        onClose={() => setIsCommentModalOpen(false)}
                    />)
            }

        </>

    );
};

export default BordDetailPage;
