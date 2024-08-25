import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const orderId = searchParams.get("orderId");

  const order = await prisma.order.findUnique({
    where: { id: orderId as string },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}