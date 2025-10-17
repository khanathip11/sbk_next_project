export interface AuditItem {
    // 🧩 ข้อมูลผู้ใช้
    username: string;
    fullname?: string;
    email?: string;
    password: string;
    department?: string;
    role?: "แอดมิน" | "เจ้าหน้าที่" | "ผู้บังคับบัญชา";
    status?: "ใช้งานอยู่" | "ไม่ได้ใช้งาน";
    lastLogin?: string;

    // 🧩 ข้อมูลประวัติการเข้าใช้งาน
    id?: number;
    action?: string;
    date?: string;
    ip?: string;
    browser?: string;

    // 🧩 ใช้ภายในระบบ
    origin: "user" | "log";
    level?: string;
}
