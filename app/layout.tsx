import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendors Dashboard",
  description: "Manage vendors with authentication and a modern UI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>Vendors Dashboard</header>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
