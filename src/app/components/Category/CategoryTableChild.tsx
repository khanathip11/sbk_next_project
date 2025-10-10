import { Box, Typography, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, IconButton, Paper, TablePagination } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
import { categories } from "@/app/data/categoryData";
import { Category } from "@/app/types/categoryType";

const CategoryTableChild = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    const flattenedRows = categories.flatMap((cat) => [
        { ...cat, isSub: false },
        ...(cat.children?.map((child) => ({
            ...child,
            isSub: true,
            parentId: cat.id,
            creator: cat.creator,
            createdAt: cat.createdAt,
        })) ?? []),
    ]);

    // จำกัดให้แสดงเฉพาะหมวดหลักตามหน้า
    const paginatedCategories = categories.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Paper
            elevation={2}
            sx={{
                width: "100%",
                height: "auto",
                pb: 1,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE / Edge เก่า
                "&::-webkit-scrollbar": {
                    display: "none", // Chrome, Safari
                },
            }}
        >
            <TableContainer component={Paper}
                sx={{
                    borderRadius: 3,
                    boxShadow: "none",
                    border: "1px solid #fff",
                    flex: 1,
                    overflow: "auto",
                    scrollbarWidth: "none", // Firefox
                    msOverflowStyle: "none", // IE / Edge
                    "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
                }}>
                <Table size="small" sx={{ borderCollapse: "collapse" }}>
                    {/* ✅ Table Head */}
                    <TableHead sx={{ height: 50 }}>
                        <TableRow sx={{ backgroundColor: "#F2F2F4" }}>
                            <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                                หมวดหมู่
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                                ผู้สร้าง
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                                สร้างวันที่
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: "bold", textAlign: "center", width: "20%" }}
                            >
                                จัดการ
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {/* ✅ Table Body */}
                    <TableBody>
                        <TableRow>
                            {/* ✅ ให้ TreeView อยู่ใน cell เดียว (เต็มความกว้างตาราง) */}
                            <TableCell colSpan={4} sx={{ p: 0 }}>
                                <SimpleTreeView
                                    disableSelection
                                    // defaultExpandedItems={categories.map((c) => c.id)}
                                    slots={{
                                        collapseIcon: ExpandMoreIcon,
                                        expandIcon: ChevronRightIcon,
                                    }}
                                    sx={{
                                        "& .MuiTreeItem-content": { py: 0.5 },
                                        "& .MuiTreeItem-label": { width: "100%" },
                                        "& .MuiTreeItem-group": {
                                            borderLeft: "1px dashed #E0E0E0",
                                            ml: 2,
                                        },
                                    }}
                                >
                                    {paginatedCategories.map((cat) => (
                                        <TreeItem
                                            key={cat.id}
                                            itemId={cat.id}
                                            label={
                                                <Table
                                                    size="small"
                                                    sx={{ width: "100%", borderCollapse: "collapse" }}
                                                >
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell sx={{ width: "40%" }}>
                                                                <Typography
                                                                    sx={{ fontWeight: 400, fontSize: 13, color: "#000" }}
                                                                >
                                                                    {cat.category}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell sx={{ width: "20%" }}>
                                                                <Typography sx={{ fontSize: 13 }}>
                                                                    {cat.creator}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell sx={{ width: "20%" }}>
                                                                <Typography sx={{ fontSize: 13 }}>
                                                                    {cat.createdAt}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell sx={{ textAlign: "center", display: 'flex', justifyContent: 'center', gap: 0.5, }}>
                                                                <IconButton size="small" color="primary" sx={{ backgroundColor: '#fff', borderRadius: 2 }}>
                                                                    <EditIcon fontSize="small" sx={{ fontSize: 16 }} />
                                                                </IconButton>
                                                                <IconButton size="small" color="primary" sx={{ backgroundColor: '#fff', borderRadius: 2 }}>
                                                                    <AddCircleRoundedIcon fontSize="small" sx={{ fontSize: 16 }} />
                                                                </IconButton>
                                                                <IconButton size="small" color="error" sx={{ backgroundColor: '#fff', borderRadius: 2 }}>
                                                                    <DeleteIcon fontSize="small" sx={{ fontSize: 16 }} />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            }
                                        >
                                            {/* ✅ Child rows */}
                                            {cat.children?.map((child) => (
                                                <TreeItem
                                                    key={child.id}
                                                    itemId={child.id}
                                                    sx={{ backgroundColor: '#F9F9FA' }}
                                                    label={
                                                        <Table
                                                            size="small"
                                                            sx={{ width: "100%", borderCollapse: "collapse" }}
                                                        >
                                                            <TableBody>
                                                                <TableRow

                                                                >
                                                                    <TableCell sx={{ width: "40%" }}>
                                                                        <Typography
                                                                            sx={{ fontWeight: 300, fontSize: 13, color: "#000" }}
                                                                        >
                                                                            {child.category}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell sx={{ width: "20%" }}>
                                                                        <Typography sx={{ fontSize: 13 }}>
                                                                            {cat.creator}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell sx={{ width: "20%" }}>
                                                                        <Typography sx={{ fontSize: 13 }}>
                                                                            {cat.createdAt}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell sx={{ textAlign: "center", display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                                                                        <IconButton size="small" color="primary" sx={{ backgroundColor: '#fff', borderRadius: 2 }}>
                                                                            <EditIcon fontSize="small" sx={{ fontSize: 16 }} />
                                                                        </IconButton>
                                                                        <IconButton size="small" color="error" sx={{ backgroundColor: '#fff', borderRadius: 2 }}>
                                                                            <DeleteIcon fontSize="small" sx={{ fontSize: 16 }} />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    }
                                                />
                                            ))}
                                        </TreeItem>
                                    ))}
                                </SimpleTreeView>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ flexShrink: 0 }}>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={flattenedRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Paper >
    )
}

export default CategoryTableChild