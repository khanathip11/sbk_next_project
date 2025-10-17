// import { Paper, Typography, Box } from '@mui/material'
// import React from 'react'
// import { issuesData } from '@/app/data/issuesData'

// const satisfactionLevels = [
//     { label: "ความพึงพอใจเฉลี่ย", color: "#0068CB" },
//     { label: "ยอดเยี่ยม", color: "#2ECC71" },
//     { label: "ดี", color: "#27AE60" },
//     { label: "พอใช้", color: "#F1C40F" },
//     { label: "ต้องปรับปรุง", color: "#E67E22" },
//     { label: "ต้องปรับปรุงมาก", color: "#E74C3C" },
// ]

// // 🧮 คะแนนแต่ละระดับ
// const satisfactionScoreMap: Record<string, number> = {
//     "ยอดเยี่ยม": 5,
//     "ดี": 4,
//     "พอใช้": 3,
//     "ต้องปรับปรุง": 2,
//     "ต้องปรับปรุงมาก": 1,
// }

// // ตัวอย่างข้อมูลจาก issuesData
// // const issuesData = [
// //     { id: "1", satisfactionLevel: "ยอดเยี่ยม" },
// //     { id: "2", satisfactionLevel: "ดี" },
// //     { id: "3", satisfactionLevel: "ดี" },
// //     { id: "4", satisfactionLevel: "พอใช้" },
// //     { id: "5", satisfactionLevel: "ต้องปรับปรุง" },
// //     { id: "6", satisfactionLevel: "ยอดเยี่ยม" },
// // ]


// const FeedbackIssueSummarySection = () => {
//     // ✅ คำนวณคะแนนเฉลี่ยรวม
//     const validIssues = issuesData.filter(
//         i => i.satisfactionLevel && satisfactionScoreMap[i.satisfactionLevel]
//     )

//     const totalItems = validIssues.length
//     const totalScore = validIssues.reduce(
//         (sum, item) => sum + (satisfactionScoreMap[item.satisfactionLevel!] || 0),
//         0
//     )
//     const avgScore = totalItems > 0 ? (totalScore / totalItems).toFixed(2) : "0.00"

//     // ✅ คำนวณจำนวนต่อระดับ
//     const satisfactionCount = satisfactionLevels.map(level => {
//         if (level.label === "ความพึงพอใจเฉลี่ย") {
//             return { ...level, count: avgScore } // แทน count ด้วยคะแนนเฉลี่ย
//         }
//         const count = validIssues.filter(
//             item => item.satisfactionLevel === level.label
//         ).length
//         return { ...level, count }
//     })

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 gap: 2,
//             }}
//         >
//             {satisfactionCount.map(item => (
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
//                             {item.label === "ความพึงพอใจเฉลี่ย" ? item.count : item.count}
//                         </Typography>
//                         <Typography sx={{ fontSize: 13, color: "#555" }}>
//                             {item.label === "ความพึงพอใจเฉลี่ย" ? "คะแนน" : "รายการ"}
//                         </Typography>
//                     </Box>
//                 </Paper>
//             ))}
//         </Box>
//     )
// }

// export default FeedbackIssueSummarySection
import { Paper, Typography, Box } from '@mui/material'
import React, { useState, useMemo, useEffect } from 'react'
import { issuesData } from '@/app/data/issuesData'

const satisfactionLevels = [
    { label: "ความพึงพอใจเฉลี่ย", color: "#0068CB" },
    { label: "ยอดเยี่ยม", color: "#2ECC71" },
    { label: "ดี", color: "#27AE60" },
    { label: "พอใช้", color: "#F1C40F" },
    { label: "ต้องปรับปรุง", color: "#E67E22" },
    { label: "ต้องปรับปรุงมาก", color: "#E74C3C" },
]

const satisfactionScoreMap: Record<string, number> = {
    "ยอดเยี่ยม": 5,
    "ดี": 4,
    "พอใช้": 3,
    "ต้องปรับปรุง": 2,
    "ต้องปรับปรุงมาก": 1,
}

interface FeedbackIssueSummarySectionProps {
    onFilterChange: (filtered: typeof issuesData, level: string | null) => void
}

const FeedbackIssueSummarySection: React.FC<FeedbackIssueSummarySectionProps> = ({
    onFilterChange,
}) => {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

    // ✅ Filter ข้อมูลตามระดับที่เลือก
    const filteredIssues = useMemo(() => {
        if (!selectedLevel || selectedLevel === "ความพึงพอใจเฉลี่ย") {
            return issuesData
        }
        return issuesData.filter((i) => i.satisfactionLevel === selectedLevel)
    }, [selectedLevel])

    // ✅ คำนวณคะแนนเฉลี่ยของข้อมูลที่ถูก filter
    const validIssues = filteredIssues.filter(
        (i) => i.satisfactionLevel && satisfactionScoreMap[i.satisfactionLevel]
    )
    const totalItems = validIssues.length
    const totalScore = validIssues.reduce(
        (sum, item) =>
            sum + (satisfactionScoreMap[item.satisfactionLevel!] || 0),
        0
    )
    const avgScore =
        totalItems > 0 ? (totalScore / totalItems).toFixed(2) : "0.00"

    // ✅ จำนวนแต่ละระดับ (รวมเฉลี่ยจากข้อมูลที่ filter แล้ว)
    const satisfactionCount = satisfactionLevels.map((level) => {
        if (level.label === "ความพึงพอใจเฉลี่ย") {
            return { ...level, count: avgScore }
        }
        const count = issuesData.filter(
            (item) => item.satisfactionLevel === level.label
        ).length
        return { ...level, count }
    })

    // ✅ แจ้งข้อมูลให้ parent
    useEffect(() => {
        onFilterChange(filteredIssues, selectedLevel)
    }, [filteredIssues, selectedLevel, onFilterChange])

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {satisfactionCount.map((item) => {
                const isSelected = selectedLevel === item.label
                const isAverage = item.label === "ความพึงพอใจเฉลี่ย"

                // ✅ Logic สีพื้นหลัง
                const showActiveBg =
                    isAverage || isSelected // กล่อง "เฉลี่ย" + กล่องที่เลือก
                const bgColor = showActiveBg ? item.color : "#E6E6E6"

                return (
                    <Paper
                        key={item.label}
                        elevation={0}
                        onClick={() => {
                            // ✅ คลิกเฉลี่ย = แสดงทั้งหมด
                            if (isAverage) {
                                setSelectedLevel(null)
                            } else {
                                setSelectedLevel(prev =>
                                    prev === item.label ? null : item.label
                                )
                            }
                        }}
                        sx={{
                            cursor: 'pointer',
                            display: "flex",
                            flexDirection: "column",
                            position: "relative",
                            minHeight: 90,
                            width: 180,
                            border: "1px solid #D1D5DB",
                            borderRadius: 3,
                            overflow: "hidden",
                            transition: "0.2s",
                            backgroundColor: "#F2F2F2",
                            "&:hover": {
                                backgroundColor: "#E8EBEF",
                            },
                        }}
                    >
                        {/* 🔹 ส่วนหัวกล่อง */}
                        <Box
                            sx={{
                                borderBottom: "1px solid #D1D5DB",
                                py: 0.8,
                                px: 1.5,
                                width: "100%",
                                backgroundColor: bgColor, // ใช้สีตาม logic ด้านบน
                            }}
                        >
                            <Typography sx={{ fontSize: 13, color: "#fff" }}>
                                {item.label}
                            </Typography>
                        </Box>

                        {/* 🔹 เนื้อหาภายในกล่อง */}
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
                                {item.count}
                            </Typography>
                            <Typography sx={{ fontSize: 13, color: "#555" }}>
                                {isAverage ? "คะแนน" : "รายการ"}
                            </Typography>
                        </Box>
                    </Paper>
                )
            })}
        </Box>
    )
}

export default FeedbackIssueSummarySection
