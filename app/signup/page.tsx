"use client";

import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div>
      <AuthForm mode="signup" />
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
} 