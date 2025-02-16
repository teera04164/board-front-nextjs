import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <div className="flex min-h-screen w-full flex-col-reverse bg-green-500 md:flex md:flex-row">{children}</div>
);

export default AuthLayout;
