import PocketBase from "pocketbase";

export async function verifySession(client_instance: PocketBase) {
  if (client_instance.authStore.isValid) {
    const res = await client_instance.collection("users").authRefresh();
    return res;
  } else {
    return false;
  }
}

export async function loginAccount(
  data: { email: string; password: string },
  client_instance: PocketBase
) {
  try {
    const authData = await client_instance
      .collection("users")
      .authWithPassword(data.email, data.password);
    return authData;
  } catch (err) {
    throw err;
  }
}

export async function registerAccount(
  data: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  },
  client_instance: PocketBase
) {
  try {
    const record = await client_instance.collection("users").create(data);
    const authData = await client_instance
      .collection("users")
      .authWithPassword(data.email, data.password);

    return authData;
  } catch (err) {
    throw err;
  }
}

export async function logoutAccount(client_instance: PocketBase) {
  client_instance.authStore.clear();
}

export async function refreshSession(client_instance: PocketBase) {
  if (client_instance.authStore.isValid) {
    const refreshedRecord = await client_instance
      .collection("users")
      .authRefresh();
    return refreshedRecord;
  }
}