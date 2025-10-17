// import React, { useState, useRef } from 'react'
// import { Box, Button, IconButton, Modal } from '@mui/material'
// import ReportProblemIcon from '@mui/icons-material/ReportProblem';
// import ComplaintOverview from './Complaint-overview';
// import { StaticImageData } from "next/image";
// import EmergencyNotifier from './Emergency-notifier';
// import ComplaintFilterBar from './Complaint-filter-bar';
// import MapboxMapComponent, { Network } from '../Mapbox';
// import FilterListIcon from '@mui/icons-material/FilterList';

// type CardData = {
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
// };

// type ComplaintMapProps = {
//     cardsData: CardData[];
//     collapse: boolean;
//     closeTask: boolean;
// };

// const ComplaintMap: React.FC<ComplaintMapProps> = ({ cardsData, collapse, closeTask }) => {
//     const [open, setOpen] = useState<boolean>(false);
//     const [openFilter, setOpenFilter] = useState<boolean>(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const [issue, setIssue] = useState<Network[]>([
//         {
//             id: 1,
//             name: "string",
//             lat: 13.9063539,
//             lng: 100.5396905,
//         }
//     ])

//     return (
//         <Box
//             sx={{
//                 bgcolor: '#000000',
//                 width: '100%',
//                 height: '100%',
//                 borderRadius: 4,
//                 position: 'relative',
//                 overflow: 'hidden'
//             }}>

//             <MapboxMapComponent networks={issue} collapse={collapse} closeTask={closeTask} />

//             <Box
//                 sx={{
//                     display: "flex",
//                     flexDirection: "row",
//                     alignItems: "flex-start",
//                     p: 2,
//                     gap: 2,
//                     width: "100%",
//                     position: 'absolute',
//                     zIndex: 1,
//                     left: 0,
//                     top: 0,
//                     pointerEvents: 'none'
//                 }}
//             >
//                 <ComplaintOverview
//                     collapse={collapse}
//                     closeTask={closeTask}
//                     cardsDataOverview={cardsData}
//                 />

//                 <Box sx={{ flex: 1, display: 'flex', pointerEvents: 'auto' }}>
//                     {openFilter ? (
//                         <>
//                             <IconButton
//                                 onClick={() => setOpenFilter(false)}
//                                 sx={{
//                                     width: 35,
//                                     height: 35,
//                                     backgroundColor: '#fff',
//                                     borderRadius: 2,
//                                     ml: -1,
//                                     mr: 1,
//                                     "&:hover": { backgroundColor: '#f0f0f0' },
//                                 }}
//                             >
//                                 <FilterListIcon sx={{ fontSize: 22, color: '#000' }} />
//                             </IconButton>
//                             <ComplaintFilterBar open={open} />
//                         </>
//                     ) : (
//                         <IconButton
//                             onClick={() => setOpenFilter(true)}
//                             sx={{
//                                 width: 35,
//                                 height: 35,
//                                 backgroundColor: '#fff',
//                                 borderRadius: 2,
//                                 ml: -1,
//                                 mr: 1,
//                                 "&:hover": { backgroundColor: '#f0f0f0' },
//                             }}
//                         >
//                             <FilterListIcon sx={{ fontSize: 22, color: '#5B616D' }} />
//                         </IconButton>
//                     )
//                     }
//                 </Box>
//             </Box>

//             <Box>
//                 <Button
//                     variant="contained"
//                     sx={{
//                         width: '195px',
//                         height: '30px',
//                         position: 'absolute',
//                         bottom: 10,
//                         left: '50%',
//                         transform: 'translateX(-50%)',
//                         backgroundColor: "#FF3B3B",
//                         fontSize: 12,
//                         gap: 1,
//                         borderRadius: 2,
//                         '&:hover': {
//                             backgroundColor: '#FF1A1A'
//                         }
//                     }}
//                     onClick={handleOpen}
//                 >
//                     <ReportProblemIcon sx={{ fontSize: 18 }} />
//                     แจ้งเตือนเหตุการณ์ฉุกเฉิน
//                 </Button>

//                 <Modal open={open} onClose={handleClose}>
//                     <Box sx={{ width: '100%', height: '100%' }}>
//                         <EmergencyNotifier handleClose={handleClose} />
//                     </Box>
//                 </Modal>
//             </Box>
//         </Box >
//     )
// }

// export default ComplaintMap

import React, { useState } from 'react'
import { Box, Button, IconButton, Modal } from '@mui/material'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ComplaintOverview from './Complaint-overview';
import { StaticImageData } from "next/image";
import EmergencyNotifier from './Emergency-notifier';
import ComplaintFilterBar from './Complaint-filter-bar';
import MapboxMapComponent, { Network } from '../Mapbox';
import FilterListIcon from '@mui/icons-material/FilterList';

// ✅ ประเภทของข้อมูลการ์ดที่ส่งเข้ามา
type CardData = {
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
};

// 🧩 Props ที่ ComplaintMap รับมาจาก HomePage
type ComplaintMapProps = {
    cardsData: CardData[];  // ✅ ข้อมูลทั้งหมดของปัญหา (cardsData)
    collapse: boolean;      // ✅ สถานะย่อ/ขยายแผงซ้าย (Navbar)
    closeTask: boolean;     // ✅ สถานะเปิด/ปิดแผงขวา (Task container)
};

const ComplaintMap: React.FC<ComplaintMapProps> = ({ cardsData, collapse, closeTask }) => {
    // ⚙️ state สำหรับ modal แจ้งเตือนฉุกเฉิน
    const [open, setOpen] = useState<boolean>(false);

    // ⚙️ state สำหรับเปิด/ปิดแถบ Filter
    const [openFilter, setOpenFilter] = useState<boolean>(false);

    // 🧭 toggle modal แจ้งเหตุฉุกเฉิน
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // 🌍 mock ข้อมูลพิกัดปัญหา (ใช้ใน Mapbox)
    const [issue, setIssue] = useState<Network[]>([
        {
            id: 1,
            name: "string",
            lat: 13.9063539,
            lng: 100.5396905,
        }
    ])

    return (
        <Box
            sx={{
                bgcolor: '#000000',
                width: '100%',
                height: '100%',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* 🗺️ ส่วนแผนที่หลัก */}
            <MapboxMapComponent networks={issue} collapse={collapse} closeTask={closeTask} />

            {/* 🔹 กล่อง overlay ด้านบนซ้าย (Overview + Filter) */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    p: 2,
                    gap: 2,
                    width: "100%",
                    position: 'absolute',
                    zIndex: 1,
                    left: 0,
                    top: 0,
                    pointerEvents: 'none' // ❗ ทำให้คลิกทะลุได้ ยกเว้น child ที่เปิด pointerEvents
                }}
            >
                {/* 🔸 1. กล่องสรุปสถานะปัญหา (ComplaintOverview) */}
                <ComplaintOverview
                    collapse={collapse}
                    closeTask={closeTask}
                    cardsDataOverview={cardsData}
                />

                {/* 🔸 2. ปุ่ม filter + แถบกรอง (ComplaintFilterBar) */}
                <Box sx={{ flex: 1, display: 'flex', pointerEvents: 'auto' }}>
                    {openFilter ? (
                        <>
                            {/* ปุ่มปิดแถบ Filter */}
                            <IconButton
                                onClick={() => setOpenFilter(false)}
                                sx={{
                                    width: 35,
                                    height: 35,
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    ml: -1,
                                    mr: 1,
                                    "&:hover": { backgroundColor: '#f0f0f0' },
                                }}
                            >
                                <FilterListIcon sx={{ fontSize: 22, color: '#000' }} />
                            </IconButton>

                            {/* แสดงแถบ Filter */}
                            <ComplaintFilterBar open={open} />
                        </>
                    ) : (
                        // ปุ่มเปิดแถบ Filter (เมื่อยังไม่เปิด)
                        <IconButton
                            onClick={() => setOpenFilter(true)}
                            sx={{
                                width: 35,
                                height: 35,
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                ml: -1,
                                mr: 1,
                                "&:hover": { backgroundColor: '#f0f0f0' },
                            }}
                        >
                            <FilterListIcon sx={{ fontSize: 22, color: '#5B616D' }} />
                        </IconButton>
                    )}
                </Box>
            </Box>

            {/* 🔺 ปุ่มแจ้งเตือนเหตุฉุกเฉิน (ล่างกลางจอ) */}
            <Box>
                <Button
                    variant="contained"
                    sx={{
                        width: '195px',
                        height: '30px',
                        position: 'absolute',
                        bottom: 10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: "#FF3B3B",
                        fontSize: 12,
                        gap: 1,
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: '#FF1A1A'
                        }
                    }}
                    onClick={handleOpen}
                >
                    <ReportProblemIcon sx={{ fontSize: 18 }} />
                    แจ้งเตือนเหตุการณ์ฉุกเฉิน
                </Button>

                {/* 🧱 Modal แสดงฟอร์มแจ้งเตือน */}
                <Modal open={open} onClose={handleClose}>
                    <Box sx={{ width: '100%', height: '100%' }}>
                        <EmergencyNotifier handleClose={handleClose} />
                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}

export default ComplaintMap;
