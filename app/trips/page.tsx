// @\app\trips\page.tsx
import EmptyState from "@/components/EmptyState"
import getCurrentUser from "@/actions/getCurrentUser"
import getReservations from "@/actions/getReservations"
import TripsClient from "@/components/trips/TripsClient";
export default async function Page(){
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subTitle="Please Login"
       />
    )
  }

  const reservations = await getReservations(Promise.resolve({
    userId: currentUser.id
  }))

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Trips Found"
        subTitle="Looks like you haven't reserved any trips"
       />
    )
  }

  return(
    <div className="pt-10">
    <TripsClient
      reservations={reservations}
      currentUser={currentUser}
     />
    </div>
  )
}