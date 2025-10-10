import React from 'react'
import NavigatLayout from '../components/layout/NavigatLayout'
import { Box } from '@mui/system'
import CategoryTable from '../components/Category/CategoryTable'

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