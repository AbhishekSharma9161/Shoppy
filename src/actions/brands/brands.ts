"use server";
import { z } from "zod";

import { mockBrands } from "@/shared/data/mockProducts";
import { TBrand } from "@/shared/types";

const ValidateUpdateBrand = z.object({
  id: z.string().min(6),
  name: z.string().min(3),
});

export const addBrand = async (brandName: string) => {
  if (!brandName || brandName === "") return { error: "Invalid Data!" };

  try {
    // Mock implementation - simulate adding brand
    const newBrand = {
      id: `brand-${Date.now()}`,
      name: brandName,
    };

    return { res: newBrand };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const getAllBrands = async () => {
  try {
    // Return mock brands data
    const result = mockBrands.map(brand => ({
      id: brand.id,
      name: brand.name
    }));

    return { res: result };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const deleteBrand = async (brandID: string) => {
  if (!brandID || brandID === "") return { error: "Invalid Data!" };

  try {
    // Mock implementation - simulate deletion
    const brandExists = mockBrands.find(b => b.id === brandID);
    if (!brandExists) {
      return { error: "Brand not found" };
    }

    return { res: { id: brandID, deleted: true } };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const updateBrand = async (data: TBrand) => {
  if (!ValidateUpdateBrand.safeParse(data).success) return { error: "Invalid Data!" };

  try {
    // Mock implementation - simulate update
    const brandExists = mockBrands.find(b => b.id === data.id);
    if (!brandExists) {
      return { error: "Brand not found" };
    }

    const updatedBrand = {
      id: data.id,
      name: data.name,
    };

    return { res: updatedBrand };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};
