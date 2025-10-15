import React from 'react'
import NavigatLayout from '../components/layout/Navigat-layout'
import { Box } from '@mui/system'
import CategoryTable from '../components/Category/Category-table'

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
                <CategoryTable />
            </Box>
        </NavigatLayout>
    )
}

export default page