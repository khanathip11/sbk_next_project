// app/columns/issueColumns.tsx
import { Column } from "../common/BaseTable";
import { IssueItem } from "@/app/types/IssueItem";
import { Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getTypeStyled } from "@/app/utils/getTypeStyled";
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

const formatThaiDateTime = (dateString: string) => {
    if (!dateString) return "-";
    const [day, month, year] = dateString.split("/").map(Number);
    if (!day || !month || !year) return "-";

    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
        timeStyle: "medium",
    }).format(date);
};
interface IssueColumnOptions {
    handleEdit: (issue: IssueItem) => void;
    handleView: (issue: IssueItem) => void;
}

const getTypeStyle = (row: IssueItem) => {
    const status = (row.ackStatus || "").trim();
    const readDuration = row.readDuration || "";
    const reportDateStr = row.date || "";

    // 🧮 ดึงจำนวนวันจากข้อความ "1 วัน" → 1
    const getDays = (text: string): number => {
        const match = text.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
    };

    // 🕒 แปลงวันที่ dd/mm/yyyy → Date object
    const parseDate = (dateStr: string): Date | null => {
        const [day, month, year] = dateStr.split("/").map(Number);
        if (!day || !month || !year) return null;
        const christianYear = year > 2400 ? year - 543 : year; // แปลง พ.ศ. → ค.ศ.
        return new Date(christianYear, month - 1, day);
    };

    const readDays = getDays(readDuration);
    const reportDate = parseDate(reportDateStr);
    const today = new Date();

    // 🕓 คำนวณเวลาที่ครบกำหนด
    const dueDate = reportDate ? new Date(reportDate.getTime()) : null;
    if (dueDate) dueDate.setDate(dueDate.getDate() + readDays);

    let text = ""; // ✅ ข้อความต่อท้าย
    let background = "#FCBF041F";
    let color = "#CA9802";

    // 🟥 ยังไม่ได้เปิดอ่าน
    if (status === "ยังไม่ได้เปิดอ่าน") {
        if (dueDate) {
            const diffTime = dueDate.getTime() - today.getTime();
            const diffHours = diffTime / (1000 * 60 * 60);
            const diffDays = Math.floor(diffHours / 24);

            if (diffTime > 0) {
                // เหลือเวลา
                text = diffDays >= 1
                    ? `(เหลือ ${diffDays} วัน)`
                    : `(เหลือ ${Math.round(diffHours)} ชม.)`;
            } else {
                // เกินเวลา
                const overDays = Math.abs(diffDays);
                text = overDays >= 1
                    ? `(เกิน ${overDays} วัน)`
                    : `(เกิน ${Math.abs(Math.round(diffHours))} ชม.)`;
            }
        }

        return { background: "#F03D3D1F", color: "#E92020", text };
    }

    // 🟢 เปิดอ่านแล้ว
    if (status === "เปิดอ่านแล้ว") {
        if (!reportDate || !dueDate) {
            text = `(ไม่พบข้อมูลเวลาอ่าน)`;
            return { background: "#35C2201F", color: "#2A9919", text };
        }

        // สมมติว่าเวลาอ่านคือวันนี้ (ในระบบจริงอาจมี field readAt)
        const readAt = today;

        const diffTime = readAt.getTime() - dueDate.getTime();
        const diffHours = diffTime / (1000 * 60 * 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays <= 0) {
            // ภายในเวลาที่กำหนด
            text = `(อ่านเมื่อ ${readAt.toLocaleString("th-TH", {
                dateStyle: "medium",
                timeStyle: "short",
            })})`;
            background = "#35C2201F";
            color = "#2A9919";
        } else {
            // เกินเวลา
            text =
                diffDays >= 1
                    ? `(เกิน ${diffDays} วัน)`
                    : `(เกิน ${Math.abs(Math.round(diffHours))} ชม.)`;
            background = "#FCBF041F";
            color = "#CA9802";
        }

        return { background, color, text };
    }

    return { background, color, text: "(ไม่มีข้อมูลสถานะ)" };
};


export const issueColumns = ({
    handleEdit,
    handleView,
}: IssueColumnOptions): Column<IssueItem>[] => [
        {
            id: "problem",
            label: "ปัญหา",
            render: (row) => (
                <Stack direction="row" spacing={1} alignItems="center">
                    {row.img?.length > 0 && (
                        <Typography sx={{ fontSize: 13 }}>{row.problem}</Typography>
                    )}
                </Stack>
            ),
        },
        {
            id: "date", label: "วันที่แจ้ง", align: "left", render: (row: IssueItem) => (
                <Typography sx={{ fontSize: 12 }}>
                    {formatThaiDateTime(row.date)}
                </Typography>
            ),
        },
        { id: "category", label: "หมวดปัญหา", align: "left" },
        {
            id: "level",
            label: "ระดับของปัญหา",
            align: "center",
            render: (row) => (
                <Chip
                    label={row.level}
                    sx={{
                        backgroundColor: row.level === "เร่งด่วน" ? "#FFEBEE" : "#E3F2FD",
                        color: row.level === "เร่งด่วน" ? "#C62828" : "#1976D2",
                        fontWeight: 500,
                        fontSize: 12,
                        borderRadius: "6px",
                    }}
                    size="small"
                />
            ),
        },
        {
            id: "center",
            label: "ศูนย์ปัจจุบัน",
            align: "left",
            render: (row) => {
                const isEmpty = !row.center || row.center.trim() === "";

                return (
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: 12,
                            fontWeight: 500,
                            borderRadius: "6px",
                            color: isEmpty ? "#FCBF04" : "#000", // สีเหลืองถ้าว่าง
                            gap: 0.5, // เพิ่มระยะห่างระหว่างไอคอนกับข้อความ
                        }}
                    >
                        {isEmpty ? (
                            <>
                                <ReplayRoundedIcon sx={{ fontSize: 16 }} />
                                รอเปลี่ยนศูนย์
                            </>
                        ) : (
                            row.center
                        )}
                    </Typography>
                );
            },
        },
        {
            id: "forwardedFrom",
            label: "ส่งต่อจาก",
            align: "left",
            render: (row) => {
                const isEmpty = row.forwardedFrom === null || row.forwardedFrom === undefined || row.forwardedFrom.trim() === "";

                return (
                    <Typography
                        sx={{
                            fontSize: 12,
                            fontWeight: 500,
                            borderRadius: "6px",
                            color: "#000", // สีข้อความถ้าว่าง
                        }}
                    >
                        {isEmpty ? "-" : row.forwardedFrom}
                    </Typography>
                );
            },
        },
        {
            id: "ackStatus",
            label: "สถานะการรับรู้",
            align: "center",
            render: (row) => {
                const style = getTypeStyle(row);
                return (
                    <Stack alignItems="center" spacing={0.3}>
                        <Chip
                            label={row.ackStatus}
                            sx={{
                                backgroundColor: style.background,
                                color: style.color,
                                fontSize: 12,
                                fontWeight: 500,
                                borderRadius: "6px",
                            }}
                            size="small"
                        />
                        <Typography sx={{ fontSize: 11, color: style.color }}>
                            {style.text}
                        </Typography>
                    </Stack>
                );
            },
        },
        { id: "assignee", label: "ผู้รับผิดชอบปัจจุบัน", align: "left" },
        { id: "reportType", label: "ประเภทการแจ้ง", align: "left" },
        {
            id: "solutionStatus",
            label: "สถานะการแก้ปัญหา",
            align: "center",
            render: (row) => {
                const style = getTypeStyled(row.solutionStatus || ""); // ✅ เรียกใช้ฟังก์ชัน

                return (
                    <Chip
                        label={row.solutionStatus}
                        sx={{
                            backgroundColor: style.background,
                            color: style.color,
                            fontWeight: 500,
                            fontSize: 12,
                            borderRadius: "6px",
                        }}
                        size="small"
                    />
                );
            },
        },
        {
            id: "action",
            label: "จัดการ",
            align: "center",
            render: (row) => (
                <Stack direction="row" spacing={0.5} justifyContent="center">
                    <Tooltip title="แก้ไข">
                        <IconButton
                            size="small"
                            color="primary"
                            sx={{
                                display: 'flex',
                                gap: 1,
                                px: 1.5,
                                backgroundColor: "#004D99",
                                borderRadius: 3,
                                boxShadow: "0 0 2px rgba(0,0,0,0.1)",
                                "&:hover": { backgroundColor: "#003970" },
                            }}
                            onClick={() => handleEdit(row)}
                        >
                            <EditIcon fontSize="small" sx={{ fontSize: 16, color: '#fff' }} />
                            <Typography sx={{ fontSize: 12, color: '#fff' }}>จัดการ</Typography>
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];
