import { z } from "zod";
import { ERRORS_CLIENT_SCHEME } from "./error-schemas";

// Схема клиента для валидации
export const clientSchema = z.object({
  firstName: z
    .string(ERRORS_CLIENT_SCHEME.FIRST_NAME.string)
    .min(1, ERRORS_CLIENT_SCHEME.FIRST_NAME.min)
    .max(15, ERRORS_CLIENT_SCHEME.FIRST_NAME.max),

  lastName: z
    .string(ERRORS_CLIENT_SCHEME.LAST_NAME.string)
    .min(1, ERRORS_CLIENT_SCHEME.LAST_NAME.min)
    .max(15, ERRORS_CLIENT_SCHEME.LAST_NAME.max),

  middleName: z
    .string(ERRORS_CLIENT_SCHEME.MIDDLE_NAME.string)
    .min(1, ERRORS_CLIENT_SCHEME.MIDDLE_NAME.min)
    .max(15, ERRORS_CLIENT_SCHEME.MIDDLE_NAME.max),

  passportSeries: z
    .number(ERRORS_CLIENT_SCHEME.PASSPORT_SERIES.number)
    .max(9999, ERRORS_CLIENT_SCHEME.PASSPORT_SERIES.max)
    .min(1000, ERRORS_CLIENT_SCHEME.PASSPORT_SERIES.min),

  passportNumber: z
    .number(ERRORS_CLIENT_SCHEME.PASSPORT_NUMBER.number)
    .max(999999, ERRORS_CLIENT_SCHEME.PASSPORT_NUMBER.max)
    .min(100000, ERRORS_CLIENT_SCHEME.PASSPORT_NUMBER.min),

  dateOfBirth: z
    .string(ERRORS_CLIENT_SCHEME.DATE_OF_BIRTH.string)
    .min(10, ERRORS_CLIENT_SCHEME.DATE_OF_BIRTH.min)
    .max(10, ERRORS_CLIENT_SCHEME.DATE_OF_BIRTH.max),

  phoneNumber: z
    .string(ERRORS_CLIENT_SCHEME.PHONE_NUMBER.string)
    .min(10, ERRORS_CLIENT_SCHEME.PHONE_NUMBER.min)
    .max(10, ERRORS_CLIENT_SCHEME.PHONE_NUMBER.max),

  photoUrl: z
    .string(ERRORS_CLIENT_SCHEME.PHOTO_URL.string)
    .min(1, ERRORS_CLIENT_SCHEME.PHOTO_URL.min),

  dateAbonement: z.date(ERRORS_CLIENT_SCHEME.DATE_ABONEMENT.date).optional(),
});

// Схема для создания нового клиента
export const clientSchemaCreateForm = clientSchema
  .omit({
    photoUrl: true,
  })
  .extend({
    file: z.instanceof(FormData),
  });
