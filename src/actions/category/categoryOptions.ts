"use server";

import { z } from "zod";

import { TOptionSet, TSingleOption, TSingleSpec, TSpecGroup } from "@/shared/types/common";

const AddOptionSet = z.object({
  name: z.string().min(3),
  type: z.enum(["COLOR", "TEXT"]),
});

const SingleOption = z.object({
  optionSetID: z.string().min(6),
  name: z.string().min(3),
  value: z.string().min(3),
});

const AddSpecGroup = z.object({
  title: z.string().min(3),
});

const SingleSpec = z.object({
  specGroupID: z.string().min(6),
  value: z.string().min(3),
});

// Mock option sets data
const mockOptionSets: TOptionSet[] = [
  {
    id: "option-1",
    name: "Color",
    type: "COLOR",
    options: JSON.stringify([
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" },
      { name: "Blue", value: "#0066CC" }
    ])
  },
  {
    id: "option-2",
    name: "Storage",
    type: "TEXT",
    options: JSON.stringify([
      { name: "128GB", value: "128GB" },
      { name: "256GB", value: "256GB" },
      { name: "512GB", value: "512GB" }
    ])
  }
];

// Mock spec groups data
const mockSpecGroups: TSpecGroup[] = [
  {
    id: "spec-1",
    title: "Display",
    specs: JSON.stringify(["Screen Size", "Resolution", "Technology"])
  },
  {
    id: "spec-2",
    title: "Performance",
    specs: JSON.stringify(["Processor", "RAM", "Storage"])
  }
];

export const getOptionSetByCatID = async (categoryID: string) => {
  if (!categoryID || categoryID === "") return { error: "Invalid Data!" };

  try {
    // Mock implementation - return relevant option sets for category
    const result = mockOptionSets.filter(() =>
      categoryID.startsWith('3') || categoryID.startsWith('2') // Smartphones and tablets
    );

    return { res: result };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const addOptionSet = async (data: TOptionSet) => {
  if (!AddOptionSet.safeParse(data).success) return { error: "Invalid Data" };

  try {
    // Mock implementation - simulate adding option set
    const newOptionSet = {
      id: `option-${Date.now()}`,
      name: data.name,
      type: data.type,
      options: "[]"
    };

    return { res: newOptionSet };
  } catch (error) {
    return { res: JSON.stringify(error) };
  }
};

export const deleteOptionSet = async (id: string) => {
  if (!id || id === "") return { error: "Invalid Data" };

  try {
    // Mock implementation - simulate deletion
    const optionExists = mockOptionSets.find(o => o.id === id);
    if (!optionExists) {
      return { error: "Option set not found" };
    }

    return { res: { id, deleted: true } };
  } catch (error) {
    return { res: JSON.stringify(error) };
  }
};

// ------------------------- SINGLE OPTION -------------------------
export const addSingleOption = async (data: TSingleOption) => {
  if (!SingleOption.safeParse(data).success) return { error: "Invalid Data!" };

  try {
    // Mock implementation - simulate adding single option
    return { res: { optionSetID: data.optionSetID, added: true } };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const deleteSingleOption = async (data: TSingleOption) => {
  if (!SingleOption.safeParse(data).success) return { error: "Invalid Data!" };

  try {
    // Mock implementation - simulate deleting single option
    return { res: { optionSetID: data.optionSetID, deleted: true } };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

// ------------------------- SPECIFICATIONS -------------------------

export const getSpecGroupByCatID = async (categoryID: string) => {
  if (!categoryID || categoryID === "") return { error: "Invalid Data!" };

  try {
    // Mock implementation - return relevant spec groups for category
    const result = mockSpecGroups.filter(() =>
      categoryID.startsWith('3') || categoryID.startsWith('2') || categoryID.startsWith('1')
    );

    return { res: result };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const addSpecGroup = async (data: TSpecGroup) => {
  if (!AddSpecGroup.safeParse(data).success) return { error: "Invalid Data" };

  try {
    // Mock implementation - simulate adding spec group
    const newSpecGroup = {
      id: `spec-${Date.now()}`,
      title: data.title,
      specs: "[]"
    };

    return { res: newSpecGroup };
  } catch (error) {
    return { res: JSON.stringify(error) };
  }
};

export const deleteSpecGroup = async (id: string) => {
  if (!id || id === "") return { error: "Invalid Data" };

  try {
    // Mock implementation - simulate deletion
    const specExists = mockSpecGroups.find(s => s.id === id);
    if (!specExists) {
      return { error: "Spec group not found" };
    }

    return { res: { id, deleted: true } };
  } catch (error) {
    return { res: JSON.stringify(error) };
  }
};

// ------------------------- SINGLE SPEC -------------------------
export const addSingleSpec = async (data: TSingleSpec) => {
  if (!SingleSpec.safeParse(data).success) return { error: "Invalid Data!" };

  try {
    // Mock implementation - simulate adding single spec
    return { res: { specGroupID: data.specGroupID, added: true } };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};

export const deleteSingleSpec = async (data: TSingleSpec) => {
  if (!SingleSpec.safeParse(data).success) return { error: "Invalid Data!" };

  try {
    // Mock implementation - simulate deleting single spec
    return { res: { specGroupID: data.specGroupID, deleted: true } };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
};
