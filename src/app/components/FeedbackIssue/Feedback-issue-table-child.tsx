import React from 'react'
import { Paper, Box, } from "@mui/material";
import BaseTable from '../common/BaseTable';
import { IssueItem } from '@/app/types/IssueItem';
import { feedbackIssueColumns } from './Feedback-issue-columns';

interface FeedbackIssueTableChildProps {
    issues: IssueItem[];
    role?: string;
    organizationUnit?: string;
}

const columns = feedbackIssueColumns()

const FeedbackIssueTableChild: React.FC<FeedbackIssueTableChildProps> = ({ issues, role, organizationUnit }) => {
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

export default FeedbackIssueTableChild