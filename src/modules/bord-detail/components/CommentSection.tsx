import Image from 'next/image';

interface CommentSectionProps {
  onAddComment: () => void;
  commentText: string;
  setCommentText: (text: string) => void;
  onClickAddComment: () => void;
  onCancel: () => void;
}

export function CommentSection({ onAddComment, commentText, setCommentText, onClickAddComment, onCancel}: CommentSectionProps) {
  return (
    <>
      {/* is login */}
      <div className="mt-5">
        <textarea value={commentText} onChange={(event)=> setCommentText(event.target.value)} className="w-full h-24 border border-gray-[#DADADA] rounded-md p-3 focus:outline-none focus:border-green-500 placeholder:text-sm" placeholder="What’s on your mind..."></textarea>
        <div className="flex justify-end mt-4 gap-3">
          <button onClick={onCancel} className="btn btn-outline btn-success w-28">Cancel</button>
          <button onClick={onClickAddComment} className="btn btn-success w-28 text-white ">Post</button>
        </div>
      </div>
    </>
  );
}