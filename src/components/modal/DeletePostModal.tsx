import { Modal } from "../common/modal/Modal";
import { Button } from "../common/button/Button";

interface IDeletePostModal {
    isOpen: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onSubmit: (postId: string) => void;
    postId: string;
}

export const DeletePostModal: React.FC<IDeletePostModal> = ({ isOpen, onClose, onSubmit, isLoading, postId = '' }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Please confirm if you wish to delete the post"}
            size="lg"
        >
            <div className="space-y-3">
                <div>
                    Are you sure you want to delete the post? Once deleted, it cannot be recovered.
                </div>
                <div className="flex flex-col md:flex-row md:justify-end gap-3 mt-8">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="error"
                        onClick={() => onSubmit(postId)}
                        isLoading={isLoading}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
}