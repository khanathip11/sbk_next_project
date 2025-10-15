"use client";
import React from 'react'
import { Box, Button, Typography, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import NavigatLayout from '@/app/components/layout/Navigat-layout';

const DashboardMainPage = () => {
    const router = useRouter(); // ✅ ตัวช่วยเปลี่ยน route
    return (
        <NavigatLayout>


            <Box sx={{ p: 3 }}>
                {/* 🧭 หัวข้อรายงาน */}
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    รายงานภาพรวมระบบ (Main Report)
                </Typography>

                {/* 📊 ตัวอย่างรายงาน */}
                <Box
                    sx={{
                        bgcolor: "#f9fafb",
                        borderRadius: 2,
                        p: 3,
                        boxShadow: 1,
                        mb: 3,
                    }}
                >
                    <Typography>📈 กราฟรายงานหลักแสดงตรงนี้</Typography>
                    <Typography variant="body2" color="text.secondary">
                        (ข้อมูลสรุปภาพรวมการดำเนินงานของระบบ)
                    </Typography>
                </Box>

                {/* 🔘 ปุ่มเปลี่ยนหน้า */}
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push("/dashboard/issue-ratio")}
                    >
                        ดูรายงานอัตราปัญหา (Issue Ratio)
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => router.push("/dashboard/issue-trend")}
                    >
                        ดูแนวโน้มปัญหา (Issue Trend)
                    </Button>
                </Stack>
            </Box>
        </NavigatLayout>
    )
}

export default DashboardMainPage