export const ERRORS_SHEDULE_SCHEME = {
  CLIENT_ID: {
    number: {
      required_error: "Клиент обязателен",
      invalid_type_error: "Клиент должен быть числом",
    }
  },
  TRAINER_ID: {
    number: {
      required_error: "Тренер обязателен",
      invalid_type_error: "Тренер должен быть числом",
    }
  },
  DATE: {
    date: {
      required_error: "Дата обязательна",
      invalid_type_error: "Дата должна быть строкой",
    }
  }
}