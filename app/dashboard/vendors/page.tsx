import VendorForm from "@/components/VendorForm";
import VendorList from "@/components/VendorList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function VendorsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const vendors = await prisma.vendor.findMany({
    where: { user: { email: session.user?.email! } },
    orderBy: { id: "desc" },
  });

  return (
    <div className="space-y-8">
      <VendorForm />
      <VendorList vendors={vendors} />
    </div>
  );
}
