'use client'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { PropsWithChildren } from 'react'

export function AuthGuard({ children }: PropsWithChildren) {
  const { isLoading, isAuthenticated } = useCheckAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}