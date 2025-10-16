import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { issuesData } from '@/app/data/issuesData'

interface IssueSummarySectionProps {
    selectedLevel: string | null;
    selectedCenter: string | null;
    onSelectFilter: (level: string | null, center: string | null) => void;
    role?: string;
    organizationUnit?: string;
}

interface SummaryItem {
    label: string
    value: number
    color: string
    level: string | null
    center: string | null
}



const IssueSummarySection: React.FC<IssueSummarySectionProps> = ({ selectedLevel, selectedCenter, onSelectFilter, role = "operator", organizationUnit = "" }) => {
    // ✅ กำหนด label ของ Box 4 ตาม role
    const lastBoxLabel =
        role?.includes("operator-view-update") || organizationUnit === "จังหวัด"
            ? "กำลังดำเนินการ"
            : "รอเปลี่ยนศูนย์";


    const summaryItems: SummaryItem[] = [
        { label: "ปัญหาทั้งหมด", value: issuesData.length, color: "#0068CB", level: null, center: null },
        { label: "ปัญหาทั่วไป", value: issuesData.filter((issue) => issue.level === "ทั่วไป").length, color: "#0068CB", level: "ทั่วไป", center: null },
        { label: "ปัญหาเร่งด่วน", value: issuesData.filter((issue) => issue.level === "เร่งด่วน").length, color: "#E92020", level: "เร่งด่วน", center: null },
    ];

    if (
        role !== "operator-view" &&
        role !== "operator-view-approve"
    ) {
        summaryItems.push({
            label: lastBoxLabel,
            value: issuesData.filter((issue) => issue.center === "").length,
            color: organizationUnit ? "#000" : "#FCBF04",
            level: null,
            center: "",
        });
    }

    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            {summaryItems.map((item) => (
                <Paper
                    key={item.label}
                    elevation={0}
                    onClick={() => onSelectFilter(
                        selectedLevel === item.level && selectedCenter === item.center ? null : item.level,
                        selectedLevel === item.level && selectedCenter === item.center ? null : item.center
                    )}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 1,
                        position: "relative",
                        minHeight: 80,
                        minWidth: 150,
                        border:
                            selectedLevel === item.level && selectedCenter === item.center
                                ? "2px solid #D1D5DB"
                                : "1px solid #D1D5DB",
                        backgroundColor:
                            selectedLevel === item.level && selectedCenter === item.center
                                ? "#F2F2F2" // ✅ สีพื้นหลังเมื่อถูกเลือก (ฟ้าอ่อน)
                                : "#FFFFFF", // ✅ สีปกติ
                        borderRadius: 3,
                        cursor: "pointer",
                        transition: "0.2s",
                        "&:hover": { backgroundColor: "#E8EBEF" },
                    }}>
                    <Typography sx={{ fontSize: 13 }}>{item.label}</Typography>
                    <Box sx={{ position: 'absolute', bottom: 0, right: 0, p: 1, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                        <Typography sx={{ position: 'absolute', right: 40, bottom: 1, fontSize: 25, color: item.color, fontWeight: 500 }}>
                            {item.value}
                        </Typography>
                        <Typography sx={{ color: "#5B616D", fontSize: 10 }}> ปัญหา </Typography>
                    </Box>
                </Paper>
            ))}
        </Box>
    )
}

export default IssueSummarySection