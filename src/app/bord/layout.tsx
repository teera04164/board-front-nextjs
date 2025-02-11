import BordLayout from "@/components/layout/BordLayout";
import { Navbar } from "@/components/navbar/Navbar";

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <BordLayout>
        <Navbar />
        {children}
    </BordLayout>
}
