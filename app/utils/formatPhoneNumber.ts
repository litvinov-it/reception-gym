// Форматрует из данные 90690424913 в красивую строку +7 (906) 904-24-13
export default function formatPhoneNumber(phoneNumber: string) {
    return `+7 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 8)} ${phoneNumber.slice(8, 10)}`
}