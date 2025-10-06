// src/components/IssueTable/columns.ts
import { Column } from "./types";

export const columns: readonly Column[] = [
    { label: "รหัสปัญหา", minWidth: 170 },
    { label: "ปัญหา", minWidth: 100 },
    { label: "วันที่แจ้ง", minWidth: 170, align: "right" },
    { label: "ประเภท", minWidth: 170, align: "right" },
    { label: "สถานะการแก้ปัญหา", minWidth: 170, align: "center" },
    { label: "โลเคชั่น", minWidth: 100 },
    { label: "ผู้แจ้ง", minWidth: 100 },
    { label: "หน่วยรับผิดชอบ", minWidth: 100 },
    { label: "ระดับของปัญหา", minWidth: 100, align: "center" },
    { label: "ระยะเวลาที่ต้องการแก้ไข (เหลือ)", minWidth: 100 },
    { label: "จัดการ", minWidth: 100, align: "center" },
];
