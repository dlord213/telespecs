import { registerAccount } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import PocketBase from "pocketbase";

export const handleRegister = async (
  e: FormEvent<HTMLFormElement>,
  client_instance: PocketBase
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("password"),
  };

  const account = await registerAccount(data, client_instance);
  

  if (account) {
    redirect("/");
  }
};
