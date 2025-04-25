// @\components\reservations\ReservationClient.tsx
"use client";

import { SafeReservation, SafeUser } from "@/types";
import { toast } from "react-hot-toast"
import axios from "axios"
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "../heading";
import Container from "../container";
import ListingCard from "../listings/ListingCard";

interface ReservationClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
};
const ReservationClient: React.FC<ReservationClientProps> = ({ 
  reservations,
  currentUser
 }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");
  const onCancel = useCallback((id: string) => {
    setDeletingId(id)
    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled")
        router.refresh()
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setDeletingId('')
      })
  }, [router])
  return (
    <Container>
      <div className="pt-10">
      <Heading
        title="Reservations"
        subTitle="Bookings on your properties"
       />
       <div className="mt-10 grid grid-col-1 sm:grid-cols-1 md:grid-cols-3 lg-grid-4 xl:grid-cols-5 2xl:grid-cols-4 gap-4">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Guest reservation"
            currentUser={currentUser}
           />
        ))}
       </div>
       </div>
    </Container>
  );
}
export default ReservationClient