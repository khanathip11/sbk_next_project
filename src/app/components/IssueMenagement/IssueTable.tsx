"use client";
import { Stack, TextField, InputAdornment, Paper, Box, Typography } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import IssueFilter from './IssueFilter';
import React from 'react'

const IssueTable = () => {
    return (
        <Paper
            elevation={5}
            sx={{
                borderRadius: 4,
                height: '100%',
                p: 1,
                bgcolor: '#F7F7F7',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}>
            <Typography sx={{ p: 2, pb: 3, fontSize: 24, fontWeight: 'bold' }}>จัดการปัญหาของหน่วยงาน</Typography>
            <Stack sx={{ display: 'flex', width: '100%', gap: 1, px: 2 }} direction="row" alignItems="center">
                <TextField
                    id="complaint-search"
                    placeholder="ค้นหา"
                    variant="outlined"
                    size="small"
                    sx={{
                        minWidth: '300px',
                        bgcolor: "#f2f2f4",
                        borderRadius: 2,
                        pointerEvents: 'auto',
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            height: 36,

                        },
                        "& .MuiInputBase-input": {
                            fontSize: 14,
                            color: "black",
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
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography >ผลลัพธ์</Typography>
                    <Typography sx={{ width: 'auto', height: 35, border: '1px solid #D9D9D9', px: 1, borderRadius: 2, backgroundColor: '#ffffff', display: 'flex', alignItems: 'center' }}>100</Typography>
                </Box>
            </Stack>

        </Paper>
    )
}

export default IssueTable