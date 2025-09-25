import React, { useState } from 'react'
import { Box, List, Toolbar, Stack, Avatar, Typography, IconButton, AppBar, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Report";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";

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

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
                <AppBar
                    position="static"
                    color="transparent"
                    sx={{ borderRadius: 2, backgroundColor: "white", width: '100%' }}
                >
                    <Toolbar sx={{ height: '100%', minHeight: '50px !important' }}>
                        <Stack
                            direction="row"
                            alignItems='center'
                            sx={{
                                gap: 1,
                                justifyContent: collapsed ? "center" : "flex-start",
                                transition: "all 0.3s ease-in-out",
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
                                        <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
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
                                justifyContent: collapsed ? 'center' : 'flex-start',
                                "&.Mui-selected": {
                                    bgcolor: "white",
                                    borderRadius: 2,
                                    color: "primary.main",
                                    boxShadow: 3,
                                    "&:hover": { bgcolor: "grey.100" },
                                },
                                "&:hover": { bgcolor: "action.hover" },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 36,
                                    justifyContent: 'center',
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
                                borderRadius: 2,
                                "&.Mui-selected": {
                                    bgcolor: "white",
                                    borderRadius: 2,
                                    color: "primary.main",
                                    boxShadow: 3,
                                    "&:hover": { bgcolor: "grey.100" },
                                },
                                "&:hover": { bgcolor: "action.hover" },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                            {!collapsed ? <ListItemText primary={item.text} /> : null}
                        </ListItemButton>
                    ))}
                </List>

                <div>theme</div>
                <div>user</div>
            </Box >
        </>
    )
}

export default Navbar