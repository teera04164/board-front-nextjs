import { Button } from '@/components/common/button/Button'
import { Modal } from '@/components/common/modal/Modal'

interface AddCommentModalProps {
  isOpen: boolean
  onClose: () => void
  comment: string
  setComment: (comment: string) => void
  onAddComment: () => void
}

export const AddCommentModal: React.FC<AddCommentModalProps> = ({
  isOpen,
  onClose,
  comment,
  setComment,
  onAddComment,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={'Add Comments'} size="sm" showCloseButton={true}>
      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        className="border-gray mt-5 h-24 w-full rounded-md border p-3 placeholder:text-sm focus:border-green-500 focus:outline-none"
        placeholder="What's on your mind..."
      />
      <div className="mt-8 flex w-full flex-col gap-3">
        <Button variant="outline-success" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={onAddComment}>
          Post
        </Button>
      </div>
    </Modal>
  )
}
