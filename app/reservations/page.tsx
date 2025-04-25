// @\app\reservations\page.tsx
import EmptyState from "@/components/EmptyState"
import getCurrentUser from "@/actions/getCurrentUser"
import getReservations from "@/actions/getReservations"
import ReservationClient from "@/components/reservations/ReservationClient";


export default async function ReservationPage(){
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return(
      <EmptyState
        title="Unauthrorized"
        subTitle="Please Login"
       />
    )

  }
    const reservations = await getReservations(Promise.resolve({
      authorId: currentUser?.id
    }))

    if (reservations.length == 0) {
      return(
        <EmptyState
          title="No reservations found"
          subTitle="Looks like you have no reservations on your properties"
         />
      )
    }
  return(
    <ReservationClient
      reservations={reservations}
      currentUser={currentUser}
     />
  )
}