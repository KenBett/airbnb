// @\app\listings\ListingInfo.tsx
"use client";

import Avatar from "@/components/avatar";
import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../map"), {
  ssr: false,
  loading: () => (
    <div className="h-[35vh] rounded-lg bg-gray-200 flex items-center justify-center">
      Loading map...
    </div>
  ),
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-1 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} Guests,</div>
          <div>{roomCount} Rooms,</div>
          <div>{bathroomCount} Bathrooms</div>
        </div>
      </div>
      <hr className="border-neutral-300" />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr className="border-neutral-300" />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr className="border-neutral-300" />
      <Map center={coordinates} />
    </div>
  );
};
export default ListingInfo;
