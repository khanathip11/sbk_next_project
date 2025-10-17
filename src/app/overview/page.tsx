// "use client";

// import React, { useState } from "react";
// import Navbar from "../components/Overview/Navbar";
// import { Box, Paper, useTheme, useMediaQuery } from "@mui/material";
// import TaskSummary from "../components/Overview/Task-summary";
// import TaskBoard from "../components/Overview/Task-board";
// import ComplaintMap from "../components/Overview/Complaint-map";
// import PreviewPanal from "../components/Overview/Preview-panal";
// import { CardItem } from "../types/CardItem";
// import { cardsData } from '../data/CardsData';

// export default function HomePage() {
//     const [collapsed, setCollapsed] = useState<boolean>(true);
//     const [closeTask, SetCloseTask] = useState<boolean>(false);
//     const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

//     const theme = useTheme();
//     const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
//     const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));

//     return (
//         <Box sx={{
//             display: "flex",
//             p: 1,
//             bgcolor: "#ebecf0",
//             height: isLgUp ? "100vh" : "100%",
//             gap: 2,
//             position: "relative",
//         }}>
//             <Paper
//                 elevation={5}
//                 sx={{
//                     borderRadius: 4,
//                     bgcolor: '#f9f9f9',
//                     width: (() => {
//                         if (isXlUp) {
//                             return collapsed ? (closeTask ? "4%" : "4%") : (closeTask ? "20%" : "16%");
//                         }
//                         if (isLgUp) {
//                             return collapsed ? (closeTask ? "6%" : "6%") : (closeTask ? "35.5%" : "26%");
//                         }
//                         return "100%"; // fallback บนจอเล็ก
//                     })(),
//                     transition: 'width 0.5s ease',
//                     height: closeTask ? '100%' : 'auto',
//                 }}
//             >
//                 <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
//             </Paper>

//             <Paper
//                 elevation={5}
//                 sx={{
//                     borderRadius: 4,
//                     bgcolor: '#f9f9f9',
//                     width: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     p: 0,
//                     m: 0
//                 }}
//             >
//                 <ComplaintMap collapse={collapsed} closeTask={closeTask} cardsData={cardsData} />
//             </Paper>

//             <Paper
//                 id="task-container"
//                 elevation={5}
//                 sx={{
//                     borderRadius: 4,
//                     bgcolor: '#f9f9f9',
//                     width: (() => {
//                         if (isXlUp) {
//                             return collapsed ? (closeTask ? "30%" : "1.4%") : (closeTask ? "30%" : "1.5%");
//                         }
//                         if (isLgUp) {
//                             return collapsed ? (closeTask ? "40%" : "2%") : (closeTask ? "40%" : "2.2%");
//                         }
//                         return "100%"; // fallback บนจอเล็ก
//                     })(),
//                     p: !selectedCard ? 1 : 0,
//                     transition: 'width 0.3s ease',
//                     height: '100%',
//                     maxHeight: 'calc(100vh)',
//                     overflowY: 'auto',
//                     scrollbarWidth: 'none', // Firefox
//                     msOverflowStyle: 'none', // IE และ Edge เก่า
//                     '&::-webkit-scrollbar': {
//                         display: 'none', // Chrome, Safari
//                     },
//                     "&::-webkit-scrollbar-thumb": {
//                         backgroundColor: "#c1c1c1",
//                         borderRadius: "4px",
//                     },
//                     "&::-webkit-scrollbar-thumb:hover": {
//                         backgroundColor: "#a0a0a0",
//                     },
//                 }}
//             >
//                 <TaskSummary
//                     count={120}
//                     closeTask={closeTask}
//                     SetCloseTask={SetCloseTask}
//                     selectedCard={selectedCard}
//                 />

//                 {/* ✅ เปลี่ยนเงื่อนไขเป็นแสดงเมื่อ closeTask = true */}
//                 {closeTask ? (
//                     !selectedCard ? (
//                         cardsData.map((card) => (
//                             <TaskBoard
//                                 key={card.id}
//                                 card={card}
//                                 onClick={() => setSelectedCard(card)}
//                             />
//                         ))
//                     ) : (
//                         <PreviewPanal
//                             card={selectedCard}
//                             onBack={() => setSelectedCard(null)}
//                         />
//                     )
//                 ) : null}
//             </Paper>
//         </Box >
//     );
// }

"use client";

import React, { useState } from "react";
import Navbar from "../components/Overview/Navbar";
import { Box, Paper, useTheme, useMediaQuery } from "@mui/material";
import TaskSummary from "../components/Overview/Task-summary";
import TaskBoard from "../components/Overview/Task-board";
import ComplaintMap from "../components/Overview/Complaint-map";
import PreviewPanal from "../components/Overview/Preview-panal";
import { CardItem } from "../types/CardItem";
import { cardsData } from '../data/CardsData';

export default function HomePage() {
    // 🔒 แผงซ้าย (Navbar) เป็นโหมดย่อ/ขยายหรือไม่ (true = ย่อ)
    const [collapsed, setCollapsed] = useState<boolean>(true);

    // 📌 แผงขวา (Task container) เปิด/ปิด (true = เปิดแผงเพื่อแสดงรายการ/พรีวิว)
    const [closeTask, SetCloseTask] = useState<boolean>(false);

    // 🟨 การ์ดที่ถูกเลือกเพื่อเปิดหน้าพรีวิวทางขวา (null = ยังไม่เลือก)
    const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

    // 🧠 ใช้ theme + breakpoint ของ MUI เช็คขนาดหน้าจอ
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));   // ≥ lg
    const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));   // ≥ xl

    return (
        <Box
            sx={{
                display: "flex",
                p: 1,
                bgcolor: "#ebecf0",
                height: isLgUp ? "100vh" : "100%", // จอใหญ่ให้เต็ม viewport, จอเล็กให้สูงตามคอนเทนต์
                gap: 2,
                position: "relative",
            }}
        >
            {/* =========================
          แผงซ้าย: Navbar / Menu
         ========================= */}
            <Paper
                elevation={5}
                sx={{
                    borderRadius: 4,
                    bgcolor: '#f9f9f9',
                    // 🧮 ความกว้างแบบ responsive:
                    // - แยกกรณีจอ xl / lg / เล็ก
                    // - แยกย่อยตาม collapsed (ย่อเมนูซ้าย) และ closeTask (เปิด/ปิดแผงขวา)
                    width: (() => {
                        if (isXlUp) {
                            // จอใหญ่มาก
                            return collapsed ? (closeTask ? "4%" : "4%") : (closeTask ? "20%" : "16%");
                        }
                        if (isLgUp) {
                            // จอใหญ่
                            return collapsed ? (closeTask ? "6%" : "6%") : (closeTask ? "35.5%" : "26%");
                        }
                        // จอเล็ก (เช่น mobile) ให้กินเต็มความกว้าง (stack แนวตั้ง)
                        return "100%";
                    })(),
                    transition: 'width 0.5s ease',  // 🪄 แอนิเมชันตอนปรับความกว้าง
                    height: closeTask ? '100%' : 'auto', // ถ้าเปิดแผงขวา ให้สูงเต็มเพื่อ align ภาพรวม
                }}
            >
                {/* Navbar จะควบคุม collapsed ผ่าน props */}
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </Paper>

            {/* =========================
          พื้นที่กลาง: แผนที่ (Map)
         ========================= */}
            <Paper
                elevation={5}
                sx={{
                    borderRadius: 4,
                    bgcolor: '#f9f9f9',
                    width: '100%',                 // โซนกลางยืดเต็มพื้นที่ที่เหลือ
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0,
                    m: 0
                }}
            >
                {/* ComplaintMap แสดงแผนที่ + แถบ Overview/Filter ลอยบนแผนที่
            รับ collapsed/closeTask เพื่อจัด layout ภายในแผนที่ให้สัมพันธ์กัน */}
                <ComplaintMap collapse={collapsed} closeTask={closeTask} cardsData={cardsData} />
            </Paper>

            {/* =========================
          แผงขวา: Task Container
         ========================= */}
            <Paper
                id="task-container"
                elevation={5}
                sx={{
                    borderRadius: 4,
                    bgcolor: '#f9f9f9',
                    // 🧮 ความกว้างแผงขวา: ถ้า closeTask = true (เปิดแผง) จะกว้าง; ถ้าปิดจะเล็กเป็นแถบ
                    width: (() => {
                        if (isXlUp) {
                            return collapsed ? (closeTask ? "30%" : "1.4%") : (closeTask ? "30%" : "1.5%");
                        }
                        if (isLgUp) {
                            return collapsed ? (closeTask ? "40%" : "2%") : (closeTask ? "40%" : "2.2%");
                        }
                        return "100%"; // จอเล็กซ้อนแนวตั้ง
                    })(),
                    p: !selectedCard ? 1 : 0,       // ถ้ากำลังพรีวิวการ์ด ปรับ padding = 0 เพื่อเต็มพื้นที่
                    transition: 'width 0.3s ease',
                    height: '100%',
                    maxHeight: 'calc(100vh)',       // จำกัดความสูงแผงให้เลื่อนภายในได้
                    overflowY: 'auto',
                    // ซ่อน scrollbar เบราว์เซอร์ต่าง ๆ
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#c1c1c1",
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#a0a0a0",
                    },
                }}
            >
                {/* แถบหัวของแผงขวา: ปุ่มลูกศรเปิด/ปิด และตัวนับผลลัพธ์/ชื่อพรีวิว */}
                <TaskSummary
                    count={120}                 // จำนวนรายการทั้งหมด (ตัวอย่าง)
                    closeTask={closeTask}       // สถานะเปิด/ปิดแผง
                    SetCloseTask={SetCloseTask} // ฟังก์ชัน toggle แผง
                    selectedCard={selectedCard} // ถ้าเลือกการ์ดแล้ว จะแสดงข้อความ "Preview"
                />

                {/* ================================
            เนื้อหาแผงขวา (conditional render)
            - แสดงเมื่อ closeTask = true เท่านั้น
            - ถ้ายังไม่เลือกการ์ด => รายการบัตร (TaskBoard) ทั้งหมด
            - ถ้าเลือกการ์ดแล้ว  => หน้าพรีวิว (PreviewPanal)
           ================================= */}
                {closeTask ? (
                    !selectedCard ? (
                        // 🔹 โหมด "รายการการ์ด": map การ์ดจาก cardsData
                        cardsData.map((card) => (
                            <TaskBoard
                                key={card.id}
                                card={card}
                                onClick={() => setSelectedCard(card)} // คลิกการ์ดเพื่อเข้าสู่หน้าพรีวิว
                            />
                        ))
                    ) : (
                        // 🔹 โหมด "พรีวิวการ์ด": แสดงรายละเอียดการ์ด
                        <PreviewPanal
                            card={selectedCard}
                            onBack={() => setSelectedCard(null)} // กลับไปหน้ารายการการ์ด
                        />
                    )
                ) : null}
            </Paper>
        </Box>
    );
}
