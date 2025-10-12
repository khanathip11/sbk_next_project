import React, { useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    Box,
    Typography,
} from "@mui/material";
import IssueInfo from "./IssueInfo";
import { columns } from "./columns";
import { issuesData } from "@/app/data/issuesData";
import { IssueItem } from "@/app/types/IssueItem";
import EditIcon from '@mui/icons-material/Edit';

interface IssueTableChildProps {
    filterLevel: string | null;
}

const IssueTableChild: React.FC<IssueTableChildProps> = ({ filterLevel }) => {
    const filteredData = filterLevel ? issuesData.filter((i) => i.level === filterLevel) : issuesData;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
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

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
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

    return (
        <Paper
            elevation={2}
            sx={{
                width: "100%",
                height: "100%",
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden", // ✅ ป้องกัน TableContainer ทะลุ
            }}
        >
            {/* ✅ Scroll ภายในเฉพาะตาราง */}
            <TableContainer
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "auto",
                    bgcolor: "#fff",
                    borderRadius: 2,
                    "&::-webkit-scrollbar": { height: 8, width: 8 },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#c1c1c1",
                        borderRadius: 10,
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#a8a8a8",
                    },
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.label}
                                    align={
                                        ["สถานะการแก้ปัญหา", "ระดับของปัญหา", "จัดการ"].includes(
                                            column.label
                                        )
                                            ? "center"
                                            : "left"
                                    }
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: 13,
                                        color: "#333",
                                        backgroundColor: "#f5f5f5",
                                        borderBottom: "1px solid #ddd",
                                        py: 1.5,
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((issue) => (
                                <TableRow key={issue.id} hover>
                                    {columns.map((column) => {
                                        const value = issue[column.field as keyof IssueItem];

                                        // 🔹 สถานะ (มีสี)
                                        if (column.field === "status" || column.field === "solutionStatus") {
                                            const style = getTypeStyle(String(value));
                                            return (
                                                <TableCell key={column.field} align="center">
                                                    <Box
                                                        sx={{
                                                            ...style,
                                                            px: 1.5,
                                                            py: 0,
                                                            borderRadius: 2,
                                                            fontSize: 10,
                                                            fontWeight: 500,
                                                            display: "inline-block",
                                                        }}
                                                    >
                                                        {value as string}
                                                    </Box>
                                                </TableCell>
                                            );
                                        }

                                        if (column.field === "department") {
                                            const departmentValue = String(issue.department ?? "-");

                                            return (
                                                <TableCell key={column.field}>
                                                    <Box
                                                        sx={{
                                                            color: departmentValue === "ยังไม่มี" ? "red" : "#000", // ✅ เงื่อนไขตรงนี้
                                                            fontSize: 12
                                                        }}
                                                    >
                                                        {departmentValue}
                                                    </Box>
                                                </TableCell>
                                            );
                                        }

                                        if (column.field === "level") {
                                            const levelValue = String(issue.level ?? "-")

                                            return (
                                                <TableCell key={column.field} align="center">
                                                    <Box
                                                        sx={{
                                                            width: '60px',
                                                            fontSize: 10,
                                                            px: 0,
                                                            py: 0.3,
                                                            borderRadius: 2,
                                                            color: levelValue === "เร่งด่วน" ? '#E92020' : '#054887',
                                                            backgroundColor: levelValue === "เร่งด่วน" ? '#F03D3D1F' : '#004D991F',
                                                        }}
                                                    >
                                                        {levelValue}
                                                    </Box>
                                                </TableCell>
                                            )
                                        }

                                        if (column.field === "readDuration" || column.field === "remainingDays") {
                                            // 🧮 Helper: แปลงข้อความ "3 วัน" → 3 (ตัวเลข)
                                            const getDays = (text?: string): number => {
                                                if (!text) return 0;
                                                const match = text.match(/\d+/);
                                                return match ? parseInt(match[0], 10) : 0;
                                            };

                                            // 🧮 Helper: แปลงวันที่ "10/10/2025" → Date object
                                            const parseDate = (dateStr: string): Date | null => {
                                                const [day, month, year] = dateStr.split("/").map(Number);
                                                if (!day || !month || !year) return null;
                                                return new Date(year, month - 1, day);
                                            };

                                            // ✅ แปลงค่าต่าง ๆ
                                            const readDays = getDays(issue.readDuration);
                                            const reportDate = parseDate(issue.date);
                                            const today = new Date();

                                            let diffText = "-";
                                            let diff = 0;

                                            if (reportDate && readDays > 0) {
                                                // 🧮 วันที่ครบกำหนด = วันที่แจ้ง + readDuration (เช่น 10 ต.ค. + 2 วัน = 12 ต.ค.)
                                                const dueDate = new Date(reportDate);
                                                dueDate.setDate(reportDate.getDate() + readDays);

                                                // ✅ คำนวณความต่างของวัน (จำนวนวันที่เหลือหรือเกิน)
                                                const diffTime = dueDate.getTime() - today.getTime();
                                                diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                                // ✅ ข้อความสถานะ
                                                if (diff > 0) diffText = `เหลือ ${diff} วัน`;
                                                else if (diff < 0) diffText = `เกิน ${Math.abs(diff)} วัน`;
                                                else diffText = "ครบกำหนดวันนี้";
                                            }

                                            // ✅ ตั้งค่าสีพื้นหลัง/ตัวอักษรตามสถานะ
                                            let color = "#054887";

                                            if (diff < 0) {
                                                color = "#E92020";
                                            } else if (diff <= 2 && diff > 0) {
                                                color = "#FCBE04";
                                            } else if (diff === 0) {
                                                color = "#108BE8";
                                            }

                                            // ✅ แสดงผลตาม column
                                            const displayValue =
                                                column.field === "readDuration"
                                                    ? issue.readDuration || "-"
                                                    : issue.remainingDays || "-";

                                            return (
                                                <TableCell key={column.field} align="center">
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row", // แนวนอน
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            // gap: 1,
                                                        }}
                                                    >
                                                        {/* กล่องตัวเลข */}
                                                        <Box
                                                            sx={{
                                                                minWidth: "60px",
                                                                fontSize: 12,
                                                                borderRadius: 2,
                                                                color: '#000',
                                                                fontWeight: 400,
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {displayValue}
                                                        </Box>

                                                        {/* ข้อความสถานะ */}
                                                        <Typography
                                                            sx={{
                                                                fontSize: 10,
                                                                color:
                                                                    diff < 0
                                                                        ? "#E92020"
                                                                        : diff === 0
                                                                            ? "#FF8C00"
                                                                            : "#FCBF04",
                                                                whiteSpace: "nowrap",
                                                            }}
                                                        >
                                                            ({diffText})
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                            );
                                        }

                                        // 🔹 ปุ่มจัดการ
                                        if (column.field === "actions") {
                                            return (
                                                <TableCell key={column.field} align="center">
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        sx={{
                                                            fontSize: 12,
                                                            textTransform: "none",
                                                            borderRadius: 2.5,
                                                            px: 2,
                                                            py: 0.2,
                                                            bgcolor: '#004D99'
                                                        }}
                                                        onClick={() => handleOpenModal(issue)}
                                                    >
                                                        <EditIcon sx={{ pr: 0.5, fontSize: 20 }} />
                                                        จัดการ
                                                    </Button>
                                                </TableCell>
                                            );
                                        }

                                        // 🔹 ค่าทั่วไป
                                        return (
                                            <TableCell
                                                key={column.field}
                                                align="left"
                                                sx={{
                                                    fontSize: 12,
                                                    py: 1,
                                                    borderBottom: "1px solid #eee",
                                                }}
                                            >
                                                {String(value ?? "-")}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ✅ Pagination ด้านล่าง (คงที่ ไม่ scroll) */}
            <Box sx={{ flexShrink: 0 }}>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={issuesData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
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
        </Paper >
    );
};

export default IssueTableChild;

