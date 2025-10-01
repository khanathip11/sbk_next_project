"use client";
import React, { useState } from 'react'
import Navbar from '../home/Navbar'
import { Box, Paper } from '@mui/material'

type menuProps = {
    children: React.ReactNode;
}
const NavigatLayout: React.FC<menuProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [closeTask, setCloseTask] = useState<boolean>(false);
    return (
        <Box sx={{ display: 'flex', p: 2, gap: 2, bgcolor: '#F0F0F0' }}>
            <Paper
                elevation={5}
                sx={{
                    borderRadius: 4,
                    bgcolor: '#F7F7F7',
                    width: {
                        lg: !collapsed
                            ? (!closeTask ? '21.5%' : '27.4%')
                            : (!closeTask ? '10%' : '10%'),
                        xl: !collapsed
                            ? (!closeTask ? '17%' : '19.5%')
                            : (!closeTask ? '6%' : '5.9%'),
                    },
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