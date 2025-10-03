"use client";

import React, { useState } from 'react'
import { Box, List, Toolbar, Stack, Avatar, Typography, IconButton, AppBar, ListItemIcon, ListItemText, ListItemButton, Tooltip } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AssignmentIcon from "@mui/icons-material/Assignment";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import LightModeIcon from '@mui/icons-material/LightMode';
import PersonIcon from '@mui/icons-material/Person';
import ContrastIcon from '@mui/icons-material/Contrast';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import ArticleIcon from '@mui/icons-material/Article';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
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
        { text: "Overview", icon: <HomeFilledIcon />, href: "/" },
        // { text: "Dashboard", icon: <AssignmentIcon />, href: "/dashboard" },
        { text: "Issue Management", icon: <BubbleChartIcon />, href: "/issues" },
        { text: "Report", icon: <EqualizerIcon />, href: "/report" },
        { text: "User Management", icon: <PersonIcon />, href: "/users" },
    ];

    const menuBottomItems = [
        { text: "Documentation", icon: <ArticleIcon />, href: "/documentation" },
        { text: "Help", icon: <HelpIcon />, href: "/help" },
        { text: "Setting", icon: <SettingsIcon />, href: "/setting" }
    ];

    // const themeOptions = [
    //     { mode: "auto", icon: <ContrastIcon sx={{ fontSize: 18 }} />, label: "Auto" },
    //     { mode: "light", icon: <LightModeIcon sx={{ fontSize: 18 }} />, label: "Light" },
    //     { mode: "dark", icon: <NightsStayIcon sx={{ fontSize: 18 }} />, label: "Dark" },
    // ];

    // const [mode, setMode] = useState<string>("auto");

    // const handleChang = (newMode: string) => {
    //     setMode(newMode)
    // }

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
                    <Toolbar disableGutters sx={{ height: "100%", minHeight: "50px !important", pr: 1 }}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between" // ดันซ้าย–ขวา
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

                {/* <AppBar
                    position="static"
                    color="transparent"
                    sx={{ borderRadius: 2, backgroundColor: "white", width: '100%', boxShadow: 1, mb: 1 }}
                >
                    <Toolbar sx={{ height: '100%', minHeight: '50px !important' }}>
                        <Stack
                            direction="row"
                            alignItems='center'
                            sx={{
                                gap: 1,
                                width: "100%",
                            }}
                        >
                            <Avatar
                                src="/logo.png"
                                alt="Logo"
                                sx={{ ml: 0, cursor: "pointer", width: '35px', height: '35px' }}
                                onClick={() => {
                                    if (collapsed) setCollapsed(false);
                                }}
                            />
                            {!collapsed && (
                                <>
                                    <Typography>
                                        SBK_Project
                                    </Typography>

                                    <Box sx={{ flexGrow: 1 }} />
                                    <IconButton
                                        onClick={() => setCollapsed(true)} // คลิก arrow ย่อ navbar
                                        sx={{ "&:hover": { bgcolor: "transparent", } }}
                                    >
                                        <ArrowBackIosNewIcon sx={{ fontSize: 14, transition: "transform 0.3s ease", color: '##8a939c' }} />
                                    </IconButton>
                                </>
                            )}
                        </Stack>
                    </Toolbar>
                </AppBar> */}

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
                                {!collapsed && <ListItemText primary={item.text} />}
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
                                {!collapsed && <ListItemText primary={item.text} />}
                            </ListItemButton>
                        </Link>
                    ))}
                </List>

                {/* {!collapsed ? (
                    <List>
                        <ListItemButton
                            disableRipple
                            sx={{
                                cursor: "default",
                                mb: 0,
                                bgcolor: "transparent",
                                color: "#8b929c",
                                gap: 1,
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "flex-start",
                                "&:hover": { bgcolor: "transparent" },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 36,
                                    justifyContent: "center",
                                    color: "#000",
                                }}
                            >
                                <ContrastIcon />
                            </ListItemIcon>

                            <ListItemText primary="Theme" />

                            <Stack
                                direction="row"
                                sx={{
                                    backgroundColor: "#DBDBDB",
                                    borderRadius: 3,
                                    p: 0.5,
                                    ml: "auto",
                                }}
                            >
                                {themeOptions.map((option) => (
                                    <Tooltip title={option.label} key={option.mode}>
                                        <IconButton
                                            size="small"
                                            color={mode === option.mode ? "primary" : "default"}
                                            onClick={() => handleChang(option.mode)}
                                            sx={{
                                                bgcolor: mode === option.mode ? "white" : "transparent",
                                                "&:hover": {
                                                    bgcolor: mode === option.mode ? "white" : "action.hover",
                                                },
                                                borderRadius: 2,
                                            }}
                                        >
                                            {option.icon}
                                        </IconButton>
                                    </Tooltip>
                                ))}
                            </Stack>
                        </ListItemButton>
                    </List>
                ) : (
                    <List>
                        <ListItemButton
                            disableRipple
                            sx={{
                                cursor: "default",
                                justifyContent: "center",
                                "&:hover": { bgcolor: "transparent" },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: '#000',
                                    minWidth: 36,
                                    justifyContent: "center",
                                }}
                            >
                                <ContrastIcon />
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                )} */}

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

                            // <>
                            //     <ListItemIcon
                            //         sx={{
                            //             minWidth: 36,
                            //             justifyContent: "center",
                            //         }}
                            //     >
                            //         <Avatar sx={{ width: 36, height: 36 }} />
                            //     </ListItemIcon>

                            //     <ListItemText
                            //         primary="Admin"
                            //         primaryTypographyProps={{ sx: { fontSize: 14, fontWeight: 500, pl: 1 } }}
                            //     />

                            //     <Tooltip title="Logout">
                            //         <LogoutIcon
                            //             sx={{
                            //                 bgcolor: "primary.main",
                            //                 p: 0.8,
                            //                 fontSize: 32,
                            //                 borderRadius: 2,
                            //                 color: "#fff",
                            //                 ml: "auto",
                            //                 "&:hover": {
                            //                     bgcolor: "#0209FA",
                            //                     cursor: "pointer",
                            //                 },
                            //             }}
                            //         />
                            //     </Tooltip>
                            // </>
                        )}
                    </ListItemButton>
                </List>
            </Box >
        </>
    )
}

export default Navbar