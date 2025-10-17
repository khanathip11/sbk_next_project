// import { Box, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
// import SearchIcon from "@mui/icons-material/Search";
// import { StaticImageData } from "next/image";
// import React from 'react'
// import ProblemChart from './Problem-chart';

// type CardsData = {
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

// type ComplaintOverviewProps = {
//     cardsDataOverview: CardsData[]
//     collapse: boolean;
//     closeTask: boolean;
// }

// const ComplaintOverview: React.FC<ComplaintOverviewProps> = ({ cardsDataOverview,
//     collapse,
//     closeTask, }) => {
//     const issueData = [
//         { type: "ระบบรับข้อมูลแล้ว", issue: 20, percent: 30, color: "#f03e3e" },
//         { type: "เจ้าหน้าที่ตรวจสอบ", issue: 10, percent: 20, color: "#fcbe04" },
//         { type: "ส่งต่อให้หน่วยงาน", issue: 30, percent: 25, color: "#01b5d7" },
//         { type: "หน่วยงานกำลังดำเนินการ", issue: 10, percent: 25, color: "#108be8" },
//         { type: "ดำเนินการเสร็จสิ้น", issue: 7, percent: 25, color: "#35c11f" },
//         { type: "ไม่สามารถดำเนินการได้", issue: 3, percent: 25, color: "#805ad4" },
//     ];

//     const colorCode = [
//         { color: '#07254A' },
//         { color: '#054887' },
//         { color: '#004D99' },
//         { color: '#0068CB' },
//         { color: '#0A87ED' },
//         { color: '#34A2FC' },
//         { color: '#8CCBFA' },
//         { color: '#A2D1F5' },
//         { color: '#BAF9FF' },
//         { color: '#CFFBFF' },
//         { color: '#ffffff' },
//     ]

//     return (
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//             <Stack sx={{ display: 'flex', gap: 1, width: '300px', }} direction="row" alignItems="center">
//                 <TextField
//                     id="complaint-search"
//                     placeholder="ค้นหา"
//                     variant="outlined"
//                     size="small"
//                     sx={{
//                         minWidth: '100%',
//                         bgcolor: "#f2f2f4",
//                         borderRadius: 2,
//                         pointerEvents: 'auto',
//                         "& .MuiOutlinedInput-root": {
//                             borderRadius: 1,
//                             height: 36,
//                             "& fieldset": { border: "none" },
//                             "&:hover fieldset": { border: "none" },
//                             "&.Mui-focused fieldset": { border: "none" },
//                         },
//                         "& .MuiInputBase-input": {
//                             fontSize: 14,
//                             color: "black",
//                         },
//                     }}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon sx={{ fontSize: 18, color: "#5f6470" }} />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             </Stack>

//             <Box
//                 sx={{
//                     width: '300px',
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(2, 1fr)',
//                     gap: 1,
//                     pt: 2,
//                 }}
//             >
//                 {issueData.map((item, index) => (
//                     <Box
//                         key={index}
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'flex-start',
//                             gap: 0.5,
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 width: 6,
//                                 height: '100%',
//                                 borderRadius: 2,
//                                 backgroundColor: item.color,
//                             }}
//                         />

//                         <Paper
//                             sx={{
//                                 flex: 1,
//                                 minHeight: 50,
//                                 height: 'auto',
//                                 borderRadius: 4,
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'flex-start',
//                                 gap: 0.2,
//                                 justifyContent: 'flex-start',
//                                 p: 1,
//                                 bgcolor: 'rgba(0,0,0,0.3)',
//                                 color: '#ffffff',
//                                 borderTop: '0.1px solid white',
//                                 borderBottom: '0.1px solid white',
//                                 borderLeft: 'none',
//                                 borderRight: 'none',
//                                 wordBreak: 'break-word',
//                             }}
//                         >
//                             <Typography sx={{ fontSize: 12 }}>{item.type}</Typography>
//                             <Typography sx={{ fontSize: 12 }}>{`${item.issue} (${item.percent}%)`}</Typography>
//                         </Paper>
//                     </Box>
//                 ))}
//             </Box>

//             <Box sx={{
//                 width: '300px',
//                 height: 'auto',
//                 borderTop: '1px solid white',
//                 borderBottom: '1px solid white',
//                 borderLeft: 'none',
//                 borderRight: 'none',
//                 borderRadius: 4,
//                 mt: 1,
//                 p: 1,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 backgroundColor: 'rgba(0,0,0,0.3)',
//                 color: 'white',
//             }}>
//                 <Typography sx={{ color: '#ffffff', fontSize: 12 }}>ประเภทปัญหาที่ขอความช่วยเหลือ</Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }} >
//                     <ProblemChart />
//                 </Box>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'flex-start',
//                         justifyContent: 'center',
//                         color: '#ffffff',
//                         mt: 1,
//                     }}
//                 >
//                     {cardsDataOverview.map((items, index) => (
//                         <Box key={items.id || index} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.7 }}>
//                             <Box
//                                 sx={{
//                                     width: 6,
//                                     height: 6,
//                                     borderRadius: '50%',
//                                     border: '1px solid #ffffff',
//                                     bgcolor: colorCode[index % colorCode.length].color,
//                                 }}
//                             />

//                             <Typography
//                                 key={items.id}
//                                 sx={{
//                                     color: 'white',
//                                     fontSize: 12,
//                                     lineHeight: '6px',
//                                     m: 0,
//                                 }}
//                             >
//                                 {items.issue}
//                             </Typography>
//                         </Box>
//                     ))}
//                 </Box>
//             </Box>
//         </Box >
//     )
// }

// export default ComplaintOverview

import { Box, Typography, Paper, TextField, InputAdornment } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import React from 'react'
import ProblemChart from './Problem-chart'; // 📊 กราฟวงกลมแสดงสัดส่วนประเภทปัญหา
import { StaticImageData } from "next/image";

// 🔹 กำหนดรูปแบบข้อมูลที่รับเข้ามา (เหมือนกับ CardData)
type CardsData = {
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

type ComplaintOverviewProps = {
    cardsDataOverview: CardsData[];  // ✅ ข้อมูลการ์ดทั้งหมดจากหน้า Overview
    collapse: boolean;               // ✅ ใช้เพื่อปรับ layout เมื่อเมนูด้านซ้ายย่อ
    closeTask: boolean;              // ✅ ใช้เพื่อปรับ layout เมื่อแผงขวาเปิด/ปิด
}

const ComplaintOverview: React.FC<ComplaintOverviewProps> = ({
    cardsDataOverview,
    collapse,
    closeTask,
}) => {

    // 🔢 ตัวอย่างข้อมูลจำลองแสดงจำนวนปัญหาตามสถานะ
    const issueData = [
        { type: "ระบบรับข้อมูลแล้ว", issue: 20, percent: 30, color: "#f03e3e" },
        { type: "เจ้าหน้าที่ตรวจสอบ", issue: 10, percent: 20, color: "#fcbe04" },
        { type: "ส่งต่อให้หน่วยงาน", issue: 30, percent: 25, color: "#01b5d7" },
        { type: "หน่วยงานกำลังดำเนินการ", issue: 10, percent: 25, color: "#108be8" },
        { type: "ดำเนินการเสร็จสิ้น", issue: 7, percent: 25, color: "#35c11f" },
        { type: "ไม่สามารถดำเนินการได้", issue: 3, percent: 25, color: "#805ad4" },
    ];

    // 🎨 ไล่เฉดสีสำหรับแต่ละหมวดหมู่ปัญหา (ใช้ใน legend ของกราฟ)
    const colorCode = [
        { color: '#07254A' },
        { color: '#054887' },
        { color: '#004D99' },
        { color: '#0068CB' },
        { color: '#0A87ED' },
        { color: '#34A2FC' },
        { color: '#8CCBFA' },
        { color: '#A2D1F5' },
        { color: '#BAF9FF' },
        { color: '#CFFBFF' },
        { color: '#ffffff' },
    ]

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* ============================
                🔍 กล่องค้นหา (Search bar)
               ============================ */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    width: '300px',
                }}
            >
                <TextField
                    id="complaint-search"
                    placeholder="ค้นหา"
                    variant="outlined"
                    size="small"
                    sx={{
                        minWidth: '100%',
                        bgcolor: "#f2f2f4",
                        borderRadius: 2,
                        pointerEvents: 'auto',
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                            height: 36,
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": { border: "none" },
                        },
                        "& .MuiInputBase-input": {
                            fontSize: 14,
                            color: "black",
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: 18, color: "#5f6470" }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* ============================
                📦 สรุปสถานะปัญหาตามประเภท
               ============================ */}
            <Box
                sx={{
                    width: '300px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)', // สองคอลัมน์
                    gap: 1,
                    pt: 2,
                }}
            >
                {issueData.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 0.5,
                        }}
                    >
                        {/* แถบสีสถานะทางซ้าย */}
                        <Box
                            sx={{
                                width: 6,
                                height: '100%',
                                borderRadius: 2,
                                backgroundColor: item.color,
                            }}
                        />

                        {/* การ์ดข้อมูลแต่ละสถานะ */}
                        <Paper
                            sx={{
                                flex: 1,
                                minHeight: 50,
                                borderRadius: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: 0.2,
                                justifyContent: 'flex-start',
                                p: 1,
                                bgcolor: 'rgba(0,0,0,0.3)', // โปร่งแสงบนแผนที่
                                color: '#ffffff',
                                borderTop: '0.1px solid white',
                                borderBottom: '0.1px solid white',
                                wordBreak: 'break-word',
                            }}
                        >
                            <Typography sx={{ fontSize: 12 }}>{item.type}</Typography>
                            <Typography sx={{ fontSize: 12 }}>{`${item.issue} (${item.percent}%)`}</Typography>
                        </Paper>
                    </Box>
                ))}
            </Box>

            {/* ============================
                📊 ส่วนกราฟและ legend ปัญหา
               ============================ */}
            <Box
                sx={{
                    width: '300px',
                    height: 'auto',
                    borderTop: '1px solid white',
                    borderBottom: '1px solid white',
                    borderRadius: 4,
                    mt: 1,
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    color: 'white',
                }}
            >
                {/* หัวข้อ */}
                <Typography sx={{ color: '#ffffff', fontSize: 12 }}>
                    ประเภทปัญหาที่ขอความช่วยเหลือ
                </Typography>

                {/* วางกราฟ Pie chart ตรงกลาง */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                    <ProblemChart />
                </Box>

                {/* Legend สีของประเภทปัญหา */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        color: '#ffffff',
                        mt: 1,
                    }}
                >
                    {cardsDataOverview.map((items, index) => (
                        <Box
                            key={items.id || index}
                            sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.7 }}
                        >
                            {/* จุดสีประจำประเภท */}
                            <Box
                                sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    border: '1px solid #ffffff',
                                    bgcolor: colorCode[index % colorCode.length].color,
                                }}
                            />
                            {/* ชื่อประเภท */}
                            <Typography
                                key={items.id}
                                sx={{
                                    color: 'white',
                                    fontSize: 12,
                                    lineHeight: '6px',
                                    m: 0,
                                }}
                            >
                                {items.issue}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default ComplaintOverview;
