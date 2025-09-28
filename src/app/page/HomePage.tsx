"use client";

import React, { useState } from "react";
import Navbar from "../components/home/Navbar";
import { Box, Paper, Typography } from "@mui/material";
import TaskSummary from "../components/home/TaskSummary";
import TaskBoard from "../components/home/TaskBoard";
import droneImg from '@/app/assets/drone.jpg';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ComplaintMap from "../components/home/ComplaintMap";


export default function HomePage() {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [closeTask, SetCloseTask] = useState<boolean>(false)

    const cardsData = [
        {
            id: 1,
            issue: "ปัญหายาเสพติด",
            count: '15',
            status: "ระบบรับข้อมูลแล้ว",
            imageSrc: droneImg,
            bgColor: "#F0F0F0",
            color: "#616161",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc: "ประชาชนแจ้งปัญหายาเสพติดผ่านช่องทางออนไลน์"
        },
        {
            id: 2,
            issue: "ความปลอดภัยในชีวิตและทรัพย์สิน",
            count: '12',
            status: "เจ้าหน้าที่ตรวจสอบ",
            imageSrc: droneImg,
            bgColor: "#E3F2FD",
            color: "#1976D2",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc: "ประชาชนแจ้งเหตุอาชญากรรมและภัยคุกคามชีวิต"
        },
        {
            id: 3,
            issue: "ความมั่นคงพื้นที่ชายแดน",
            count: '10',
            status: "ส่งต่อให้หน่วยงาน",
            imageSrc: droneImg,
            bgColor: "#FFF3E0",
            color: "#F57C00",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc: "ประชาชนแจ้งเรื่องความมั่นคงตามแนวชายแดน"
        },
        {
            id: 4,
            issue: "ความมั่นคงพื้นที่ชายแดน จชต.",
            count: '8',
            status: "หน่วยงานกำลังดำเนินการ",
            imageSrc: droneImg,
            bgColor: "#E8F5E9",
            color: "#388E3C",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc: "รายงานเหตุการณ์ความมั่นคงในพื้นที่จังหวัดชายแดนใต้"
        },
        {
            id: 5,
            issue: "การก่อการร้ายและก่ออาชญากรรมข้ามชาติ",
            count: '7',
            status: "ดำเนินการเสร็จสิ้น",
            imageSrc: droneImg,
            bgColor: "#F1F8E9",
            color: "#558B2F",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc: "ประชาชนแจ้งเหตุการณ์ก่อการร้ายและอาชญากรรมข้ามชาติ"
        },
        {
            id: 6,
            issue: "การค้ามนุษย์",
            count: '6',
            status: "ไม่สามารถดำเนินการได้",
            imageSrc: droneImg,
            bgColor: "#FFEBEE",
            color: "#C62828",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc: "รายงานเหตุการณ์การค้ามนุษย์ในพื้นที่ต่างๆ"
        },
        {
            id: 7,
            issue: "แรงงานต่างด้าว",
            count: '6',
            status: "ระบบรับข้อมูลแล้ว",
            imageSrc: droneImg,
            bgColor: "#ECEFF1",
            color: "#455A64",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc: "ประชาชนแจ้งปัญหาแรงงานต่างด้าวในพื้นที่"
        },
        {
            id: 8,
            issue: "การละเมิดสถาบันหลักของชาติ",
            count: '5',
            status: "เจ้าหน้าที่ตรวจสอบ",
            imageSrc: droneImg,
            bgColor: "#E3F2FD",
            color: "#1976D2",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc: "รายงานการละเมิดสถาบันหลักของชาติ"
        },
        {
            id: 9,
            issue: "อุทกภัย",
            count: '5',
            status: "ส่งต่อให้หน่วยงาน",
            imageSrc: droneImg,
            bgColor: "#FFF3E0",
            color: "#F57C00",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc: "แจ้งสถานการณ์อุทกภัยในพื้นที่ต่างๆ"
        },
        {
            id: 10,
            issue: "อัคคีภัย",
            count: '3',
            status: "หน่วยงานกำลังดำเนินการ",
            imageSrc: droneImg,
            bgColor: "#E8F5E9",
            color: "#388E3C",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc: "แจ้งเหตุอัคคีภัยและสถานการณ์ไฟไหม้"
        },
        {
            id: 11,
            issue: "ธรรมชาติและสิ่งแวดล้อม",
            count: '3',
            status: "ดำเนินการเสร็จสิ้น",
            imageSrc: droneImg,
            bgColor: "#F1F8E9",
            color: "#558B2F",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc: "แจ้งปัญหาธรรมชาติและสิ่งแวดล้อม"
        },
    ];

    return (
        // <Box sx={{
        //     display: 'flex',
        //     p: 2,
        //     bgcolor: '#F0F0F0',
        //     height: !collapsed && !closeTask ? '100%' : '100vh',
        //     gap: 2,
        // }}>
        //     <Paper elevation={5}
        //         sx={{
        //             borderRadius: 4,
        //             bgcolor: '#F7F7F7',
        //             width: !collapsed ? '30%' : '10%',
        //             transition: 'width 0.5s ease',
        //         }}>
        //         <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        //     </Paper>

        //     <Paper elevation={5} sx={{ borderRadius: 4, bgcolor: '#F7F7F7', width: '100%' }}>
        //         Content
        //     </Paper>

        //     <Paper
        //         elevation={5}
        //         sx={{
        //             borderRadius: 4,
        //             bgcolor: '#F7F7F7',
        //             width: !closeTask ? '40%' : '5%',
        //             p: 1,
        //             transition: 'width 0.3s ease',
        //             display: closeTask ? 'flex' : '',
        //             alignItems: closeTask ? 'center' : '',
        //             justifyContent: closeTask ? 'center' : '',
        //             height: '100%',
        //             maxHeight: 'calc(100vh)',
        //             overflowY: 'auto',
        //             "&::-webkit-scrollbar": {
        //                 width: "0px",
        //             },
        //             "&::-webkit-scrollbar-thumb": {
        //                 backgroundColor: "#c1c1c1",
        //                 borderRadius: "4px",
        //             },
        //             "&::-webkit-scrollbar-thumb:hover": {
        //                 backgroundColor: "#a0a0a0",
        //             },
        //         }}
        //     >
        //         <TaskSummary count={120} closeTask={closeTask} SetCloseTask={SetCloseTask} />
        //         {!closeTask && (
        //             cardsData.map((card) => (
        //                 <TaskBoard key={card.id} card={card} />
        //             ))
        //         )}
        //     </Paper>
        // </Box>

        <Box sx={{
            display: 'flex',
            p: 2,
            bgcolor: '#F0F0F0',
            height: !collapsed ? '100%' : '100vh',
            gap: 2,
            position: 'relative',
        }}>
            <Paper
                elevation={5}
                sx={{
                    borderRadius: 4,
                    bgcolor: '#F7F7F7',
                    width: !collapsed ? '30%' : '10%',
                    transition: 'width 0.5s ease',
                    // height: '100%',
                    // height: closeTask ? '100%' : 'auto',
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
                    // p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ComplaintMap />
            </Paper>

            {!closeTask && (
                <Paper
                    elevation={5}
                    sx={{
                        borderRadius: 4,
                        bgcolor: '#F7F7F7',
                        width: '40%',
                        p: 1,
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
                    <TaskSummary count={120} closeTask={closeTask} SetCloseTask={SetCloseTask} />
                    {cardsData.map((card) => (
                        <TaskBoard key={card.id} card={card} />
                    ))}
                </Paper>
            )
            }

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
