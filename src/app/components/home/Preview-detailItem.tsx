import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { ReactNode } from 'react'

interface PreviewDetailItemProps {
    icon: ReactNode;
    label: string;
    value?: string;
}

const PreviewDetailItem: React.FC<PreviewDetailItemProps> = ({ icon, label, value }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
                {icon}
                <Typography fontSize={12} color="#000000">{label}</Typography>
            </Box>
            <Typography
                fontSize={12}
                color="text.secondary"
                sx={{ mb: 2, ml: `24px`, fontSize: 12 }}
            >
                {value || "-"}
            </Typography>
        </Box>
    )
}

export default PreviewDetailItem