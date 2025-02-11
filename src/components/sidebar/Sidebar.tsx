import { menuItems } from '@/constants/menu';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <div className="hidden md:block w-full max-w-[280px] pt-20 bg-gray-100 xl:absolute xl:top-0 xl:left-0 xl:h-full xl:pl-10">
            <nav>
                <ul className="menu menu-lg">
                    {menuItems.map((item) => (
                        <li key={item.label}  onClick={() => handleNavigation(item.path)}>
                            <a>
                                <Image src={item.icon} alt={item.label} width={24} height={24} />
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}