import { PostDetail } from "@/types/response/post.type";

export interface Comment {
    id: string;
    author: string;
    timeAgo: string;
    content: string;
  }
  
  export interface PostContentProps {
    onBack: () => void;
    post: PostDetail;
  }
  
  export interface CommentSectionProps {
    onAddComment: () => void;
  }
  
  export interface AddCommentModalProps {
    isOpen: boolean;
    onClose: () => void;
  }