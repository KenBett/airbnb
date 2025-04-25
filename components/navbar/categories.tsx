// @\components\navbar\categories.tsx
"use client";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../container";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../categoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { Suspense } from "react";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This Property is close to the bridge",
  },
  {
    label: "WindMills",
    icon: GiWindmill,
    description: "This Property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    label: "CountrySide",
    icon: TbMountain,
    description: "This Property is in the country side",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This Property has skiing activities",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is on the snow",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in the desert",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property in on a desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is on a barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is laxourious",
  },
];

const CategoriesContent = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

const Categories = () => {
  return (
    <Suspense
      fallback={
        <Container>
          <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto animate-pulse" />
        </Container>
      }
    >
      <CategoriesContent />
    </Suspense>
  );
};

export default Categories;
