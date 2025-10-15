import { Avatar, Button, Card, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import notification from '../../assets/noti.jpg'
import profileEmer from '../../../../public/cartoon.jpg'
interface EmergencyNotifierRightProps {
    handleClose: () => void;
    previewData: { title: string; detail: string; location: string; } | null;
}

const EmergencyNotifierRight: React.FC<EmergencyNotifierRightProps> = ({ handleClose, previewData }) => {
    return (
        <Box sx={{ width: '80%', height: '500px', p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography sx={{ mb: 1 }}>ดูตัวอย่าง</Typography>
            <Box sx={{ borderRadius: 4, width: '90%', height: '85%', border: '1px solid #D4D0D2', backgroundColor: '#305F99' }}>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: 'flex',
                        gap: 1,
                        p: 4,
                        pl: 2
                    }}
                >
                    <Avatar sx={{ width: 24, height: 24 }} />
                    <Card sx={{ width: 180, minHeight: 300, maxHeight: 'auto', backgroundColor: 'white', borderRadius: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
                            <CardMedia
                                component="img"
                                image={notification.src}
                                alt="Thailand"
                                sx={{
                                    width: '100%',
                                    height: '100px',
                                    objectFit: 'cover',
                                }}
                            />

                            <Box sx={{ px: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>

                                <Typography sx={{ fontSize: 10 }}>
                                    <ReportProblemIcon sx={{ fontSize: 10 }} />
                                    {previewData?.title || 'ดูข้อมูลเพิ่มเติม'}
                                </Typography>

                                <Typography sx={{ fontSize: 8, color: '#7D7878' }}>
                                    {previewData?.detail || 'ดูข้อมูลเพิ่มเติม'}
                                </Typography>

                                <Typography sx={{ fontSize: 8, color: '#7D7878' }}>
                                    <LocationOnIcon sx={{ fontSize: 10 }} />
                                    {previewData?.location
                                        ? previewData.location.length > 200
                                            ? previewData.location.slice(0, 200) + "..."
                                            : previewData.location
                                        : "ดูข้อมูลเพิ่มเติม"
                                    }
                                </Typography>

                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto' }}>
                                <Button
                                    variant="contained"
                                    sx={{ width: 100, height: 24, fontSize: 8, color: '#ffffff', borderRadius: 2, mb: 1 }}
                                >
                                    {'ตรวจสอบพื้นที่'}
                                </Button>
                            </Box>

                        </Box>
                    </Card>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Typography fontSize={8}>Datetime</Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 1,
                    px: 2.5,
                    pt: 1,
                }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#ffffff',
                        color: '#000000',
                        borderRadius: 3
                    }}
                    onClick={handleClose}
                >
                    <CloseIcon sx={{ fontSize: 16, mr: 1 }} />
                    ปิด
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        color: '#ffffff',
                        borderRadius: 3
                    }}
                >
                    <SendIcon sx={{ fontSize: 16, mr: 1 }} />
                    ส่งแจ้งเตือน
                </Button>
            </Box>
        </Box>
    )
}

export default EmergencyNotifierRight