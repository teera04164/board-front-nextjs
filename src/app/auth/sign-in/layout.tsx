import AuthLayout from "@/components/layout/AuthLayout";

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AuthLayout>
        {children}
    </AuthLayout>
}
