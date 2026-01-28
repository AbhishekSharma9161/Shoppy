"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { searchProducts } from "@/actions/search/searchServices";
import ProductCard from "@/domains/product/components/productCard";
import { ProductListSkeleton } from "@/domains/store/productList/components";
import { TListItem } from "@/domains/store/productList/types";
import { IMAGE_BASE_URL } from "@/shared/constants/store";

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [products, setProducts] = useState<TListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const performSearch = async () => {
            if (!query) {
                setProducts([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const result = await searchProducts(query);
                if (result.error) {
                    setError(result.error);
                } else {
                    setProducts(result.products);
                }
            } catch (err) {
                setError("An error occurred while searching");
            } finally {
                setIsLoading(false);
            }
        };

        performSearch();
    }, [query]);

    if (isLoading) {
        return (
            <div className="mt-40 bg-white">
                <div className="storeContainer">
                    <div className="w-full h-auto md:h-[130px] py-5 px-2.5 md:p-0 flex flex-col justify-center items-center bg-gray-200/80">
                        <h1 className="text-2xl block font-light text-gray-900 mb-2">
                            Searching for "{query}"
                        </h1>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-7 ml-2 mb-[400px]">
                        <ProductListSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-40 bg-white">
            <div className="storeContainer">
                <div className="w-full h-auto md:h-[130px] py-5 px-2.5 md:p-0 flex flex-col justify-center items-center bg-gray-200/80">
                    <h1 className="text-2xl block font-light text-gray-900 mb-2">
                        Search Results
                    </h1>
                    <p className="text-gray-600">
                        {query ? `Results for "${query}"` : "Enter a search term"}
                    </p>
                    {products.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                            Found {products.length} product{products.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                <div className="py-8">
                    {error ? (
                        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                            <span className="text-red-500">{error}</span>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                            <span className="text-gray-500">
                                {query ? `No products found for "${query}"` : "Enter a search term to find products"}
                            </span>
                            {query && (
                                <div className="text-sm text-gray-400">
                                    <p>Try searching for:</p>
                                    <ul className="list-disc list-inside mt-2">
                                        <li>Product names (iPhone, MacBook, PlayStation)</li>
                                        <li>Brand names (Apple, Samsung, Sony)</li>
                                        <li>Product features (camera, gaming, wireless)</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-2 mb-14">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    imgUrl={[IMAGE_BASE_URL + product.images[0], IMAGE_BASE_URL + product.images[1]]}
                                    name={product.name}
                                    price={product.price}
                                    isAvailable={product.isAvailable}
                                    dealPrice={product.salePrice || undefined}
                                    specs={product.specialFeatures}
                                    url={"/product/" + product.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;