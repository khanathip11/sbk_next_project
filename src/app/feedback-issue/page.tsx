import React from 'react'
import NavigatLayout from '../components/layout/Navigat-layout'
import { Box } from '@mui/system'
import FeedbackIssueTable from '../components/FeedbackIssue/Feedback-issue-table'

const page = () => {
    return (
        <NavigatLayout>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden", // ✅ ป้องกันการล้น container
                    boxSizing: "border-box",
                }}
            >
                <FeedbackIssueTable />
            </Box>
        </NavigatLayout>
    )
}

export default page