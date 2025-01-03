"use client";

import { verifySession } from "@/app/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { MdAccountBox, MdEmail, MdPassword } from "react-icons/md";
import { handleRegister } from "./actions";
import client_instance from "@/app/lib/client";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await verifySession(client_instance);
      if (session) {
        redirect("/");
      } else {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  if (isLoading) {
    return (
      <main className="flex flex-col justify-center items-center min-h-screen min-w-screen"></main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <section className="flex flex-col lg:max-w-[30vw]">
        <div className="flex flex-col">
          <Link
            className="lg:text-3xl text-xl text-red-500 font-black"
            href="/"
          >
            TeleSpecs
          </Link>
        </div>
        <form
          className="flex flex-col my-4"
          onSubmit={(e) => handleRegister(e, client_instance)}
        >
          <div className="relative my-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <MdAccountBox />
            </div>
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Username"
              name="name"
              required
            />
          </div>
          <div className="relative my-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <MdEmail />
            </div>
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="name@flowbite.com"
              name="email"
              required
            />
          </div>
          <div className="relative my-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <MdPassword />
            </div>
            <input
              type="password"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="***********"
              name="password"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="submit"
              className="cursor-pointer p-2 text-red-50 bg-red-500 rounded-md"
              value="Register"
            />
            <Link href="/login" className="text-sm animate-pulse text-red-700">
              Already have an account?
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
