"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // State Mobile Menu
  const [isOpen, setIsOpen] = useState(false);

  // Anti Hydration Error
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      const checkAdmin = localStorage.getItem("isAdmin") === "true";
      if (checkAdmin) {
        setIsAdmin(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    setIsOpen(false);
    router.push("/login");
    router.refresh();
  };

  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) =>
    pathname === path
      ? "text-red-600 font-bold"
      : "text-gray-600 hover:text-red-600 transition-colors";

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <div className="flex-1 flex justify-start">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-2 text-2xl font-black tracking-tighter text-gray-900"
            >
              <Image
                src="/clodream.png"
                alt="C"
                width={30}
                height={30}
                priority
              />
              <span>
                CLO<span className="text-red-600">DREAM</span>.
              </span>
            </Link>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={isActive("/")}>
              Home
            </Link>
            <Link href="/catalog" className={isActive("/catalog")}>
              Catalog
            </Link>
            <Link href="/about" className={isActive("/about")}>
              About
            </Link>
            <Link href="/contact" className={isActive("/contact")}>
              Contact
            </Link>

            {isMounted && isAdmin && (
              <Link
                href="/admin"
                className={
                  pathname.startsWith("/admin")
                    ? "text-red-600 font-bold"
                    : "text-orange-600 font-bold hover:text-orange-700"
                }
              >
                Admin
              </Link>
            )}
          </div>

          {/* AUTH DESKTOP */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-6">
            {isMounted && isAdmin ? (
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-500 hover:text-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <div className="w-10"></div>
            )}
          </div>

          {/* HAMBURGER */}
          <div className="md:hidden flex flex-1 justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-red-600 focus:outline-none p-2"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
            <Link
              href="/"
              onClick={closeMenu}
              className={`block py-2 ${isActive("/")}`}
            >
              Home
            </Link>
            <Link
              href="/catalog"
              onClick={closeMenu}
              className={`block py-2 ${isActive("/catalog")}`}
            >
              Catalog
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className={`block py-2 ${isActive("/about")}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className={`block py-2 ${isActive("/contact")}`}
            >
              Contact
            </Link>

            {isMounted && isAdmin && (
              <Link
                href="/admin"
                onClick={closeMenu}
                className={`block py-2 ${
                  pathname.startsWith("/admin")
                    ? "text-red-600 font-bold"
                    : "text-orange-600 font-bold"
                }`}
              >
                Admin Panel
              </Link>
            )}

            {isMounted && isAdmin && (
              <>
                <div className="border-t border-gray-100 my-2"></div>
                <button
                  onClick={handleLogout}
                  className="text-left py-2 font-medium text-red-500 hover:text-red-700 transition w-full"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
