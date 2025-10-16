import React from 'react'
import { Paper, Box, } from "@mui/material";
import BaseTable from '../common/BaseTable';
import { IssueItem } from '@/app/types/IssueItem';
import { feedbackColumns } from './Feedback-columns';

interface FeedbackTableChildProps {
    issues: IssueItem[];
    role?: string;
    organizationUnit?: string;
}

const columns = feedbackColumns()

const FeedbackTableChild: React.FC<FeedbackTableChildProps> = ({ issues, role, organizationUnit }) => {
    return (
        <Paper
            // elevation={2}
            sx={{
                flex: 1,
                borderRadius: 4,
                overflow: "hidden", // ไม่ให้ Paper ขยายเกินขอบ
            }}
        >
            {/* ✅ Container สำหรับ scroll แนวนอน */}
            <Box
                sx={{
                    width: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                    "&::-webkit-scrollbar": { display: "none" }, // ซ่อน scrollbar บน Chrome/Safari
                    scrollbarWidth: "none", // ซ่อน scrollbar บน Firefox
                }}
            >
                <BaseTable
                    columns={columns}
                    rows={issues}
                    loading={false}
                    rowsPerPageOptions={[10, 25, 100]}
                />
            </Box>
        </Paper>
    )
}

export default FeedbackTableChild