// @\app\listings\[listingId]\page.tsx
import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById"
import EmptyState from "@/components/EmptyState";
import ListingClient from "../../../components/listings/ListingClient";
import getReservations from "@/actions/getReservations";

interface IParams {
  listingId?: string;
}
export default async function Page({
  params
}: {
  params: Promise<IParams>
}){
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser();
  if (!listing) {
    return (
      <EmptyState />
    )
  }
  return(
    <>
    <div className="pt-10">
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
       />
    </div>
    </>
  )
}