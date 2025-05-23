"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, Suspense } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBoxContent: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    interface QueryParams {
      category?: string;
      [key: string]: string | undefined;
    }

    const updatedQuery: QueryParams = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

const CategoryBox: React.FC<CategoryBoxProps> = (props) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center gap-2 p-3 border-b-2 border-transparent animate-pulse" />
      }
    >
      <CategoryBoxContent {...props} />
    </Suspense>
  );
};

export default CategoryBox;
