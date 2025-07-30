import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
    baseURL: "https://blog-api-12dh.onrender.com"
})
export const { signIn, signUp, useSession } = createAuthClient();