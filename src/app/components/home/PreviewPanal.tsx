import { Box, Card, CardMedia, Typography } from '@mui/material';
import React, { useState } from 'react'
import { formatThaiDateTime } from '@/app/utils/formatThaiDateTime';
import { StaticImageData } from "next/image";
import SpokeOutlinedIcon from '@mui/icons-material/SpokeOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Collapse } from '@mui/material';

export interface CardItem {
    id: number;
    issue: string;
    count: string;
    status: string;
    imageSrc: string | StaticImageData;
    bgColor: string;
    color: string;
    title: string;
    desc: string;
    refNumber: string;
    reporter: string;
    location: string;
    dateTime: string;
}

interface PreviewPanalProps {
    card: CardItem;
    onBack: () => void;
}

const PreviewPanal: React.FC<PreviewPanalProps> = ({ card, onBack }) => {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    return (
        <Box sx={{ width: "100%", height: "100vh", m: 0, p: 0, position: 'relative' }}>
            {card.imageSrc && (
                <>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <CloseOutlinedIcon
                            onClick={onBack}
                            sx={{
                                fontSize: 18,
                                color: 'text.secondary',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>


                    <CardMedia
                        component="img"
                        image={typeof card.imageSrc === "string" ? card.imageSrc : card.imageSrc.src}
                        alt="Preview"
                        sx={{ width: "100%", height: "auto", objectFit: "cover", p: 0, }}
                    />

                </>

            )}
            <Card sx={{ borderRadius: 4, backgroundColor: '#ffffff', width: '100%', height: '100%', p: 1, position: 'absolute', top: '38%' }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'column', mb: 2 }}>
                    <Typography variant="h6" sx={{ textAlign: 'center', my: 1, fontSize: 14 }}>{card.title}</Typography>
                    <Typography fontSize={12} sx={{ bgcolor: card.bgColor, px: 1, mb: 2, borderRadius: 1, color: card.color }}>{card.status}</Typography>
                    <hr style={{ width: '100%', color: '#EDEDED' }} />
                </Box>
                <Box sx={{ p: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <SpokeOutlinedIcon sx={{ fontSize: 16 }} />
                                <Typography sx={{ mb: 0, fontSize: 12 }}>ผลการติดตาม</Typography>
                            </Box>
                            <Typography color="text.secondary" sx={{ ml: `24px`, fontSize: 12 }}>
                                สามารถดูผลการดำเนินงานได้ที่นี่
                            </Typography>
                        </Box>
                        {!openDropdown ? (
                            <KeyboardArrowDownIcon
                                onClick={() => setOpenDropdown(true)}
                                sx={{ fontSize: 16, cursor: 'pointer' }}
                            />
                        ) : (
                            <KeyboardArrowUpIcon
                                onClick={() => setOpenDropdown(false)}
                                sx={{ fontSize: 16, cursor: 'pointer' }}
                            />
                        )}
                    </Box>

                    <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                        <Box sx={{ pl: '24px' }}>Banana is Fruit 🍌</Box>
                    </Collapse>
                    <Box sx={{ mt: 1, pl: '24px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <VpnKeyOutlinedIcon sx={{ fontSize: 16 }} />
                                <Typography fontSize={12} color="#000000">หมายเลขอ้างอิง</Typography>
                            </Box>
                            <Typography fontSize={12} color="text.secondary" sx={{ mb: 2, ml: `24px`, fontSize: 12 }}>{card.refNumber}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <RecordVoiceOverOutlinedIcon sx={{ fontSize: 16 }} />
                                <Typography fontSize={12} color="#000000">ผู้แจ้ง</Typography>
                            </Box>
                            <Typography fontSize={12} color="text.secondary" sx={{ mb: 2, ml: `24px`, fontSize: 12 }}>{card.reporter}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <FmdGoodOutlinedIcon sx={{ fontSize: 16 }} />
                                <Typography fontSize={12} color="#000000">สถานที่</Typography>
                            </Box>
                            <Typography fontSize={12} color="text.secondary" sx={{ mb: 2, ml: `24px`, fontSize: 12 }}>{card.location}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <ScheduleIcon sx={{ fontSize: 16 }} />
                                <Typography fontSize={12} color="#000000">วันและเวลา</Typography>
                            </Box>
                            <Typography fontSize={12} color="text.secondary" sx={{ mb: 2, ml: `24px`, fontSize: 12 }}>
                                {formatThaiDateTime(card.dateTime)}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <DescriptionOutlinedIcon sx={{ fontSize: 16 }} />
                                <Typography fontSize={12} color="#000000">รายละเอียด</Typography>
                            </Box>
                            <Typography fontSize={12} color="text.secondary" sx={{ mb: 2, ml: `24px`, fontSize: 12 }}>{card.desc}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <MapOutlinedIcon sx={{ fontSize: 16 }} />
                                <Typography fontSize={12} color="#000000">แผนที่</Typography>
                            </Box>
                            <Typography fontSize={12} color="text.secondary" sx={{ mb: 2, ml: `24px`, fontSize: 12 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <QrCodeScannerOutlinedIcon sx={{ fontSize: 16 }} />
                                <Typography fontSize={12} color="#000000">QR-Code</Typography>
                            </Box>
                            <Typography fontSize={12} color="text.secondary" sx={{ mb: 2, ml: `24px`, fontSize: 12 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
                        </Box>

                    </Box>
                </Box>

                {/* <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <Button variant="contained" size="small" onClick={onBack}>Back</Button>
                </Box> */}
            </Card>
        </Box>
    )
}

export default PreviewPanal