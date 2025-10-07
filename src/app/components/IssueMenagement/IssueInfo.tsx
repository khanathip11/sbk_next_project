import React from "react";
import { Modal, Box, Button, Typography, Tooltip, ImageList, ImageListItem, ListItemButton, IconButton } from "@mui/material";
import { IssueItem } from "@/app/types/IssueItem";
import IssueInfoLeft from "./IssueInfoLeft";
import IssueInfoRight from "./IssueInfoRight";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
interface IssueInfoProps {
    open: boolean;
    selectedRow: IssueItem | null;
    issuesData: IssueItem[];
    handleClose: () => void;
    getTypeStyle: (status: string) => { background: string; color: string };
}

const IssueInfo: React.FC<IssueInfoProps> = ({
    open,
    selectedRow,
    handleClose,
    issuesData,
    getTypeStyle
}) => {
    if (!selectedRow) return null;

    const selectedIssue = issuesData.find((item) => item.id === selectedRow.id);

    return (
        // <Modal open={open} onClose={handleClose} >
        //     <Box
        //         sx={{
        //             position: "absolute",
        //             top: "50%",
        //             left: "50%",
        //             transform: "translate(-50%, -50%)",
        //             width: "60%",
        //             maxWidth: 'auto',
        //             bgcolor: "white",
        //             borderRadius: 6,
        //             boxShadow: 24,
        //             overflow: "hidden",
        //             display: "flex",
        //             flexDirection: "column",
        //             maxHeight: "90vh",
        //         }}
        //     >
        //         {/* ✅ ชั้นใน - เนื้อหาทั้งหมด */}
        //         <Box
        //             sx={{
        //                 display: "flex",
        //                 flexDirection: "column",
        //                 flex: 1,
        //             }}
        //         >
        //             {/* 🔹 Header (คงที่) */}
        //             <Box
        //                 sx={{
        //                     display: "flex",
        //                     alignItems: "center",
        //                     justifyContent: "center",
        //                     flexDirection: "column",
        //                     py: 2,
        //                     px: 2,
        //                     // borderBottom: "1px solid #E0E0E0",
        //                     flexShrink: 0,
        //                 }}
        //             >
        //                 <Typography sx={{ color: "#000", fontSize: 20, fontWeight: 600, mb: 1 }}>
        //                     {selectedIssue?.problem ?? "ไม่พบข้อมูลปัญหา"}
        //                 </Typography>
        //                 <Typography
        //                     sx={{
        //                         fontSize: 14,
        //                         fontWeight: 600,
        //                         ...getTypeStyle(selectedIssue?.status ?? ""),
        //                         borderRadius: 2,
        //                         p: 0.5,
        //                         px: 1,
        //                     }}
        //                 >
        //                     {selectedIssue?.status ?? "ไม่พบข้อมูลปัญหา"}
        //                 </Typography>
        //             </Box>

        //             {/* 🔹 Content Scroll ได้แค่ภายใน Left/Right */}
        //             <Box
        //                 sx={{
        //                     flex: 1,
        //                     display: "flex",
        //                     gap: 2,
        //                     p: 2,
        //                     overflow: "hidden", // ❗ ไม่ให้ container scroll เอง
        //                     "@media (max-width: 900px)": {
        //                         flexDirection: "column",
        //                     },
        //                 }}
        //             >
        //                 {/* LEFT (scroll ภายในเอง) */}
        //                 <Box
        //                     sx={{
        //                         flex: 1,
        //                         minWidth: 0,
        //                         maxHeight: "70vh",
        //                         pr: 1,
        //                         overflowY: "auto",
        //                         scrollbarWidth: "none", // Firefox
        //                         msOverflowStyle: "none", // IE
        //                         "&::-webkit-scrollbar": {
        //                             display: "none", // Chrome/Safari
        //                         },
        //                     }}
        //                 >
        //                     <IssueInfoLeft issuesData={issuesData} selectedRow={selectedRow} />
        //                 </Box>

        //                 {/* RIGHT (scroll ภายในเอง) */}
        //                 <Box
        //                     sx={{
        //                         flex: 1,
        //                         minWidth: 0,
        //                         maxHeight: "70vh",
        //                         pl: 1,
        //                         overflowY: "auto",
        //                         scrollbarWidth: "none",
        //                         msOverflowStyle: "none",
        //                         "&::-webkit-scrollbar": {
        //                             display: "none",
        //                         },
        //                     }}
        //                 >
        //                     <IssueInfoRight />
        //                 </Box>
        //             </Box>

        //             <Box
        //                 sx={{
        //                     display: "flex",
        //                     justifyContent: "flex-end",
        //                     alignItems: "center",
        //                     gap: 1,
        //                     px: 2,
        //                     flexShrink: 0,
        //                     bgcolor: "#fff",
        //                     mb: 2
        //                 }}
        //             >
        //                 <Button
        //                     variant="contained"
        //                     sx={{
        //                         backgroundColor: "#ffffff",
        //                         color: "#000000",
        //                         borderRadius: 2,
        //                         boxShadow: "none",
        //                         "&:hover": { backgroundColor: "#f5f5f5" },
        //                     }}
        //                     onClick={handleClose}
        //                 >
        //                     <CloseIcon sx={{ fontSize: 16, mr: 1 }} />
        //                     ปิด
        //                 </Button>
        //                 <Button
        //                     variant="contained"
        //                     sx={{
        //                         borderRadius: 2,
        //                         color: "#fff",
        //                     }}
        //                 >
        //                     <SendIcon sx={{ fontSize: 16, mr: 1 }} />
        //                     ยืนยัน
        //                 </Button>
        //             </Box>
        //         </Box>
        //     </Box>
        // </Modal>
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
                    maxWidth: 1200,
                    bgcolor: "white",
                    borderRadius: 4,
                    boxShadow: 24,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    maxHeight: "90vh",
                }}
            >
                {/* ✅ Header */}
                <Box
                    sx={{
                        py: 2,
                        textAlign: "center",
                        flexShrink: 0,
                    }}
                >
                    <Typography sx={{ fontSize: 20, fontWeight: 600, color: '#000' }}>
                        {selectedIssue?.problem ?? "ไม่พบข้อมูลปัญหา"}
                    </Typography>
                    <Typography
                        sx={{
                            mt: 1,
                            fontSize: 14,
                            fontWeight: 600,
                            ...getTypeStyle(selectedIssue?.status ?? ""),
                            borderRadius: 2,
                            p: "2px 8px",
                            display: "inline-block",
                        }}
                    >
                        {selectedIssue?.status ?? "ไม่พบข้อมูลปัญหา"}
                    </Typography>
                </Box>

                {/* ✅ Content (2 คอลัมน์ → Stack เมื่อจอเล็ก) */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        gap: 2,
                        p: 2,
                        overflow: "hidden",
                        flexDirection: { xs: "column", md: "row" }, // 🔹 stack เมื่อจอ < md
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            pr: { md: 1 },
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": { display: "none" },
                        }}
                    >
                        <IssueInfoLeft issuesData={issuesData} selectedRow={selectedRow} />
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            pl: { md: 1 },
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": { display: "none" },
                        }}
                    >
                        <IssueInfoRight selectedIssue={selectedIssue} />
                    </Box>
                </Box>

                {/* ✅ Footer (ปุ่มคงที่) */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                        p: 2,
                        bgcolor: "#fff",
                        flexShrink: 0,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#ffffff",
                            color: "#000000",
                            borderRadius: 2,
                            boxShadow: "none",
                            "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon sx={{ fontSize: 16, mr: 1 }} />
                        ปิด
                    </Button>
                    <Button variant="contained" sx={{ borderRadius: 2, color: "#fff" }}>
                        <SendIcon sx={{ fontSize: 16, mr: 1 }} />
                        ยืนยัน
                    </Button>
                </Box>
            </Box>
        </Modal>

    );
};

export default IssueInfo;
