import React from 'react'
import { Box, Button } from '@mui/material'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ComplaintOverview from './ComplaintOverview';

const ComplaintMap = () => {
    return (
        <Box
            sx={{
                bgcolor: '#000000',
                width: '100%',
                height: '100%',
                borderRadius: 4,
                position: 'relative'
            }}>
            <Box
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    border: '1px solid red',
                    width: '35%',
                    minHeight: "40%",  // ค่าต่ำสุด
                    maxHeight: "80%",
                    // overflow: 'scroll'
                }}>
                <ComplaintOverview />
            </Box>
            <Box>
                <Button variant="contained"
                    sx={{
                        width: '30%',
                        height: '5%',
                        position: 'absolute',
                        bottom: 10, left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: "red",
                        fontSize: 12,
                        gap: 1,
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: '#FA4D4D'
                        }
                    }}>
                    <ReportProblemIcon sx={{ fontSize: 18 }} />
                    แจ้งเตือนเหตุการณ์ฉุกเฉิน
                </Button>
            </Box>
        </Box >
    )
}

export default ComplaintMap