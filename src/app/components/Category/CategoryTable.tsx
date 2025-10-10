"use client";
import { Stack, TextField, InputAdornment, Box, Typography, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, IconButton, Paper, TablePagination, ListItemButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import CategoryDatePicker from "./CategoryDatePicker";
import CategoryTableChild from "./CategoryTableChild";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CategoryCreate from "./CategoryCreate";

const CategoryTable = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden", // ✅ ไม่ให้ทะลุ container
                bgcolor: "#F7F7F7",
                borderRadius: 4,
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    mb: 1
                }}
            >
                <Typography
                    sx={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#000",
                    }}
                >
                    จัดการหมวดหมู่ของปัญหา
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        ml: "auto",
                        display: "flex",
                        gap: 0.5,
                        borderRadius: 2,
                        backgroundColor: '#004D99',
                        fontSize: 10
                    }}
                    onClick={handleOpen}
                >
                    <AddCircleRoundedIcon sx={{ fontSize: 16 }} />
                    เพิ่มหมวดหมู่
                </Button>
            </Box>

            {/* <CategoryCreate open={open} handleClose={handleClose} /> */}

            {/* 🔹 Filter */}
            <Stack
                sx={{
                    display: "flex",
                    width: "100%",
                    gap: 1,
                    px: 2,
                    pb: 0,
                    pt: 1,
                    flexShrink: 0,
                    flexWrap: "nowrap", // ✅ ไม่ให้ขึ้นบรรทัดใหม่
                    overflowX: "auto",   // ✅ ถ้าจอเล็ก ให้เลื่อนในแนวนอนได้
                    "&::-webkit-scrollbar": { display: "none" }, // ซ่อน scrollbar
                    scrollbarWidth: "none",
                }}
                direction="row"
                alignItems="center"
            >
                <TextField
                    id="complaint-search"
                    placeholder="ค้นหา"
                    variant="outlined"
                    size="small"
                    sx={{
                        minWidth: "300px",
                        width: "200px",
                        flexShrink: 0,
                        bgcolor: "#f2f2f4",
                        "& .MuiOutlinedInput-root": {
                            height: 36,
                            borderRadius: 3,
                            "& fieldset": {
                                borderColor: "#D1D5DB", // เส้นขอบปกติ
                            },
                            "&:hover fieldset": {
                                borderColor: "#9CA3AF", // เส้นขอบตอน hover
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#1976d2",
                            },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: 18, color: "#5f6470" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Box flexGrow={1} />

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexShrink: 0,
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                }}>
                    <CategoryDatePicker />
                    <Typography sx={{ fontSize: 12 }}>ผลลัพธ์</Typography>
                    <Typography
                        sx={{
                            height: 35,
                            border: "1px solid #D9D9D9",
                            px: 1,
                            borderRadius: 2,
                            backgroundColor: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            fontSize: 12
                        }}
                    >
                        100
                    </Typography>
                </Box>
            </Stack>

            {/* 🔹 ตาราง Scroll ภายใน */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto", // ✅ scroll เฉพาะส่วนนี้
                    overflowX: "hidden",
                    p: 2,
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                }}
            >
                <CategoryCreate open={open} handleClose={handleClose} />
                <CategoryTableChild />
            </Box>
        </Box>
    )
}

export default CategoryTable