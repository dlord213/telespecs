"use client";

import Header from "@/components/Header";
import useAuth from "@/hooks/useAuth";

import { verifySession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";

export default function Page() {
  const { client_instance } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await verifySession(client_instance);
      if (!session) {
        redirect("/");
      } else {
        setIsLoading(false);
        console.log(client_instance.authStore.record);
      }
    };

    checkSession();
  }, [client_instance]);

  if (isLoading) {
    return (
      <main className="flex flex-col justify-center items-center min-h-screen min-w-screen"></main>
    );
  }

  if (client_instance.authStore.isValid) {
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
            <h1 className="text-2xl font-black">Reviews</h1>
            <section className="flex flex-col p-4 border-r lg:p-4 lg:gap-4 border rounded-md shadow"></section>
          </div>
        </main>
      </>
    );
  }
}
