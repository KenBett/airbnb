// @\app\api\listings\[listingId]\route.ts
import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb"

interface IParams {
  listingId?: string,
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<IParams> }
){
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = await params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID')
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  })

  return NextResponse.json(listing)
}