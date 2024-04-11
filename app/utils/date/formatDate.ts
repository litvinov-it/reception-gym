// Из даты делает строку в формате "часы:минуты день месяц"
export const formatDate = (itemDate: Date | undefined) => {
    if (!itemDate) return "";
    
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    const date = new Date(itemDate);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const day = date.getDate();
    const month = months[date.getMonth()];

    const formattedDate = `${hours}:${minutes} ${day} ${month}`;
    return formattedDate;
  };