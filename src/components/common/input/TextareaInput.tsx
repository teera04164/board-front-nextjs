import { cn } from '@/utils/classname'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  errorMsg?: string
  register?: UseFormRegisterReturn
  containerClassName?: string
}

export const TextareaInput: React.FC<FormTextareaProps> = ({
  label,
  errorMsg,
  register,
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <div className={containerClassName}>
      {label && <label className="mb-2 block text-sm font-medium">{label}</label>}
      <textarea
        className={cn('textarea textarea-bordered w-full', errorMsg && 'textarea-error', className)}
        {...register}
        {...props}
      />
      {errorMsg && <p className="mt-1 text-sm text-error">{errorMsg}</p>}
    </div>
  )
}
