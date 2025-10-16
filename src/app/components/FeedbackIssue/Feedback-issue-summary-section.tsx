// import { Paper, Typography } from '@mui/material'
// import { Box } from '@mui/system'
// import React from 'react'

// const satisfactionLevels = [
//     { label: "ความพึงพอใจเฉลี่ย", color: "#0068CB" },
//     { label: "ยอดเยี่ยม", color: "#2ECC71" },
//     { label: "ดี", color: "#27AE60" },
//     { label: "พอใช้", color: "#F1C40F" },
//     { label: "ต้องปรับปรุง", color: "#E67E22" },
//     { label: "ต้องปรับปรุงมาก", color: "#E74C3C" },
// ];

// // ตัวอย่างข้อมูลจาก issuesData
// // (ใช้ข้อมูลจริงของคุณแทนได้เลย)
// const issuesData = [
//     { id: "1", satisfactionLevel: "ความพึงพอใจเฉลี่ย" },
//     { id: "2", satisfactionLevel: "ยอดเยี่ยม" },
//     { id: "3", satisfactionLevel: "ดี" },
//     { id: "4", satisfactionLevel: "ดี" },
//     { id: "5", satisfactionLevel: "พอใช้" },
//     { id: "6", satisfactionLevel: "ต้องปรับปรุง" },
//     { id: "7", satisfactionLevel: "ยอดเยี่ยม" },
// ];

// const satisfactionCount = satisfactionLevels.map((level) => ({
//     ...level,
//     count: issuesData.filter((item) => item.satisfactionLevel === level.label).length,
// }));

// const FeedbackIssueSummarySection = () => {
//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexWrap: 'wrap', // ✅ ให้ขึ้นบรรทัดใหม่อัตโนมัติเมื่อเต็มแถว
//                 gap: 2, // ✅ ช่องว่างระหว่างกล่อง
//             }}
//         >
//             {satisfactionCount.map((item) => (
//                 <Paper
//                     key={item.label}
//                     elevation={0}
//                     sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         position: "relative",
//                         minHeight: 90,
//                         width: 180,
//                         border: "1px solid #D1D5DB",
//                         backgroundColor: "#F2F2F2",
//                         borderRadius: 3,
//                         cursor: "pointer",
//                         overflow: "hidden",
//                         transition: "0.2s",
//                         "&:hover": { backgroundColor: "#E8EBEF" },
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             borderBottom: "1px solid #D1D5DB",
//                             py: 0.8,
//                             px: 1.5,
//                             width: "100%",
//                             backgroundColor: item.color,
//                         }}
//                     >
//                         <Typography sx={{ fontSize: 13, color: "#fff" }}>
//                             {item.label}
//                         </Typography>
//                     </Box>

//                     <Box
//                         sx={{
//                             p: 0,
//                             px: 2.5,
//                             display: "flex",
//                             alignItems: "flex-end",
//                             gap: 1,
//                             justifyContent: "space-between",
//                         }}
//                     >
//                         <Typography sx={{ fontSize: 36, fontWeight: 500 }}>
//                             {item.count}
//                         </Typography>
//                         <Typography sx={{ fontSize: 13, color: "#555" }}>รายการ</Typography>
//                     </Box>
//                 </Paper>
//             ))}
//         </Box>
//     )
// }

// export default FeedbackIssueSummarySection

import { Paper, Typography, Box } from '@mui/material'
import React from 'react'

const satisfactionLevels = [
    { label: "ความพึงพอใจเฉลี่ย", color: "#0068CB" },
    { label: "ยอดเยี่ยม", color: "#2ECC71" },
    { label: "ดี", color: "#27AE60" },
    { label: "พอใช้", color: "#F1C40F" },
    { label: "ต้องปรับปรุง", color: "#E67E22" },
    { label: "ต้องปรับปรุงมาก", color: "#E74C3C" },
]

// 🧮 คะแนนแต่ละระดับ
const satisfactionScoreMap: Record<string, number> = {
    "ยอดเยี่ยม": 5,
    "ดี": 4,
    "พอใช้": 3,
    "ต้องปรับปรุง": 2,
    "ต้องปรับปรุงมาก": 1,
}

// ตัวอย่างข้อมูลจาก issuesData
const issuesData = [
    { id: "1", satisfactionLevel: "ยอดเยี่ยม" },
    { id: "2", satisfactionLevel: "ดี" },
    { id: "3", satisfactionLevel: "ดี" },
    { id: "4", satisfactionLevel: "พอใช้" },
    { id: "5", satisfactionLevel: "ต้องปรับปรุง" },
    { id: "6", satisfactionLevel: "ยอดเยี่ยม" },
]

const FeedbackIssueSummarySection = () => {
    // ✅ คำนวณคะแนนเฉลี่ยรวม
    const validIssues = issuesData.filter(
        i => i.satisfactionLevel && satisfactionScoreMap[i.satisfactionLevel]
    )

    const totalItems = validIssues.length
    const totalScore = validIssues.reduce(
        (sum, item) => sum + (satisfactionScoreMap[item.satisfactionLevel!] || 0),
        0
    )
    const avgScore = totalItems > 0 ? (totalScore / totalItems).toFixed(2) : "0.00"

    // ✅ คำนวณจำนวนต่อระดับ
    const satisfactionCount = satisfactionLevels.map(level => {
        if (level.label === "ความพึงพอใจเฉลี่ย") {
            return { ...level, count: avgScore } // แทน count ด้วยคะแนนเฉลี่ย
        }
        const count = validIssues.filter(
            item => item.satisfactionLevel === level.label
        ).length
        return { ...level, count }
    })

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
            }}
        >
            {satisfactionCount.map(item => (
                <Paper
                    key={item.label}
                    elevation={0}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        minHeight: 90,
                        width: 180,
                        border: "1px solid #D1D5DB",
                        backgroundColor: "#F2F2F2",
                        borderRadius: 3,
                        overflow: "hidden",
                        transition: "0.2s",
                        "&:hover": { backgroundColor: "#E8EBEF" },
                    }}
                >
                    <Box
                        sx={{
                            borderBottom: "1px solid #D1D5DB",
                            py: 0.8,
                            px: 1.5,
                            width: "100%",
                            backgroundColor: item.color,
                        }}
                    >
                        <Typography sx={{ fontSize: 13, color: "#fff" }}>
                            {item.label}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            p: 0,
                            px: 2.5,
                            display: "flex",
                            alignItems: "flex-end",
                            gap: 1,
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography sx={{ fontSize: 36, fontWeight: 500 }}>
                            {item.label === "ความพึงพอใจเฉลี่ย" ? item.count : item.count}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: "#555" }}>
                            {item.label === "ความพึงพอใจเฉลี่ย" ? "คะแนน" : "รายการ"}
                        </Typography>
                    </Box>
                </Paper>
            ))}
        </Box>
    )
}

export default FeedbackIssueSummarySection
