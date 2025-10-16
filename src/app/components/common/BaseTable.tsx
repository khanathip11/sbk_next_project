// BaseTable.tsx
"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    TablePagination,
    Box,
} from "@mui/material";

export interface Column<T> {
    id: keyof T | "action" | "viewIssue";
    label: string;
    align?: "left" | "center" | "right";
    render?: (row: T) => React.ReactNode;
    visibleFor?: string[];
}

export interface BaseTableProps<T> {
    columns: Column<T>[];
    rows: T[];
    loading?: boolean;
    emptyText?: string;
    rowsPerPageOptions?: number[];
    rowHeight?: number; // ✅ เพิ่ม prop เพื่อกำหนดความสูงของแต่ละแถว
}

function BaseTable<T extends { level?: string }>({
    columns,
    rows,
    loading = false,
    emptyText = "ไม่มีข้อมูล",
    rowsPerPageOptions = [10, 25, 100],
    rowHeight = 52, // ✅ กำหนดค่าเริ่มต้น
}: BaseTableProps<T>) {
    // ✅ Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // ✅ Slice ข้อมูลตามหน้า
    const paginatedRows = rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
        >
            <Table size="small">
                {/* 🔹 หัวตาราง */}
                <TableHead>
                    <TableRow sx={{ height: rowHeight, backgroundColor: "#F2F2F4" }}>
                        {columns.map((col) => (
                            <TableCell
                                key={String(col.id)}
                                align={col.align || "left"}
                                sx={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "#333",
                                }}
                            >
                                {col.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                {/* 🔹 เนื้อหาตาราง */}
                {/* <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                <CircularProgress size={24} />
                            </TableCell>
                        </TableRow>
                    ) : rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                <Typography variant="body2" color="text.secondary">
                                    {emptyText}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedRows.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                hover
                                sx={{
                                    height: rowHeight, // ✅ ใช้ค่าจาก prop
                                    "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                                }}
                            >
                                {columns.map((col) => (
                                    <TableCell
                                        key={String(col.id)}
                                        align={col.align || "left"}
                                        sx={{
                                            fontSize: 13,
                                            paddingY: 1.2,
                                            paddingX: 2,
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        {col.render
                                            ? col.render(row)
                                            : String((row as T)[col.id as keyof T] ?? "-")}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody> */}
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                <CircularProgress size={24} />
                            </TableCell>
                        </TableRow>
                    ) : rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                <Typography variant="body2" color="text.secondary">
                                    {emptyText}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedRows.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                hover
                                sx={{
                                    height: rowHeight,
                                    "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },

                                    ...(row.level === "เร่งด่วน" && {
                                        animation: "blinkUrgent 5s infinite",
                                    }),

                                    // ✅ กำหนด keyframes ภายใน sx ได้เลย
                                    "@keyframes blinkUrgent": {
                                        "0%": { backgroundColor: "#FFEBEE" },
                                        "50%": { backgroundColor: "#FFFFFF" },
                                        "100%": { backgroundColor: "#FFEBEE" },
                                    },
                                }}
                            >
                                {columns.map((col) => (
                                    <TableCell
                                        key={String(col.id)}
                                        align={col.align || "left"}
                                        sx={{
                                            fontSize: 13,
                                            paddingY: 1.2,
                                            paddingX: 2,
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        {col.render
                                            ? col.render(row)
                                            : String((row as T)[col.id as keyof T] ?? "-")}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>

            </Table>

            {/* 🔹 Pagination Section */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    borderTop: "1px solid #eee",
                    backgroundColor: "#fff",
                }}
            >
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="แสดงแถวต่อหน้า"
                    sx={{
                        fontSize: 13,
                        "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                        {
                            fontSize: 13,
                        },
                    }}
                />
            </Box>
        </TableContainer>
    );
}

export default BaseTable;
