// app/columns/issueColumns.tsx
import { Column } from "../common/BaseTable";
import { IssueItem } from "@/app/types/IssueItem";
import { Avatar, Chip, IconButton, Stack, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

interface IssueColumnOptions {
    handleEdit: (issue: IssueItem) => void;
    handleView: (issue: IssueItem) => void;
}

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
                        <Avatar
                            src={typeof row.img[0] === "string" ? row.img[0] : row.img[0].src}
                            variant="rounded"
                            sx={{ width: 28, height: 28 }}
                        />
                    )}
                    <span>{row.problem}</span>
                </Stack>
            ),
        },
        { id: "date", label: "วันที่แจ้ง", align: "center" },
        { id: "category", label: "หมวดปัญหา", align: "center" },
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
        { id: "center", label: "ศูนย์ปัจจุบัน", align: "center" },
        { id: "forwardedFrom", label: "ส่งต่อจาก", align: "center" },
        {
            id: "ackStatus",
            label: "สถานะการรับรู้",
            align: "center",
            render: (row) => (
                <Chip
                    label={row.ackStatus}
                    sx={{
                        backgroundColor:
                            row.ackStatus === "รับทราบแล้ว" ? "#E8F5E9" : "#FFF3E0",
                        color: row.ackStatus === "รับทราบแล้ว" ? "#2E7D32" : "#EF6C00",
                        fontSize: 12,
                        fontWeight: 500,
                        borderRadius: "6px",
                    }}
                    size="small"
                />
            ),
        },
        { id: "assignee", label: "ผู้รับผิดชอบปัจจุบัน", align: "center" },
        { id: "reportType", label: "ประเภทการแจ้ง", align: "center" },
        {
            id: "solutionStatus",
            label: "สถานะการแก้ปัญหา",
            align: "center",
            render: (row) => (
                <Chip
                    label={row.solutionStatus}
                    sx={{
                        backgroundColor:
                            row.solutionStatus.includes("สำเร็จ") ||
                                row.solutionStatus.includes("แก้ไข")
                                ? "#E8F5E9"
                                : row.solutionStatus.includes("ระงับ") ||
                                    row.solutionStatus.includes("รอดำเนินการ")
                                    ? "#FFF9C4"
                                    : "#FFEBEE",
                        color:
                            row.solutionStatus.includes("สำเร็จ") ||
                                row.solutionStatus.includes("แก้ไข")
                                ? "#2E7D32"
                                : row.solutionStatus.includes("ระงับ")
                                    ? "#F9A825"
                                    : "#C62828",
                        fontWeight: 500,
                        fontSize: 12,
                        borderRadius: "6px",
                    }}
                    size="small"
                />
            ),
        },
        {
            id: "action",
            label: "จัดการ",
            align: "center",
            render: (row) => (
                <Stack direction="row" spacing={0.5} justifyContent="center">
                    <Tooltip title="ดูรายละเอียด">
                        <IconButton
                            size="small"
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: 2,
                                boxShadow: "0 0 2px rgba(0,0,0,0.1)",
                                "&:hover": { backgroundColor: "#E3F2FD" },
                            }}
                            onClick={() => handleView(row)}
                        >
                            <RemoveRedEyeRoundedIcon fontSize="small" sx={{ fontSize: 14 }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="แก้ไข">
                        <IconButton
                            size="small"
                            color="primary"
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: 2,
                                boxShadow: "0 0 2px rgba(0,0,0,0.1)",
                                "&:hover": { backgroundColor: "#E3F2FD" },
                            }}
                            onClick={() => handleEdit(row)}
                        >
                            <EditIcon fontSize="small" sx={{ fontSize: 14 }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];
