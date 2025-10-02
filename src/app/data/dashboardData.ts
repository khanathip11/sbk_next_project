import { Column, DateRow } from "../types/dashboardType";

export const complaintColumns: Column[] = [
    { id: "id", label: "รหัสเรื่อง", minWidth: 80 },
    { id: "title", label: "เรื่องร้องทุกข์", minWidth: 200 },
    { id: "category", label: "ประเภท", minWidth: 120 },
    { id: "location", label: "สถานที่", minWidth: 150 },
    { id: "date", label: "วันที่แจ้ง", minWidth: 120 },
    { id: "status", label: "สถานะ", minWidth: 100 },
]

export const complaintRows: DateRow[] = [
    {
        id: "C001",
        title: "ไฟถนนดับ",
        category: "สาธารณูปโภค",
        location: "ถนนสุขุมวิท ซอย 12",
        date: "2025-09-20",
        status: "กำลังดำเนินการ",
    },
    {
        id: "C002",
        title: "เสียงดังรบกวน",
        category: "สิ่งแวดล้อม",
        location: "คอนโด ABC ชั้น 3",
        date: "2025-09-22",
        status: "รอตรวจสอบ",
    },
    {
        id: "C003",
        title: "น้ำท่วมขัง",
        category: "สาธารณูปโภค",
        location: "หมู่บ้านสุขใจ",
        date: "2025-09-25",
        status: "เสร็จสิ้น",
    },
    {
        id: "C004",
        title: "ขยะไม่ได้เก็บ",
        category: "สุขาภิบาล",
        location: "ตลาดสดเทศบาล",
        date: "2025-09-28",
        status: "รอดำเนินการ",
    },
    {
        id: "C005",
        title: "ท่อระบายน้ำอุดตัน",
        category: "สาธารณูปโภค",
        location: "ถนนลาดพร้าว 101",
        date: "2025-10-01",
        status: "กำลังดำเนินการ",
    },
]