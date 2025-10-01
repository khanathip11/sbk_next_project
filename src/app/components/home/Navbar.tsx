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
        { text: "Dashboard", icon: <AssignmentIcon />, href: "/dashboard" },
        { text: "Issue Management", icon: <BubbleChartIcon />, href: "/issues" },
        { text: "Report", icon: <EqualizerIcon />, href: "/report" },
        { text: "User Management", icon: <PersonIcon />, href: "/users" },
    ];

    const menuBottomItems = [
        { text: "Documentation", icon: <ArticleIcon />, href: "/documentation" },
        { text: "Help", icon: <HelpIcon />, href: "/help" },
        { text: "Setting", icon: <SettingsIcon />, href: "/setting" }
    ];

    const themeOptions = [
        { mode: "auto", icon: <ContrastIcon sx={{ fontSize: 18 }} />, label: "Auto" },
        { mode: "light", icon: <LightModeIcon sx={{ fontSize: 18 }} />, label: "Light" },
        { mode: "dark", icon: <NightsStayIcon sx={{ fontSize: 18 }} />, label: "Dark" },
    ];

    const [mode, setMode] = useState<string>("auto");

    const handleChang = (newMode: string) => {
        setMode(newMode)
    }

    const pathname = usePathname();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 2,
                }}>
                <AppBar
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
                                        <ArrowBackIosNewIcon sx={{ fontSize: 14, transition: "transform 0.5s ease", }} />
                                    </IconButton>
                                </>
                            )}
                        </Stack>
                    </Toolbar>
                </AppBar>

                <List>
                    {menuTopItems.map((item, index) => (
                        <Link href={item.href} key={item.text} passHref legacyBehavior>
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
                                    color: '#575656',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    "&.Mui-selected": {
                                        bgcolor: "white",
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
                                        color: pathname === item.href ? "primary.main" : "inherit",
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
                        <Link href={item.href} key={item.text} passHref legacyBehavior>
                            <ListItemButton
                                key={item.text}
                                selected={pathname === item.href}
                                onClick={() => handleListItemClick(index + menuTopItems.length)}
                                sx={{
                                    cursor: "pointer",
                                    mb: 0,
                                    bgcolor: "transparent",
                                    color: '#575656',
                                    gap: 1,
                                    borderRadius: 2,
                                    display: 'flex',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    "&.Mui-selected": {
                                        bgcolor: "white",
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
                                        color: pathname === item.href ? "primary.main" : "inherit",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                {!collapsed && <ListItemText primary={item.text} />}
                            </ListItemButton>
                        </Link>
                    ))}
                </List>

                {!collapsed &&
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 2,
                            pr: 0,
                            borderRadius: 2,
                            bgcolor: "transparent",
                            width: '100%',
                        }}
                    >
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                            <ContrastIcon />
                            <Typography>Theme</Typography>
                        </Stack>

                        <Stack direction={'row'} sx={{ backgroundColor: '#DBDBDB', width: '100p%', height: 'auto', borderRadius: 3, p: 0.5 }}>
                            {themeOptions.map((option) => (
                                <Tooltip title={option.label} key={option.mode}>
                                    <IconButton
                                        color={mode === option.mode ? 'primary' : 'default'}
                                        onClick={() => handleChang(option.mode)}
                                        sx={{
                                            bgcolor: mode === option.mode ? 'white' : 'transparent',
                                            "&:hover": {
                                                bgcolor: mode === option.mode ? "primary.white" : "action.hover",
                                            },
                                            borderRadius: 2,
                                        }}
                                    >
                                        {option.icon}
                                    </IconButton>
                                </Tooltip>
                            ))}
                        </Stack>

                    </Box>
                }

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
                    {!collapsed && (
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                            <Avatar />
                            <Typography>Admin</Typography>
                        </Stack>
                    )}
                    <Tooltip title={'Logout'}>
                        <LogoutIcon sx={{
                            bgcolor: 'primary.main',
                            p: 0.8,
                            fontSize: 30,
                            borderRadius: 2,
                            color: '#ffffff',
                            "&:hover": {
                                bgcolor: '#0209FA', // สีตอน hover
                                cursor: 'pointer',  // เพิ่มถ้าต้องการ
                            },
                        }} />
                    </Tooltip>
                </Box>
            </Box >
        </>
    )
}

export default Navbar