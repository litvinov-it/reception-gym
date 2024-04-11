// Генерирует из даных сервера дату для инпута (у него там другой формат)
export const generateValueInputDate = (
  dateAbonement: string | Date | undefined
) => {
  if (!dateAbonement) return "";
  const formattedDateTimeString = new Date(dateAbonement).toISOString().slice(0, 16);
  return formattedDateTimeString;
};