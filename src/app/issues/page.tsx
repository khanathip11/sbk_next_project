import React from 'react'
import IssueTable from '../components/IssueMenagement/IssueTable'
import NavigatLayout from '../components/layout/NavigatLayout'
import { Box, Typography } from '@mui/material'

const Issues = () => {
    return (
        <NavigatLayout>
            <Box sx={{ width: '100%', height: '100vh', }}>
                <IssueTable />
            </Box>
        </NavigatLayout>
    )
}

export default Issues