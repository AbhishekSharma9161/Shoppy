"use server";
import { mockProducts } from "@/shared/data/mockProducts";
import { mockCategories } from "@/shared/data/mockCategories";

interface Product {
    id: string;
    name: string;
    price: number;
    salePrice: number | null;
    isAvailable: boolean;
    categoryID: string;
    brand: { id: string; name: string };
}

// Mock analytics data for interview demonstration
export const getAnalytics = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const totalProducts = mockProducts.length;
    const inStockProducts = mockProducts.filter((p: Product) => p.isAvailable).length;
    const outOfStockProducts = totalProducts - inStockProducts;
    const productsOnSale = mockProducts.filter((p: Product) => p.salePrice).length;

    // Calculate average price
    const avgPrice = mockProducts.reduce((sum: number, p: Product) => sum + p.price, 0) / totalProducts;

    // Top brands by product count
    const brandCounts = mockProducts.reduce((acc: Record<string, number>, product: Product) => {
        acc[product.brand.name] = (acc[product.brand.name] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const topBrands = Object.entries(brandCounts)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 5)
        .map(([brand, count]) => ({ brand, count }));

    // Category distribution
    const categoryDistribution = mockCategories.map(category => {
        const categoryProducts = mockProducts.filter((p: Product) =>
            p.categoryID.startsWith(category.id)
        );
        return {
            category: category.name,
            count: categoryProducts.length,
            inStock: categoryProducts.filter((p: Product) => p.isAvailable).length,
            onSale: categoryProducts.filter((p: Product) => p.salePrice).length
        };
    });

    // Price ranges
    const priceRanges = [
        { range: "$0 - $100", count: mockProducts.filter((p: Product) => p.price <= 100).length },
        { range: "$100 - $500", count: mockProducts.filter((p: Product) => p.price > 100 && p.price <= 500).length },
        { range: "$500 - $1000", count: mockProducts.filter((p: Product) => p.price > 500 && p.price <= 1000).length },
        { range: "$1000 - $2000", count: mockProducts.filter((p: Product) => p.price > 1000 && p.price <= 2000).length },
        { range: "$2000+", count: mockProducts.filter((p: Product) => p.price > 2000).length }
    ];

    return {
        overview: {
            totalProducts,
            inStockProducts,
            outOfStockProducts,
            productsOnSale,
            avgPrice: Math.round(avgPrice * 100) / 100,
            totalCategories: mockCategories.length
        },
        topBrands,
        categoryDistribution,
        priceRanges,
        recentActivity: generateRecentActivity()
    };
};

const generateRecentActivity = () => {
    const activities = [
        "New iPhone 15 Pro Max added to inventory",
        "Samsung Galaxy S24 Ultra marked as out of stock",
        "Price updated for MacBook Pro 16 M3 Max",
        "New category 'Gaming Accessories' created",
        "Bulk import of 15 new camera products completed",
        "Sony WH-1000XM5 restocked - 50 units added",
        "Holiday sale prices activated for Apple products",
        "Inventory audit completed for Electronics category"
    ];

    return activities.slice(0, 5).map((activity: string, index: number) => ({
        id: index + 1,
        activity,
        timestamp: new Date(Date.now() - (index * 2 * 60 * 60 * 1000)).toISOString(),
        type: index % 2 === 0 ? 'product' : 'system'
    }));
};

export const getTopSellingProducts = async () => {
    await new Promise(resolve => setTimeout(resolve, 150));

    // Mock top selling products (products with sale prices are "popular")
    const topProducts = mockProducts
        .filter((p: Product) => p.salePrice || p.price < 1000) // Popular criteria
        .sort((a: Product, b: Product) => (b.salePrice ? b.price - b.salePrice : 0) - (a.salePrice ? a.price - a.salePrice : 0))
        .slice(0, 10)
        .map((product: Product, index: number) => ({
            ...product,
            rank: index + 1,
            salesCount: Math.floor(Math.random() * 500) + 100, // Mock sales
            revenue: Math.floor((product.salePrice || product.price) * (Math.random() * 500 + 100))
        }));

    return topProducts;
};