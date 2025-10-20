"use client";

import React, { useState } from 'react'
import {
    Box, List, Toolbar, Stack, Avatar, Typography, IconButton,
    AppBar, ListItemIcon, ListItemText, ListItemButton, Tooltip
} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChatIcon from '@mui/icons-material/Chat';
import RateReviewIcon from '@mui/icons-material/RateReview';

// 🧩 Props สำหรับ Navbar: รับสถานะ collapsed และฟังก์ชัน toggle
type NavbarProps = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ collapsed, setCollapsed }) => {
    // 🧠 เก็บ index ของเมนูที่ถูกเลือก (ไว้ highlight)
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    // 🔹 รายการเมนูหลัก (ด้านบน)
    const menuTopItems = [
        { text: "Overview", icon: <HomeRoundedIcon />, href: "/overview" },
        { text: "Issue Management", icon: <BubbleChartRoundedIcon />, href: "/issue-management" },
        { text: "Dashboard", icon: <EqualizerRoundedIcon />, href: "/dashboard/main" },
        { text: "Issue Category", icon: <CategoryRoundedIcon />, href: "/issue-category" },
    ];

    // 🔸 เมนูด้านล่าง เช่น audit, user management
    const menuBottomItems = [
        { text: "Feedback Issue Status Done", icon: <ChatIcon />, href: "/feedback-issue" },
        { text: "Feedback", icon: <RateReviewIcon />, href: "/feedback" },
        { text: "Audit Trail", icon: <VerifiedUserRoundedIcon />, href: "/audit-trail" },
        { text: "User Management", icon: <PersonRoundedIcon />, href: "/user-management" },
    ];

    // 📍 path ปัจจุบันจาก Next.js ใช้เช็ค highlight เมนู
    const pathname = usePathname();

    return (
        <>
            {/* ======================
          🧱 โครงสร้างหลัก Navbar
         ====================== */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 1,
                }}
            >

                {/* 🔹 ส่วนบนสุด: โลโก้ + ปุ่มย่อ */}
                <AppBar
                    position="static"
                    color="transparent"
                    sx={{
                        borderRadius: 2,
                        backgroundColor: "white",
                        width: "100%",
                        boxShadow: 1,
                        mb: 1,
                    }}
                >
                    <Toolbar disableGutters sx={{ height: "100%", minHeight: "50px !important", pr: collapsed ? 1.8 : 1 }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent={collapsed ? "center" : "space-between"}
                            sx={{ width: "100%" }}
                        >
                            {/* 🎨 โลโก้ฝั่งซ้าย */}
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 2 }} >
                                <Avatar
                                    src="/logo.png"
                                    alt="Logo"
                                    sx={{ cursor: "pointer", width: "35px", height: "35px" }}
                                    // คลิกโลโก้เพื่อขยาย navbar หากอยู่ในโหมดย่อ
                                    onClick={() => {
                                        if (collapsed) setCollapsed(false);
                                    }}
                                />
                                {/* แสดงชื่อโปรเจกต์เมื่อไม่ย่อ */}
                                {!collapsed && (
                                    <Typography>
                                        SBK_Project
                                    </Typography>
                                )}
                            </Stack>

                            {/* ปุ่มย่อ (ลูกศรย้อนกลับ) */}
                            {!collapsed && (
                                <IconButton
                                    onClick={() => setCollapsed(true)}
                                    sx={{ "&:hover": { bgcolor: "transparent", pr: -5 } }}
                                >
                                    <ArrowBackIosNewIcon
                                        sx={{ fontSize: 14, transition: "transform 0.3s ease", color: "#8a939c" }}
                                    />
                                </IconButton>
                            )}
                        </Stack>
                    </Toolbar>
                </AppBar>

                {/* =====================
            🔹 รายการเมนูด้านบน
           ===================== */}
                <List>
                    {menuTopItems.map((item, index) => (
                        <Link href={item.href} key={item.text} passHref>
                            <ListItemButton
                                key={item.text}
                                selected={pathname === item.href}
                                onClick={() => handleListItemClick(index)}
                                sx={{
                                    cursor: "pointer",
                                    mb: 0,
                                    bgcolor: "transparent",
                                    borderRadius: 2,
                                    display: 'flex',
                                    gap: 1,
                                    color: '#8b929c',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    "&.Mui-selected": {
                                        bgcolor: "#ffffff",
                                        borderRadius: 2,
                                        color: "#000000",
                                        "&:hover": { bgcolor: "grey.100" },
                                    },
                                    "&:hover": { bgcolor: "action.hover" },
                                }}
                            >
                                {/* ไอคอนของแต่ละเมนู */}
                                <ListItemIcon
                                    sx={{
                                        minWidth: 36,
                                        justifyContent: 'center',
                                        color: pathname === item.href ? "#0068cb" : "#8a939c",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                {/* ชื่อเมนู (ซ่อนเมื่อย่อ) */}
                                {!collapsed && <ListItemText primary={item.text} primaryTypographyProps={{ sx: { fontSize: 14 } }} />}
                            </ListItemButton>
                        </Link>
                    ))}
                </List>

                {/* ดันเมนูด้านล่างลงไปสุด */}
                <Box sx={{ flexGrow: 1 }} />

                {/* =====================
            🔸 เมนูด้านล่าง
           ===================== */}
                <List>
                    {menuBottomItems.map((item, index) => (
                        <Link href={item.href} key={item.text} passHref>
                            <ListItemButton
                                key={item.text}
                                selected={pathname === item.href}
                                onClick={() => handleListItemClick(index + menuTopItems.length)}
                                sx={{
                                    cursor: "pointer",
                                    mb: 0,
                                    bgcolor: "transparent",
                                    color: '#8b929c',
                                    gap: 1,
                                    borderRadius: 2,
                                    display: 'flex',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    "&.Mui-selected": {
                                        bgcolor: "#ffffff",
                                        borderRadius: 2,
                                        color: '#000000',
                                        "&:hover": { bgcolor: "grey.100" },
                                    },
                                    "&:hover": { bgcolor: "action.hover" },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 36,
                                        justifyContent: 'center',
                                        color: pathname === item.href ? "#0068cb" : "#8a939c",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                {!collapsed && <ListItemText primary={item.text} primaryTypographyProps={{ sx: { fontSize: 14 } }} />}
                            </ListItemButton>
                        </Link>
                    ))}
                </List>

                {/* =====================
            🔻 ส่วนล่างสุด: Logout
           ===================== */}
                <List sx={{ mt: 1 }}>
                    <ListItemButton
                        disableRipple
                        sx={{
                            cursor: "default",
                            bgcolor: "transparent",
                            color: "#575656",
                            gap: 1,
                            borderRadius: 2,
                            display: "flex",
                            justifyContent: collapsed ? "center" : "flex-start",
                            "&:hover": { bgcolor: "transparent" },
                        }}
                    >
                        {/* 🔒 กรณี navbar ย่อ → แสดงเฉพาะไอคอน logout */}
                        {collapsed ? (
                            <Tooltip title="Logout">
                                <LogoutIcon
                                    sx={{
                                        bgcolor: "primary.main",
                                        p: 0.8,
                                        fontSize: 32,
                                        borderRadius: 2,
                                        color: "#fff",
                                        "&:hover": {
                                            bgcolor: "#0209FA",
                                            cursor: "pointer",
                                        },
                                    }}
                                />
                            </Tooltip>
                        ) : (
                            // 🔓 กรณี navbar ขยาย → แสดง avatar + ชื่อ + ปุ่ม logout
                            <Box sx={{ display: "flex", alignItems: "center", width: "100%", pr: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Avatar sx={{ width: 36, height: 36 }} />
                                    <ListItemText
                                        primary="Admin"
                                        primaryTypographyProps={{
                                            sx: { fontSize: 14, fontWeight: 500, pl: 1 }
                                        }}
                                    />
                                </Box>
                                <Tooltip title="Logout">
                                    <LogoutIcon
                                        sx={{
                                            bgcolor: "primary.main",
                                            p: 0.8,
                                            fontSize: 32,
                                            borderRadius: 2,
                                            color: "#fff",
                                            ml: "auto",
                                            "&:hover": {
                                                bgcolor: "#0209FA",
                                                cursor: "pointer",
                                            },
                                        }}
                                    />
                                </Tooltip>
                            </Box>
                        )}
                    </ListItemButton>
                </List>
            </Box>
        </>
    )
}

export default Navbar;
