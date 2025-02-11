"use client"
import { ROUTE_PATH } from "@/constants/route";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export const Navbar = () => {
    const { user, logout } = useCheckAuth()
    const [isOpenDropdown, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const handleSignIn = () => {
        router.push(ROUTE_PATH.LOGIN)
    }

    return (
        <div>
            <div className="navbar bg-green-500 text-white px-8 h-[72px] fixed top-0 left-0 w-full z-[99]">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">a Bord</a>
                </div>
                <div className="flex-none gap-2">
                    {
                        user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className=" m-1">
                                    <div className="flex items-center gap-2">
                                        <span>{user.fullName}</span>
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <Image
                                                    src={user?.image || '/icons/user.svg'}
                                                    alt="avatar"
                                                    width={40}
                                                    height={40}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li onClick={logout}><a className="text-black">Sign Out</a></li>
                                </ul>
                            </div>
                        )
                            : (
                                <>
                                    <button onClick={handleSignIn} className="hidden md:block btn btn-primary  text-white w-28">Sign In</button>
                                </>
                            )

                    }
                    <button className="flex-none md:hidden" onClick={() => setIsDropdownOpen(prev => !prev)}  >
                        <GiHamburgerMenu height={24} width={24} />
                    </button>
                </div>
            </div>
            <div className="drawer drawer-end z-[100]">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isOpenDropdown} onChange={() => { }} />
                <div className="drawer-side">
                    <label aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className='bg-green-500 text-white min-h-full max-w-[280px] w-[280px] rounded-l-xl pt-8 pb-9 pl-7'>
                        <button className="" onClick={() => setIsDropdownOpen(prev => !prev)}>
                            <Image
                                src="/icons/back-btn.svg"
                                alt="Board Application Logo"
                                width={16}
                                height={12}
                            />
                        </button>

                        <ul className="menu mt-9">
                            {/* Sidebar content here */}
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}