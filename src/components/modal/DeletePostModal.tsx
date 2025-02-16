import { Modal } from '../common/modal/Modal'
import { Button } from '../common/button/Button'

interface IDeletePostModal {
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  onSubmit: (postId: string) => void
  postId: string
}

export const DeletePostModal: React.FC<IDeletePostModal> = ({ isOpen, onClose, onSubmit, isLoading, postId = '' }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={'Please confirm if you wish to delete the post'}
      size="sm"
      showCloseButton={false}
    >
      <div className="">
        <div className="text-sm text-gray-500">
          Are you sure you want to delete the post? Once deleted, it cannot be recovered.
        </div>
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="error" onClick={() => onSubmit(postId)} isLoading={isLoading}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}
