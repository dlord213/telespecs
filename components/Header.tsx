"use client";

import { refreshSession } from "@/app/lib/session";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdAccountCircle, MdLogout, MdSearch } from "react-icons/md";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const { client_instance } = useAuth();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/search?q=" + searchQuery);
  };

  useEffect(() => {
    if (client_instance.authStore.isValid) {
      client_instance.collection("users").authRefresh();
    }
  }, [client_instance]);

  return (
    <nav className="flex flex-col gap-4 p-4 border-b sticky top-0 bg-[#fafafa] lg:static lg:justify-between lg:items-center lg:flex-row lg:gap-0">
      <div className="flex flex-row justify-between items-center">
        <Link href="/">
          <h1 className="font-black text-xl lg:text-2xl text-rose-500">
            TeleSpecs
          </h1>
        </Link>
        <div className="lg:hidden flex flex-row gap-2">
          <Link
            className="p-1 px-2 border bg-red-500 text-red-200 rounded-md"
            href="/register"
          >
            Register
          </Link>
          <Link
            className="p-1 px-2 border border-red-300 text-red-400 rounded-md"
            href="/login"
          >
            Login
          </Link>
        </div>
      </div>
      <form
        className="flex lg:flex-row flex-col gap-4 items-center"
        onSubmit={handleSearchSubmit}
      >
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            className="py-1 pl-10 pr-3 border rounded-md w-full"
            value={searchQuery}
            name="searchQuery"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search device"
          />
        </div>
        {client_instance.authStore.isValid ? (
          <div className="flex flex-row gap-2 items-center">
            <Link
              className="transition-all delay-0 duration-200 hover:scale-105"
              href="/profile"
            >
              <MdAccountCircle size={36} />
            </Link>
            <span className="border h-[36px]"></span>
            <MdLogout
              size={32}
              className="cursor-pointer transition-all delay-0 duration-200 hover:scale-105"
              onClick={async () => {
                client_instance.authStore.clear();
                router.refresh();
              }}
            />
          </div>
        ) : (
          <div className="hidden lg:flex flex-row gap-2">
            <Link
              className="p-1 px-2 border bg-red-500 text-red-200 rounded-md"
              href="/register"
            >
              Register
            </Link>
            <Link
              className="p-1 px-2 border border-red-300 text-red-400 rounded-md"
              href="/login"
            >
              Login
            </Link>
          </div>
        )}
      </form>
    </nav>
  );
}
