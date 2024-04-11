import { z } from "zod";
import { ERRORS_INVENTORY_SCHEME } from "./error-schemas";

// Схема валидации для инвентаря
export const inventorySchema = z.object({
  name: z
    .string(ERRORS_INVENTORY_SCHEME.NAME.string)
    .min(1, ERRORS_INVENTORY_SCHEME.NAME.min)
    .max(50, ERRORS_INVENTORY_SCHEME.NAME.max),

  description: z
    .string(ERRORS_INVENTORY_SCHEME.DESCRIPTION.string)
    .min(1, ERRORS_INVENTORY_SCHEME.DESCRIPTION.min)
    .max(300, ERRORS_INVENTORY_SCHEME.DESCRIPTION.max),

  count: z
    .number(ERRORS_INVENTORY_SCHEME.COUNT.number)
    .min(0, ERRORS_INVENTORY_SCHEME.COUNT.min)
    .max(9999, ERRORS_INVENTORY_SCHEME.COUNT.max),
});
