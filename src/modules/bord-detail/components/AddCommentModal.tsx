
interface AddCommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    comment: string;
    setComment: (comment: string) => void;
    onAddComment: () => void;
  }

export function AddCommentModal({ isOpen, onClose, comment,  setComment, onAddComment}: AddCommentModalProps) {

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <input
                type="checkbox"
                id="comment_modal"
                className="modal-toggle"
                checked={isOpen}
                readOnly
            />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2"
                    >
                        ✕
                    </button>
                    <h3 className="text-lg font-bold">Add Comments</h3>
                    <textarea
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        className="w-full mt-5 h-24 border border-gray-[#DADADA] rounded-md p-3 focus:outline-none focus:border-green-500 placeholder:text-sm"
                        placeholder="What's on your mind..."
                    />
                    <div className="mt-8 flex flex-col w-full gap-3">
                        <button
                            className="btn btn-outline border-success text-success"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            className="btn btn-success text-white"
                            onClick={onAddComment}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}