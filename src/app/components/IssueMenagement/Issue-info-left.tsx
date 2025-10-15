import { IconButton, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import { MediaItem } from '../common/MediaSlider';
import { IssueItem } from '@/app/types/IssueItem';
import MediaSlider from '../common/MediaSlider';
import MapboxMapComponent, { Network } from '../Mapbox';

interface IssueInfoLeftProps {
    issuesData: IssueItem[];
    selectedRow: IssueItem | null;
}

const IssueInfoLeft: React.FC<IssueInfoLeftProps> = ({ issuesData, selectedRow }) => {
    const [collapse, setCollapse] = useState<boolean>(true);
    const [closeTask, SetCloseTask] = useState<boolean>(false);
    const [issue, setIssue] = useState<Network[]>([
        {
            id: 1,
            name: "string",
            lat: 13.9063539,
            lng: 100.5396905,
        }
    ])
    // ✅ ใช้ id ซึ่งมีอยู่ใน IssueItem
    const selectedIssue = issuesData.find((item) => item.id === selectedRow?.id);
    // ✅ IssueInfo.tsx
    const mediaItems: MediaItem[] = [
        ...(selectedRow?.img ? selectedRow.img.map((src) => ({ type: 'image' as const, src })) : []),
        ...(selectedRow?.video ? selectedRow.video.map((src) => ({ type: 'video' as const, src })) : []),
        ...(selectedRow?.qrCode ? [{ type: 'qrcode' as const, src: selectedRow.qrCode }] : []),
    ];

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, color: '#000' }}>
                <Typography>ข้อมูลปัญหา</Typography>
            </Box>
            <Box
                sx={{
                    color: "#000",
                    width: "100%",
                    height: "600px",
                    border: "1px solid #F0F0F0",
                    borderRadius: 4,
                    backgroundColor: "#F7F7F7",
                    p: 2,
                    overflowY: "auto",
                    scrollbarWidth: "none",   // Firefox
                    msOverflowStyle: "none",  // IE, Edge
                    "&::-webkit-scrollbar": {
                        display: "none",        // Chrome, Safari, Opera
                    },
                }}
            >
                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <VpnKeyOutlinedIcon sx={{ fontSize: 18, mr: 0.8 }} />
                        <Typography variant="subtitle1" sx={{ color: '#0A0C11', fontSize: 13 }}>
                            หมายเลขอ้างอิง
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Typography sx={{ pl: 4, color: '#5B616D', fontSize: 13 }}>{selectedIssue?.id}</Typography>
                        <Tooltip title="Copy">
                            <IconButton
                                size="small"
                                sx={{
                                    border: '1px solid #DEDEDE',
                                    borderRadius: 2,
                                    color: '#5B616D',
                                    p: 0.5,
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                        color: '#000',
                                    },
                                }}
                            >
                                <ContentCopyIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <RecordVoiceOverOutlinedIcon sx={{ fontSize: 18, mr: 0.8 }} />
                        <Typography variant="subtitle1" sx={{ color: '#0A0C11', fontSize: 13 }}>
                            ผู้แจ้ง
                        </Typography>
                    </Box>
                    <Typography sx={{ pl: 4, color: '#5B616D', fontSize: 13 }}>{selectedIssue?.reporter}</Typography>

                </Box>

                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <FmdGoodOutlinedIcon sx={{ fontSize: 18, mr: 0.8 }} />
                        <Typography variant="subtitle1" sx={{ color: '#0A0C11', fontSize: 13 }}>
                            สถานที่
                        </Typography>
                    </Box>
                    <Typography sx={{ pl: 4, color: '#5B616D', fontSize: 13 }}>{selectedIssue?.location}</Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <ScheduleIcon sx={{ fontSize: 18, mr: 0.8 }} />
                        <Typography variant="subtitle1" sx={{ color: '#0A0C11', fontSize: 13 }}>
                            วันและเวลา
                        </Typography>
                    </Box>
                    <Typography sx={{ pl: 4, color: '#5B616D', fontSize: 13 }}>{selectedIssue?.date}</Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <DescriptionOutlinedIcon sx={{ fontSize: 18, mr: 0.8 }} />
                        <Typography variant="subtitle1" sx={{ color: '#0A0C11', fontSize: 13 }}>
                            รายละเอียด
                        </Typography>
                    </Box>
                    <Typography sx={{ pl: 4, color: '#5B616D', fontSize: 13 }}>{selectedIssue?.problem}</Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                        <PhotoLibraryOutlinedIcon sx={{ fontSize: 18, mr: 0.8 }} />
                        <Typography variant="subtitle1" sx={{ color: '#0A0C11', fontSize: 13 }}>
                            รูปภาพและวิดีโอ
                        </Typography>
                    </Box>
                    <MediaSlider media={mediaItems} />
                </Box>

                <Box sx={{ mb: 1, display: 'flex', flexDirection: 'column', gap: 1, }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <MapOutlinedIcon sx={{ fontSize: 18, mr: 0.8 }} />
                        <Typography variant="subtitle1" sx={{ color: '#0A0C11', fontSize: 13 }}>
                            แผนที่
                        </Typography>
                    </Box>
                    <Box sx={{ width: 'auto', height: '200px', border: '1px solid #D1D5DB', borderRadius: 3, ml: 3, overflow: 'hidden' }}>
                        <MapboxMapComponent networks={issue} collapse={collapse} closeTask={closeTask} />
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default IssueInfoLeft