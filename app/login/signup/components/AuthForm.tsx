"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (mode === "signup") {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Signup failed");
        return;
      }
    }
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) setError(result.error);
    else router.push("/dashboard/vendors");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">{mode === "login" ? "Login" : "Sign Up"}</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
