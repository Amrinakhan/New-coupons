"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VendorForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });
    // Clear form
    setName("");
    setEmail("");
    setPhone("");
    router.refresh(); // Refresh the page to show the new vendor
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Vendor</h3>
      <input
        type="text"
        placeholder="Vendor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Vendor Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Vendor Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Add Vendor</button>
    </form>
  );
} 