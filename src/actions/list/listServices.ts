"use server";
import { TFilters, TListItem } from "@/domains/store/productList/types";
import { TListSort } from "@/domains/store/productList/types/";
import { mockCategories } from "@/shared/data/mockCategories";
import { mockProducts } from "@/shared/data/mockProducts";
import { TProductPath } from "@/shared/types/product";

export const getList = async (path: string, sortData: TListSort, filters: TFilters) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const pathArray = pathToArray(path);
  if (!pathArray || pathArray.length > 3 || pathArray.length === 0) {
    return { error: "Invalid Path" };
  }

  const categoryInfo = findCategoryFromPath(pathArray);
  if (!categoryInfo) {
    return { error: "Invalid Path Name" };
  }

  const subCategories = getSubCategories(categoryInfo.id);
  const products = getFilteredProducts(categoryInfo.id, sortData, filters);

  return {
    products: products,
    subCategories: subCategories
  };
};

const pathToArray = (path: string) => {
  const pathWithoutList = path.split("/list/")[1];
  return pathWithoutList ? pathWithoutList.split("/") : [];
};

const findCategoryFromPath = (pathArray: string[]) => {
  const currentCategories = mockCategories;
  let foundCategory = null;

  for (const pathSegment of pathArray) {
    foundCategory = currentCategories.find(cat => cat.url.endsWith(pathSegment));
    if (!foundCategory) {
      // Try to find in subcategories
      for (const mainCat of mockCategories) {
        const subCat = mainCat.subcategories?.find(sub => sub.url.endsWith(pathSegment));
        if (subCat) {
          foundCategory = subCat;
          break;
        }
      }
    }
    if (!foundCategory) return null;
  }

  return foundCategory;
};

const getSubCategories = (categoryId: string): TProductPath[] => {
  const mainCategory = mockCategories.find(cat => cat.id === categoryId);
  if (mainCategory && mainCategory.subcategories) {
    return mainCategory.subcategories.map(sub => ({
      label: sub.name,
      url: sub.url.split('/').pop() || sub.url
    }));
  }
  return [];
};

const getFilteredProducts = (categoryId: string, sortData: TListSort, filters: TFilters): TListItem[] => {
  const filteredProducts = mockProducts.filter(product => {
    // Filter by category
    if (!product.categoryID.startsWith(categoryId.split('-')[0])) {
      return false;
    }

    // Filter by availability
    if (filters.stockStatus === "inStock" && !product.isAvailable) return false;
    if (filters.stockStatus === "outStock" && product.isAvailable) return false;

    // Filter by price
    if (filters.priceMinMax[1] > 0) {
      if (product.price < filters.priceMinMax[0] || product.price > filters.priceMinMax[1]) {
        return false;
      }
    }

    // Filter by brands
    const selectedBrands = filters.brands.filter(b => b.isSelected).map(b => b.id);
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand.id)) {
      return false;
    }

    return true;
  });

  // Sort products
  filteredProducts.sort((a, b) => {
    const aValue = a[sortData.sortName as keyof typeof a];
    const bValue = b[sortData.sortName as keyof typeof b];

    // Handle null values - treat null as smaller than any value
    if (aValue === null && bValue === null) return 0;
    if (aValue === null) return sortData.sortType === "asc" ? -1 : 1;
    if (bValue === null) return sortData.sortType === "asc" ? 1 : -1;

    if (sortData.sortType === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return filteredProducts as TListItem[];
};
