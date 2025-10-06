"use client";
import React, { useState } from 'react'
import Navbar from '../home/Navbar'
import { Box, Paper, useTheme, useMediaQuery } from '@mui/material'

type menuProps = {
    children: React.ReactNode;
}
const NavigatLayout: React.FC<menuProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [closeTask, setCloseTask] = useState<boolean>(false);

    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));

    return (
        <Box sx={{ display: 'flex', p: 1, gap: 2, bgcolor: '#F0F0F0' }}>
            <Paper
                elevation={5}
                sx={{
                    borderRadius: 4,
                    bgcolor: '#F7F7F7',
                    width: (() => {
                        if (isXlUp) {
                            return collapsed ? (closeTask ? "4%" : "4%") : (closeTask ? "17%" : "25%");
                        }
                        if (isLgUp) {
                            return collapsed ? (closeTask ? "6%" : "6%") : (closeTask ? "24.3%" : "35%");
                        }
                        return "100%"; // fallback บนจอเล็ก
                    })(),
                    transition: 'width 0.5s ease',
                    height: closeTask ? '100%' : '100vh',
                }}
            >
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </Paper>

            <Box sx={{ flexGrow: 1 }}>
                {children}
            </Box>
        </Box>
    )
}

export default NavigatLayout