"use client";
import React, { useState } from 'react'
import IssueFilterDropdown from './IssueFilterDropdown';
import { Box } from '@mui/material';

const IssueFilter = () => {
    const [urgency, setUrgency] = useState("all");
    const [status, setStatus] = useState("all");
    const [department, setDepartment] = useState("all");

    return (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                borderRadius: 2,
                width: "100%",
            }}
        >
            {/* ระดับของปัญหา */}
            <IssueFilterDropdown
                key="urgency"
                label="ระดับของปัญหา"
                value={urgency}
                onChange={setUrgency}
                options={[
                    { value: "all", label: "ทั้งหมด" },
                    { value: "normal", label: "ทั่วไป" },
                    { value: "urgent", label: "เร่งด่วน" },
                ]}
            />

            {/* สถานะการแก้ไขปัญหา */}
            <IssueFilterDropdown
                key="status"
                label="สถานะการแก้ไขปัญหา"
                value={status}
                onChange={setStatus}
                options={[
                    { value: "all", label: "ทั้งหมด" },
                    { value: "received", label: "ระบบรับข้อมูลแล้ว" },
                    { value: "reviewing", label: "เจ้าหน้าที่ตรวจสอบ" },
                    { value: "forwarded", label: "ส่งต่อให้หน่วยงาน" },
                    { value: "in_progress", label: "หน่วยงานกำลังดำเนินการ" },
                    { value: "completed", label: "ดำเนินการเสร็จสิ้น" },
                    { value: "failed", label: "ไม่สามารถดำเนินการได้" },
                ]}
            />

            {/* หน่วยรับผิดชอบ */}
            <IssueFilterDropdown
                key="department"
                label="หน่วยรับผิดชอบ"
                value={department}
                onChange={setDepartment}
                options={[
                    { value: "all", label: "ทั้งหมด" },
                    { value: "received", label: "ระบบรับข้อมูลแล้ว" },
                    { value: "reviewing", label: "เจ้าหน้าที่ตรวจสอบ" },
                    { value: "forwarded", label: "ส่งต่อให้หน่วยงาน" },
                ]}
            />
        </Box>
    )
}

export default IssueFilter