import { Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import EmergencyNotifierLeft from './EmergencyNotifierLeft';
import EmergencyNotifierRight from './EmergencyNotifierRight';

type EmergencyNotifierProps = {
    handleClose: () => void;
}

const EmergencyNotifier: React.FC<EmergencyNotifierProps> = ({ handleClose }) => {
    // state หลัก
    const [sendType, setSendType] = useState<"all" | "region">("all");

    // 🟢 state หลักของแบบฟอร์ม
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [location, setLocation] = useState("");

    // 🟣 state สำหรับ trigger preview
    const [previewData, setPreviewData] = useState<{ title: string; detail: string; location: string }>()

    const handleSendTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as "all" | "region";
        setSendType(value);

        // ถ้าเลือก "ส่งให้ผู้ใช้ทั้งหมด" → ล้างข้อมูลพื้นที่
        // if (value === "all") {
        //     setSelectedProvinces([]);
        //     setSelectedDistricts([]);
        //     setSelectedSubdistricts([]);
        // }
    };

    // 🟢 เมื่อกด “ร่างตัวอย่าง”
    const handleDraftPreview = () => {
        setPreviewData({ title, detail, location })
    }

    return (
        <Box
            sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', m: 'auto', p: 0 }}
        >
            <Paper sx={{ width: '900px', height: 'auto', borderRadius: 4, backgroundColor: 'white', p: 0, pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', pt: 1 }}>
                    <ReportProblemRoundedIcon sx={{ fontSize: 60, color: '#FCBF04' }} />
                    <Typography>สร้างการแจ้งเตือนฉุกเฉิน</Typography>
                </Box>

                <Box sx={{ display: 'flex', width: '100%', height: '100%', gap: 0 }}>

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

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '25%' }}>
                        <Button
                            variant="contained"
                            onClick={handleDraftPreview}
                            sx={{
                                fontSize: 13,
                                gap: 1,
                                borderRadius: 3,
                                height: '40px',
                                mx: -1
                            }}
                        >
                            <ArticleRoundedIcon sx={{ fontSize: 20 }} />
                            ร่างตัวอย่าง
                        </Button>
                    </Box>

                    <EmergencyNotifierRight
                        handleClose={handleClose}
                        previewData={previewData}
                    />

                </Box>
            </Paper>
        </Box>
    )
}

export default EmergencyNotifier