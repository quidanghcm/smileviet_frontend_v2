"use client"

import "@/css/login-effects.css"
import { LoginForm } from "@/components/login-form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { IconLoader } from "@tabler/icons-react";
import { useEffect } from "react";

export default function LoginPage() {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <IconLoader className="size-10 animate-spin mx-auto h-screen text-gray-500" />
    );
  }


  return (
    <div className="sv-wrapper bg-muted/30">

      {/* Hiệu ứng nền vòng tròn */}
      <div className="sv-flow-lines">
        <div></div><div></div><div></div>
      </div>

      {/* Form đăng nhập + glow + logo */}
      <LoginForm />
    </div>
  )
}
