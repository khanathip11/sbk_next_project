import { Column } from "../common/BaseTable";
import { IssueItem } from "@/app/types/IssueItem";
import {
    Button,
    Chip,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import { getTypeStyled } from "@/app/utils/getTypeStyled";
import { issuePermissionMatrix } from "@/app/permissions/issuePermissionMatrix";

interface IssueColumnOptions {
    handleEdit: (issue: IssueItem) => void;
    handleView: (issue: IssueItem) => void;
    role?: string;
    organizationUnit?: string;
}

// ✅ เพิ่ม type ใหม่ที่ extends มาจาก BaseColumn


// 🧮 ฟังก์ชันแปลงวันที่ไทย
const formatThaiDateTime = (dateString: string) => {
    if (!dateString) return "-";
    const [day, month, year] = dateString.split("/").map(Number);
    const christianYear = year > 2400 ? year - 543 : year;
    return new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
        timeStyle: "medium",
    }).format(new Date(christianYear, month - 1, day));
};

const getTypeStyle = (row: IssueItem) => {
    const status = (row.ackStatus || "").trim();
    if (status === "ยังไม่ได้เปิดอ่าน")
        return { background: "#F03D3D1F", color: "#E92020", text: "(ยังไม่ได้เปิดอ่าน)" };
    if (status === "เปิดอ่านแล้ว")
        return { background: "#35C2201F", color: "#2A9919", text: "(เปิดอ่านแล้ว)" };
    return { background: "#FCBF041F", color: "#CA9802", text: "(ไม่มีข้อมูลสถานะ)" };
};

export const issueColumns = ({
    handleEdit,
    handleView,
    role = "admin",
    organizationUnit = "สบข",
}: IssueColumnOptions): Column<IssueItem>[] => {
    // ✅ ตรวจสอบสิทธิ์ตาม matrix
    const currentPermission = issuePermissionMatrix.find(
        (perm) => perm.role === role && perm.organizationUnit === organizationUnit
    );
    const allowedActions = currentPermission?.actions || [];

    const canView = allowedActions.includes("view") || allowedActions.includes("all");
    const canUpdate = allowedActions.includes("update") || allowedActions.includes("all");
    const canApprove = allowedActions.includes("approve") || allowedActions.includes("all");

    const cols: Column<IssueItem & { visibleFor?: string[] }>[] = [
        {
            id: "problem",
            label: "ปัญหา",
            render: (row) => <Typography sx={{ fontSize: 13 }}>{row.problem}</Typography>,
        },
        {
            id: "date",
            label: "วันที่แจ้ง",
            align: "left",
            render: (row: IssueItem) => (
                <Typography sx={{ fontSize: 12 }}>{formatThaiDateTime(row.date)}</Typography>
            ),
        },
        { id: "category", label: "หมวดหมู่ปัญหา", align: "left" },
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
                        px: 1,
                        borderRadius: 2
                    }}
                    size="small"
                />
            ),
        },
        {
            id: "center",
            label: "ศูนย์ปัจจุบัน",
            align: "left",
            visibleFor: ["admin"], // ✅ เห็นเฉพาะ admin
            render: (row) => {
                const isEmpty = !row.center || row.center.trim() === "";
                return (
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: 12,
                            fontWeight: 500,
                            color: isEmpty ? "#FCBF04" : "#000",
                            gap: 0.5,
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
            visibleFor: ["admin"], // ✅ เห็นเฉพาะ admin
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
                            }}
                            size="small"
                        />
                        <Typography sx={{ fontSize: 11, color: style.color }}>{style.text}</Typography>
                    </Stack>
                );
            },
        },
        { id: "assignee", label: "ผู้รับผิดชอบปัจจุบัน", align: "left" },
        { id: "reportType", label: "ประเภทการแจ้ง", align: "left", visibleFor: ["admin"] },
        {
            id: "solutionStatus",
            label: "สถานะการแก้ปัญหา",
            align: "center",
            visibleFor: ["admin", "operator"],
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
            id: "confirmCenterStatus",
            label: "ยืนยันศูนย์ที่รับผิดชอบ",
            align: "center",
            visibleFor: ["operator-view-approve"], // ✅ เฉพาะ role ที่อนุมัติได้
            render: (row) =>
                canApprove ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <IconButton
                            size="small"
                            sx={{
                                backgroundColor:
                                    row.confirmCenterStatus === "ยืนยันแล้ว" ? "#ccc" : "#004D99",
                                borderRadius: 3,
                                px: 1.5,
                                "&:hover": { backgroundColor: "#003970" },
                            }}
                            disabled={row.confirmCenterStatus === "ยืนยันแล้ว"}
                            onClick={() => console.log("ยืนยันศูนย์", row.id)}
                        >
                            <CheckRoundedIcon sx={{ fontSize: 16, color: "#fff" }} />
                            <Typography sx={{ fontSize: 12, color: "#fff" }}>ยืนยัน</Typography>
                        </IconButton>
                    </Box>
                ) : null,
        },
        {
            id: "action",
            label: "จัดการ",
            align: "center",
            visibleFor: ["admin", "operator-view-approve"],
            render: (row) => {
                if (role === "operator-view-approve") {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#004D99",
                                    color: "#fff",
                                    fontSize: 12,
                                    borderRadius: 3,
                                    px: 1.5,
                                    py: 0.5,
                                    textTransform: "none",
                                    "&:hover": { backgroundColor: "#003970" },
                                }}
                                startIcon={<ReplayRoundedIcon sx={{ fontSize: 18 }} />}
                                onClick={() => console.log("ส่งกลับ สนข.", row.id)}
                            >
                                ส่งกลับ สนข.
                            </Button>
                        </Box>
                    );
                }

                if (role === "admin") {
                    return (
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                            <Tooltip title="แก้ไข">
                                <IconButton
                                    size="small"
                                    color="primary"
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        px: 1.5,
                                        backgroundColor: "#004D99",
                                        borderRadius: 3,
                                        boxShadow: "0 0 2px rgba(0,0,0,0.1)",
                                        "&:hover": { backgroundColor: "#003970" },
                                    }}
                                    onClick={() => handleEdit(row)}
                                >
                                    <EditIcon fontSize="small" sx={{ fontSize: 16, color: "#fff" }} />
                                    <Typography sx={{ fontSize: 12, color: "#fff" }}>จัดการ</Typography>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    );
                }

                return null; // ✅ ป้องกัน warning และ cell ว่างโดยไม่ error
            },
        },
        {
            id: "viewIssue",
            label: "ดู",
            align: "center",
            visibleFor: ["operator-view", "operator-view-update"],
            render: (row) =>
                canView ? (
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                        <Tooltip title="ดูรายละเอียด">
                            <IconButton
                                size="small"
                                sx={{
                                    px: 0.8,
                                    backgroundColor: "#004D99",
                                    borderRadius: 2,
                                    "&:hover": { backgroundColor: "#003970" },
                                }}
                                onClick={() => handleView(row)}
                            >
                                <RemoveRedEyeRoundedIcon
                                    fontSize="small"
                                    sx={{ fontSize: 16, color: "#fff" }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                ) : null,
        },
    ];

    return cols.filter((col) => {
        // 🔹 1) ตรวจ visibleFor — ให้ role ที่มีคำตรงกันหรือใกล้เคียงผ่านได้
        if (col.visibleFor) {
            const isVisible = col.visibleFor.some((allowedRole) =>
                role === allowedRole || role.includes(allowedRole)
            );
            if (!isVisible) return false;
        }

        // 🔹 2) ตรวจสิทธิ์จาก matrix (รองรับ operator-view-approve ด้วย)
        if (col.id === "confirmCenterStatus" && !canApprove) return false;
        if (col.id === "action" && !(canUpdate || canApprove)) return false;
        if (col.id === "viewIssue" && !canView) return false;

        return true;
    });


};
