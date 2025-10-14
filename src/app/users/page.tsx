import React from 'react'
import NavigatLayout from '../components/layout/NavigatLayout'
import { Box } from '@mui/system'
import UserTable from '../components/UserManagement/UserTable'

const UserManagement = () => {
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
                <UserTable />
            </Box>
        </NavigatLayout>
    )
}

export default UserManagement