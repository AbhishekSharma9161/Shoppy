"use server";
import { z } from "zod";

import { TRAFFIC_LIST_PAGE_SIZE } from "@/shared/constants/admin/trafficView";
import { TAddPageVisit } from "@/shared/types/common";

const ValidatePageVisit = z.object({
  pageType: z.enum(["MAIN", "LIST", "PRODUCT"]),
});

export type TTrafficListItem = {
  id: string;
  time: Date | null;
  pageType: "MAIN" | "LIST" | "PRODUCT";
  pagePath: string | null;
  productID: string | null;
  deviceResolution: string | null;
  product: {
    name: string;
    category: {
      name: string;
    };
  } | null;
};

// Mock traffic data
const mockTrafficData: TTrafficListItem[] = [
  {
    id: "visit-1",
    time: new Date(),
    pageType: "MAIN",
    pagePath: "/",
    productID: null,
    deviceResolution: "1920x1080",
    product: null
  },
  {
    id: "visit-2",
    time: new Date(Date.now() - 3600000),
    pageType: "PRODUCT",
    pagePath: "/product/iphone-1",
    productID: "iphone-1",
    deviceResolution: "1366x768",
    product: {
      name: "iPhone 15 Pro Max",
      category: {
        name: "Smartphones"
      }
    }
  },
  {
    id: "visit-3",
    time: new Date(Date.now() - 7200000),
    pageType: "LIST",
    pagePath: "/list/smartphones",
    productID: null,
    deviceResolution: "1920x1080",
    product: null
  }
];

export const addVisit = async (data: TAddPageVisit) => {
  if (process.env.NODE_ENV !== "production") return { error: "Invalid ENV!" };

  if (!ValidatePageVisit.safeParse(data).success) return { error: "Invalid Data!" };

  try {
    // Mock implementation - simulate adding visit
    const newVisit = {
      id: `visit-${Date.now()}`,
      time: new Date(),
      pageType: data.pageType,
      pagePath: data.pagePath,
      productID: data.productID,
      deviceResolution: data.deviceResolution,
    };

    return { res: newVisit };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const getTrafficReport = async (skip: number = 0) => {
  try {
    // Mock implementation - return paginated traffic data
    const list = mockTrafficData.slice(skip, skip + TRAFFIC_LIST_PAGE_SIZE);
    const totalCount = mockTrafficData.length;

    return { res: { list, totalCount } };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const deleteTraffic = async (id: string) => {
  if (!id || id === "") return { error: "Invalid Data!" };

  try {
    // Mock implementation - simulate deletion
    const visitExists = mockTrafficData.find(v => v.id === id);
    if (!visitExists) {
      return { error: "Visit not found" };
    }

    return { res: { id, deleted: true } };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};
