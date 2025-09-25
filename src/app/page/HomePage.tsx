"use client";

import React, { useState } from "react";
import Navbar from "../components/home/Navbar";
import { Box, Paper } from "@mui/material";

export default function HomePage() {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <Box sx={{
            height: '100vh', p: 2, bgcolor: '#F0F0F0', display: 'grid',
            gridTemplateColumns: collapsed
                ? { xs: '0fr 3fr 1.4fr', sm: '0fr 3fr 1.4fr', md: '0fr 3fr 1.4fr', lg: '0fr 3fr 1.4fr', xl: '0.1fr 3fr 1.4fr' }
                : { xs: '0 0 50%', sm: '0 0 40%', md: '1fr 3fr 1.4fr', lg: '1fr 3fr 1.4fr', xl: '1fr 3fr 1.4fr' },
            gap: 2,
            transition: "all 0.5s",
        }}>
            <Paper elevation={5} sx={{ borderRadius: 4, bgcolor: '#F7F7F7' }}>
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </Paper>
            <Paper elevation={5} sx={{ borderRadius: 4, bgcolor: '#F7F7F7' }}>
                Navbar
            </Paper>
            <Paper elevation={5} sx={{ borderRadius: 4, bgcolor: '#F7F7F7' }}>
                Navbar
            </Paper>
        </Box>
    );
}
