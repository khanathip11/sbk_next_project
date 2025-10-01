"use client";

import React, { useState } from "react";
import Navbar from "../components/home/Navbar";
import { Box, Paper } from "@mui/material";
import TaskSummary from "../components/home/TaskSummary";
import TaskBoard from "../components/home/TaskBoard";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ComplaintMap from "../components/home/ComplaintMap";
import PreviewPanal from "../components/home/PreviewPanal";
import { CardItem } from "../types/CardItem";
import { cardsData } from '../data/CardsData';

export default function HomePage() {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [closeTask, SetCloseTask] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

    return (
        <Box sx={{
            display: 'flex',
            p: 2,
            bgcolor: '#F0F0F0',
            height: {
                lg: !collapsed
                    ? (!closeTask ? '100%' : '100%')
                    : (!closeTask ? '100vh' : '100vh'),
                xl: !collapsed
                    ? (!closeTask ? '100%' : '100vh')
                    : (!closeTask ? '100%' : '100vh'),
            },
            gap: 2,
            position: 'relative',
        }}>
            <Paper
                elevation={5}
                sx={{
                    borderRadius: 4,
                    bgcolor: '#F7F7F7',
                    width: {
                        lg: !collapsed
                            ? (!closeTask ? '40%' : '27.4%')
                            : (!closeTask ? '10%' : '10%'),
                        xl: !collapsed
                            ? (!closeTask ? '28%' : '19.5%')
                            : (!closeTask ? '6%' : '5.9%'),
                    },
                    transition: 'width 0.5s ease',
                    height: closeTask ? '100%' : 'auto',
                }}
            >
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </Paper>

            <Paper
                elevation={5}
                sx={{
                    borderRadius: 4,
                    bgcolor: '#F7F7F7',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ComplaintMap collapse={collapsed} cardsData={cardsData} />
            </Paper>

            {!closeTask && (
                <Paper
                    id="task-container"
                    elevation={5}
                    sx={{
                        borderRadius: 4,
                        bgcolor: '#F7F7F7',
                        width: '40%',
                        p: !selectedCard ? 1 : 0,
                        transition: 'width 0.3s ease',
                        height: '100%',
                        maxHeight: 'calc(100vh)',
                        overflowY: 'auto',
                        "&::-webkit-scrollbar": {
                            width: "0px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#c1c1c1",
                            borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#a0a0a0",
                        },
                    }
                    }
                >
                    <TaskSummary count={120} closeTask={closeTask} SetCloseTask={SetCloseTask} selectedCard={selectedCard} />
                    {!selectedCard ? (
                        cardsData.map((card) => (
                            <TaskBoard key={card.id} card={card} onClick={() => setSelectedCard(card)} />
                        ))
                    ) : (
                        <PreviewPanal card={selectedCard} onBack={() => setSelectedCard(null)} />
                    )
                    }
                </Paper>
            )}

            {closeTask && (
                <Box
                    onClick={() => SetCloseTask(false)}
                    sx={{
                        position: 'absolute',
                        top: 30,
                        right: 30,
                        width: '3%',
                        height: '5%',
                        bgcolor: 'red',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        borderRadius: 2,
                        zIndex: 10,
                        '&:hover': {
                            backgroundColor: '#FF5757'
                        }
                    }}
                >
                    <AdsClickIcon sx={{ fontSize: 16, color: 'white', transform: 'rotate(180deg)', }} onClick={() => console.log('s')} />
                </Box>
            )
            }
        </Box >
    );
}
