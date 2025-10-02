import React, { useState } from 'react'
import { Box, Button, Modal } from '@mui/material'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ComplaintOverview from './ComplaintOverview';
import { StaticImageData } from "next/image";
import EmergencyNotifier from './EmergencyNotifier';
import ComplaintFilterBar from './ComplaintFilterBar';

type CardData = {
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
};

type ComplaintMapProps = {
    cardsData: CardData[];
    collapse: boolean;
    closeTask: boolean;
};

const ComplaintMap: React.FC<ComplaintMapProps> = ({ cardsData, collapse, closeTask, }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    p: 2,
                    gap: 2,
                    width: "100%",
                }}
            >
                <ComplaintOverview
                    collapse={collapse}
                    closeTask={closeTask}
                    cardsDataOverview={cardsData}
                />

                <Box sx={{ flex: 1 }}>
                    <ComplaintFilterBar />
                </Box>
            </Box>

            <Box>
                <Button
                    variant="contained"
                    sx={{
                        width: '195px',
                        height: '5%',
                        position: 'absolute',
                        bottom: 10, left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: "#FF3B3B",
                        fontSize: 12,
                        gap: 1,
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: '#FF1A1A'
                        }
                    }}
                    onClick={handleOpen}
                >
                    <ReportProblemIcon sx={{ fontSize: 18 }} />
                    แจ้งเตือนเหตุการณ์ฉุกเฉิน
                </Button>

                <Modal open={open} onClose={handleClose}>
                    <Box sx={{ width: '100%', height: '100%' }}>
                        <EmergencyNotifier handleClose={handleClose} />
                    </Box>
                </Modal>
            </Box>
        </Box >
    )
}

export default ComplaintMap