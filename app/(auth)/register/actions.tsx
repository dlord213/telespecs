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

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    console.error("Invalid form data");
    return;
  }

  const data = {
    name,
    email,
    password,
    passwordConfirm: password,
  };

  const account = await registerAccount(data, client_instance);

  if (account) {
    redirect("/");
  }
};
