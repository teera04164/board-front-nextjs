'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CommentSection } from './components/CommentSection'
import { PostContent } from './components/PostContent'
import { AddCommentModal } from '@/components/modal/AddCommentModal'
import { CommentList } from './components/CommentList'
import { usePostQuery } from '@/hooks/query/usePosts'
import PostNotfound from '@/components/posts/PostNotfound'
import { useAddCommentMutation } from '@/hooks/query/useComments'
import { toast } from 'react-toastify'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { Button } from '@/components/common/button/Button'
import { useErrorHandler } from '@/hooks/useErrorHandler'

interface IBordDetailPage {
  id: string
}

const BordDetailPage: React.FC<IBordDetailPage> = ({ id }) => {
  const mdUp = useBreakpoint('md')
  const { isAuthenticated } = useCheckAuth()
  const { handleError } = useErrorHandler()

  const { data: post } = usePostQuery(id)

  const { mutate: addComment } = useAddCommentMutation()

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const router = useRouter()
  const [commentText, setCommentText] = useState('')
  const [showAddCommentInput, setShowAddCommentInput] = useState(false)

  const onClickAddComment = async () => {
    try {
      if (commentText.trim().length > 0) {
        await addComment(
          { postId: id, content: commentText },
          {
            onSuccess: () => {
              setCommentText('')
              setIsCommentModalOpen(false)
              if (mdUp) {
                toast.success('Comment added successfully', {
                  position: 'top-center',
                  autoClose: 2000,
                })
              }
            },
          },
        )
      }
    } catch (error) {
      handleError(error, true)
    }
  }

  const handleClickAddComment = () => {
    if (mdUp) {
      setShowAddCommentInput(true)
    } else {
      setIsCommentModalOpen(true)
    }
  }

  const handleCancel = () => {
    setShowAddCommentInput(false)
  }

  if (!post) {
    return <PostNotfound />
  }

  return (
    <>
      <div className="h-full min-h-screen w-full bg-white px-4 pt-20">
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-full w-full max-w-[798px] flex-col">
            <PostContent post={post} onBack={() => router.push('/bord')} />
            {showAddCommentInput && isAuthenticated && (
              <CommentSection
                onCancel={handleCancel}
                onClickAddComment={onClickAddComment}
                commentText={commentText}
                setCommentText={setCommentText}
              />
            )}
            {!showAddCommentInput && isAuthenticated && (
              <div className="mt-8">
                <Button variant="outline-success" onClick={() => handleClickAddComment()} className="max-w-36">
                  Add Comments
                </Button>
              </div>
            )}

            <CommentList postId={id} />
          </div>
        </div>
      </div>
      {isCommentModalOpen && (
        <AddCommentModal
          onAddComment={onClickAddComment}
          comment={commentText}
          setComment={setCommentText}
          isOpen={isCommentModalOpen}
          onClose={() => setIsCommentModalOpen(false)}
        />
      )}
    </>
  )
}

export default BordDetailPage
