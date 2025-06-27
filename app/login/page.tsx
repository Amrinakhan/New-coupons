"use client";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <AuthForm mode="login" />
      <p>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
}
