"use client";

import { useState } from "react";

import { TGroupJSON } from "@/shared/types/categories";

import CategoryListItem from "./catListItem";

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

export const HomeCategoryList = () => {
  const [categories] = useState<TGroupJSON[]>(FALLBACK_CATEGORIES);

  // Temporarily disabled database call to ensure categories always show
  // useEffect(() => {
  //   const getCategoriesDB = async () => {
  //     try {
  //       const result = await getAllCategoriesJSON();
  //       // Only update if we get a successful result with actual categories
  //       if (result.res && Array.isArray(result.res) && result.res.length > 0) {
  //         setCategories(result.res);
  //       }
  //       // If result.res is empty array or undefined, keep fallback categories
  //     } catch (error) {
  //       console.log("Using fallback categories due to DB connection issue");
  //       // Keep fallback categories - don't change state
  //     }
  //   };
  //   getCategoriesDB();
  // }, []);

  return (
    <div className="min-w-[256px] absolute h-[500px] hidden lg:block bg-white mr-4 rounded-xl px-6 text-gray-800 shadow-md z-[3]">
      <ul className="mt-3">
        {categories.map((item, index) => (
          <CategoryListItem
            key={index}
            categoryData={item}
            className={index === categories.length - 1 ? "border-b-0" : ""}
          />
        ))}
      </ul>
    </div>
  );
};
