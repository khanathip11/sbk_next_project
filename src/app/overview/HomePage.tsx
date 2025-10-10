"use client";

import React, { useState } from "react";
import Navbar from "../components/home/Navbar";
import { Box, Paper, useTheme, useMediaQuery } from "@mui/material";
import TaskSummary from "../components/home/TaskSummary";
import TaskBoard from "../components/home/TaskBoard";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ComplaintMap from "../components/home/ComplaintMap";
import PreviewPanal from "../components/home/PreviewPanal";
import { CardItem } from "../types/CardItem";
import { cardsData } from '../data/CardsData';

export default function HomePage() {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [closeTask, SetCloseTask] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));

    return (
        <Box sx={{
            display: "flex",
            p: 1,
            bgcolor: "#ebecf0",
            height: isLgUp ? "100vh" : "100%",
            gap: 2,
            position: "relative",
        }}>
            <Paper
                elevation={5}
                sx={{
                    borderRadius: 4,
                    bgcolor: '#f9f9f9',
                    width: (() => {
                        if (isXlUp) {
                            return collapsed ? (closeTask ? "4%" : "4%") : (closeTask ? "20%" : "16%");
                        }
                        if (isLgUp) {
                            return collapsed ? (closeTask ? "6%" : "6%") : (closeTask ? "35.5%" : "26%");
                        }
                        return "100%"; // fallback บนจอเล็ก
                    })(),
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
                    bgcolor: '#f9f9f9',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    m: 0
                }}
            >
                <ComplaintMap collapse={collapsed} closeTask={closeTask} cardsData={cardsData} />
            </Paper>

            <Paper
                id="task-container"
                elevation={5}
                sx={{
                    borderRadius: 4,
                    bgcolor: '#f9f9f9',
                    width: (() => {
                        if (isXlUp) {
                            return collapsed ? (closeTask ? "30%" : "1.4%") : (closeTask ? "30%" : "1.5%");
                        }
                        if (isLgUp) {
                            return collapsed ? (closeTask ? "40%" : "2%") : (closeTask ? "40%" : "2.2%");
                        }
                        return "100%"; // fallback บนจอเล็ก
                    })(),
                    p: !selectedCard ? 1 : 0,
                    transition: 'width 0.3s ease',
                    height: '100%',
                    maxHeight: 'calc(100vh)',
                    overflowY: 'auto',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE และ Edge เก่า
                    '&::-webkit-scrollbar': {
                        display: 'none', // Chrome, Safari
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#c1c1c1",
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#a0a0a0",
                    },
                }}
            >
                <TaskSummary
                    count={120}
                    closeTask={closeTask}
                    SetCloseTask={SetCloseTask}
                    selectedCard={selectedCard}
                />

                {/* ✅ เปลี่ยนเงื่อนไขเป็นแสดงเมื่อ closeTask = true */}
                {closeTask ? (
                    !selectedCard ? (
                        cardsData.map((card) => (
                            <TaskBoard
                                key={card.id}
                                card={card}
                                onClick={() => setSelectedCard(card)}
                            />
                        ))
                    ) : (
                        <PreviewPanal
                            card={selectedCard}
                            onBack={() => setSelectedCard(null)}
                        />
                    )
                ) : null}
            </Paper>


            {/* {!closeTask && (
                <Paper
                    id="task-container"
                    elevation={5}
                    sx={{
                        borderRadius: 4,
                        bgcolor: '#f9f9f9',
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
                        bottom: 30,
                        right: 30,
                        width: '2%',
                        height: '4%',
                        bgcolor: '#FFF',
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
                    <AdsClickIcon sx={{ fontSize: 16, color: '#000', transform: 'rotate(180deg)', }} onClick={() => console.log('s')} />
                </Box>
            )
            } */}
        </Box >
    );
}
