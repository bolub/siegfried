import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";

export default function Login() {
  return (
    <>
      <AuthShowcase />
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined,
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-md bg-black px-6 py-3 font-medium text-white ring-offset-2 focus:outline-none focus:ring-2 focus:ring-black"
        onClick={
          sessionData ? () => void signOut() : () => void signIn("google")
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
