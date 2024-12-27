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

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const account = await loginAccount(data, client_instance);

  if (account) {
    redirect("/");
  }
};
