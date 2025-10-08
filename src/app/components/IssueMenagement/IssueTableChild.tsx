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
} from "@mui/material";
import IssueInfo from "./IssueInfo";
import { columns } from "./columns";
import { issuesData } from "@/app/data/issuesData";
import { IssueItem } from "@/app/types/IssueItem";
import EditIcon from '@mui/icons-material/Edit';

const IssueTableChild: React.FC = () => {
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
                return { background: "#fdecea", color: "#f03e3e" };
            case "เจ้าหน้าที่ตรวจสอบ":
                return { background: "#fff8e1", color: "#fcbe04" };
            case "ส่งต่อให้หน่วยงาน":
                return { background: "#e3f2fd", color: "#01b5d7" };
            case "หน่วยงานกำลังดำเนินการ":
                return { background: "#e8f5e9", color: "#108be8" };
            case "ดำเนินการเสร็จสิ้น":
                return { background: "#f1f8e9", color: "#35c11f" };
            case "ไม่สามารถดำเนินการได้":
                return { background: "#f3e5f5", color: "#805ad4" };
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
                                        fontWeight: 600,
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
                        {issuesData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((issue) => (
                                <TableRow key={issue.id} hover>
                                    {columns.map((column) => {
                                        const value = issue[column.field as keyof IssueItem];

                                        // 🔹 สถานะ (มีสี)
                                        if (column.field === "status") {
                                            const style = getTypeStyle(String(value));
                                            return (
                                                <TableCell key={column.field} align="center">
                                                    <Box
                                                        sx={{
                                                            ...style,
                                                            px: 1.5,
                                                            py: 0.5,
                                                            borderRadius: 2,
                                                            fontSize: 12,
                                                            fontWeight: 600,
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
                                                            fontSize: 13,
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
                                                            borderRadius: 3,
                                                            px: 2,
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
                                                    fontSize: 13,
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
        </Paper>
    );
};

export default IssueTableChild;

