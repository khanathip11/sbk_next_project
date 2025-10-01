// src/utils/formatThaiDateTime.ts
export function formatThaiDateTime(dateTimeStr: string) {
    const monthsThai = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const [datePart, timePart] = dateTimeStr.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);

    const thaiYear = year + 543;

    return `${day.toString().padStart(2, '0')} ${monthsThai[month - 1]} ${thaiYear} | ${hour.toString().padStart(2, '0')}.${minute.toString().padStart(2, '0')} น.`;
}
