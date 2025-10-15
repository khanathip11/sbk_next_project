export interface UserItem {
    username: string;
    fullname: string;
    email: string;
    department: string;
    role: "แอดมิน" | "เจ้าหน้าที่" | "ผู้บังคับบัญชา";
    status: "ใช้งานอยู่" | "ไม่ได้ใช้งาน";
    lastLogin: string;
}

export interface LoginHistoryItem {
    id: number;
    action: string;
    date: string;
    ip: string;
    browser: string;
}
