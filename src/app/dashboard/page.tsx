import React from 'react'
import NavigatLayout from '../components/layout/NavigatLayout'
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography
} from "@mui/material";
import { complaintColumns, complaintRows } from '../data/dashboardData';

const Dashboard = () => {
    const columns = complaintColumns;
    const rows = complaintRows;
    const title = "ตารางเรื่องร้องทุกข์";
    return (
        <NavigatLayout>
            <TableContainer component={Paper} sx={{ borderRadius: 3, height: '100%' }}>
                {title && (
                    <Typography variant="h6" sx={{ p: 2 }}>
                        {title}
                    </Typography>
                )}
                <Table stickyHeader aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.id}
                                    align={col.align || "left"}
                                    sx={{ fontWeight: "bold", minWidth: col.minWidth }}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow hover key={index}>
                                {columns.map((col) => (
                                    <TableCell key={col.id} align={col.align || "left"}>
                                        {row[col.id]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </NavigatLayout>
    )
}

export default Dashboard