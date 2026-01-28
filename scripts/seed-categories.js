const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = [
    {
        name: "Computers & Laptops",
        url: "pc-laptops",
        iconUrl: "/icons/computerIcon.svg",
        iconSize: [24, 24],
        subcategories: [
            { name: "Desktop Computers", url: "pc-laptops/computer" },
            { name: "Laptops", url: "pc-laptops/laptops" },
            { name: "Gaming PCs", url: "pc-laptops/gaming-pcs" }
        ]
    },
    {
        name: "Tablets",
        url: "tablets",
        iconUrl: "/icons/tabletIcon.svg",
        iconSize: [24, 24],
        subcategories: [
            { name: "iPad", url: "tablets/ipad" },
            { name: "Android Tablets", url: "tablets/android" },
            { name: "Windows Tablets", url: "tablets/windows" }
        ]
    },
    {
        name: "Smartphones",
        url: "smartphones",
        iconUrl: "/icons/phoneIcon.svg",
        iconSize: [24, 24],
        subcategories: [
            { name: "iPhone", url: "smartphones/iphone" },
            { name: "Samsung", url: "smartphones/samsung" },
            { name: "Android Phones", url: "smartphones/android" }
        ]
    },
    {
        name: "Camera & Photography",
        url: "photography",
        iconUrl: "/icons/cameraIcon.svg",
        iconSize: [24, 24],
        subcategories: [
            { name: "Digital Cameras", url: "photography/cameras" },
            { name: "Lenses", url: "photography/lenses" },
            { name: "Accessories", url: "photography/accessories" }
        ]
    },
    {
        name: "TV & Home Theatre",
        url: "tvs",
        iconUrl: "/icons/tvIcon.svg",
        iconSize: [24, 24],
        subcategories: [
            { name: "Smart TVs", url: "tvs/smart-tv" },
            { name: "4K TVs", url: "tvs/4k-tv" },
            { name: "Home Theatre", url: "tvs/home-theatre" }
        ]
    },
    {
        name: "Video Games",
        url: "video-games",
        iconUrl: "/icons/gameIcon.svg",
        iconSize: [24, 24],
        subcategories: [
            { name: "PlayStation", url: "video-games/playstation" },
            { name: "Xbox", url: "video-games/xbox" },
            { name: "Nintendo", url: "video-games/nintendo" }
        ]
    },
    {
        name: "Smart Watches",
        url: "watches",
        iconUrl: "/icons/watchIcon.svg",
        iconSize: [24, 24],
        subcategories: [
            { name: "Apple Watch", url: "watches/apple-watch" },
            { name: "Samsung Watch", url: "watches/samsung" },
            { name: "Fitness Trackers", url: "watches/fitness" }
        ]
    },
    {
        name: "Computer Components",
        url: "pc-components",
        iconUrl: "/icons/pcComponentIcon.svg",
        iconSize: [24, 24],
        subcategories: [
            { name: "Processors", url: "pc-components/processors" },
            { name: "Graphics Cards", url: "pc-components/graphics" },
            { name: "Memory", url: "pc-components/memory" }
        ]
    },
    {
        name: "Printers & Ink",
        url: "printers",
        iconUrl: "/icons/printerIcon.svg",
        iconSize: [24, 24],
        subcategories: [
            { name: "Inkjet Printers", url: "printers/inkjet" },
            { name: "Laser Printers", url: "printers/laser" },
            { name: "Ink Cartridges", url: "printers/ink" }
        ]
    },
    {
        name: "Audios & Headphones",
        url: "audio",
        iconUrl: "/icons/musicIcon.svg",
        iconSize: [24, 24],
        subcategories: [
            { name: "Headphones", url: "audio/headphones" },
            { name: "Speakers", url: "audio/speakers" },
            { name: "Earbuds", url: "audio/earbuds" }
        ]
    }
];

async function seedCategories() {
    try {
        console.log('Starting to seed categories...');

        // Check if categories already exist
        const existingCategories = await prisma.category.findMany();
        if (existingCategories.length > 0) {
            console.log('Categories already exist, skipping seed...');
            return;
        }

        // Create main categories and their subcategories
        for (const category of categories) {
            // Create main category
            const mainCategory = await prisma.category.create({
                data: {
                    name: category.name,
                    url: category.url,
                    iconUrl: category.iconUrl,
                    iconSize: JSON.stringify(category.iconSize),
                    parentID: null
                }
            });

            console.log(`Created main category: ${category.name}`);

            // Create subcategories
            for (const subcategory of category.subcategories) {
                await prisma.category.create({
                    data: {
                        name: subcategory.name,
                        url: subcategory.url,
                        iconUrl: null,
                        iconSize: JSON.stringify([16, 16]),
                        parentID: mainCategory.id
                    }
                });
                console.log(`  Created subcategory: ${subcategory.name}`);
            }
        }

        console.log('Categories seeded successfully!');
    } catch (error) {
        console.error('Error seeding categories:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedCategories();