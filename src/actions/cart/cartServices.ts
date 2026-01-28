"use server";
import { mockProducts } from "@/shared/data/mockProducts";

interface Product {
    id: string;
    name: string;
    price: number;
    salePrice: number | null;
    images: string[];
    isAvailable: boolean;
    brand: { id: string; name: string };
}

export const getCartProducts = async (productIds: string[]) => {
    await new Promise(resolve => setTimeout(resolve, 200));

    if (!productIds || productIds.length === 0) {
        return { products: [], error: null };
    }

    const cartProducts = mockProducts
        .filter((product: Product) => productIds.includes(product.id))
        .map((product: Product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            salePrice: product.salePrice,
            images: product.images,
            isAvailable: product.isAvailable,
            brand: product.brand
        }));

    return { products: cartProducts, error: null };
};

export const validateCartItems = async (items: Array<{ id: string, quantity: number }>) => {
    await new Promise(resolve => setTimeout(resolve, 100));

    const validatedItems = [];
    const errors = [];

    for (const item of items) {
        const product = mockProducts.find((p: Product) => p.id === item.id);

        if (!product) {
            errors.push(`Product ${item.id} not found`);
            continue;
        }

        if (!product.isAvailable) {
            errors.push(`${product.name} is currently out of stock`);
            continue;
        }

        if (item.quantity <= 0) {
            errors.push(`Invalid quantity for ${product.name}`);
            continue;
        }

        validatedItems.push({
            ...item,
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
                salePrice: product.salePrice,
                images: product.images,
                isAvailable: product.isAvailable
            }
        });
    }

    return { validatedItems, errors };
};