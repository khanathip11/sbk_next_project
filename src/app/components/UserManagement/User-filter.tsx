"use client";
import { Box } from '@mui/system'
import React, { useState } from 'react'
import UserFilterDropdown from './User-filter-dropdown'

const UserFilter = () => {
    const [role, setRole] = useState("all");
    const [status, setStatus] = useState("all");

    return (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                borderRadius: 2,
                width: "100%",
            }}
        >
            <UserFilterDropdown
                key="role"
                label="สิทธิ"
                value={role}
                onChange={setRole}
                options={[
                    { value: "all", label: "ทั้งหมด" },
                    { value: "commander", label: "ผู้บังคับบัญชา" },
                    { value: "operation", label: "เจ้าหน้าที่" },
                    { value: "admin", label: "แอดมิน" },
                ]}
            />

            <UserFilterDropdown
                key="status"
                label="สถานะ"
                value={status}
                onChange={setStatus}
                options={[
                    { value: "all", label: "ทั้งหมด" },
                    { value: "use", label: "ใช้งานอยู่" },
                    { value: "notuse", label: "ไม่ได้ใช้งาน" },
                ]}
            />
        </Box>
    )
}

export default UserFilter