import React, { useState } from 'react'
import { Box, List, Toolbar, Stack, Avatar, Typography, IconButton, AppBar, ListItem, ListItemIcon, ListItemText, ListItemButton, Tooltip } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Report";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import LogoutIcon from '@mui/icons-material/Logout';
import { relative } from 'path';

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
        { text: "Overview", icon: <DashboardIcon /> },
        { text: "Dashboard", icon: <AssignmentIcon /> },
        { text: "Issue Management", icon: <AssignmentIcon /> },
        { text: "Report", icon: <ReportIcon /> },
        { text: "User Management", icon: <PeopleIcon /> },
    ];

    const menuBottomItems = [
        { text: "Documentation", icon: <DescriptionIcon /> },
        { text: "Help", icon: <HelpIcon /> },
        { text: "Setting", icon: <SettingsIcon /> }
    ];

    const themeOptions = [
        { mode: "auto", icon: <SettingsBrightnessIcon sx={{ fontSize: 18 }} />, label: "Auto" },
        { mode: "light", icon: <Brightness7Icon sx={{ fontSize: 18 }} />, label: "Light" },
        { mode: "dark", icon: <Brightness4Icon sx={{ fontSize: 18 }} />, label: "Dark" },
    ];

    const [mode, setMode] = useState<string>("auto");

    const handleChang = (newMode: string) => {
        setMode(newMode)
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2, }}>
                <AppBar
                    position="static"
                    color="transparent"
                    sx={{ borderRadius: 2, backgroundColor: "white", width: '100%',boxShadow: 1, mb: 1 }}
                >
                    <Toolbar sx={{ height: '100%', minHeight: '50px !important' }}>
                        <Stack
                            direction="row"
                            alignItems='center'
                            sx={{
                                gap: 1,
                                width: "100%",
                                // justifyContent: collapsed ? "center" : "flex-start",
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
                                        sx={{ "&:hover": { bgcolor: "transparent",} }}
                                    >
                                        <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                                    </IconButton>
                                </>
                            )}
                        </Stack>
                    </Toolbar>
                </AppBar>

                <List>
                    {menuTopItems.map((item, index) => (
                        <ListItemButton
                            key={item.text}
                            selected={selectedIndex === index}
                            onClick={() => handleListItemClick(index)}
                            sx={{
                                cursor: "pointer",
                                mb: 0,
                                bgcolor: "transparent",
                                borderRadius: 2,
                                display: 'flex',
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
                                    color: selectedIndex === index ? "primary.main" : "inherit",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary={item.text} />}
                        </ListItemButton>
                    ))}
                </List>

                <Box sx={{ flexGrow: 1 }} />

                <List>
                    {menuBottomItems.map((item, index) => (
                        <ListItemButton
                            key={item.text}
                            selected={selectedIndex === index + menuTopItems.length}
                            onClick={() => handleListItemClick(index + menuTopItems.length)}
                            sx={{
                                cursor: "pointer",
                                mb: 0,
                                bgcolor: "transparent",
                                color: '#575656',
                                borderRadius: 2,
                                display: 'flex',
                                justifyContent: collapsed ? 'center' : 'flex-start',
                                "&.Mui-selected": {
                                    bgcolor: "white",
                                    borderRadius: 2,
                                    color: '#000000',
                                    boxShadow: 1,
                                    "&:hover": { bgcolor: "grey.100" },
                                },
                                "&:hover": { bgcolor: "action.hover" },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 36,
                                    justifyContent: 'center',
                                    color: selectedIndex === index + menuTopItems.length ? "primary.main" : "inherit",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary={item.text} />}
                        </ListItemButton>
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
                            <SettingsBrightnessIcon />
                            <Typography>Theme</Typography>
                        </Stack>

                        <Stack direction={'row'} sx={{backgroundColor: '#DBDBDB', width:'100p%', height: 'auto', borderRadius: 3, p:0.5}}>
                            {themeOptions.map((option) => (
                                <Tooltip title={option.label} key={option.mode}> 
                                    <IconButton 
                                    color={mode === option.mode ? 'primary' : 'default'}
                                    onClick={() => handleChang(option.mode)}
                                    sx={{bgcolor: mode === option.mode ? 'white' : 'transparent',
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
                
                <Box sx={{display:'flex' ,alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between'}}>
                    {!collapsed && (
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                            <Avatar />
                            <Typography>Admin</Typography>
                        </Stack>
                    )}
                    <Tooltip title={'Logout'}>
                        <LogoutIcon sx={{
                            bgcolor: '#B0E8F5',
                            p: 0.8,
                            fontSize: 30,
                            borderRadius: 2,
                            "&:hover": {
                            bgcolor: '#7CD2E6', // สีตอน hover
                            cursor: 'pointer',  // เพิ่มถ้าต้องการ
                            },
                        }}/>
                    </Tooltip>
                </Box>
            </Box >
        </>
    )
}

export default Navbar