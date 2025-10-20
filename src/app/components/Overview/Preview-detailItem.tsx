import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactNode } from 'react'

/**
 * 🔹 Props ของ PreviewDetailItem
 * - icon: ReactNode → ไอคอนแสดงทางซ้าย (เช่น 🕓, 📍)
 * - label: string → ข้อความ label เช่น "ผู้แจ้ง", "สถานที่"
 * - value: string → ค่าที่จะแสดง เช่น "นายสมชาย", "กรุงเทพฯ"
 */
interface PreviewDetailItemProps {
    icon: ReactNode;
    label: string;
    value?: string;
}

/**
 * ✅ Component: PreviewDetailItem
 * ใช้ในหน้า PreviewPanal (เช่นแสดงข้อมูลรายละเอียดของการแจ้งเรื่อง)
 * รูปแบบการจัดเรียงแนวตั้ง (ไอคอน + label ด้านบน และ value ด้านล่าง)
 */
const PreviewDetailItem: React.FC<PreviewDetailItemProps> = ({ icon, label, value }) => {
    return (
        // 🔹 กล่องหลักของแต่ละแถว
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* 🔸 ส่วนบน: icon + label */}
            <Box sx={{ display: "flex", gap: 1 }}>
                {icon}
                <Typography fontSize={12} color="#000000">
                    {label}
                </Typography>
            </Box>

            {/* 🔸 ส่วนล่าง: ค่า (value) */}
            <Typography
                fontSize={12}
                color="text.secondary"
                sx={{
                    mb: 2,
                    ml: `24px`, // ✅ จัดระยะให้ตรงกับ label ด้านบน (ไอคอนกว้าง ~24px)
                    fontSize: 12,
                }}
            >
                {value || "-"} {/* ถ้าไม่มีค่า → แสดงขีด "-" */}
            </Typography>
        </Box>
    )
}

export default PreviewDetailItem
