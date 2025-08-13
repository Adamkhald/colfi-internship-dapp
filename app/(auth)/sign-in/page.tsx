'use client'

import AuthForm from '@/components/AuthForm'
import React from 'react'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const router = useRouter()

  const handleLoginSuccess = () => {
    // Redirect to the home page after successful login
    router.push('/')
  }

  return (
    <AuthForm onLoginSuccess={handleLoginSuccess} />
  )
}

export default SignIn