import { z } from "zod";
import { inventorySchema } from "./validation-schemas";

export type InventoryTypes = z.infer<typeof inventorySchema>;
export type TInventoryForm = InventoryTypes;
export type InventoryFields = keyof InventoryTypes;

export interface IInventory extends InventoryTypes {
  id: number;  
}

export interface IInputInventory {
  label: string;
  type: string;
  register: any;
  defaultValue: string | number | undefined;
  errorName: InventoryFields;
  placeholder?: string;
}