import { Button, IconButton, Tooltip } from "@mui/material";
import { Column } from "../common/BaseTable";
import { AuditItem } from "@/app/types/userType";
import { Stack } from "@mui/system";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

export const AuditTrailColumns = (): Column<AuditItem>[] => [
    { id: "action", label: "ฟังก์ชัน", align: "left" },   // ✅ ต้องใช้ชื่อ key ที่ตรงกัน
    { id: "username", label: "ชื่อผู้ใช้", align: "left" },
    { id: "fullname", label: "ชื่อ สกุล", align: "left" },
    { id: "email", label: "อีเมล", align: "left" },
    { id: "department", label: "หน่วยงาน", align: "left" },
    { id: "ip", label: "IP", align: "left" },               // ✅ ตรงกับ key จริง
    { id: "date", label: "วันที่", align: "left" },
    { id: "browser", label: "บราวเซอร์", align: "left" },
    {
        id: "viewAudittrail",
        label: "ดู",
        align: "center",
        render: (row) => (
            <Stack direction="row" spacing={0.5} justifyContent="center">
                <Tooltip title="ดูรายละเอียด">
                    <IconButton
                        size="small"
                        sx={{
                            px: 0.8,
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            "&:hover": { backgroundColor: "#fff" },
                        }}
                        onClick={() => console.log('banana')}
                    >
                        <RemoveRedEyeRoundedIcon
                            fontSize="small"
                            sx={{
                                fontSize: 16, color: "#000000",
                            }}
                        />
                    </IconButton>
                </Tooltip>
            </Stack>
        ),
    },
];
