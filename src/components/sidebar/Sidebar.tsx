import { useMenusItem } from '@/hooks/useMenusItem';
import { cn } from '@/utils/classname';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { menus } = useMenusItem();

    return (
        <div className="hidden md:block w-full max-w-[280px] pt-20 bg-gray-100 xl:absolute xl:top-0 xl:left-0 xl:h-full xl:pl-10">
            <nav>
                <ul className="menu menu-lg">
                    {menus.map((item) => (
                        <li key={item.label} onClick={() => router.push(item.path)}>
                            <a>
                                <Image src={item.icon} alt={item.label} width={24} height={24} />
                                <span className={cn({
                                    'font-bold': pathname === item.path,
                                })}>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}