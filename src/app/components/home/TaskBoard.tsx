import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import { StaticImageData } from "next/image";

interface CardItem {
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
interface TaskBoardProps {
    card: CardItem;
    onClick: () => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ card, onClick }) => {

    return (
        <>
            <Card onClick={onClick} sx={{ width: '100%', display: 'flex', mb: 1, p: 1, borderRadius: 4, boxShadow: 'none', }}>
                <CardMedia
                    component="img"
                    image={typeof card.imageSrc === "string" ? card.imageSrc : card.imageSrc.src}
                    alt="Thailand"
                    sx={{
                        borderRadius: 4,
                        width: 70,
                        height: 70,
                        objectFit: 'cover',
                        mt: 0.1,
                        ml: 0.2
                    }}
                />

                <Box sx={{ width: '100%', overflow: 'hidden' }}>
                    <Stack direction={'row'} px={2} pt={0.5}>
                        <Typography fontSize={8} noWrap sx={{ textOverflow: 'ellipsis', maxWidth: '80px', color: 'blue' }}>{card.issue?.length > 18 ? card.issue.slice(0, 18) + '…' : card.issue}</Typography>
                        <Box flexGrow={1} />
                        <Typography
                            fontSize={8}
                            noWrap
                            sx={{
                                color: card.color,
                                bgcolor: card.bgColor,
                                p: 0.3,
                                pt: 0,
                                pb: 0,
                                borderRadius: 1,
                                width: 'auto',
                            }}>
                            {card.status?.length > 30 ? card.status.slice(0, 30) + '…' : card.status}
                        </Typography>
                    </Stack>
                    <CardContent sx={{ py: 0 }}>
                        <Typography variant="subtitle1" color="text.black" fontSize={12} noWrap>
                            {card.title}
                        </Typography>
                        <Typography color="text.secondary" fontSize={10} noWrap>
                            {card.desc}
                        </Typography>
                    </CardContent>
                    <Stack direction={'row'} px={2}>
                        <Typography fontSize={10}>Location</Typography>
                        <Box flexGrow={1} />
                        <Typography fontSize={10}>Datetime</Typography>
                    </Stack>
                </Box>
            </Card>
        </>
    )
}

export default TaskBoard