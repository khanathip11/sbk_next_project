"use client";
import React, { useState } from "react";
import Navbar from "../Overview/Navbar";
import { Box, Paper, useTheme, useMediaQuery } from "@mui/material";

type menuProps = { children: React.ReactNode };

const NavigatLayout: React.FC<menuProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    // const [closeTask, setCloseTask] = useState<boolean>(false);

    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));

    return (
        <Box
            sx={{
                display: "flex",
                p: 1,
                gap: 2,
                bgcolor: "#F0F0F0",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* 🔹 Sidebar */}
            <Paper
                elevation={5}
                sx={{
                    borderRadius: 4,
                    bgcolor: "#F7F7F7",
                    width: (() => {
                        if (isXlUp) {
                            return collapsed ? "4%" : "14%";
                            // return collapsed ? (closeTask ? "4%" : "4%") : (closeTask ? "17%" : "15%");
                        }
                        if (isLgUp) {
                            return collapsed ? "6%" : "19%";
                            // return collapsed ? (closeTask ? "6%" : "6%") : (closeTask ? "17%" : "19%");
                        }
                        return "8%"; // ✅ ให้คงอยู่บนจอเล็ก
                    })(),
                    transition: "width 0.5s ease",
                    height: "100%",
                    overflow: "hidden",
                    flexShrink: 0, // ✅ ป้องกันหายจาก flex
                }}
            >
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </Paper>

            {/* 🔹 Content Area */}
            <Paper
                elevation={5}
                sx={{
                    height: "100%",
                    borderRadius: 4,
                    bgcolor: "#f9f9f9",
                    boxSizing: "border-box",
                    overflow: "visible",
                    flex: 1, // ✅ ให้ขยายเต็มพื้นที่ที่เหลือ
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        overflowX: "hidden",
                        p: 2,
                        borderRadius: 4,
                        boxSizing: "border-box",
                        "&::-webkit-scrollbar": { display: "none" },
                        scrollbarWidth: "none",
                    }}
                >
                    {children}
                </Box>
            </Paper>
        </Box>
    );
};

export default NavigatLayout;
