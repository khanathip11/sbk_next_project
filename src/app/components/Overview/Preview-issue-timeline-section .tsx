// import React from 'react'
// import {
//     Box,
//     Typography,
//     Collapse,
//     Avatar,
//     Stack,
// } from "@mui/material";
// import SpokeOutlinedIcon from '@mui/icons-material/SpokeOutlined';
// import {
//     Timeline,
//     TimelineItem,
//     TimelineSeparator,
//     TimelineDot,
//     TimelineConnector,
//     TimelineContent,
//     timelineItemClasses,
// } from "@mui/lab";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// const PreviewIssueTimelineSection = () => {
//     const [openDropdown, setOpenDropdown] = useState(false);
//     // ✅ สามสถานะ: pending | success | failed
//     const timelineData = [
//         {
//             date: "12 กรกฎาคม 2568",
//             time: "12:30",
//             title: "หน่วยงานกำลังดำเนินการ",
//             images: [],
//             status: "success",
//         },
//         {
//             date: "13 กรกฎาคม 2568",
//             time: "14:20",
//             title: "ส่งต่อให้หน่วยรับผิดชอบ",
//             images: ["/img1.png", "/img2.png", "/img2.png", "/img2.png", "/img2.png"],
//             status: "in_progress",
//         },
//         {
//             date: "14 กรกฎาคม 2568",
//             time: "16:10",
//             title: "ดำเนินการเสร็จสิ้น",
//             images: [],
//             status: "failed",
//         },
//     ];

//     // ✅ helper: กำหนดสีและ icon ตามสถานะ
//     const getDotStyle = (status: string) => {
//         switch (status) {
//             case "success":
//                 return { bg: "#E8F5E9", color: "#4CAF50" };
//             case "failed":
//                 return { bg: "#FFEBEE", color: "#F44336" };
//             case "in_progress":
//                 return { bg: "#E3F2FD", color: "#1976D2" };
//             default:
//                 return { bg: "#F5F5F5", color: "#9E9E9E" };
//         }
//     };

//     const getConnectorColor = (status: string) => {
//         switch (status) {
//             case "success": return "#A5D6A7";
//             case "failed": return "#EF9A9A";
//             case "in_progress": return "#90CAF9";
//             default: return "#E0E0E0";
//         }
//     };

//     const getIcon = (status: string, index: number) => {
//         if (status === "success") return <CheckCircleIcon sx={{ fontSize: 16 }} />;
//         if (status === "failed") return <CloseIcon sx={{ fontSize: 16 }} />;
//         return (
//             <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
//                 {index + 1}
//             </Typography>
//         );
//     };

//     return (
//         <>
//             {/* 🔹 Header */}
//             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Box sx={{ display: "flex", flexDirection: "column" }}>
//                     <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//                         <SpokeOutlinedIcon sx={{ fontSize: 16 }} />
//                         <Typography sx={{ mb: 0, fontSize: 13, fontWeight: 600 }}>
//                             ผลการติดตาม
//                         </Typography>
//                     </Box>
//                     <Typography color="text.secondary" sx={{ ml: "24px", fontSize: 12 }}>
//                         สามารถดูผลการดำเนินงานได้ที่นี่
//                     </Typography>
//                 </Box>
//                 {!openDropdown ? (
//                     <KeyboardArrowDownIcon
//                         onClick={() => setOpenDropdown(true)}
//                         sx={{ fontSize: 18, cursor: "pointer" }}
//                     />
//                 ) : (
//                     <KeyboardArrowUpIcon
//                         onClick={() => setOpenDropdown(false)}
//                         sx={{ fontSize: 18, cursor: "pointer" }}
//                     />
//                 )}
//             </Box>

//             {/* 🔹 Timeline Content */}
//             <Collapse in={openDropdown} timeout="auto" unmountOnExit>
//                 <Box sx={{ mt: 1 }}>
//                     <Timeline
//                         sx={{
//                             [`& .${timelineItemClasses.root}:before`]: {
//                                 flex: 0,
//                                 padding: 0,
//                             },
//                             mt: 0,
//                             pt: 0,
//                         }}
//                     >
//                         {timelineData.map((item, index) => {
//                             const { bg, color } = getDotStyle(item.status);

//                             return (
//                                 <TimelineItem key={index}>
//                                     {/* เส้นและไอคอน */}
//                                     <TimelineSeparator sx={{ py: 0, }}>
//                                         <TimelineDot
//                                             sx={{
//                                                 width: 26,
//                                                 height: 26,
//                                                 p: 0,
//                                                 m: 0.5,
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 justifyContent: "center",
//                                                 boxShadow: "none",
//                                                 backgroundColor: bg,
//                                                 color: color,
//                                             }}
//                                         >
//                                             {getIcon(item.status, index)}
//                                         </TimelineDot>

//                                         {index < timelineData.length - 1 && (
//                                             <TimelineConnector
//                                                 sx={{
//                                                     backgroundColor: getConnectorColor(item.status),
//                                                     width: 2,
//                                                 }}
//                                             />
//                                         )}
//                                     </TimelineSeparator>

//                                     {/* เนื้อหาของแต่ละ event */}
//                                     <TimelineContent sx={{ pb: 2, minWidth: 0 }}>
//                                         <Typography
//                                             sx={{
//                                                 color: "text.secondary",
//                                                 fontSize: 12,
//                                                 lineHeight: 1.2,
//                                             }}
//                                         >
//                                             {item.date} • {item.time}
//                                         </Typography>

//                                         <Typography
//                                             sx={{
//                                                 fontSize: 13,
//                                                 fontWeight: 400,
//                                                 color: "#000000",
//                                                 mb: item.images.length > 0 ? 1 : 0,
//                                             }}
//                                         >
//                                             {item.title}
//                                         </Typography>

//                                         {item.images.length > 0 && (
//                                             <Box
//                                                 sx={{
//                                                     mt: 1,
//                                                     width: "100%",
//                                                     maxWidth: "100%",
//                                                     display: "flex",
//                                                     flexWrap: "nowrap",
//                                                     gap: 1,
//                                                     overflowX: "auto",
//                                                     overflowY: "hidden",
//                                                     pr: 0.5,
//                                                     scrollbarWidth: "none", // ✅ สำหรับ Firefox
//                                                     "&::-webkit-scrollbar": { display: "none" }, // ✅ สำหรับ Chrome, Edge, Safari
//                                                     msOverflowStyle: "none", // ✅ สำหรับ IE/Edge เก่า
//                                                 }}
//                                             >
//                                                 {item.images.map((img, i) => (
//                                                     <Avatar
//                                                         key={i}
//                                                         variant="rounded"
//                                                         src={img}
//                                                         sx={{
//                                                             width: 60,
//                                                             height: 60,
//                                                             borderRadius: 2,
//                                                             border: "1px solid #E0E0E0",
//                                                             flex: "0 0 auto", // ✅ ป้องกันโดนบีบ
//                                                         }}
//                                                     />
//                                                 ))}
//                                             </Box>
//                                         )}
//                                     </TimelineContent>
//                                 </TimelineItem>
//                             );
//                         })}
//                     </Timeline>
//                 </Box>
//             </Collapse>
//         </>
//     )
// }

// export default PreviewIssueTimelineSection 

import React, { useState } from 'react'
import {
    Box,
    Typography,
    Collapse,
    Avatar,
} from "@mui/material";
import SpokeOutlinedIcon from '@mui/icons-material/SpokeOutlined';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    timelineItemClasses,
} from "@mui/lab";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * ✅ Component: PreviewIssueTimelineSection
 * แสดง timeline ของเหตุการณ์ (ผลการติดตาม)
 * มีการใช้ Collapse เปิด/ปิด เพื่อซ่อนหรือแสดงรายละเอียด
 */
const PreviewIssueTimelineSection = () => {
    const [openDropdown, setOpenDropdown] = useState(false); // 🔹 toggle เปิด/ปิด timeline

    // 🔸 ตัวอย่างข้อมูล timeline จำลอง
    const timelineData = [
        {
            date: "12 กรกฎาคม 2568",
            time: "12:30",
            title: "หน่วยงานกำลังดำเนินการ",
            images: [],
            status: "success", // ✅ สถานะ: success, failed, in_progress
        },
        {
            date: "13 กรกฎาคม 2568",
            time: "14:20",
            title: "ส่งต่อให้หน่วยรับผิดชอบ",
            images: ["/img1.png", "/img2.png", "/img3.png"],
            status: "in_progress",
        },
        {
            date: "14 กรกฎาคม 2568",
            time: "16:10",
            title: "ดำเนินการเสร็จสิ้น",
            images: [],
            status: "failed",
        },
    ];

    // 🟦 helper: กำหนดสีพื้นหลังและสีข้อความตามสถานะ
    const getDotStyle = (status: string) => {
        switch (status) {
            case "success":
                return { bg: "#E8F5E9", color: "#4CAF50" }; // เขียว
            case "failed":
                return { bg: "#FFEBEE", color: "#F44336" }; // แดง
            case "in_progress":
                return { bg: "#E3F2FD", color: "#1976D2" }; // น้ำเงิน
            default:
                return { bg: "#F5F5F5", color: "#9E9E9E" }; // เทา
        }
    };

    // 🔹 สีของเส้นเชื่อม (connector) ตามสถานะ
    const getConnectorColor = (status: string) => {
        switch (status) {
            case "success": return "#A5D6A7";
            case "failed": return "#EF9A9A";
            case "in_progress": return "#90CAF9";
            default: return "#E0E0E0";
        }
    };

    // 🔹 กำหนดไอคอนตามสถานะ
    const getIcon = (status: string, index: number) => {
        if (status === "success") return <CheckCircleIcon sx={{ fontSize: 16 }} />;
        if (status === "failed") return <CloseIcon sx={{ fontSize: 16 }} />;
        // 🔸 กรณี in_progress ให้แสดงตัวเลขขั้นตอน
        return (
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
                {index + 1}
            </Typography>
        );
    };

    return (
        <>
            {/* 🔹 Header ส่วนหัวของ Timeline */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <SpokeOutlinedIcon sx={{ fontSize: 16 }} />
                        <Typography sx={{ mb: 0, fontSize: 13, fontWeight: 600 }}>
                            ผลการติดตาม
                        </Typography>
                    </Box>
                    <Typography color="text.secondary" sx={{ ml: "24px", fontSize: 12 }}>
                        สามารถดูผลการดำเนินงานได้ที่นี่
                    </Typography>
                </Box>

                {/* 🔹 ปุ่มลูกศรเปิด/ปิด */}
                {!openDropdown ? (
                    <KeyboardArrowDownIcon
                        onClick={() => setOpenDropdown(true)}
                        sx={{ fontSize: 18, cursor: "pointer" }}
                    />
                ) : (
                    <KeyboardArrowUpIcon
                        onClick={() => setOpenDropdown(false)}
                        sx={{ fontSize: 18, cursor: "pointer" }}
                    />
                )}
            </Box>

            {/* 🔹 ส่วนเนื้อหา Timeline (ซ่อน/แสดงด้วย Collapse) */}
            <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                <Box sx={{ mt: 1 }}>
                    <Timeline
                        sx={{
                            [`& .${timelineItemClasses.root}:before`]: {
                                flex: 0,
                                padding: 0, // ✅ ตัดเส้นแนวตั้งซ้ำ
                            },
                            mt: 0,
                            pt: 0,
                        }}
                    >
                        {/* 🔸 Loop สร้างแต่ละ timeline item */}
                        {timelineData.map((item, index) => {
                            const { bg, color } = getDotStyle(item.status);

                            return (
                                <TimelineItem key={index}>
                                    {/* จุดกลมและเส้นเชื่อม */}
                                    <TimelineSeparator sx={{ py: 0 }}>
                                        <TimelineDot
                                            sx={{
                                                width: 26,
                                                height: 26,
                                                p: 0,
                                                m: 0.5,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                boxShadow: "none",
                                                backgroundColor: bg,
                                                color: color,
                                            }}
                                        >
                                            {getIcon(item.status, index)}
                                        </TimelineDot>

                                        {/* เส้นเชื่อม timeline */}
                                        {index < timelineData.length - 1 && (
                                            <TimelineConnector
                                                sx={{
                                                    backgroundColor: getConnectorColor(item.status),
                                                    width: 2,
                                                }}
                                            />
                                        )}
                                    </TimelineSeparator>

                                    {/* เนื้อหาของแต่ละ event */}
                                    <TimelineContent sx={{ pb: 2, minWidth: 0 }}>
                                        <Typography
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: 12,
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {item.date} • {item.time}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: 13,
                                                fontWeight: 400,
                                                color: "#000000",
                                                mb: item.images.length > 0 ? 1 : 0,
                                            }}
                                        >
                                            {item.title}
                                        </Typography>

                                        {/* ถ้ามีภาพแนบ → แสดงเป็น list แนวนอน */}
                                        {item.images.length > 0 && (
                                            <Box
                                                sx={{
                                                    mt: 1,
                                                    display: "flex",
                                                    flexWrap: "nowrap",
                                                    gap: 1,
                                                    overflowX: "auto",
                                                    scrollbarWidth: "none", // Firefox
                                                    "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
                                                }}
                                            >
                                                {item.images.map((img, i) => (
                                                    <Avatar
                                                        key={i}
                                                        variant="rounded"
                                                        src={img}
                                                        sx={{
                                                            width: 60,
                                                            height: 60,
                                                            borderRadius: 2,
                                                            border: "1px solid #E0E0E0",
                                                            flex: "0 0 auto",
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        )}
                                    </TimelineContent>
                                </TimelineItem>
                            );
                        })}
                    </Timeline>
                </Box>
            </Collapse>
        </>
    )
}

export default PreviewIssueTimelineSection;
