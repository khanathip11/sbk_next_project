import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

// 🧩 import ฝั่งซ้ายและขวา
import EmergencyNotifierLeft from './Emergency-notifier-left';
import EmergencyNotifierRight from './Emergency-notifier-right';

type EmergencyNotifierProps = {
    handleClose: () => void; // ✅ ฟังก์ชันปิด Modal (ส่งมาจาก ComplaintMap)
}

const EmergencyNotifier: React.FC<EmergencyNotifierProps> = ({ handleClose }) => {
    // =========================================
    // 🧠 STATE หลักสำหรับควบคุมการทำงาน
    // =========================================

    // 🟢 โหมดการส่งแจ้งเตือน
    const [sendType, setSendType] = useState<"all" | "region">("all");

    // 🟢 ฟิลด์ของแบบฟอร์ม (ฝั่งซ้าย)
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [location, setLocation] = useState("");

    // 🟣 state สำหรับ Preview (ฝั่งขวา)
    const [previewData, setPreviewData] = useState<{ title: string; detail: string; location: string } | null>(null);

    // =========================================
    // 📩 EVENT HANDLERS
    // =========================================

    // 🔹 เมื่อผู้ใช้เลือกโหมด “ส่งให้ทั้งหมด” หรือ “ส่งตามพื้นที่”
    const handleSendTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as "all" | "region";
        setSendType(value);
    };

    // 🔹 เมื่อกดปุ่ม “ร่างตัวอย่าง” → ส่งข้อมูลจากฟอร์มไปแสดงในฝั่งขวา (Preview)
    const handleDraftPreview = () => {
        setPreviewData({ title, detail, location });
    };

    // =========================================
    // 🧩 UI ส่วนหลัก
    // =========================================
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                m: 'auto',
                p: 0,
            }}
        >
            {/* กล่องหลักของ Modal */}
            <Paper
                sx={{
                    width: '900px',
                    height: 'auto',
                    borderRadius: 4,
                    backgroundColor: 'white',
                    p: 0,
                    pb: 2,
                }}
            >
                {/* 🔹 ส่วนหัว (Title ของ Modal) */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        pt: 1,
                    }}
                >
                    <ReportProblemRoundedIcon sx={{ fontSize: 60, color: '#FCBF04' }} />
                    <Typography>สร้างการแจ้งเตือนฉุกเฉิน</Typography>
                </Box>

                {/* 🔹 ส่วนเนื้อหาหลัก แบ่ง 3 ส่วน: Left | Button | Right */}
                <Box sx={{ display: 'flex', width: '100%', height: '100%', gap: 0 }}>
                    {/* ✅ ฝั่งซ้าย (แบบฟอร์มกรอกข้อมูล) */}
                    <EmergencyNotifierLeft
                        sendType={sendType}
                        handleSendTypeChange={handleSendTypeChange}
                        title={title}
                        detail={detail}
                        location={location}
                        setTitle={setTitle}
                        setDetail={setDetail}
                        setLocation={setLocation}
                    />

                    {/* 🔸 ปุ่มร่างตัวอย่างตรงกลาง */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '25%' }}>
                        <Button
                            variant="contained"
                            onClick={handleDraftPreview} // 🟢 เมื่อกดจะส่งข้อมูลไปแสดงทางขวา
                            sx={{
                                fontSize: 13,
                                gap: 1,
                                borderRadius: 3,
                                height: '40px',
                                mx: -1,
                            }}
                        >
                            <ArticleRoundedIcon sx={{ fontSize: 20 }} />
                            ร่างตัวอย่าง
                        </Button>
                    </Box>

                    {/* ✅ ฝั่งขวา (แสดงตัวอย่างข้อความที่จะส่งจริง) */}
                    <EmergencyNotifierRight
                        handleClose={handleClose}
                        previewData={previewData}
                    />
                </Box>
            </Paper>
        </Box>
    )
}

export default EmergencyNotifier;
