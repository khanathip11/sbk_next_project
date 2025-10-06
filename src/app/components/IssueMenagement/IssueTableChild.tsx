import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import IssueInfo from './IssueInfo';
import { columns } from './columns';
import { issuesData } from '@/app/data/issuesData';
import { IssueItem } from '@/app/types/IssueItem';
import { Box } from '@mui/system';

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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // 🟢 ฟังก์ชันกำหนดสีตาม type
    const getTypeStyle = (rawType: string) => {
        const status = rawType?.trim(); // ✅ ลบช่องว่าง

        switch (status) {
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
            console.warn("ไม่พบ type:", status); // ✅ debug ชั่วคราว
            return { background: "#f5f5f5", color: "#616161" };
        }
    };

    return (
        <Paper sx={{ width: '100%', borderRadius: 3, overflow: 'hidden' }}>
            <TableContainer sx={{ height: 'auto', overflow: 'visible' }}> {/* ✅ ไม่มี scroll */}
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => {
                                const isCenterColumn = [
                                    "สถานะการแก้ปัญหา",
                                    "ระดับของปัญหา",
                                    "จัดการ",
                                ].includes(column.label);

                                return (
                                    <TableCell
                                        key={column.label}
                                        align={isCenterColumn ? "center" : "left"}
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 13,
                                            color: "#333",
                                            backgroundColor: "#f5f5f5",
                                            borderBottom: "1px solid #ddd",
                                            paddingY: 2,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {issuesData
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((issue) => (
                        <TableRow key={issue.id} hover>
                            {columns.map((column) => {
                            const value = issue[column.field as keyof IssueItem];
                            const isCenterColumn = ["type", "level", "actions"].includes(column.field);

                            // ✅ ส่วนแสดงสีของสถานะ (type)
                            if (column.field === "status") {
                                console.log("Type value:", value);
                                const typeValue = String(value ?? "-"); // ✅ บังคับเป็น string
                                const typeStyle = getTypeStyle(typeValue); // ✅ ฟังก์ชันคืนสีตามสถานะ
                                return (
                                    <TableCell key={column.field} align="center">
                                    <Box
                                        sx={{
                                        ...typeStyle,
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: "12px",
                                        fontSize: 12,
                                        fontWeight: 600,
                                        display: "inline-block",
                                        }}
                                    >
                                        {typeValue}
                                    </Box>
                                    </TableCell>
                                );
                            }

                            // ✅ ปุ่มจัดการ
                            if (column.field === "actions") {
                                return (
                                <TableCell key={column.field} align="center">
                                    <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        fontSize: 12,
                                        textTransform: "none",
                                        borderRadius: 2,
                                    }}
                                    onClick={() => handleOpenModal(issue)}
                                    >
                                    รายละเอียด
                                    </Button>
                                </TableCell>
                                );
                            }

                            // ✅ ค่าอื่น ๆ แสดงปกติ
                            return (
                                <TableCell
                                key={column.field}
                                align={isCenterColumn ? "center" : "left"}
                                sx={{
                                    fontSize: 13,
                                    verticalAlign: "middle",
                                    paddingY: 1,
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

            {/* ✅ pagination ยังอยู่เหมือนเดิม */}
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={issuesData.length} // ✅ แก้จาก rows.length
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />


            <IssueInfo open={open} selectedRow={selectedRow} handleClose={handleCloseModal} issuesData={issuesData}/>
        </Paper>

    )
}

export default IssueTableChild