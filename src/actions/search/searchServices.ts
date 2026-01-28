"use server";
import { TListItem } from "@/domains/store/productList/types";
import { mockProducts } from "@/shared/data/mockProducts";

export const searchProducts = async (searchQuery: string): Promise<{ products: TListItem[], error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!searchQuery || searchQuery.trim().length < 2) {
        return { products: [], error: "Search query too short" };
    }

    const query = searchQuery.toLowerCase().trim();

    const filteredProducts = mockProducts.filter(product => {
        // Search in product name
        if (product.name.toLowerCase().includes(query)) return true;

        // Search in brand name
        if (product.brand.name.toLowerCase().includes(query)) return true;

        // Search in special features
        if (product.specialFeatures.some(feature =>
            feature.toLowerCase().includes(query)
        )) return true;

        return false;
    });

    // Sort by relevance (exact matches first, then partial matches)
    filteredProducts.sort((a, b) => {
        const aNameMatch = a.name.toLowerCase().includes(query);
        const bNameMatch = b.name.toLowerCase().includes(query);

        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;

        return 0;
    });

    return { products: filteredProducts as TListItem[] };
};