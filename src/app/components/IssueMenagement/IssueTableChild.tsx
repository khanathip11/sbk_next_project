import React, { useState } from "react";
import {
    Paper,
    Button,
    Box,
    Typography,
} from "@mui/material";
import IssueInfo from "./IssueInfo";
import { columns } from "./columns";
import { issuesData } from "@/app/data/issuesData";
import { IssueItem } from "@/app/types/IssueItem";
import EditIcon from '@mui/icons-material/Edit';
import BaseTable, { Column } from "../common/BaseTable";

interface IssueTableChildProps {
    filterLevel: string | null;
}

const IssueTableChild: React.FC<IssueTableChildProps> = ({ filterLevel }) => {
    const filteredData = filterLevel ? issuesData.filter((i) => i.level === filterLevel) : issuesData;
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<IssueItem | null>(null);

    const handleOpenModal = (issue: IssueItem) => {
        setSelectedRow(issue);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedRow(null);
    };

    // ✅ ฟังก์ชันกำหนดสีสถานะ
    const getTypeStyle = (status: string) => {
        switch (status.trim()) {
            case "ระบบรับข้อมูลแล้ว":
                return { background: "#F03D3D1F", color: "#E92020" };
            case "เจ้าหน้าที่ตรวจสอบ":
                return { background: "#FCBF041F", color: "#CA9802" };
            case "ส่งต่อให้หน่วยงาน":
                return { background: "#00B5D81F", color: "#00B5D8" };
            case "หน่วยงานกำลังดำเนินการ":
                return { background: "#118BE81F", color: "#1080D6" };
            case "ดำเนินการเสร็จสิ้น":
                return { background: "#35C2201F", color: "#2A9919" };
            case "ไม่สามารถดำเนินการได้":
                return { background: "#f3e5f5", color: "#805ad4" };
            case "กำลังดำเนินการ":
                return { background: "#118BE81F", color: "#1080D6" };
            default:
                return { background: "#f5f5f5", color: "#616161" };
        }
    };

    // 🕓 ฟังก์ชันแปลงวันที่เป็นรูปแบบไทย
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

    const enhancedColumns = columns.map((col) => {
        if (col.id === "status" || col.id === "solutionStatus") {
            return {
                ...col,
                align: "center" as const,
                render: (row: IssueItem) => {
                    const style = getTypeStyle(String(row[col.id as keyof IssueItem] ?? ""));
                    return (
                        <Box
                            sx={{
                                ...style,
                                px: 1.5,
                                py: 0.3,
                                borderRadius: 2,
                                fontSize: 10,
                                fontWeight: 500,
                                display: "inline-block",
                            }}
                        >
                            {String(row[col.id as keyof IssueItem] ?? "-")}
                        </Box>
                    );
                },
            };
        }

        if (col.id === "level") {
            return {
                ...col,
                align: "center" as const,
                render: (row: IssueItem) => (
                    <Box
                        sx={{
                            width: "60px",
                            fontSize: 10,
                            px: 0.5,
                            py: 0.3,
                            borderRadius: 2,
                            color: row.level === "เร่งด่วน" ? "#E92020" : "#054887",
                            backgroundColor:
                                row.level === "เร่งด่วน" ? "#F03D3D1F" : "#004D991F",
                        }}
                    >
                        {row.level}
                    </Box>
                ),
            };
        }

        if (col.id === "action") {
            return {
                ...col,
                align: "center" as const,
                render: (row: IssueItem) => (
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            fontSize: 12,
                            textTransform: "none",
                            borderRadius: 2.5,
                            px: 2,
                            py: 0.2,
                            bgcolor: "#004D99",
                        }}
                        onClick={() => handleOpenModal(row)}
                    >
                        <EditIcon sx={{ pr: 0.5, fontSize: 20 }} />
                        จัดการ
                    </Button>
                ),
            };
        }

        if (col.id === "readDuration" || col.id === "remainingDays") {
            return {
                ...col,
                align: "center" as const,
                render: (row: IssueItem) => {
                    // 🧮 Helper: แปลงข้อความ "3 วัน" → 3 (ตัวเลข)
                    const getDays = (text?: string): number => {
                        if (!text) return 0;
                        const match = text.match(/\d+/);
                        return match ? parseInt(match[0], 10) : 0;
                    };

                    const parseDate = (dateStr: string): Date | null => {
                        const [day, month, year] = dateStr.split("/").map(Number);
                        if (!day || !month || !year) return null;
                        const christianYear = year > 2400 ? year - 543 : year;
                        return new Date(christianYear, month - 1, day);
                    };

                    // ✅ คำนวณความต่างวัน
                    const readDays = getDays(row.readDuration);
                    const reportDate = parseDate(row.date);
                    const today = new Date();

                    let diffText = "-";
                    let diff = 0;

                    if (reportDate) {
                        if (readDays === 0) {
                            diff = 0; // ✅ ถือว่าครบกำหนดวันนี้
                            diffText = "ครบกำหนดวันนี้";
                        } else {
                            const dueDate = new Date(reportDate);
                            dueDate.setDate(reportDate.getDate() + readDays);
                            const diffTime = dueDate.getTime() - today.getTime();
                            diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                            if (diff > 0) diffText = `เหลือ ${diff} วัน`;
                            else if (diff < 0) diffText = `เกิน ${Math.abs(diff)} วัน`;
                            else diffText = "ครบกำหนดวันนี้";
                        }
                    }

                    // ✅ ตั้งค่าสี
                    const color =
                        diff < 0 ? "#E92020" :
                            diff === 0 ? "#108BE8" :
                                diff <= 2 ? "#FCBF04" : "#FCBF04";

                    const displayValue =
                        col.id === "readDuration" ? row.readDuration || "-" : row.remainingDays || "-";

                    return (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    minWidth: "60px",
                                    fontSize: 12,
                                    borderRadius: 2,
                                    color: "#000",
                                    fontWeight: 400,
                                    textAlign: "center",
                                }}
                            >
                                {displayValue}
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: 10,
                                    color,
                                    whiteSpace: "nowrap",
                                    ml: 0.5,
                                }}
                            >
                                ({diffText})
                            </Typography>
                        </Box>
                    );
                },
            };
        }

        if (col.id === "date") {
            return {
                ...col,
                align: "center" as const,
                render: (row: IssueItem) => (
                    <Typography sx={{ fontSize: 12 }}>
                        {formatThaiDateTime(row.date)}
                    </Typography>
                ),
            };
        }

        return col; // ✅ column ปกติใช้ค่าปกติ
    });

    return (
        <Paper
            // elevation={2}
            sx={{
                flex: 1,
                // p: 2,
                overflow: "hidden", // ไม่ให้ Paper ขยายเกินขอบ
            }}
        >
            {/* ✅ Container สำหรับ scroll แนวนอน */}
            <Box
                sx={{
                    width: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                    "&::-webkit-scrollbar": { display: "none" }, // ซ่อน scrollbar บน Chrome/Safari
                    scrollbarWidth: "none", // ซ่อน scrollbar บน Firefox
                }}
            >
                <BaseTable
                    columns={enhancedColumns}
                    rows={filteredData}
                    loading={false}
                    rowsPerPageOptions={[10, 25, 100]}
                />
            </Box>

            {/* ✅ Modal */}
            <IssueInfo
                getTypeStyle={getTypeStyle}
                open={open}
                selectedRow={selectedRow}
                handleClose={handleCloseModal}
                issuesData={issuesData}
            />
        </Paper>
        // <BaseTable
        //     columns={enhancedColumns}
        //     rows={filteredData}
        //     loading={false}
        //     rowsPerPageOptions={[10, 25, 100]}
        // />
    );
};

export default IssueTableChild;