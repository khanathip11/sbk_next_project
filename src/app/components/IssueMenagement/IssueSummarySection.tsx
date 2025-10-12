import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { issuesData } from '@/app/data/issuesData'

interface IssueSummarySectionProps {
    selectedLevel: string | null;
    onSelectLevel: (level: string | null) => void;
}

const IssueSummarySection: React.FC<IssueSummarySectionProps> = ({ selectedLevel, onSelectLevel }) => {
    const summaryItems = [
        { label: "ปัญหาทั้งหมด", value: issuesData.length, color: "#0068CB", level: null },
        { label: "ปัญหาทั่วไป", value: issuesData.filter((issue) => issue.level === "ทั่วไป").length, color: "#0068CB", level: "ทั่วไป" },
        { label: "ปัญหาเร่งด่วน", value: issuesData.filter((issue) => issue.level === "เร่งด่วน").length, color: "#E92020", level: "เร่งด่วน" },
    ]

    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            {summaryItems.map((item) => (
                <Paper
                    key={item.label}
                    elevation={0}
                    onClick={() => onSelectLevel(selectedLevel === item.level ? null : item.level)}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: 1,
                        position: "relative",
                        minHeight: 80,
                        minWidth: 150,
                        border: selectedLevel === item.level ? "2px solid #1976d2" : "1px solid #D1D5DB",
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