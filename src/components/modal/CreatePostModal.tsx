import { useEffect, useState } from "react";
import { Modal } from "../common/modal/Modal";
import { CommunityDropdown } from "@/components/dropdown/CommunityDropdown";
import { Button } from "../common/button/Button";
import { usePostQuery } from "@/hooks/query/usePosts";
import { PostRequest } from "@/types/request/post.type";

interface CreatePostModalProps {
    isOpen: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onSubmit: (data: PostRequest) => void;
    postId?: string;
    isEditMode?: boolean;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSubmit, isLoading, postId = '', isEditMode = false }) => {
    const [formData, setFormData] = useState({
        community: '',
        title: '',
        content: '',
    });

    const { data: post, isLoading: isPostLoading } = postId ? usePostQuery(postId) : { data: null, isLoading: false };

    useEffect(() => {
        if (isEditMode && post) {
            setFormData({
                community: post.community.id || '',
                title: post.title || '',
                content: post.content || '',
            });
        }
    }, [isEditMode, post]);

    const handleSubmit = () => {
        onSubmit({
            title: formData.title,
            content: formData.content,
            communityId: formData.community
        });
    };

    const title = isEditMode ? 'Edit Post' : 'Create Post';
    const btnLabel = isEditMode ? 'Update' : 'Post';


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="lg"
        >
            <div className="space-y-3">
                <CommunityDropdown
                    value={formData.community}
                    onChange={(value) => setFormData({ ...formData, community: value })}
                    title="Choose a community"
                    className="w-full md:max-w-52"
                    triggerClassName="btn-outline border-success text-success w-full md:max-w-52"
                    menuClassName="w-full"
                />

                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input input-bordered w-full"
                />

                <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full h-60 md:h-24 textarea textarea-bordered"
                    placeholder="What's on your mind..."
                />

                <div className="flex flex-col md:flex-row md:justify-end gap-3 mt-8">
                    <Button
                        variant="outline-success"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                    >
                        {btnLabel}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}