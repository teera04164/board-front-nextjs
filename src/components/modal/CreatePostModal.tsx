import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Modal } from '../common/modal/Modal'
import { CommunityDropdown } from '@/components/dropdown/CommunityDropdown'
import { Button } from '../common/button/Button'
import { usePostQuery } from '@/hooks/query/usePosts'
import { PostRequest } from '@/types/request/post.type'
import { TextInput } from '../common/input/TextInput'
import { TextareaInput } from '../common/input/TextareaInput'
import { createPostSchema } from '@/constants/schemas'

type CreatePostFormData = z.infer<typeof createPostSchema>

interface CreatePostModalProps {
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  onSubmit: (data: PostRequest) => void
  postId?: string
  isEditMode?: boolean
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  postId = '',
  isEditMode = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      community: '',
      title: '',
      content: '',
    },
  })

  const { data: post } = usePostQuery(postId)
  const communityValue = watch('community')

  useEffect(() => {
    if (isEditMode && post) {
      reset({
        community: post.community.id || '',
        title: post.title || '',
        content: post.content || '',
      })
    }
  }, [isEditMode, post, reset])

  const handleFormSubmit = (data: CreatePostFormData) => {
    onSubmit({
      title: data.title,
      content: data.content,
      communityId: data.community,
    })
  }

  const title = isEditMode ? 'Edit Post' : 'Create Post'
  const btnLabel = isEditMode ? 'Update' : 'Post'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
        <CommunityDropdown
          value={communityValue}
          onChange={(value) => setValue('community', value, { shouldValidate: true })}
          title="Choose a community"
          className="w-full md:max-w-52"
          triggerClassName={`btn-outline border-success text-success w-full md:max-w-52 ${
            errors.community ? 'border-error' : ''
          }`}
          menuClassName="w-full"
        />
        {errors.community && <p className="mt-1 text-sm text-error">{errors.community.message}</p>}

        <TextInput placeholder="Title" errorMsg={errors?.title?.message || ''} {...register('title')} />

        <TextareaInput
          placeholder="What's on your mind..."
          className="h-60 w-full md:h-24"
          errorMsg={errors?.content?.message || ''}
          {...register('content')}
        />

        <div className="mt-8 flex flex-col gap-3 md:flex-row md:justify-end">
          <Button type="button" variant="outline-success" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" variant="success" isLoading={isLoading}>
            {btnLabel}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
