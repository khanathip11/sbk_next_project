import React, { useState } from 'react'
import { Paper, Box, } from "@mui/material";
import BaseTable from '../common/BaseTable';
import { IssueItem } from '@/app/types/IssueItem';
import { feedbackIssueColumns } from './Feedback-issue-columns';
import { getTypeStyled } from '@/app/utils/getTypeStyled';
import { issuesData } from '@/app/data/issuesData';
import FeedbackIssueInfo from './Feedback-issue-info';
interface FeedbackIssueTableChildProps {
    issues: IssueItem[];
    role?: string;
    organizationUnit?: string;
}

// const columns = feedbackIssueColumns()

const FeedbackIssueTableChild: React.FC<FeedbackIssueTableChildProps> = ({ issues, role, organizationUnit }) => {
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<IssueItem | null>(null);

    const handleOpenModal = (issue: IssueItem) => {
        setSelectedRow(issue);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedRow(null);
    };

    const columns = feedbackIssueColumns({
        handleEdit: handleOpenModal,
        handleView: handleCloseModal,
        role,
        organizationUnit
    });

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

                <FeedbackIssueInfo
                    getTypeStyle={getTypeStyled}
                    open={open}
                    selectedRow={selectedRow}
                    handleClose={handleCloseModal}
                    issuesData={issuesData}
                />
            </Box>
        </Paper>
    )
}

export default FeedbackIssueTableChild