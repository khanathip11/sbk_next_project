"use client";

import React, { useState } from 'react'
import { Box, List, Toolbar, Stack, Avatar, Typography, IconButton, AppBar, ListItemIcon, ListItemText, ListItemButton, Tooltip } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AssignmentIcon from "@mui/icons-material/Assignment";
import HelpIcon from "@mui/icons-material/Help";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import ContrastIcon from '@mui/icons-material/Contrast';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarProps = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ collapsed, setCollapsed }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    const menuTopItems = [
        { text: "Overview", icon: <HomeRoundedIcon />, href: "/" },
        { text: "Issue Management", icon: <BubbleChartRoundedIcon />, href: "/issues" },
        { text: "Report", icon: <EqualizerRoundedIcon />, href: "/report" },
        { text: "User Management", icon: <PersonRoundedIcon />, href: "/users" },
        { text: "Category", icon: <CategoryRoundedIcon />, href: "/category" },
    ];

    const menuBottomItems = [
        { text: "Documentation", icon: <ArticleRoundedIcon />, href: "/documentation" },
        { text: "Audit trail", icon: <VerifiedUserRoundedIcon />, href: "/audittrail" },
        { text: "Help", icon: <HelpIcon />, href: "/help" },
        { text: "Setting", icon: <SettingsRoundedIcon />, href: "/setting" }
    ];

    const pathname = usePathname();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 1,
                }}>
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
                            {/* ซ้าย */}
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 2 }} >
                                <Avatar
                                    src="/logo.png"
                                    alt="Logo"
                                    sx={{ cursor: "pointer", width: "35px", height: "35px" }}
                                    onClick={() => {
                                        if (collapsed) setCollapsed(false);
                                    }}
                                />
                                {!collapsed && (
                                    <Typography>
                                        SBK_Project
                                    </Typography>
                                )}
                            </Stack>

                            {/* ขวา */}
                            {!collapsed && (
                                <IconButton
                                    onClick={() => setCollapsed(true)} // คลิก arrow ย่อ navbar
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
                                        // boxShadow: 1,
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

                <Box sx={{ flexGrow: 1 }} />

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
                                        boxShadow: 0,
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
                            <Box sx={{ display: "flex", alignItems: "center", width: "100%", pr: 1 }}>
                                {/* Avatar + User */}
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Avatar sx={{ width: 36, height: 36 }} />
                                    <ListItemText
                                        primary="Admin"
                                        primaryTypographyProps={{
                                            sx: { fontSize: 14, fontWeight: 500, pl: 1 }
                                        }}
                                    />
                                </Box>

                                {/* Logout */}
                                <Tooltip title="Logout">
                                    <LogoutIcon
                                        sx={{
                                            bgcolor: "primary.main",
                                            p: 0.8,
                                            fontSize: 32,
                                            borderRadius: 2,
                                            color: "#fff",
                                            ml: "auto", // ดันไปฝั่งขวาสุด
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
            </Box >
        </>
    )
}

export default Navbar