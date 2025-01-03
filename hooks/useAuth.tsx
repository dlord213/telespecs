import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import PocketBase from "pocketbase";

interface AuthInterface {
  client_instance: PocketBase;
  token: string;
  id: string;
}

const useAuth = create<AuthInterface>()(
  immer(() => ({
    client_instance: new PocketBase("https://telespecs.pockethost.io/"),
    token: "",
    id: "",
  }))
);

export default useAuth;
