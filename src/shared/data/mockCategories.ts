export const mockCategories = [
    {
        id: "1",
        name: "Computers & Laptops",
        url: "pc-laptops",
        iconUrl: "/icons/computerIcon.svg",
        iconSize: [24, 24],
        parentID: null,
        subcategories: [
            { id: "1-1", name: "Desktop Computers", url: "pc-laptops/computer", parentID: "1" },
            { id: "1-2", name: "Laptops", url: "pc-laptops/laptops", parentID: "1" },
            { id: "1-3", name: "Gaming PCs", url: "pc-laptops/gaming-pcs", parentID: "1" }
        ]
    },
    {
        id: "2",
        name: "Tablets",
        url: "tablets",
        iconUrl: "/icons/tabletIcon.svg",
        iconSize: [24, 24],
        parentID: null,
        subcategories: [
            { id: "2-1", name: "iPad", url: "tablets/ipad", parentID: "2" },
            { id: "2-2", name: "Android Tablets", url: "tablets/android", parentID: "2" },
            { id: "2-3", name: "Windows Tablets", url: "tablets/windows", parentID: "2" }
        ]
    },
    {
        id: "3",
        name: "Smartphones",
        url: "smartphones",
        iconUrl: "/icons/phoneIcon.svg",
        iconSize: [24, 24],
        parentID: null,
        subcategories: [
            { id: "3-1", name: "iPhone", url: "smartphones/iphone", parentID: "3" },
            { id: "3-2", name: "Samsung", url: "smartphones/samsung", parentID: "3" },
            { id: "3-3", name: "Android Phones", url: "smartphones/android", parentID: "3" }
        ]
    },
    {
        id: "4",
        name: "Camera & Photography",
        url: "photography",
        iconUrl: "/icons/cameraIcon.svg",
        iconSize: [24, 24],
        parentID: null,
        subcategories: [
            { id: "4-1", name: "Digital Cameras", url: "photography/cameras", parentID: "4" },
            { id: "4-2", name: "Lenses", url: "photography/lenses", parentID: "4" },
            { id: "4-3", name: "Accessories", url: "photography/accessories", parentID: "4" }
        ]
    },
    {
        id: "5",
        name: "TV & Home Theatre",
        url: "tvs",
        iconUrl: "/icons/tvIcon.svg",
        iconSize: [24, 24],
        parentID: null,
        subcategories: [
            { id: "5-1", name: "Smart TVs", url: "tvs/smart-tv", parentID: "5" },
            { id: "5-2", name: "4K TVs", url: "tvs/4k-tv", parentID: "5" },
            { id: "5-3", name: "Home Theatre", url: "tvs/home-theatre", parentID: "5" }
        ]
    },
    {
        id: "6",
        name: "Video Games",
        url: "video-games",
        iconUrl: "/icons/gameIcon.svg",
        iconSize: [24, 24],
        parentID: null,
        subcategories: [
            { id: "6-1", name: "PlayStation", url: "video-games/playstation", parentID: "6" },
            { id: "6-2", name: "Xbox", url: "video-games/xbox", parentID: "6" },
            { id: "6-3", name: "Nintendo", url: "video-games/nintendo", parentID: "6" }
        ]
    },
    {
        id: "7",
        name: "Smart Watches",
        url: "watches",
        iconUrl: "/icons/watchIcon.svg",
        iconSize: [24, 24],
        parentID: null,
        subcategories: [
            { id: "7-1", name: "Apple Watch", url: "watches/apple-watch", parentID: "7" },
            { id: "7-2", name: "Samsung Watch", url: "watches/samsung", parentID: "7" },
            { id: "7-3", name: "Fitness Trackers", url: "watches/fitness", parentID: "7" }
        ]
    },
    {
        id: "8",
        name: "Computer Components",
        url: "pc-components",
        iconUrl: "/icons/pcComponentIcon.svg",
        iconSize: [24, 24],
        parentID: null,
        subcategories: [
            { id: "8-1", name: "Processors", url: "pc-components/processors", parentID: "8" },
            { id: "8-2", name: "Graphics Cards", url: "pc-components/graphics", parentID: "8" },
            { id: "8-3", name: "Memory", url: "pc-components/memory", parentID: "8" }
        ]
    },
    {
        id: "9",
        name: "Printers & Ink",
        url: "printers",
        iconUrl: "/icons/printerIcon.svg",
        iconSize: [24, 24],
        parentID: null,
        subcategories: [
            { id: "9-1", name: "Inkjet Printers", url: "printers/inkjet", parentID: "9" },
            { id: "9-2", name: "Laser Printers", url: "printers/laser", parentID: "9" },
            { id: "9-3", name: "Ink Cartridges", url: "printers/ink", parentID: "9" }
        ]
    },
    {
        id: "10",
        name: "Audios & Headphones",
        url: "audio",
        iconUrl: "/icons/musicIcon.svg",
        iconSize: [24, 24],
        parentID: null,
        subcategories: [
            { id: "10-1", name: "Headphones", url: "audio/headphones", parentID: "10" },
            { id: "10-2", name: "Speakers", url: "audio/speakers", parentID: "10" },
            { id: "10-3", name: "Earbuds", url: "audio/earbuds", parentID: "10" }
        ]
    }
];