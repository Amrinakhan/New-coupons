import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { name, email, phone } = await req.json();
  const vendor = await prisma.vendor.create({
    data: {
      name,
      email,
      phone,
      userId: user.id,
    },
  });

  return NextResponse.json(vendor);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const vendors = await prisma.vendor.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
  });

  return NextResponse.json(vendors);
}
