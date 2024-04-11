import { z } from "zod";
import { ERRORS_SHEDULE_SCHEME } from "./error-schemas";

// Схема валидации для расписания
export const sheduleSchema = z.object({
  clientId: z.number(ERRORS_SHEDULE_SCHEME.CLIENT_ID.number),
  trainerId: z.number(ERRORS_SHEDULE_SCHEME.TRAINER_ID.number),
  date: z.date(ERRORS_SHEDULE_SCHEME.DATE.date),
});
