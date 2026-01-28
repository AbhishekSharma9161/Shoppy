"use server";

// Mock specification groups data
const mockSpecGroups = [
  {
    id: "spec-1",
    title: "Display",
    specs: ["Screen Size", "Resolution", "Technology", "Refresh Rate"]
  },
  {
    id: "spec-2",
    title: "Performance",
    specs: ["Processor", "RAM", "Storage", "Graphics"]
  },
  {
    id: "spec-3",
    title: "Camera",
    specs: ["Main Camera", "Front Camera", "Video Recording", "Features"]
  },
  {
    id: "spec-4",
    title: "Battery & Charging",
    specs: ["Battery Capacity", "Charging Speed", "Wireless Charging", "Battery Life"]
  },
  {
    id: "spec-5",
    title: "Connectivity",
    specs: ["Network", "WiFi", "Bluetooth", "Ports"]
  }
];

export const getCategorySpecs = async (categoryID: string) => {
  if (!categoryID || categoryID === "") return { error: "Invalid Category ID" };

  try {
    // Mock implementation - return relevant specs based on category
    let specifications = [];

    if (categoryID.startsWith('3')) { // Smartphones
      specifications = mockSpecGroups.filter(spec =>
        ['Display', 'Performance', 'Camera', 'Battery & Charging', 'Connectivity'].includes(spec.title)
      );
    } else if (categoryID.startsWith('2')) { // Tablets
      specifications = mockSpecGroups.filter(spec =>
        ['Display', 'Performance', 'Battery & Charging', 'Connectivity'].includes(spec.title)
      );
    } else if (categoryID.startsWith('1')) { // Laptops
      specifications = mockSpecGroups.filter(spec =>
        ['Display', 'Performance', 'Battery & Charging', 'Connectivity'].includes(spec.title)
      );
    } else {
      // Default specs for other categories
      specifications = mockSpecGroups.slice(0, 3);
    }

    return { res: specifications };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};
