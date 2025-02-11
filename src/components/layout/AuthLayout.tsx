import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
    <div className="min-h-screen  bg-green-500 flex flex-col-reverse md:flex md:flex-row w-full">
        {children}
    </div>
);

export default AuthLayout;