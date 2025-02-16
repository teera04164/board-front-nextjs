"use client";
import React from "react";
import { Sidebar } from "../sidebar/Sidebar";

interface BordLayoutProps {
  children: React.ReactNode;
}

export const BordLayout: React.FC<BordLayoutProps> = ({ children }) => (
  <div className="md-px-0 relative mx-auto mt-9 flex min-h-screen w-full bg-gray-100">
    <Sidebar />
    {children}
  </div>
);

export default BordLayout;
