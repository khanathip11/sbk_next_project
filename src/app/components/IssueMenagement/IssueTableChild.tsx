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
import { rows } from './rows';
import type { DateRow } from './TypeDate'

const IssueTableChild = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<DateRow | null>(null);

    const handleOpenModal = (row: DateRow) => {
        setSelectedRow(row);
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
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // ✅ แสดงเฉพาะหน้าปัจจุบัน
                            .map((row, index) => (
                                <TableRow key={index} hover>
                                    {columns.map((column) => {
                                        const value = row[column.label];
                                        const isCenterColumn = [
                                            "สถานะการแก้ปัญหา",
                                            "ระดับของปัญหา",
                                            "จัดการ",
                                        ].includes(column.label);

                                        if (column.label === "จัดการ") {
                                            return (
                                                <TableCell key={column.label} align="center">
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        sx={{
                                                            fontSize: 12,
                                                            textTransform: "none",
                                                            borderRadius: 2,
                                                        }}
                                                        onClick={() => handleOpenModal(row)}
                                                    >
                                                        รายละเอียด
                                                    </Button>
                                                </TableCell>
                                            );
                                        }

                                        return (
                                            <TableCell
                                                key={column.label}
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <IssueInfo open={open} selectedRow={selectedRow} handleClose={handleCloseModal} />
        </Paper>

    )
}

export default IssueTableChild