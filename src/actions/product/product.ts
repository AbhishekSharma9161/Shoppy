"use server";
import { z } from "zod";

import { mockCategories } from "@/shared/data/mockCategories";
import { mockProducts } from "@/shared/data/mockProducts";
import {
  TAddProductFormValues,
  TPath,
  TSpecification,
} from "@/shared/types/product";

const ValidateAddProduct = z.object({
  name: z.string().min(3),
  brandID: z.string().min(6),
  specialFeatures: z.array(z.string()),
  desc: z.string().optional(),
  images: z.array(z.string()),
  categoryID: z.string().min(6),
  price: z.string().min(1),
  salePrice: z.string(),
  specifications: z.array(
    z.object({
      specGroupID: z.string().min(6),
      specValues: z.array(z.string()),
    })
  ),
});

const convertStringToFloat = (str: string) => {
  str.replace(/,/, ".");
  return str ? parseFloat(str) : 0.0;
};

export const addProduct = async (data: TAddProductFormValues) => {
  if (!ValidateAddProduct.safeParse(data).success) return { error: "Invalid Data!" };

  try {
    const price = convertStringToFloat(data.price);
    const salePrice = data.salePrice ? convertStringToFloat(data.salePrice) : null;

    // Mock implementation - simulate adding product
    const newProduct = {
      id: `product-${Date.now()}`,
      name: data.name,
      price: price,
      salePrice: salePrice,
      isAvailable: data.isAvailable,
      images: data.images,
      specialFeatures: data.specialFeatures,
      categoryID: data.categoryID,
      brand: { id: data.brandID, name: "Mock Brand" }
    };

    return { res: newProduct };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const getAllProducts = async () => {
  try {
    // Return mock products with category information
    const result = mockProducts.map(product => ({
      id: product.id,
      name: product.name,
      category: {
        id: product.categoryID,
        name: mockCategories.find(cat => product.categoryID.startsWith(cat.id))?.name || "Unknown"
      }
    }));

    return { res: result };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const getOneProduct = async (productID: string) => {
  if (!productID || productID === "") return { error: "Invalid Product ID!" };

  try {
    const product = mockProducts.find(p => p.id === productID);
    if (!product) {
      return { error: "Product not found" };
    }

    // Transform the basic product to TProductPageInfo format
    const productPageInfo = {
      id: product.id,
      name: product.name,
      isAvailable: product.isAvailable,
      desc: `Experience the ${product.name} with ${product.specialFeatures.join(", ")}. This premium ${product.brand.name} product delivers exceptional performance and quality.`,
      images: product.images,
      optionSets: [], // Mock empty option sets
      specialFeatures: product.specialFeatures,
      price: product.price,
      salePrice: product.salePrice,
      specifications: [
        {
          groupName: "General",
          specs: [
            { name: "Brand", value: product.brand.name },
            { name: "Model", value: product.name },
            { name: "Availability", value: product.isAvailable ? "In Stock" : "Out of Stock" }
          ]
        }
      ],
      path: [
        { id: "1", parentID: null, name: "Home", url: "/" },
        { id: "2", parentID: "1", name: "Products", url: "/products" },
        { id: product.id, parentID: "2", name: product.name, url: `/product/${product.id}` }
      ]
    };

    return { res: productPageInfo };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const getCartProducts = async (productIDs: string[]) => {
  if (!productIDs || productIDs.length === 0) return { error: "Invalid Product List" };

  try {
    const result = mockProducts
      .filter(product => productIDs.includes(product.id))
      .map(product => ({
        id: product.id,
        name: product.name,
        images: product.images,
        price: product.price,
        salePrice: product.salePrice,
      }));

    return { res: result };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const deleteProduct = async (productID: string) => {
  if (!productID || productID === "") return { error: "Invalid Data!" };

  try {
    // Mock implementation - simulate deletion
    const productExists = mockProducts.find(p => p.id === productID);
    if (!productExists) {
      return { error: "Product not found" };
    }

    return { res: { id: productID, deleted: true } };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};
