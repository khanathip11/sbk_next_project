import { AuditRow } from "./Audit-trail-columns";

export const buildAuditRows = (users: UserItem[], logs: LoginHistoryItem[]): AuditRow[] => {
    const userRows: AuditRow[] = users.map((u) => ({
        ...u,
        origin: "user",
        action: "-",        // ✅ เพิ่มให้แน่ใจว่า field มี
        ip: "-",            // ✅ เพิ่มให้แน่ใจว่า field มี
        date: u.lastLogin,  // ✅ ใช้ lastLogin แทน date
        browser: "-",       // ✅ เพิ่ม browser ให้คงที่
    }));

    const logRows: AuditRow[] = logs.map((l) => {
        const user = users.find((u) => u.username === l.username);
        return {
            ...l,
            origin: "log",
            fullname: user?.fullname ?? "-",
            email: user?.email ?? "-",
            department: user?.department ?? "-",
            role: user?.role,
            status: user?.status,
            lastLogin: user?.lastLogin ?? "-",
        };
    });

    return [...userRows, ...logRows];
};
