import React from 'react'
import { Column } from '../common/BaseTable'
import { Chip, IconButton } from "@mui/material";
import { AuditItem } from '@/app/types/userType';
import { Stack } from '@mui/system';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserColumnsProps {
    handleEdit: (users: AuditItem) => void;
    handleView: (users: AuditItem) => void;
}

const formatThaiDateTime = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
};


const userColumns = ({ handleEdit, handleView }: UserColumnsProps): Column<AuditItem>[] =>
    [
        { id: "username", label: "ชื่อผู้ใช้" },
        { id: "fullname", label: "ชื่อ - สกุล" },
        { id: "email", label: "อีเมล" },
        { id: "department", label: "หน่วยงาน" },
        {
            id: "role",
            label: "สิทธิการใช้งาน",
            align: "center",
            render: (row) => {
                switch (row.role) {
                    case "แอดมิน":
                        return (
                            <Chip
                                label="แอดมิน"
                                sx={{
                                    backgroundColor: "#0068CB", // น้ำเงินเข้ม
                                    color: "#fff",
                                    fontSize: 12,
                                    fontWeight: 400,
                                    borderRadius: "6px",
                                    height: 24,
                                }}
                            />
                        );

                    case "ผู้บังคับบัญชา":
                        return (
                            <Chip
                                label="ผู้บังคับบัญชา"
                                sx={{
                                    backgroundColor: "#FFF9C4", // เหลืองอ่อน
                                    color: "#F9A825", // เหลืองเข้ม
                                    fontSize: 12,
                                    fontWeight: 400,
                                    borderRadius: "6px",
                                    height: 24,
                                }}
                            />
                        );

                    default:
                        return (
                            <Chip
                                label="ผู้ใช้งาน"
                                sx={{
                                    backgroundColor: "#118BE81F", // น้ำเงินอ่อน
                                    color: "#1080D6",
                                    fontSize: 12,
                                    fontWeight: 400,
                                    borderRadius: "6px",
                                    height: 24,
                                }}
                            />
                        );
                }
            },
        },
        {
            id: "status",
            label: "สถานะ",
            align: "center",
            render: (row) => {
                const isActive = row.status === "ใช้งานอยู่";
                return (
                    <Chip
                        label={isActive ? "ใช้งานอยู่" : "ไม่ได้ใช้งาน"}
                        sx={{
                            backgroundColor: isActive ? "#35C2201F" : "#FFEBEE",
                            color: isActive ? "#2A9919" : "#C62828",
                            fontSize: 12,
                            fontWeight: 500,
                            borderRadius: "6px",
                            height: 24,
                        }}
                    />
                );
            },
        },
        {
            id: "lastLogin",
            label: "วันที่เข้าระบบล่าสุด",
            align: "center",
            render: (row) => <>{formatThaiDateTime(row.lastLogin)}</>,
        },
        {
            id: "action",
            label: "จัดการ",
            align: "center",
            render: (row) => (
                <Stack direction="row" spacing={0.5} justifyContent="center">
                    {/* 👁️ ปุ่มแก้ไข */}
                    <IconButton
                        size="small"
                        color="primary"
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            boxShadow: "0 0 2px rgba(0,0,0,0.1)",
                            "&:hover": { backgroundColor: "#e3f2fd" },
                        }}
                        onClick={() => handleEdit(row)}
                    >
                        <EditIcon fontSize="small" sx={{ fontSize: 14 }} />
                    </IconButton>

                    {/* ✏️ ปุ่มดู */}
                    < IconButton
                        size="small"
                        sx={{
                            backgroundColor: "#fff",           // สีเทาอ่อนพื้นหลังปุ่ม
                            borderRadius: 2,
                            boxShadow: "0 0 2px rgba(0,0,0,0.1)", // เงาอ่อน
                            color: "#616161",                     // สีไอคอนเทาเข้ม
                            "&:hover": {
                                backgroundColor: "#e0e0e0",         // สีเทาเข้มขึ้นเมื่อ hover
                            },
                        }}
                        onClick={() => handleView(row)}
                    >
                        <RemoveRedEyeRoundedIcon fontSize="small" sx={{ fontSize: 14 }} />
                    </ IconButton>


                    {/* ❌ ปุ่มลบ */}
                    < IconButton
                        size="small"
                        color="error"
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            boxShadow: "0 0 2px rgba(0,0,0,0.1)",
                            "&:hover": { backgroundColor: "#ffebee" },
                        }}
                        onClick={() => {
                            const confirmed = window.confirm(`ต้องการลบ ${row.fullname} ใช่หรือไม่?`);
                            if (confirmed) alert(`ลบข้อมูลของ ${row.fullname} แล้ว`);
                        }}
                    >
                        <DeleteIcon fontSize="small" sx={{ fontSize: 14 }} />
                    </ IconButton>
                </Stack >
            ),
        },
    ]

export default userColumns