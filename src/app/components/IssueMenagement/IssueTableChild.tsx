// import React, { useState } from 'react'
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { Button } from '@mui/material';
// import IssueInfo from './IssueInfo';
// import { columns } from './columns';
// import { issuesData } from '@/app/data/issuesData';
// import { IssueItem } from '@/app/types/IssueItem';
// import { Box } from '@mui/system';

// const IssueTableChild: React.FC = () => {
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//     const [open, setOpen] = useState(false);
//     const [selectedRow, setSelectedRow] = useState<IssueItem | null>(null);

//     const handleOpenModal = (issue: IssueItem) => {
//         setSelectedRow(issue);
//         setOpen(true);
//     };

//     const handleCloseModal = () => {
//         setOpen(false);
//         setSelectedRow(null);
//     };

//     const handleChangePage = (event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };

//     // 🟢 ฟังก์ชันกำหนดสีตาม type
//     const getTypeStyle = (rawType: string) => {
//         const status = rawType?.trim(); // ✅ ลบช่องว่าง

//         switch (status) {
//             case "ระบบรับข้อมูลแล้ว":
//                 return { background: "#fdecea", color: "#f03e3e" };
//             case "เจ้าหน้าที่ตรวจสอบ":
//                 return { background: "#fff8e1", color: "#fcbe04" };
//             case "ส่งต่อให้หน่วยงาน":
//                 return { background: "#e3f2fd", color: "#01b5d7" };
//             case "หน่วยงานกำลังดำเนินการ":
//                 return { background: "#e8f5e9", color: "#108be8" };
//             case "ดำเนินการเสร็จสิ้น":
//                 return { background: "#f1f8e9", color: "#35c11f" };
//             case "ไม่สามารถดำเนินการได้":
//                 return { background: "#f3e5f5", color: "#805ad4" };
//             default:
//                 console.warn("ไม่พบ type:", status); // ✅ debug ชั่วคราว
//                 return { background: "#f5f5f5", color: "#616161" };
//         }
//     };

//     return (
//         <Paper
//             sx={{
//                 width: "100%",
//                 borderRadius: 3,
//                 overflow: "hidden", // ✅ ให้ radius ทำงาน
//                 display: "flex",
//                 flexDirection: "column",
//             }}
//         >
//             {/* ✅ เพิ่ม maxHeight หรือ height ถ้าต้องการจำกัดความสูง */}
//             <TableContainer
//                 sx={{
//                     flex: 1,
//                     width: "100%",
//                     overflowX: "auto",  // ✅ scroll เฉพาะแนวนอน
//                     overflowY: "hidden", // ✅ ป้องกันแนวตั้ง
//                     borderRadius: 3,
//                     "&::-webkit-scrollbar": {
//                         height: 6, // ✅ scrollbar บาง ๆ
//                     },
//                     "&::-webkit-scrollbar-thumb": {
//                         backgroundColor: "#ccc",
//                         borderRadius: 3,
//                     },
//                     "&::-webkit-scrollbar-thumb:hover": {
//                         backgroundColor: "#aaa",
//                     },
//                 }}
//             >
//                 <Table stickyHeader>
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => {
//                                 const isCenterColumn = [
//                                     "สถานะการแก้ปัญหา",
//                                     "ระดับของปัญหา",
//                                     "จัดการ",
//                                 ].includes(column.label);

//                                 return (
//                                     <TableCell
//                                         key={column.label}
//                                         align={isCenterColumn ? "center" : "left"}
//                                         sx={{
//                                             fontWeight: 600,
//                                             fontSize: 13,
//                                             color: "#333",
//                                             backgroundColor: "#f5f5f5",
//                                             borderBottom: "1px solid #ddd",
//                                             px: 2,
//                                             whiteSpace: "nowrap", // ✅ ป้องกัน header พับ
//                                         }}
//                                     >
//                                         {column.label}
//                                     </TableCell>
//                                 );
//                             })}
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {issuesData
//                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                             .map((issue) => (
//                                 <TableRow key={issue.id} hover>
//                                     {columns.map((column) => {
//                                         const value = issue[column.field as keyof IssueItem];
//                                         const isCenterColumn = ["type", "level", "actions"].includes(column.field);

//                                         if (column.field === "status") {
//                                             const typeValue = String(value ?? "-");
//                                             const typeStyle = getTypeStyle(typeValue);
//                                             return (
//                                                 <TableCell key={column.field} align="center" sx={{ whiteSpace: "nowrap" }}>
//                                                     <Box
//                                                         sx={{
//                                                             ...typeStyle,
//                                                             px: 1.5,
//                                                             py: 0.5,
//                                                             borderRadius: 2,
//                                                             fontSize: 12,
//                                                             fontWeight: 600,
//                                                             display: "inline-block",
//                                                             whiteSpace: "nowrap",
//                                                         }}
//                                                     >
//                                                         {typeValue}
//                                                     </Box>
//                                                 </TableCell>
//                                             );
//                                         }

//                                         if (column.field === "actions") {
//                                             return (
//                                                 <TableCell key={column.field} align="center" sx={{ whiteSpace: "nowrap" }}>
//                                                     <Button
//                                                         variant="contained"
//                                                         size="small"
//                                                         sx={{
//                                                             fontSize: 12,
//                                                             textTransform: "none",
//                                                             borderRadius: 2,
//                                                         }}
//                                                         onClick={() => handleOpenModal(issue)}
//                                                     >
//                                                         รายละเอียด
//                                                     </Button>
//                                                 </TableCell>
//                                             );
//                                         }

//                                         return (
//                                             <TableCell
//                                                 key={column.field}
//                                                 align={isCenterColumn ? "center" : "left"}
//                                                 sx={{
//                                                     fontSize: 13,
//                                                     verticalAlign: "middle",
//                                                     py: 1,
//                                                     borderBottom: "1px solid #eee",
//                                                     whiteSpace: "nowrap",
//                                                     textOverflow: "ellipsis",
//                                                     overflow: "hidden",
//                                                     maxWidth: 200, // ✅ ป้องกันคอลัมน์ยืด
//                                                 }}
//                                             >
//                                                 {String(value ?? "-")}
//                                             </TableCell>
//                                         );
//                                     })}
//                                 </TableRow>
//                             ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* ✅ Pagination อยู่ในกรอบ */}
//             <Box sx={{ borderTop: "1px solid #eee" }}>
//                 <TablePagination
//                     rowsPerPageOptions={[10, 25, 100]}
//                     component="div"
//                     count={issuesData.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </Box>

//             {/* ✅ Modal เดิม */}
//             <IssueInfo
//                 getTypeStyle={getTypeStyle}
//                 open={open}
//                 selectedRow={selectedRow}
//                 handleClose={handleCloseModal}
//                 issuesData={issuesData}
//             />
//         </Paper>
//     )
// }

// export default IssueTableChild

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
                                                            borderRadius: 2,
                                                        }}
                                                        onClick={() => handleOpenModal(issue)}
                                                    >
                                                        รายละเอียด
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

