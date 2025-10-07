export const STATUS_OPTIONS = [
    "ระบบรับข้อมูลแล้ว",
    "เจ้าหน้าที่ตรวจสอบ",
    "ส่งต่อให้หน่วยงาน",
    "หน่วยงานกำลังดำเนินการ",
    "ดำเนินการเสร็จสิ้น",
    "ไม่สามารถดำเนินการได้",
] as const;

export type Status = typeof STATUS_OPTIONS[number];
