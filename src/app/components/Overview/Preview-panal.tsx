import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import { formatThaiDateTime } from '@/app/utils/formatThaiDateTime';
import { StaticImageData } from "next/image";

// 🧩 Icon
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';

// 🧩 Component ย่อย
import PreviewHeader from './Preview-header';
import PreviewDetailItem from './Preview-detailItem';
import PreviewIssueTimelineSection from './Preview-issue-timeline-section ';
import { issuesData } from '@/app/data/issuesData';
import { IssueItem } from '@/app/types/IssueItem';
import { getTypeStyled } from '@/app/utils/getTypeStyled';

/**
 * 🔹 Type ของข้อมูลการ์ด (ข้อมูลแต่ละเรื่อง)
 */
export interface CardItem {
    id: number;
    issue: string;
    count: string;
    status: string;
    imageSrc: string | StaticImageData;
    bgColor: string;
    color: string;
    title: string;
    desc: string;
    refNumber: string;
    reporter: string;
    location: string;
    dateTime: string;
}

/**
 * 🔹 Props ที่รับเข้ามา
 * - card: ข้อมูลเรื่องที่เลือกมา preview
 * - onBack: ฟังก์ชันกลับไปหน้าก่อนหน้า (TaskBoard)
 */
interface PreviewPanalProps {
    card: IssueItem;
    onBack: () => void;
}

/**
 * ✅ Component: PreviewPanal
 * หน้าที่: แสดงรายละเอียดทั้งหมดของการแจ้งเรื่องที่เลือก
 * มีทั้งรูปภาพ, เส้นเวลา, และรายละเอียดต่าง ๆ
 */
const PreviewPanal: React.FC<PreviewPanalProps> = ({ card, onBack }) => {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false); // (เก็บ state เปิด/ปิด timeline ถ้ามี)
    const { background, color } = getTypeStyled(card.status)
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                m: 0,
                p: 0,
                position: 'relative',
            }}
        >
            {/* 🔹 ส่วนรูปภาพด้านบน */}
            {card.img && (
                <PreviewHeader
                    imageSrc={typeof card.img === 'string' ? card.img[1] : card.img[1]}
                    // imageSrc={typeof card.imageSrc === 'string' ? card.imageSrc : card.imageSrc}
                    onClose={onBack} // ปุ่ม X จะเรียกฟังก์ชัน onBack เพื่อกลับ
                />
            )}

            {/* 🔹 กล่องเนื้อหาหลัก (overlay ทับใต้รูปภาพ) */}
            <Card
                sx={{
                    borderRadius: 4,
                    backgroundColor: '#ffffff',
                    width: '100%',
                    height: '100%',
                    p: 1,
                    position: 'absolute',
                    top: '38%', // ✅ ให้เริ่มจากใต้รูป
                }}
            >
                {/* 🔸 ส่วนหัวเรื่อง */}
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', mb: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{ textAlign: 'center', my: 1, fontSize: 14 }}
                    >
                        {card.problem}
                    </Typography>

                    {/* ป้ายสถานะ */}
                    <Typography
                        fontSize={12}
                        sx={{
                            bgcolor: background,
                            px: 1,
                            mb: 2,
                            borderRadius: 1,
                            color: color,
                        }}
                    >
                        {card.status}
                    </Typography>

                    <hr style={{ width: '100%', color: '#EDEDED' }} />
                </Box>

                {/* 🔸 เนื้อหา (timeline + รายละเอียด) */}
                <Box sx={{ p: 1 }}>
                    {/* 🔹 Timeline ของผลการติดตาม */}
                    <PreviewIssueTimelineSection issue={card} />

                    {/* 🔹 รายละเอียดข้อมูลเพิ่มเติม */}
                    <Box sx={{ mt: 1, pl: '0' }}>
                        <PreviewDetailItem
                            icon={<VpnKeyOutlinedIcon sx={{ fontSize: 16 }} />}
                            label="หมายเลขอ้างอิง"
                            value={card.id}
                        />
                        <PreviewDetailItem
                            icon={<RecordVoiceOverOutlinedIcon sx={{ fontSize: 16 }} />}
                            label="ผู้แจ้ง"
                            value={card.reporter}
                        />
                        <PreviewDetailItem
                            icon={<FmdGoodOutlinedIcon sx={{ fontSize: 16 }} />}
                            label="สถานที่"
                            value={card.location}
                        />
                        <PreviewDetailItem
                            icon={<ScheduleIcon sx={{ fontSize: 16 }} />}
                            label="วันและเวลา"
                            value={card.date} // ✅ แปลงวันที่เป็นรูปแบบไทย
                        />
                        <PreviewDetailItem
                            icon={<DescriptionOutlinedIcon sx={{ fontSize: 16 }} />}
                            label="รายละเอียด"
                            value={card.problem}
                        />
                        <PreviewDetailItem
                            icon={<MapOutlinedIcon sx={{ fontSize: 16 }} />}
                            label="แผนที่"
                            value="ดูข้อมูลเพิ่มเติม..."
                        />
                        <PreviewDetailItem
                            icon={<QrCodeScannerOutlinedIcon sx={{ fontSize: 16 }} />}
                            label="QR-Code"
                            value="ดูข้อมูลเพิ่มเติม..."
                        />
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default PreviewPanal;
