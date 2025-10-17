"use client";
import {
    Button,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import UserFilter from "./User-filter";
import UserDateRangePicker from "./User-datepicker";
import UserTableChild from "./User-table-child";
import UserCreate from "./User-create";
import UserLoginHistory from "./User-login-history";
import { AuditItem } from "@/app/types/userType";
import { auditData } from "@/app/data/user";
import { GenericFilter } from "../common/GenericFilter";
import { FilterValues } from '../common/GenericFilter';
interface AuditData {
    username: string;
    fullname: string;
    email: string;
    password: string;
    department: string;
    role: string;
    active: boolean;
    status?: "ใช้งานอยู่" | "ไม่ได้ใช้งาน";
    lastLogin?: string;

    // 🧩 ข้อมูลประวัติการเข้าใช้งาน
    id?: number;
    action?: string;
    date?: string;
    ip?: string;
    browser?: string;

    // 🧩 ใช้ภายในระบบ
    origin: "user" | "log";
    level?: string;
}

const UserTable = () => {
    // ✅ Modal States
    const [openCreate, setOpenCreate] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [filters, setFilters] = useState<Partial<FilterValues>>({});
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [selectedUser, setSelectedUser] = useState<AuditItem | null>(null);

    // ✅ เพิ่มผู้ใช้ใหม่
    const handleCreate = () => {
        setMode("create");
        setSelectedUser(null);
        setOpenCreate(true);
    };

    // ✅ แก้ไขผู้ใช้
    const handleEdit = (user: AuditItem) => {
        setMode("edit");
        setSelectedUser(user);
        setOpenCreate(true);
    };

    // ✅ ดูประวัติ login
    const handleView = (user: AuditItem) => {
        setSelectedUser(user);
        setOpenHistory(true);
    };

    // ✅ เมื่อกดยืนยันใน modal create/edit
    // ใน UserTable
    const handleSubmit = (data: AuditItem) => {
        console.log(mode === "create" ? "เพิ่มผู้ใช้ใหม่:" : "อัปเดตผู้ใช้:", data);
        setOpenCreate(false);
    };

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                bgcolor: "#F7F7F7",
                borderRadius: 4,
            }}
        >
            {/* 🔹 Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                }}
            >
                <Typography
                    sx={{
                        pb: 2,
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#000",
                    }}
                >
                    จัดการผู้ใช้
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    {/* ปุ่มเพิ่มผู้ใช้ใหม่ */}
                    <Button
                        variant="contained"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            borderRadius: 2,
                            backgroundColor: "#004D99",
                            fontSize: 10,
                        }}
                        onClick={handleCreate}
                    >
                        <PersonAddRoundedIcon sx={{ fontSize: 16 }} />
                        เพิ่มผู้ใช้ใหม่
                    </Button>

                    {/* ปุ่มส่งออก */}
                    <Button
                        variant="contained"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            borderRadius: 2,
                            backgroundColor: "#004D99",
                            fontSize: 10,
                        }}
                    >
                        <ReplyRoundedIcon sx={{ fontSize: 16, transform: "scaleX(-1)" }} />
                        ส่งออก
                    </Button>
                </Box>
            </Box>

            {/* 🔹 Filter */}
            <Stack
                direction="row"
                alignItems="center"
                sx={{
                    display: "flex",
                    width: "100%",
                    gap: 1,
                    px: 2,
                    pb: 1.5,
                    overflowX: "auto",
                    flexWrap: "nowrap",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {/* <TextField
                    id="user-search"
                    placeholder="ค้นหา"
                    variant="outlined"
                    size="small"
                    sx={{
                        minWidth: "200px",
                        bgcolor: "#f2f2f4",
                        "& .MuiOutlinedInput-root": {
                            height: 36,
                            borderRadius: 3,
                            "& fieldset": {
                                borderColor: "#D1D5DB",
                            },
                            "&:hover fieldset": {
                                borderColor: "#9CA3AF",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#1976d2",
                            },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: 18, color: "#5f6470" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <UserFilter /> */}
                <GenericFilter
                    role="operator-view-update"
                    organizationUnit=""
                    visibleFilters={["search", "status"]}
                    onChange={(f) => setFilters({ ...filters, ...f })}
                />

                <Box flexGrow={1} />

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexShrink: 0,
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    <UserDateRangePicker />
                    <Typography sx={{ fontSize: 12 }}>ผลลัพธ์</Typography>
                    <Typography
                        sx={{
                            height: 35,
                            border: "1px solid #D9D9D9",
                            px: 1,
                            borderRadius: 2,
                            backgroundColor: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                    >
                        100
                    </Typography>
                </Box>
            </Stack>

            {/* 🔹 ตารางผู้ใช้ */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 2,
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                <UserTableChild handleEdit={handleEdit} handleView={handleView} />
            </Box>

            {/* 🔹 Modal: เพิ่ม / แก้ไข ผู้ใช้ */}
            <UserCreate
                open={openCreate}
                handleClose={() => setOpenCreate(false)}
                mode={mode}
                initialData={selectedUser ?? undefined}
                onSubmit={handleSubmit}
            />

            {/* 🔹 Modal: ประวัติการเข้าใช้งาน */}
            <UserLoginHistory
                open={openHistory}
                handleClose={() => setOpenHistory(false)}
                user={selectedUser}
            />
        </Box>
    );
};

export default UserTable;
