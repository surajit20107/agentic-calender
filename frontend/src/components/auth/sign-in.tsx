"use client";

import { Descope } from "@descope/nextjs-sdk";
import { useRouter } from "next/navigation";

function SignInComponent() {
  const router = useRouter();
  return (
    <div className="descope-wrap">
      <Descope
        flowId="sign-up-or-in"
        autoFocus="skipFirstScreen"
        redirectAfterError="/dashboard"
        onSuccess={()=> router.replace("/dashboard")}
        onError={(event)=> console.log("Signin failed", event.detail)}
      />
    </div>
  );
}

export default SignInComponent;
