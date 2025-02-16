import { cn } from '@/utils/classname'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMsg?: string
  register?: UseFormRegisterReturn
  containerClassName?: string
}

export const TextInput: React.FC<FormInputProps> = ({
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
      <input
        className={cn('input input-bordered w-full', errorMsg && 'input-error', className)}
        {...register}
        {...props}
      />
      {errorMsg && <p className="mt-1 text-sm text-error">{errorMsg}</p>}
    </div>
  )
}
