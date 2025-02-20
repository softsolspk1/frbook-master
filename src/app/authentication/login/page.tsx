"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPageRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return;
};

export default LoginPageRedirect;
