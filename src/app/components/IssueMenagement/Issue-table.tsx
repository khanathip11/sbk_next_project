"use client";
import { Stack, TextField, InputAdornment, Box, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IssueFilter from "./Issue-filter";
import DateRangePickerDemo from "./Issue-datepicker";
import React, { useState } from "react";
import IssueTableChild from "./Issue-table-child";
import IssueSummarySection from "./Issue-summary-section";
import { issuesData } from "@/app/data/issuesData";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';


const IssueTable = () => {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                bgcolor: "#F7F7F7",
                borderRadius: 4,
                boxSizing: "border-box",
                minWidth: 0,   // ✅
                minHeight: 0,  // ✅
            }}
        >
            {/* 🔹 Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // px: 2,
                    mb: 1,
                }}
            >
                <Typography
                    sx={{
                        px: 2,
                        pb: 1,
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#000",
                        flexShrink: 0, // ✅ คงขนาด ไม่หด
                    }}
                >
                    จัดการปัญหา
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        ml: "auto",
                        display: "flex",
                        gap: 0.5,
                        borderRadius: 2,
                        backgroundColor: '#004D99',
                        fontSize: 10,
                    }}
                >
                    <AddCircleRoundedIcon sx={{ fontSize: 16 }} />
                    สร้างปัญหาใหม่
                </Button>
            </Box>

            <Box sx={{ p: 2, pt: 0 }}>
                <IssueSummarySection selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} />
            </Box>

            {/* 🔹 Filter */}
            <Stack
                sx={{
                    display: "flex",
                    width: "100%",
                    gap: 1,
                    px: 2,
                    pb: 1.5,
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
                        minWidth: "150px",
                        width: "150px",
                        flexShrink: 0,
                        bgcolor: "#f2f2f4",
                        "& .MuiOutlinedInput-root": {
                            height: 36,
                            borderRadius: 3, // ✅ ใส่ radius ตรงนี้
                            "& fieldset": {
                                borderColor: "#D1D5DB", // เส้นขอบปกติ
                            },
                            "&:hover fieldset": {
                                borderColor: "#9CA3AF", // เส้นขอบตอน hover
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#1976d2", // เส้นขอบตอน focus
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

                <IssueFilter />
                <Box flexGrow={1} />

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexShrink: 0,     // ✅ กันโดนบีบจนหลุด
                    flexWrap: "nowrap", // ✅ ไม่ให้ขึ้นบรรทัดใหม่
                    overflowX: "auto",  // ✅ ถ้าจอเล็ก ให้เลื่อนในแนวนอนได้
                    "&::-webkit-scrollbar": { display: "none" }, // ซ่อน scrollbar
                    scrollbarWidth: "none",
                }}>
                    <DateRangePickerDemo />
                    <Typography sx={{ fontSize: 12 }}>ผลลัพธ์</Typography>
                    <Typography
                        sx={{
                            height: 35,
                            border: "1px solid #D9D9D9",
                            px: 1.5,
                            borderRadius: 2,
                            backgroundColor: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            fontSize: 12
                        }}
                    >
                        {issuesData.length}
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
                <IssueTableChild filterLevel={selectedLevel} />
            </Box>
        </Box>
    );
};

export default IssueTable;

