// ✅ TaskBoard.tsx
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import { StaticImageData } from "next/image";
import { IssueItem } from '@/app/types/IssueItem';
import { getTypeStyled } from '@/app/utils/getTypeStyled';

/**
 * 🔹 Props ของ TaskBoard
 * - card: ข้อมูลของเรื่องร้องเรียนแต่ละรายการ
 * - onClick: ฟังก์ชันเมื่อคลิกการ์ด (เปิดดูรายละเอียด)
 */
interface TaskBoardProps {
    card: IssueItem;
    onClick: () => void;
}

/**
 * ✅ Component: TaskBoard
 * หน้าที่: แสดงการ์ดของแต่ละ “เรื่องร้องเรียน”
 * ใช้ในหน้า Overview, ComplaintMap หรือ Task List
 */
const TaskBoard: React.FC<TaskBoardProps> = ({ card, onClick }) => {
    const { background, color } = getTypeStyled(card.status);

    return (
        <>
            {/* 🔹 กล่องการ์ดหลัก */}
            <Card
                onClick={onClick}
                sx={{
                    width: '100%',
                    display: 'flex',
                    mb: 1,
                    p: 1,
                    borderRadius: 4,
                    boxShadow: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#f9f9f9',
                    }
                }}
            >
                <CardMedia
                    component="img"
                    image={
                        card.img && card.img.length > 0
                            ? typeof card.img[0] === "string"
                                ? card.img[0]
                                : card.img[0]?.src
                            : "/placeholder.jpg" // ✅ fallback รูป placeholder
                    }
                    alt="Preview Image"
                    sx={{
                        borderRadius: 4,
                        width: 70,
                        height: 70,
                        objectFit: 'cover',
                        mt: 0.1,
                        ml: 0.2,
                    }}
                />
                {/* 🔸 เนื้อหาการ์ด */}
                <Box sx={{ width: '100%', overflow: 'hidden' }}>
                    {/* ✅ แถวแรก: ชื่อเรื่องย่อ + สถานะ */}
                    <Stack direction={'row'} px={2} pt={0.5}>
                        <Typography
                            fontSize={10}
                            noWrap
                            sx={{
                                textOverflow: 'ellipsis',
                                maxWidth: '80px',
                                color: 'blue',
                            }}
                        >
                            {/* ถ้ายาวเกิน 18 ตัวอักษร → ตัดด้วย … */}
                            {card.problem?.length > 18
                                ? card.category.slice(0, 18) + '…'
                                : card.category}
                        </Typography>

                        <Box flexGrow={1} />

                        {/* ป้ายสถานะ เช่น “ดำเนินการแล้ว”, “รอตรวจสอบ” */}
                        <Typography
                            fontSize={10}
                            noWrap
                            sx={{
                                color: color,
                                bgcolor: background,
                                p: 0.3,
                                borderRadius: 1,
                            }}
                        >
                            {card.status?.length > 30
                                ? card.status.slice(0, 30) + '…'
                                : card.status}
                        </Typography>
                    </Stack>

                    {/* ✅ หัวข้อและคำอธิบาย */}
                    <CardContent sx={{ py: 0 }}>
                        <Typography
                            variant="subtitle1"
                            color="text.black"
                            fontSize={12}
                            noWrap
                        >
                            {card.problem}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            fontSize={10}
                            noWrap
                        >
                            {card.problem}
                        </Typography>
                    </CardContent>

                    {/* ✅ แถวล่าง: สถานที่และเวลา */}
                    <Stack direction={'row'} px={2}>
                        <Typography fontSize={10}>{card.location}</Typography>
                        <Box flexGrow={1} />
                        <Typography fontSize={10}>{card.date}</Typography>
                    </Stack>
                </Box>
            </Card>
        </>
    )
}

export default TaskBoard;
