"use client";

import Header from "@/components/Header";

import { useEffect, useState } from "react";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import client_instance from "@/app/lib/client";

export default function Page() {
  const [account, setAccount] = useState();

  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <main className="flex min-h-screen lg:flex-row gap-4">
        <div className="hidden lg:flex lg:flex-col gap-4 border-r xl:basis-[20%] 2xl:basis-[30%]">
          <ul className="flex flex-col gap-4 list-none p-4">
            <button className="flex flex-row gap-4 items-center transition-all delay-0 duration-200 hover:text-red-600">
              <RiAccountPinBoxLine />
              <p>Account</p>
            </button>
          </ul>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-row gap-4 items-center">
            <MdAccountCircle size={64} />
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Username</p>
              <h1 className="lg:text-xl font-bold">
                {client_instance.authStore.record?.name}
              </h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
