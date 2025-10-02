import { Box, Button, Grid, InputAdornment, ListItemButton, Paper, Stack, TextField, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from "@mui/icons-material/Search";
import { StaticImageData } from "next/image";
import ComplaintFilterBar from './ComplaintFilterBar';
import React from 'react'

type CardsData = {
    id: number;
    issue: string;
    count: string;
    status: string;
    imageSrc: string | StaticImageData;
    bgColor: string;
    color: string;
    title: string;
    desc: string;
    refNumber: string;
    reporter: string;
    location: string;
    dateTime: string;
}

type ComplaintOverviewProps = {
    cardsDataOverview: CardsData[]
    collapse: boolean;
    closeTask: boolean;
}

const ComplaintOverview: React.FC<ComplaintOverviewProps> = ({ cardsDataOverview,
    collapse,
    closeTask, }) => {
    const issueData = [
        { type: "ระบบรับข้อมูลแล้ว", issue: 20, percent: 30, color: "#F72323" },
        { type: "เจ้าหน้าที่ตรวจสอบ", issue: 10, percent: 20, color: "#F7F023" },
        { type: "ส่งต่อให้หน่วยงาน", issue: 30, percent: 25, color: "#38E7FF" },
        { type: "หน่วยงานกำลังดำเนินการ", issue: 10, percent: 25, color: "#3845FF" },
        { type: "ดำเนินการเสร็จสิ้น", issue: 7, percent: 25, color: "#1FED64" },
        { type: "ไม่สามารถดำเนินการได้", issue: 3, percent: 25, color: "#7E13BF" },
    ];

    const colorCode = [
        { color: '#00011F' },
        { color: '#01015C' },
        { color: '#020296' },
        { color: '#0202B0' },
        { color: '#0202D4' },
        { color: '#4BA8EB' },
        { color: '#8CCBFA' },
        { color: '#A2D1F5' },
        { color: '#BAF9FF' },
        { color: '#CFFBFF' },
        { color: '#ffffff' },
    ]

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Stack sx={{ display: 'flex', gap: 1, width: '300px', }} direction="row" alignItems="center">
                <TextField
                    id="complaint-search"
                    placeholder="ค้นหาตามพื้นที่"
                    variant="outlined"
                    size="small"
                    sx={{
                        minWidth: '100%',
                        bgcolor: "white",
                        borderRadius: 2,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                            height: 36,
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": { border: "none" },
                        },
                        "& .MuiInputBase-input": {
                            fontSize: 14,
                            color: "black",
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: 18, color: "gray" }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Box
                sx={{
                    width: '300px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 1,
                    pt: 2,
                }}
            >
                {issueData.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 0.5,
                        }}
                    >
                        <Box
                            sx={{
                                width: 6,
                                height: '100%',
                                borderRadius: 2,
                                backgroundColor: item.color,
                            }}
                        />

                        <Paper
                            sx={{
                                flex: 1,
                                minHeight: 50,
                                height: 'auto',
                                borderRadius: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                pl: 1,
                                pt: 0.5,
                                pr: 1,
                                pb: 0.5,
                                bgcolor: 'rgba(255,255,255,0.1)',
                                color: '#ffffff',
                                borderTop: '1px solid white',
                                borderBottom: '1px solid white',
                                borderLeft: 'none',
                                borderRight: 'none',
                                wordBreak: 'break-word',
                            }}
                        >
                            <Typography sx={{ fontSize: 8 }}>{item.type}</Typography>
                            <Typography sx={{ fontSize: 13 }}>{`${item.issue} (${item.percent}%)`}</Typography>
                            {/* {item.percent}% */}
                        </Paper>
                    </Box>
                ))}
            </Box>

            <Box sx={{
                width: '300px',
                height: 'auto',
                borderTop: '1px solid white',
                borderBottom: '1px solid white',
                borderLeft: 'none',
                borderRight: 'none',
                borderRadius: 4,
                mt: 1,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
            }}>
                <Typography sx={{ color: '#ffffff', fontSize: 12 }}>ประเภทปัญหาที่ขอความช่วยเหลือ</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }} >
                    {/* <Box sx={{ width: 90, height: 90, bgcolor: 'white', borderRadius: '50%' }} /> */}
                    <Box
                        sx={{
                            width: 90,
                            height: 90,
                            bgcolor: 'none',
                            borderRadius: '50%',
                            border: '15px solid blue',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Typography sx={{ fontSize: 12 }}>80</Typography>
                        <Typography sx={{ fontSize: 12 }}>ปัญหา</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        color: '#ffffff',
                        mt: 1,
                    }}
                >
                    {cardsDataOverview.map((items, index) => (
                        <Box key={items.id || index} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.7 }}>
                            <Box
                                sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    border: '1px solid #ffffff',
                                    bgcolor: colorCode[index % colorCode.length].color,
                                }}
                            />

                            <Typography
                                key={items.id}
                                sx={{
                                    color: 'white',
                                    fontSize: 10,
                                    lineHeight: '6px',
                                    m: 0,
                                }}
                            >
                                {items.issue}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box >
    )
}

export default ComplaintOverview