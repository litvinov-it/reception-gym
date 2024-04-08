export const generateValueInputDate = (dateAbonement: string | Date | undefined) => {
    if (!dateAbonement) return "";
    const date = new Date(dateAbonement);
    const dateString = date.toISOString().split("T")[0];
    return dateString;
  };