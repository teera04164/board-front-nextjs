"use client";
import { ROUTE_PATH } from "@/constants/route";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useMenusItem } from "@/hooks/useMenusItem";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export const Navbar = () => {
  const { user, logout } = useCheckAuth();
  const [isOpenDropdown, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { menus } = useMenusItem();

  const handleSignIn = () => {
    router.push(ROUTE_PATH.LOGIN);
  };

  return (
    <div>
      <div className="navbar fixed left-0 top-0 z-[99] h-[72px] w-full bg-green-500 px-8 text-white">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">a Bord</a>
        </div>
        <div className="flex-none gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="m-1">
                <div className="flex items-center gap-2">
                  <span>{user.fullName}</span>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <Image src={user?.image || "/icons/user.svg"} alt="avatar" width={40} height={40} />
                    </div>
                  </div>
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
                <li onClick={logout}>
                  <a className="text-black">Sign Out</a>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <button onClick={handleSignIn} className="btn btn-primary hidden w-28 text-white md:block">
                Sign In
              </button>
            </>
          )}
          <button className="flex-none md:hidden" onClick={() => setIsDropdownOpen((prev) => !prev)}>
            <GiHamburgerMenu height={24} width={24} />
          </button>
        </div>
      </div>
      <div className="drawer drawer-end z-[100]">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpenDropdown}
          onChange={() => {}}
        />
        <div className="drawer-side">
          <label aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="min-h-full w-[280px] max-w-[280px] rounded-l-xl bg-green-500 pb-9 pl-7 pt-8 text-white">
            <button className="" onClick={() => setIsDropdownOpen((prev) => !prev)}>
              <Image src="/icons/back-btn.svg" alt="Board Application Logo" width={16} height={12} />
            </button>
            <ul className="menu mt-9">
              {menus.map((item) => (
                <li key={item.label} onClick={() => router.push(item.path)}>
                  <a>
                    <Image src={item.icon} alt={item.label} width={24} height={24} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
