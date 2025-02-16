interface CommentSectionProps {
  commentText: string
  setCommentText: (text: string) => void
  onClickAddComment: () => void
  onCancel: () => void
}

const CommentSection: React.FC<CommentSectionProps> = ({
  commentText,
  setCommentText,
  onClickAddComment,
  onCancel,
}) => {
  return (
    <>
      <div className="mt-5">
        <textarea
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          className="border-gray-[#DADADA] h-24 w-full rounded-md border p-3 placeholder:text-sm focus:border-green-500 focus:outline-none"
          placeholder="What’s on your mind..."
        ></textarea>
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onCancel} className="btn btn-outline btn-success w-28">
            Cancel
          </button>
          <button onClick={onClickAddComment} className="btn btn-success w-28 text-white">
            Post
          </button>
        </div>
      </div>
    </>
  )
}
