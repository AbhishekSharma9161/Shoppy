"use server";
import { mockCategories } from "@/shared/data/mockCategories";
import { mockBrands } from "@/shared/data/mockProducts";
import { TCategory, TGroupJSON } from "@/shared/types/categories";

export const getAllCategories = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const allCategories = [
    ...mockCategories,
    ...mockCategories.flatMap(cat => cat.subcategories || [])
  ];

  return { res: allCategories };
};

export const getAllCategoriesJSON = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const groups: TGroupJSON[] = mockCategories.map(cat => ({
    group: {
      id: cat.id,
      name: cat.name,
      url: cat.url,
      iconUrl: cat.iconUrl,
      iconSize: cat.iconSize,
      parentID: null
    },
    categories: (cat.subcategories || []).map(sub => ({
      category: {
        id: sub.id,
        name: sub.name,
        url: sub.url,
        iconUrl: null,
        iconSize: [16, 16],
        parentID: cat.id
      },
      subCategories: []
    }))
  }));

  return { res: groups };
};

export const addCategory = async (data: any) => {
  // Mock implementation - just return success
  await new Promise(resolve => setTimeout(resolve, 300));
  return { res: { id: Date.now().toString(), ...data } };
};

export const updateCategory = async (data: any) => {
  // Mock implementation - just return success
  await new Promise(resolve => setTimeout(resolve, 300));
  return { res: data };
};

export const deleteCategory = async (id: string) => {
  // Mock implementation - just return success
  await new Promise(resolve => setTimeout(resolve, 300));
  return { res: `Deleted category ${id}` };
};
