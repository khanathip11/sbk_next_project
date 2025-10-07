import { IssueItem } from "@/app/types/IssueItem";

export interface Column {
  label: string;
  field: keyof IssueItem | "actions"; // ใช้ type จาก IssueItem
}

export const columns: Column[] = [
  { label: "รหัสปัญหา", field: "id" },
  { label: "ปัญหา", field: "problem" },
  { label: "วันที่แจ้ง", field: "date" },
  { label: "ประเภท", field: "category" },
  { label: "สถานะการแก้ปัญหา", field: "status" },
  { label: "โลเคชั่น", field: "location" },
  { label: "ผู้แจ้ง", field: "reporter" },
  { label: "หน่วยรับผิดชอบ", field: "department" },
  { label: "ระดับของปัญหา", field: "level" },
  { label: "ระยะเวลาที่ต้องการแก้ไข (เหลือ)", field: "remainingDays" },
  { label: "จัดการ", field: "actions" },
];
