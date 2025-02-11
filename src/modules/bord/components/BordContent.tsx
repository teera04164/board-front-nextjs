import React from 'react';
import Header from '@/modules/bord/components/Header';
import PostList from '@/components/posts/PostList';
import { SearchState } from '@/stores/types';

interface BordContentProps {
  searchState: SearchState;
  setSearchText: (text: string) => void;
  setSearching: (val: boolean) => void;
  onCommunityChange: (communityId: string) => void;
  onOpenCreateModal: () => void;
  onEditPost: (postId: string) => void;
  onDeletePost: (postId: string) => void;
}

export const BordContent: React.FC<BordContentProps> = ({
  searchState,
  setSearchText,
  setSearching,
  onCommunityChange,
  onOpenCreateModal,
  onEditPost,
  onDeletePost,
}) => {
  return (
    <div className="w-full h-full pt-20 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-[798px]">
        <Header
          searchState={searchState}
          setSearchText={setSearchText}
          setSearching={setSearching}
          onCommunityChange={onCommunityChange}
          onCreatePost={onOpenCreateModal}
        />
        <PostList
          searchState={searchState}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
        />
      </div>
    </div>
  );
};