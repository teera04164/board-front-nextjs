"use client"
import React from 'react';
import { Sidebar } from '../sidebar/Sidebar';

interface BordLayoutProps {
    children: React.ReactNode;
}

export const BordLayout: React.FC<BordLayoutProps> = ({ children }) => (
    <div className="bg-gray-100 min-h-screen w-full flex  mx-auto mt-9 md-px-0 relative">
        <Sidebar />
        {children}
    </div>
);

export default BordLayout;