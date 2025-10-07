// "use client";
// import { Stack, TextField, InputAdornment, Paper, Box, Typography } from '@mui/material'
// import SearchIcon from "@mui/icons-material/Search";
// import IssueFilter from './IssueFilter';
// import DateRangePickerDemo from '../common/DateRangePickerDemo';
// import React from 'react'
// import IssueTableChild from './IssueTableChild';

// const IssueTable = () => {
//     return (
//         <Paper
//             elevation={5}
//             sx={{
//                 borderRadius: 4,
//                 height: '100%',
//                 p: 1,
//                 bgcolor: '#F7F7F7',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-start'
//             }}>
//             <Typography sx={{ p: 2, pb: 3, fontSize: 24, fontWeight: 'bold' }}>จัดการปัญหาของหน่วยงาน</Typography>
//             <Stack sx={{ display: 'flex', width: '100%', gap: 1, px: 2 }} direction="row" alignItems="center">
//                 <TextField
//                     id="complaint-search"
//                     placeholder="ค้นหา"
//                     variant="outlined"
//                     size="small"
//                     sx={{
//                         minWidth: '300px',
//                         bgcolor: "#f2f2f4",
//                         borderRadius: 2,
//                         pointerEvents: 'auto',
//                         "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                             height: 36,

//                         },
//                         "& .MuiInputBase-input": {
//                             fontSize: 14,
//                             color: "black",
//                         },
//                     }}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon sx={{ fontSize: 18, color: "#5f6470" }} />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />

//                 <IssueFilter />
//                 <Box flexGrow={1} />

//                 <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//                     <DateRangePickerDemo />
//                     <Typography >ผลลัพธ์</Typography>
//                     <Typography
//                         sx={{ width: 'auto', height: 35, border: '1px solid #D9D9D9', px: 1, borderRadius: 2, backgroundColor: '#ffffff', display: 'flex', alignItems: 'center' }}>
//                         100
//                     </Typography>
//                 </Box>

//             </Stack>

//             <Box sx={{ p: 2, width: '100%', flexGrow: 1 }}>
//                 <IssueTableChild />
//             </Box>

//         </Paper>
//     )
// }

// export default IssueTable
"use client";
import { Stack, TextField, InputAdornment, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IssueFilter from "./IssueFilter";
import DateRangePickerDemo from "../common/DateRangePickerDemo";
import React from "react";
import IssueTableChild from "./IssueTableChild";

const IssueTable = () => {
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
            {/* 🔹 Header */}
            <Typography
                sx={{
                    p: 2,
                    pb: 1,
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#000",
                    flexShrink: 0, // ✅ คงขนาด ไม่หด
                }}
            >
                จัดการปัญหาของหน่วยงาน
            </Typography>

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
                    <Typography>ผลลัพธ์</Typography>
                    <Typography
                        sx={{
                            height: 35,
                            border: "1px solid #D9D9D9",
                            px: 1,
                            borderRadius: 2,
                            backgroundColor: "#ffffff",
                            display: "flex",
                            alignItems: "center",
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
                <IssueTableChild />
            </Box>
        </Box>
    );
};

export default IssueTable;
