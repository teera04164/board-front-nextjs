import { Button } from "@/components/common/button/Button";
import { Modal } from "@/components/common/modal/Modal";

interface AddCommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    comment: string;
    setComment: (comment: string) => void;
    onAddComment: () => void;
}

export function AddCommentModal({ isOpen, onClose, comment, setComment, onAddComment }: AddCommentModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Add Comments"}
            size="sm"
            showCloseButton={true}
        >
            <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="w-full mt-5 h-24 border border-gray-[#DADADA] rounded-md p-3 focus:outline-none focus:border-green-500 placeholder:text-sm"
                placeholder="What's on your mind..."
            />
            <div className="mt-8 flex flex-col w-full gap-3">
                <Button
                    variant="outline-success"
                    onClick={onClose}
                >
                    Close
                </Button>
                <Button
                    variant="success"
                    onClick={onAddComment}
                >
                    Post
                </Button>
            </div>
        </Modal>
    );
}