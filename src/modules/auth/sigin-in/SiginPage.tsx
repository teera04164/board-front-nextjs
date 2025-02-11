"use client";
import React from 'react'
import { SignInForm } from './components/SignInForm';
import BrandingSection from './components/BrandingSection';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';

const SiginPage = () => {
    const { isAuthenticated, user } = useAuthCheck();
    console.log("🚀 ~ SiginPage ~ user:", user)

    
    return (
        <>     
            <SignInForm />
            <BrandingSection />
        </>
    )
}

export default SiginPage