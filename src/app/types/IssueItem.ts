// src/app/types/IssueItem.ts
import { StaticImageData } from "next/image";
export interface IssueItem {
  id: string;                  // รหัสปัญหา
  problem: string;             // ปัญหา
  date: string;                // วันที่แจ้ง
  category: string;            // ประเภทปัญหา
  reporter: string;            // ผู้แจ้ง
  level: "ทั่วไป" | "เร่งด่วน"; // ระดับปัญหา
  department: string;          // หน่วยรับผิดชอบ

  /** 
   * สถานะหลักของการดำเนินงาน (Workflow Status)
   * เช่น สถานะในระบบก่อนถึงการแก้ไขจริง 
   */
  status:
  | "ระบบรับข้อมูลแล้ว"
  | "เจ้าหน้าที่ตรวจสอบ"
  | "ส่งต่อให้หน่วยงาน"
  | "หน่วยงานกำลังดำเนินการ"
  | "ดำเนินการเสร็จสิ้น"
  | "ไม่สามารถดำเนินการได้";

  /**
   * ✅ สถานะการแก้ไขปัญหา (ใหม่)
   * ระบุว่าการดำเนินการอยู่ในช่วงไหน
   */
  solutionStatus:
  | "กำลังดำเนินการ"
  | "ดำเนินการเสร็จสิ้น"
  | "ไม่สามารถดำเนินการได้";

  /**
   * ✅ ระยะเวลาที่ต้องอ่าน (ใหม่)
   * เช่น "2 วัน", "5 วัน", "เกินกำหนด 1 วัน" เป็นต้น
   */
  readDuration: string;

  /** ระยะเวลาที่ต้องการแก้ไข (เวลาเหลือ / เกินกำหนด) */
  remainingDays: string;

  /** หน่วยงาน / พื้นที่ */
  location: string;

  /** รูปภาพประกอบ (optional) */
  img?: (string | StaticImageData)[];

  /** วิดีโอประกอบ (optional) */
  video?: (string | StaticImageData)[];

  /** QR Code จาก LINE หรือระบบอื่น (optional) */
  qrCode?: string | StaticImageData;
}
