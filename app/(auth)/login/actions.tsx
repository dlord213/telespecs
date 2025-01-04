import { loginAccount } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import PocketBase from "pocketbase";

export const handleLogin = async (
  e: FormEvent<HTMLFormElement>,
  client_instance: PocketBase
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    console.error("Invalid form data");
    return;
  }

  const data = {
    email,
    password,
  };

  const account = await loginAccount(data, client_instance);

  if (account) {
    redirect("/");
  }
};
