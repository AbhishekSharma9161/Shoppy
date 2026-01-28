"use client";

import { useEffect, useState } from "react";
import { getAnalytics, getTopSellingProducts } from "@/actions/analytics/analyticsServices";
import { mockProducts } from "@/shared/data/mockProducts";

const DemoPage = () => {
    const [analytics, setAnalytics] = useState<any>(null);
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const [analyticsData, topProductsData] = await Promise.all([
                getAnalytics(),
                getTopSellingProducts()
            ]);

            setAnalytics(analyticsData);
            setTopProducts(topProductsData);
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="mt-40 bg-white min-h-screen">
                <div className="storeContainer py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-32 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-40 bg-white min-h-screen">
            <div className="storeContainer py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Shoppy Analytics Demo</h1>
                    <p className="text-gray-600">Complete e-commerce analytics dashboard for interview demonstration</p>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="text-sm font-medium text-blue-600 mb-2">Total Products</h3>
                        <p className="text-3xl font-bold text-blue-900">{analytics?.overview.totalProducts}</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h3 className="text-sm font-medium text-green-600 mb-2">In Stock</h3>
                        <p className="text-3xl font-bold text-green-900">{analytics?.overview.inStockProducts}</p>
                    </div>
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                        <h3 className="text-sm font-medium text-red-600 mb-2">Out of Stock</h3>
                        <p className="text-3xl font-bold text-red-900">{analytics?.overview.outOfStockProducts}</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                        <h3 className="text-sm font-medium text-purple-600 mb-2">On Sale</h3>
                        <p className="text-3xl font-bold text-purple-900">{analytics?.overview.productsOnSale}</p>
                    </div>
                </div>

                {/* Top Brands */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">🏆 Top Brands</h2>
                        <div className="space-y-3">
                            {analytics?.topBrands.map((brand: any, index: number) => (
                                <div key={brand.brand} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                                            {index + 1}
                                        </span>
                                        <span className="font-medium text-gray-900">{brand.brand}</span>
                                    </div>
                                    <span className="text-gray-600">{brand.count} products</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Distribution */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">💰 Price Distribution</h2>
                        <div className="space-y-3">
                            {analytics?.priceRanges.map((range: any) => (
                                <div key={range.range} className="flex items-center justify-between">
                                    <span className="text-gray-700">{range.range}</span>
                                    <div className="flex items-center">
                                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{ width: `${(range.count / analytics.overview.totalProducts) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-gray-600 w-8 text-right">{range.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📱 Category Distribution</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {analytics?.categoryDistribution.map((category: any) => (
                            <div key={category.category} className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-gray-900 mb-2">{category.category}</h3>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total:</span>
                                        <span className="font-medium">{category.count}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-green-600">In Stock:</span>
                                        <span className="font-medium text-green-700">{category.inStock}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-orange-600">On Sale:</span>
                                        <span className="font-medium text-orange-700">{category.onSale}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Selling Products */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">🔥 Top Selling Products</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Rank</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Brand</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Sales</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.slice(0, 8).map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-medium">
                                                {product.rank}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {product.isAvailable ? '✅ In Stock' : '❌ Out of Stock'}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">{product.brand.name}</td>
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900">
                                                ${product.salePrice || product.price}
                                            </div>
                                            {product.salePrice && (
                                                <div className="text-sm text-gray-500 line-through">
                                                    ${product.price}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">{product.salesCount}</td>
                                        <td className="py-3 px-4 font-medium text-green-600">
                                            ${product.revenue.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📈 Recent Activity</h2>
                    <div className="space-y-3">
                        {analytics?.recentActivity.map((activity: any) => (
                            <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'product' ? 'bg-blue-500' : 'bg-green-500'
                                    }`}></div>
                                <div className="flex-1">
                                    <p className="text-gray-900">{activity.activity}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(activity.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interview Notes */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Interview Demo Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">✅ Completed Features:</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• {mockProducts.length}+ Products across 10 categories</li>
                                <li>• Advanced search with multi-field filtering</li>
                                <li>• Out-of-stock management system</li>
                                <li>• Real-time analytics dashboard</li>
                                <li>• Responsive design (mobile-first)</li>
                                <li>• TypeScript for type safety</li>
                                <li>• Mock data architecture</li>
                                <li>• Professional UI/UX design</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">🚀 Technical Highlights:</h3>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Next.js 14 with App Router</li>
                                <li>• Server Actions for data fetching</li>
                                <li>• Tailwind CSS for styling</li>
                                <li>• Redux for state management</li>
                                <li>• Component-based architecture</li>
                                <li>• SEO optimized with SSR</li>
                                <li>• Performance optimized</li>
                                <li>• Production-ready codebase</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoPage;