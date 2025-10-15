export const getTypeStyled = (status: string) => {
    switch (status.trim()) {
        case "ระบบรับข้อมูลแล้ว": return { background: "#F03D3D1F", color: "#E92020" };
        case "เจ้าหน้าที่ตรวจสอบ": return { background: "#FCBF041F", color: "#CA9802" };
        case "ส่งต่อให้หน่วยงาน": return { background: "#00B5D81F", color: "#00B5D8" };
        case "หน่วยงานกำลังดำเนินการ": return { background: "#118BE81F", color: "#1080D6" };
        case "ดำเนินการเสร็จสิ้น": return { background: "#35C2201F", color: "#2A9919" };
        case "ไม่สามารถดำเนินการได้": return { background: "#f3e5f5", color: "#805ad4" };
        case "กำลังดำเนินการ": return { background: "#118BE81F", color: "#1080D6" };
        default: return { background: "#f5f5f5", color: "#616161" };
    }
};