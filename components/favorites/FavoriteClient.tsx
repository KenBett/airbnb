// @\components\favorites\FavoriteClient.tsx
"use client";

import { safeListing, SafeUser } from "@/types";
import Container from "../container";
import Heading from "../heading";
import ListingCard from "../listings/ListingCard";

interface FavoriteClientProps {
  listings: safeListing[];
  currentUser: SafeUser | null;
}
const FavoriteClient: React.FC<FavoriteClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subTitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};
export default FavoriteClient;
