// src/app/types/IssueItem.ts
import { StaticImageData } from "next/image";
export interface IssueItem {
  id: string;                  // รหัสปัญหา
  problem: string;             // ปัญหา
  date: string;                // วันที่แจ้ง
  category: string;            // ประเภทปัญหา (จากรายการที่ให้มา)
  status:
    | "ระบบรับข้อมูลแล้ว"
    | "เจ้าหน้าที่ตรวจสอบ"
    | "ส่งต่อให้หน่วยงาน"
    | "หน่วยงานกำลังดำเนินการ"
    | "ดำเนินการเสร็จสิ้น"
    | "ไม่สามารถดำเนินการได้";
  location: string;            // สถานที่
  reporter: string;            // ผู้แจ้ง
  department: string;          // หน่วยรับผิดชอบ
  level: "ทั่วไป" | "เร่งด่วน"; // ระดับปัญหา
  remainingDays: string;       // ระยะเวลาที่ต้องการแก้ไข (เหลือ)
  img?: string | StaticImageData;                // รูปภาพ (optional)
}
