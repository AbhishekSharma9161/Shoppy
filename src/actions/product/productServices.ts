"use server";
import { mockCategories } from "@/shared/data/mockCategories";
import { mockProducts } from "@/shared/data/mockProducts";

export const getProductById = async (productId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const product = mockProducts.find(p => p.id === productId);

    if (!product) {
        return { error: "Product not found" };
    }

    // Get category path for breadcrumbs
    const categoryPath = getCategoryPath(product.categoryID);

    // Get related products (same category)
    const relatedProducts = mockProducts
        .filter(p => p.categoryID === product.categoryID && p.id !== product.id)
        .slice(0, 4);

    // Mock specifications based on category
    const specifications = generateSpecifications(product);

    return {
        product: {
            ...product,
            path: categoryPath,
            specifications,
            desc: generateDescription(product)
        },
        relatedProducts,
        error: null
    };
};

const getCategoryPath = (categoryId: string) => {
    const path = [];

    // Find the category
    for (const mainCat of mockCategories) {
        if (mainCat.id === categoryId) {
            path.push({ name: mainCat.name, url: mainCat.url });
            break;
        }

        const subCat = mainCat.subcategories?.find(sub => sub.id === categoryId);
        if (subCat) {
            path.push({ name: mainCat.name, url: mainCat.url });
            path.push({ name: subCat.name, url: subCat.url });
            break;
        }
    }

    return path;
};

interface Product {
    id: string;
    name: string;
    price: number;
    salePrice: number | null;
    isAvailable: boolean;
    images: string[];
    specialFeatures: string[];
    categoryID: string;
    brand: { id: string; name: string };
}

const generateSpecifications = (product: Product) => {
    const specs = [];

    if (product.categoryID.startsWith('3')) { // Smartphones
        specs.push({
            groupName: "Display",
            specs: [
                { name: "Screen Size", value: "6.1 inches" },
                { name: "Resolution", value: "2556 x 1179 pixels" },
                { name: "Technology", value: "Super Retina XDR OLED" }
            ]
        });
        specs.push({
            groupName: "Performance",
            specs: [
                { name: "Processor", value: product.specialFeatures[0] || "Advanced Processor" },
                { name: "RAM", value: "8GB" },
                { name: "Storage", value: "128GB / 256GB / 512GB" }
            ]
        });
    } else if (product.categoryID.startsWith('1')) { // Laptops
        specs.push({
            groupName: "Performance",
            specs: [
                { name: "Processor", value: product.specialFeatures[0] || "Intel Core i7" },
                { name: "RAM", value: "16GB DDR4" },
                { name: "Storage", value: "512GB SSD" }
            ]
        });
        specs.push({
            groupName: "Display",
            specs: [
                { name: "Screen Size", value: "14 inches" },
                { name: "Resolution", value: "2560 x 1600" },
                { name: "Refresh Rate", value: "60Hz" }
            ]
        });
    } else if (product.categoryID.startsWith('7')) { // Watches
        specs.push({
            groupName: "Health & Fitness",
            specs: [
                { name: "Heart Rate Monitor", value: "Yes" },
                { name: "GPS", value: "Built-in" },
                { name: "Water Resistance", value: "50 meters" }
            ]
        });
        specs.push({
            groupName: "Connectivity",
            specs: [
                { name: "Bluetooth", value: "5.0" },
                { name: "Wi-Fi", value: "802.11 b/g/n" },
                { name: "Cellular", value: "Optional" }
            ]
        });
    }

    // Add general specs
    specs.push({
        groupName: "General",
        specs: [
            { name: "Brand", value: product.brand.name },
            { name: "Model", value: product.name },
            { name: "Warranty", value: "1 Year" },
            { name: "In Stock", value: product.isAvailable ? "Yes" : "No" }
        ]
    });

    return specs;
};

const generateDescription = (product: Product) => {
    const features = product.specialFeatures.join(", ");
    return `Experience the ${product.name} with ${features}. This premium ${product.brand.name} product delivers exceptional performance and quality. Perfect for users who demand the best in technology and design.`;
};