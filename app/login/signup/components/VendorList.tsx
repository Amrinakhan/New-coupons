import { prisma } from "@/lib/prisma";

export default async function VendorList() {
  const vendors = await prisma.vendor.findMany();
  return (
    <ul>
      {vendors.map(v => (
        <li key={v.id}>{v.name} - {v.email} - {v.phone}</li>
      ))}
    </ul>
  );
}
