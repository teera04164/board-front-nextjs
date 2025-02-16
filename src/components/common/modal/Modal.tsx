import { ReactNode, useEffect } from 'react'
import { cn } from '@/utils/classname'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  size?: 'sm' | 'default' | 'lg' | 'xl'
  showCloseButton?: boolean
  title?: string
}

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  size = 'default',
  showCloseButton = true,
  title,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal modal-open" role="dialog">
      <div className="modal" role="dialog" onClick={onClose} />
      <div
        className={cn(
          'modal-box relative bg-white',
          {
            'md:max-w-sm': size === 'sm',
            'md:max-w-xl': size === 'default',
            'md:max-w-3xl': size === 'lg',
            'md:max-w-5xl': size === 'xl',
          },
          className,
        )}
      >
        {showCloseButton && (
          <button onClick={onClose} className="btn btn-circle btn-ghost btn-sm absolute right-3 top-2">
            <IoMdClose />
          </button>
        )}
        {title && <h3 className="mb-4 text-lg font-bold">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
