// import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
// import React from 'react'
// import { StaticImageData } from "next/image";

// interface CardItem {
//     id: number;
//     issue: string;
//     count: string;
//     status: string;
//     imageSrc: string | StaticImageData;
//     bgColor: string;
//     color: string;
//     title: string;
//     desc: string;
//     refNumber: string;
//     reporter: string;
//     location: string;
//     dateTime: string;
// }
// interface TaskBoardProps {
//     card: CardItem;
//     onClick: () => void;
// }

// const TaskBoard: React.FC<TaskBoardProps> = ({ card, onClick }) => {

//     return (
//         <>
//             <Card onClick={onClick} sx={{ width: '100%', display: 'flex', mb: 1, p: 1, borderRadius: 4, boxShadow: 'none', }}>
//                 <CardMedia
//                     component="img"
//                     image={typeof card.imageSrc === "string" ? card.imageSrc : card.imageSrc.src}
//                     alt="Thailand"
//                     sx={{
//                         borderRadius: 4,
//                         width: 70,
//                         height: 70,
//                         objectFit: 'cover',
//                         mt: 0.1,
//                         ml: 0.2
//                     }}
//                 />

//                 <Box sx={{ width: '100%', overflow: 'hidden' }}>
//                     <Stack direction={'row'} px={2} pt={0.5}>
//                         <Typography fontSize={8} noWrap sx={{ textOverflow: 'ellipsis', maxWidth: '80px', color: 'blue',fontSize:10 }}>{card.issue?.length > 18 ? card.issue.slice(0, 18) + '…' : card.issue}</Typography>
//                         <Box flexGrow={1} />
//                         <Typography
//                             fontSize={8}
//                             noWrap
//                             sx={{
//                                 color: card.color,
//                                 bgcolor: card.bgColor,
//                                 p: 0.3,
//                                 pt: 0,
//                                 pb: 0,
//                                 borderRadius: 1,
//                                 width: 'auto',
//                                 fontSize:10

//                             }}>
//                             {card.status?.length > 30 ? card.status.slice(0, 30) + '…' : card.status}
//                         </Typography>
//                     </Stack>
//                     <CardContent sx={{ py: 0 }}>
//                         <Typography variant="subtitle1" color="text.black" fontSize={12} noWrap>
//                             {card.title}
//                         </Typography>
//                         <Typography color="text.secondary" fontSize={10} noWrap>
//                             {card.desc}
//                         </Typography>
//                     </CardContent>
//                     <Stack direction={'row'} px={2}>
//                         <Typography fontSize={10}>Location</Typography>
//                         <Box flexGrow={1} />
//                         <Typography fontSize={10}>Datetime</Typography>
//                     </Stack>
//                 </Box>
//             </Card>
//         </>
//     )
// }

// export default TaskBoard

// ✅ TaskBoard.tsx
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import { StaticImageData } from "next/image";

/**
 * 🔹 รูปแบบข้อมูลที่การ์ดต้องรับ (CardItem)
 * ใช้ร่วมกับ component อื่น เช่น PreviewPanal
 */
interface CardItem {
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
 * 🔹 Props ของ TaskBoard
 * - card: ข้อมูลของเรื่องร้องเรียนแต่ละรายการ
 * - onClick: ฟังก์ชันเมื่อคลิกการ์ด (เปิดดูรายละเอียด)
 */
interface TaskBoardProps {
    card: CardItem;
    onClick: () => void;
}

/**
 * ✅ Component: TaskBoard
 * หน้าที่: แสดงการ์ดของแต่ละ “เรื่องร้องเรียน”
 * ใช้ในหน้า Overview, ComplaintMap หรือ Task List
 */
const TaskBoard: React.FC<TaskBoardProps> = ({ card, onClick }) => {
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
                {/* 🔸 ภาพตัวอย่างของเรื่อง */}
                <CardMedia
                    component="img"
                    image={typeof card.imageSrc === "string" ? card.imageSrc : card.imageSrc.src}
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
                            {card.issue?.length > 18
                                ? card.issue.slice(0, 18) + '…'
                                : card.issue}
                        </Typography>

                        <Box flexGrow={1} />

                        {/* ป้ายสถานะ เช่น “ดำเนินการแล้ว”, “รอตรวจสอบ” */}
                        <Typography
                            fontSize={10}
                            noWrap
                            sx={{
                                color: card.color,
                                bgcolor: card.bgColor,
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
                            {card.title}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            fontSize={10}
                            noWrap
                        >
                            {card.desc}
                        </Typography>
                    </CardContent>

                    {/* ✅ แถวล่าง: สถานที่และเวลา */}
                    <Stack direction={'row'} px={2}>
                        <Typography fontSize={10}>Location</Typography>
                        <Box flexGrow={1} />
                        <Typography fontSize={10}>Datetime</Typography>
                    </Stack>
                </Box>
            </Card>
        </>
    )
}

export default TaskBoard;
