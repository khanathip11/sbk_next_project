// import { Box, IconButton, Stack, Typography } from '@mui/material'
// import React from 'react'
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { CardItem } from '@/app/types/CardItem';

// type taskProps = {
//     count: number;
//     closeTask: boolean;
//     SetCloseTask: React.Dispatch<React.SetStateAction<boolean>>;
//     selectedCard: CardItem | null;
// }

// const TaskSummary = ({ count, closeTask, SetCloseTask, selectedCard }: taskProps) => {
//     return (
//         <Box p={1}>
//             <Stack direction={closeTask ? "row" : "column"} spacing={1} alignItems="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
//                 {closeTask && (
//                     <>
//                         {selectedCard ? (
//                             <Box sx={{ p: 1, fontSize: 12, fontWeight: 500, display: 'flex', gap: 1 }}>
//                                 <Typography sx={{ fontSize: 12, color: '#000000', ml: 0 }}>Preview</Typography>
//                                 {/* <Typography sx={{ fontSize: 12 }} color="text.secondary">{selectedCard.title}</Typography> */}
//                             </Box>
//                         ) : (
//                             <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//                                 <Typography sx={{ fontSize: 10, pl: 1, color: '#000' }}>
//                                     {count + ' Result'}
//                                 </Typography>
//                                 <Typography sx={{ fontSize: 10 }}></Typography>
//                             </Box>
//                         )}

//                     </>
//                 )}

//                 <Box flexGrow={1} />

//                 <IconButton
//                     sx={{
//                         bgcolor: "white",
//                         borderRadius: 2,
//                         p: 0.8,
//                         position: 'relative',
//                         left: !closeTask ? -3 : 0,
//                     }}
//                     onClick={() => SetCloseTask(!closeTask)}
//                 >
//                     <ArrowForwardIosIcon
//                         sx={{
//                             fontSize: 12,
//                             color: "#5B616D",
//                             transform: closeTask ? "rotate(0deg)" : "rotate(180deg)",
//                             transition: "transform 0.5s ease",
//                         }}
//                     />
//                 </IconButton>
//             </Stack>
//         </Box>
//     )
// }

// export default TaskSummary

// ✅ TaskSummary.tsx
import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CardItem } from '@/app/types/CardItem';

/**
 * 🔹 Props ที่รับเข้ามา
 * - count: จำนวนทั้งหมดของรายการ
 * - closeTask: true = เปิดแผง / false = ปิดแผง
 * - SetCloseTask: ฟังก์ชันใช้เปลี่ยนสถานะ open/close
 * - selectedCard: ถ้ามีค่า แปลว่าผู้ใช้กำลังดูรายละเอียดอยู่
 */
type TaskSummaryProps = {
    count: number;
    closeTask: boolean;
    SetCloseTask: React.Dispatch<React.SetStateAction<boolean>>;
    selectedCard: CardItem | null;
};

/**
 * ✅ Component: TaskSummary
 * แสดงสรุปผลบนสุดของแผงรายการ เช่น
 * - จำนวนรายการทั้งหมด (เช่น “120 Result”)
 * - ปุ่มพับ/ขยายแผง Task
 * - แสดงข้อความ “Preview” เมื่อเปิดรายละเอียด
 */
const TaskSummary: React.FC<TaskSummaryProps> = ({ count, closeTask, SetCloseTask, selectedCard }) => {
    return (
        <Box p={1}>
            <Stack
                direction={closeTask ? "row" : "column"} // ✅ เปลี่ยน layout ตามสถานะ
                spacing={1}
                alignItems="center"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* 🔸 แสดงข้อมูลฝั่งซ้าย */}
                {closeTask && (
                    <>
                        {selectedCard ? (
                            // ✅ ถ้าอยู่ในหน้า Preview
                            <Box sx={{ p: 1, fontSize: 12, fontWeight: 500, display: 'flex', gap: 1 }}>
                                <Typography sx={{ fontSize: 12, color: '#000000', ml: 0 }}>
                                    Preview
                                </Typography>
                            </Box>
                        ) : (
                            // ✅ ถ้าอยู่ในหน้า Task List ปกติ
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Typography sx={{ fontSize: 10, pl: 1, color: '#000' }}>
                                    {count + ' Result'}
                                </Typography>
                            </Box>
                        )}
                    </>
                )}

                <Box flexGrow={1} />

                {/* 🔸 ปุ่มพับ/ขยาย (Toggle) */}
                <IconButton
                    sx={{
                        bgcolor: "white",
                        borderRadius: 2,
                        p: 0.8,
                        position: 'relative',
                        left: !closeTask ? -3 : 0, // ✅ ขยับตำแหน่งเล็กน้อยเมื่อปิด
                    }}
                    onClick={() => SetCloseTask(!closeTask)} // ✅ สลับสถานะเปิด/ปิด
                >
                    <ArrowForwardIosIcon
                        sx={{
                            fontSize: 12,
                            color: "#5B616D",
                            transform: closeTask ? "rotate(0deg)" : "rotate(180deg)", // ✅ หมุนไอคอน
                            transition: "transform 0.5s ease", // ✅ เพิ่ม animation
                        }}
                    />
                </IconButton>
            </Stack>
        </Box>
    )
}

export default TaskSummary;
