import { IconButton, Tooltip, Typography } from "@mui/material";
import { Column } from "../common/BaseTable";
import { IssueItem } from "@/app/types/IssueItem";
import { Stack } from "@mui/system";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

const formatThaiDateTime = (dateString: string) => {
    if (!dateString) return "-";
    const [day, month, year] = dateString.split("/").map(Number);
    const christianYear = year > 2400 ? year - 543 : year;
    return new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
        timeStyle: "medium",
    }).format(new Date(christianYear, month - 1, day));
};

export const feedbackIssueColumns = (): Column<IssueItem>[] => [
    {
        id: "id",
        label: "รหัสข้อเสนอแนะ",
        render: (row) => <Typography sx={{ fontSize: 13 }}>{row.id}</Typography>,
    },
    { id: "reportType", label: "ประเภท", align: "left" },
    {
        id: "date", label: "วันที่แจ้ง", align: "left", render: (row =>
            <Typography sx={{ fontSize: 12 }}>{formatThaiDateTime(row.date)}</Typography>
        )
    },
    {
        id: "resolvedDate", label: "วันที่แก้ไขเสร็จสิ้น", align: "left", render: (row =>
            <Typography sx={{ fontSize: 12 }}>
                {row.resolvedDate
                    ? formatThaiDateTime(row.resolvedDate)
                    : "-"
                }
            </Typography>
        )
    },
    { id: "category", label: "ประเภท", align: "left", },
    { id: "reporter", label: "ผู้แจ้ง", align: "left", },
    { id: "department", label: "หน่วยรับผิดชอบ", align: "left", },
    { id: "satisfactionLevel", label: "ระดับความพึงพอใจ", align: "left", },
    {
        id: "action",
        label: "จัดการ",
        align: "center",
        visibleFor: ["operator-view", "operator-view-update"],
        render: (row) =>
            <Stack direction="row" spacing={0.5} justifyContent="center">
                <Tooltip title="ดูรายละเอียด">
                    <IconButton
                        size="small"
                        sx={{
                            px: 1.8,
                            py: 0.4,
                            backgroundColor: "#004D99",
                            borderRadius: 2.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            "&:hover": { backgroundColor: "#003970" },
                        }}
                        onClick={() => console.log('banana')}
                    >
                        <RemoveRedEyeRoundedIcon
                            fontSize="small"
                            sx={{ fontSize: 16, color: "#fff" }}
                        />
                        <Typography sx={{ color: '#fff', fontSize: 12 }}>ดู</Typography>
                    </IconButton>
                </Tooltip>
            </Stack>
    },
] 