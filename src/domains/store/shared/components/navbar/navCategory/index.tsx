"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { getAllCategoriesJSON } from "@/actions/category/category";
import { ListIcon } from "@/shared/components/icons/svgIcons";
import Button from "@/shared/components/UI/button";
import { useToggleMenu } from "@/shared/hooks/useToggleMenu";
import { TGroupJSON } from "@/shared/types/categories";
import { cn } from "@/shared/utils/styling";

type TProps = {
  isNavbarVisible: boolean;
};

// Hardcoded categories as fallback
const FALLBACK_CATEGORIES: TGroupJSON[] = [
  {
    group: {
      id: "1",
      parentID: null,
      name: "Computers & Laptops",
      url: "pc-laptops",
      iconUrl: "/icons/computerIcon.svg",
      iconSize: [24, 24]
    },
    categories: []
  },
  {
    group: {
      id: "2",
      parentID: null,
      name: "Tablets",
      url: "tablets",
      iconUrl: "/icons/tabletIcon.svg",
      iconSize: [24, 24]
    },
    categories: []
  },
  {
    group: {
      id: "3",
      parentID: null,
      name: "Smartphones",
      url: "smartphones",
      iconUrl: "/icons/phoneIcon.svg",
      iconSize: [24, 24]
    },
    categories: []
  },
  {
    group: {
      id: "4",
      parentID: null,
      name: "Camera & Photography",
      url: "photography",
      iconUrl: "/icons/cameraIcon.svg",
      iconSize: [24, 24]
    },
    categories: []
  },
  {
    group: {
      id: "5",
      parentID: null,
      name: "TV & Home Theatre",
      url: "tvs",
      iconUrl: "/icons/tvIcon.svg",
      iconSize: [24, 24]
    },
    categories: []
  },
  {
    group: {
      id: "6",
      parentID: null,
      name: "Video Games",
      url: "video-games",
      iconUrl: "/icons/gameIcon.svg",
      iconSize: [24, 24]
    },
    categories: []
  },
  {
    group: {
      id: "7",
      parentID: null,
      name: "Smart Watches",
      url: "watches",
      iconUrl: "/icons/watchIcon.svg",
      iconSize: [24, 24]
    },
    categories: []
  },
  {
    group: {
      id: "8",
      parentID: null,
      name: "Computer Components",
      url: "pc-components",
      iconUrl: "/icons/pcComponentIcon.svg",
      iconSize: [24, 24]
    },
    categories: []
  },
  {
    group: {
      id: "9",
      parentID: null,
      name: "Printers & Ink",
      url: "printers",
      iconUrl: "/icons/printerIcon.svg",
      iconSize: [24, 24]
    },
    categories: []
  },
  {
    group: {
      id: "10",
      parentID: null,
      name: "Audios & Headphones",
      url: "audio",
      iconUrl: "/icons/musicIcon.svg",
      iconSize: [24, 24]
    },
    categories: []
  },
];

const NavBarCategory = ({ isNavbarVisible: isNavbarHide }: TProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useToggleMenu(false, dropdownRef);
  const [categories, setCategories] = useState<TGroupJSON[]>(FALLBACK_CATEGORIES);

  const toggleMenu = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setIsActive(!isActive);
  };

  useEffect(() => {
    const getCategoriesDB = async () => {
      try {
        const result = await getAllCategoriesJSON();
        if (result.res && result.res.length > 0) {
          setCategories(result.res);
        }
        // If no categories from DB, keep using fallback categories
      } catch (error) {
        console.log("Using fallback categories due to DB connection issue");
        // Keep using fallback categories
      }
    };
    getCategoriesDB();
  }, []);

  if (!isNavbarHide && isActive) setIsActive(false);

  return (
    <div className="relative flex items-center select-none">
      <Button
        onClick={toggleMenu}
        className={cn(
          "w-auto px-4 py-2 border rounded-md transition-all duration-300",
          isActive
            ? "border-gray-200 bg-gray-100"
            : "border-white bg-white hover:border-gray-200 hover:bg-gray-100 active:border-gray-300 active:bg-gray-200"
        )}
      >
        <ListIcon width={12} className="fill-gray-600" />
        <span className="text-sm">All Categories</span>
      </Button>
      <div
        ref={dropdownRef}
        className={cn(
          "absolute left-0 top-10 w-64 rounded-lg border border-gray-300 bg-white/90 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300 transform",
          isActive ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
        )}
      >
        {categories.map((item, index) => (
          <Link
            key={index}
            href={`/list/${item.group.url}`}
            className="block px-4 py-3 text-gray-600 text-sm transition-all duration-300 hover:pl-5 hover:bg-gray-100"
          >
            {item.group.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBarCategory;