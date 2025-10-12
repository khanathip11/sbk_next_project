import { IssueItem } from "@/app/types/IssueItem";
export interface Column {
  label: string;
  field: keyof IssueItem | "actions"; // ใช้ type จาก IssueItem
}

export const columns: Column[] = [
  // { label: "รหัสปัญหา", field: "id" },
  { label: "ปัญหา", field: "problem" },
  { label: "วันที่แจ้ง", field: "date" },
  { label: "ประเภท", field: "category" },
  { label: "ผู้แจ้ง", field: "reporter" },
  { label: "ระดับของปัญหา", field: "level" },
  { label: "สถานะการแก้ปัญหา", field: "solutionStatus" },
  { label: "หน่วยรับผิดชอบ", field: "department" },
  { label: "สถานะการรับรู้หน่วยงาน", field: "status" },
  { label: "ระยะเวลาที่ต้องอ่าน (เหลือ)", field: "readDuration" },
  { label: "ระยะเวลาที่ต้องแก้ไข (เหลือ)", field: "remainingDays" },
  { label: "จัดการ", field: "actions" },
];
