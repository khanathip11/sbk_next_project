import React, { useState } from 'react'
import { Box, Button, Modal } from '@mui/material'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ComplaintOverview from './ComplaintOverview';
import { StaticImageData } from "next/image";
import EmergencyNotifier from './EmergencyNotifier';

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
};

const ComplaintMap: React.FC<ComplaintMapProps> = ({ cardsData }) => {
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
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    // border: '1px solid red',
                    width: '250px',
                    minHeight: "40%",
                    maxHeight: "auto",
                }}>
                <ComplaintOverview cardsDataOverview={cardsData} />
            </Box>
            <Box>
                <Button
                    variant="contained"
                    sx={{
                        width: '200px',
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