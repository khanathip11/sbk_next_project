// "use client";
// import React, { useState } from 'react'
// import {
//     Box,
//     Typography,
//     Collapse,
//     Avatar,
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
// import CloseIcon from "@mui/icons-material/Close";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { IssueItem } from '@/app/types/IssueItem';

// interface PreviewIssueTimelineSectionProps {
//     issue: IssueItem[];
// }
// /**
//  * ✅ Component: PreviewIssueTimelineSection
//  * แสดง timeline ของเหตุการณ์ (ผลการติดตาม)
//  * มีการใช้ Collapse เปิด/ปิด เพื่อซ่อนหรือแสดงรายละเอียด
//  */

// const PreviewIssueTimelineSection: React.FC<PreviewIssueTimelineSectionProps> = ({ issue }) => {
//     const [openDropdown, setOpenDropdown] = useState(false); // 🔹 toggle เปิด/ปิด timeline

//     // 🟦 helper: กำหนดสีพื้นหลังและสีข้อความตามสถานะ
//     const getDotStyle = (status: string) => {
//         switch (status) {
//             case "ระบบรับข้อมูลแล้ว":
//                 return { bg: "#E8F5E9", color: "#4CAF50" }; // เขียว
//             case "ไม่สามารถดำเนินการได้":
//                 return { bg: "#FFEBEE", color: "#F44336" }; // แดง
//             case "หน่วยงานกำลังดำเนินการ":
//                 return { bg: "#E3F2FD", color: "#1976D2" }; // น้ำเงิน
//             default:
//                 return { bg: "#F5F5F5", color: "#9E9E9E" }; // เทา
//         }
//     };

//     // 🔹 สีของเส้นเชื่อม (connector) ตามสถานะ
//     const getConnectorColor = (status: string) => {
//         switch (status) {
//             case "ระบบรับข้อมูลแล้ว": return "#A5D6A7";
//             case "ไม่สามารถดำเนินการได้": return "#EF9A9A";
//             case "หน่วยงานกำลังดำเนินการ": return "#90CAF9";
//             default: return "#E0E0E0";
//         }
//     };

//     // 🔹 กำหนดไอคอนตามสถานะ
//     const getIcon = (status: string, index: number) => {
//         if (status === "success") return <CheckCircleIcon sx={{ fontSize: 16 }} />;
//         if (status === "failed") return <CloseIcon sx={{ fontSize: 16 }} />;
//         // 🔸 กรณี in_progress ให้แสดงตัวเลขขั้นตอน
//         return (
//             <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
//                 {index + 1}
//             </Typography>
//         );
//     };

//     return (
//         <>
//             {/* 🔹 Header ส่วนหัวของ Timeline */}
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

//                 {/* 🔹 ปุ่มลูกศรเปิด/ปิด */}
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

//             {/* 🔹 ส่วนเนื้อหา Timeline (ซ่อน/แสดงด้วย Collapse) */}
//             <Collapse in={openDropdown} timeout="auto" unmountOnExit>
//                 <Box sx={{ mt: 1 }}>
//                     <Timeline
//                         sx={{
//                             [`& .${timelineItemClasses.root}:before`]: {
//                                 flex: 0,
//                                 padding: 0, // ✅ ตัดเส้นแนวตั้งซ้ำ
//                             },
//                             mt: 0,
//                             pt: 0,
//                         }}
//                     >
//                         {/* 🔸 Loop สร้างแต่ละ timeline item */}
//                         {issue.map((item, index) => {
//                             const { bg, color } = getDotStyle(item.status);

//                             return (
//                                 <TimelineItem key={index}>
//                                     {/* จุดกลมและเส้นเชื่อม */}
//                                     <TimelineSeparator sx={{ py: 0 }}>
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

//                                         {/* เส้นเชื่อม timeline */}
//                                         {index < issue.length - 1 && (
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
//                                             {item.date} • {item.date}
//                                         </Typography>

//                                         <Typography
//                                             sx={{
//                                                 fontSize: 13,
//                                                 fontWeight: 400,
//                                                 color: "#000000",
//                                                 mb: item.img.length > 0 ? 1 : 0,
//                                             }}
//                                         >
//                                             {item.status}
//                                         </Typography>

//                                         {/* ถ้ามีภาพแนบ → แสดงเป็น list แนวนอน */}
//                                         {item.img.length > 0 && (
//                                             <Box
//                                                 sx={{
//                                                     mt: 1,
//                                                     display: "flex",
//                                                     flexWrap: "nowrap",
//                                                     gap: 1,
//                                                     overflowX: "auto",
//                                                     scrollbarWidth: "none", // Firefox
//                                                     "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
//                                                 }}
//                                             >
//                                                 {item.img.map((img, i) => (
//                                                     <Avatar
//                                                         key={i}
//                                                         variant="rounded"
//                                                         src={typeof img === "string" ? img : img.src}
//                                                         sx={{
//                                                             width: 60,
//                                                             height: 60,
//                                                             borderRadius: 2,
//                                                             border: "1px solid #E0E0E0",
//                                                             flex: "0 0 auto",
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

// export default PreviewIssueTimelineSection;

"use client";
import React, { useState } from "react";
import {
    Box,
    Typography,
    Collapse,
} from "@mui/material";
import SpokeOutlinedIcon from "@mui/icons-material/SpokeOutlined";
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

import { IssueItem } from "@/app/types/IssueItem";
import { TIMELINE_STEPS, FAILED_STEP } from "@/app/utils/statusConfig";

interface PreviewIssueTimelineSectionProps {
    issue: IssueItem;
}

const PreviewIssueTimelineSection: React.FC<PreviewIssueTimelineSectionProps> = ({ issue }) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    // 🧠 Function mapping สถานะจริง -> Step
    const getCurrentStep = (status: string): number => {
        switch (status) {
            case "หน่วยงานกำลังดำเนินการ":
                return 1;
            case "ส่งต่อให้หน่วยงาน":
                return 2;
            case "ระบบรับข้อมูลแล้ว":
            case "ดำเนินการเสร็จสิ้น":
                return 3;
            default:
                return 0; // ยังไม่เข้ากระบวนการ
        }
    };

    const status = issue.status;
    const isFailed = status === "ไม่สามารถดำเนินการได้";
    const currentStep = getCurrentStep(status);

    // 🧩 ถ้า fail → ใช้ FAILED_STEP แทนขั้นสุดท้าย
    const stepsToShow = isFailed
        ? [...TIMELINE_STEPS.slice(0, 2), FAILED_STEP]
        : TIMELINE_STEPS;

    return (
        <>
            {/* 🔹 Header */}
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

                {/* 🔹 ปุ่มเปิด/ปิด */}
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

            {/* 🔹 Timeline */}
            <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                <Box sx={{ mt: 1 }}>
                    <Timeline
                        sx={{
                            [`& .${timelineItemClasses.root}:before`]: {
                                flex: 0,
                                padding: 0,
                            },
                            mt: 0,
                            pt: 0,
                        }}
                    >
                        {stepsToShow.map((step, index) => {
                            const isActive = index + 1 <= currentStep;
                            const isLast = index === stepsToShow.length - 1;

                            return (
                                <TimelineItem key={step.id}>
                                    <TimelineSeparator>
                                        <TimelineDot
                                            sx={{
                                                width: 26,
                                                height: 26,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: isActive ? step.bg : "#F5F5F5",
                                                color: isActive ? step.color : "#9E9E9E",
                                                boxShadow: "none",
                                                transition: "all 0.3s ease",
                                            }}
                                        >
                                            {isActive ? step.icon : index + 1}
                                        </TimelineDot>

                                        {!isLast && (
                                            <TimelineConnector
                                                sx={{
                                                    backgroundColor: isActive ? step.color : "#E0E0E0",
                                                    width: 2,
                                                    transition: "all 0.3s ease",
                                                }}
                                            />
                                        )}
                                    </TimelineSeparator>

                                    <TimelineContent>
                                        <Typography
                                            sx={{
                                                fontSize: 13,
                                                // color: isActive ? step.color : "#9E9E9E",
                                                fontWeight: isActive ? 600 : 400,
                                                transition: "color 0.3s ease",
                                            }}
                                        >
                                            {step.label}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            );
                        })}
                    </Timeline>
                </Box>
            </Collapse>
        </>
    );
};

export default PreviewIssueTimelineSection;

