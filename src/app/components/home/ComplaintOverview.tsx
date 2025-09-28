import { Box, Button, Grid, InputAdornment, ListItemButton, Paper, Stack, TextField } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from "@mui/icons-material/Search";
import React from 'react'

const ComplaintOverview = () => {
    const issueData = [
        { type: "Type A", percent: 30, color: "#F72323" },
        { type: "Type B", percent: 20, color: "#F7F023" },
        { type: "Type C", percent: 25, color: "#38E7FF" },
        { type: "Type D", percent: 25, color: "#3845FF" },
        { type: "Type C", percent: 25, color: "#1FED64" },
        { type: "Type D", percent: 25, color: "#7E13BF" },
    ];
    return (
        <Box sx={{ width: '100%', }}>
            <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                    placeholder="ค้นหาตามพื้นที่"
                    variant="outlined"
                    size="small"
                    sx={{
                        width: '80%',
                        '& .MuiOutlinedInput-root': {
                            border: 'none',                   // ลบ border ทั้งหมด
                            borderTop: '1px solid white',     // เพิ่มเฉพาะ top
                            borderBottom: '1px solid white',  // เพิ่มเฉพาะ bottom
                            borderRadius: 4,
                            backgroundColor: 'rgba(255,255,255,0.1)', // ทำเบลอ/โปร่งใส
                            height: 25,
                            fontSize: 12,
                            padding: '0 8px',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.15)',
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                outline: 'none'
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                                borderTop: '1px solid white',
                                borderBottom: '1px solid white',
                            },
                        },
                        '& .MuiInputAdornment-root': {
                            marginRight: 1,
                        },
                        '& .MuiInputBase-input': {
                            fontSize: 12,
                            color: 'white',                  // สีข้อความที่พิมพ์
                            '&::placeholder': {
                                color: '#ffffff', // สี placeholder
                                opacity: 1,                     // บังคับให้ opacity ถูกต้อง
                            },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: 16, color: 'white' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    startIcon={<FilterListIcon sx={{ fontSize: 12, color: 'white', }} />}
                    sx={{
                        minWidth: 0,
                        height: 25,
                        padding: '0 8px',
                        fontSize: 12,
                        textTransform: 'none',
                        borderTop: '1px solid white',
                        borderBottom: '1px solid white',
                        borderLeft: 'none',
                        borderRight: 'none',
                        borderRadius: 2,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.2)',
                        },
                        '& .MuiButton-startIcon': {
                            marginRight: 1,
                            minWidth: 0,
                            svg: {
                                fontSize: 16,
                            },
                        },
                    }}
                >
                    Filter
                </Button>
            </Stack>

            <Box
                sx={{
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
                            alignItems: 'center',
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
                                height: 50,
                                borderRadius: 6,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: '#F0F0F0',
                                borderTop: '1px solid white',
                                borderBottom: '1px solid white',
                                borderLeft: 'none',
                                borderRight: 'none',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                color: '#ffffff'
                            }}
                        >
                            {item.percent}%
                        </Paper>
                    </Box>
                ))}
            </Box>
        </Box >
    )
}

export default ComplaintOverview