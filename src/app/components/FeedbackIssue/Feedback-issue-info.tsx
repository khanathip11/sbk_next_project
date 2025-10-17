import React from "react";
import { Modal, Box, Button, Typography, } from "@mui/material";
import { IssueItem } from "@/app/types/IssueItem";
import IssueInfoLeft from "../IssueMenagement/Issue-info-left";
import IssueInfoRight from "../IssueMenagement/Issue-info-right";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import FeedbackIssueInfoLeft from "./Feedback-issue-info-left";
import FeedbackIssueInfoRight from "./Feedback-issue-info-right";
interface FeedbackIssueInfoProps {
    open: boolean;
    selectedRow: IssueItem | null;
    issuesData: IssueItem[];
    handleClose: () => void;
    getTypeStyle: (status: string) => { background: string; color: string };
}

const FeedbackIssueInfo: React.FC<FeedbackIssueInfoProps> = ({
    open,
    selectedRow,
    issuesData,
    handleClose,
    getTypeStyle
}) => {

    if (!selectedRow) return null;

    const selectedIssue = issuesData.find((item) => item.id === selectedRow.id);
    return (
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
                    <Typography sx={{ fontSize: 20, fontWeight: 500, color: '#000' }}>
                        {selectedIssue?.problem ?? "ไม่พบข้อมูลปัญหา"}
                    </Typography>
                    <Typography
                        sx={{
                            mt: 1,
                            fontSize: 14,
                            fontWeight: 400,
                            ...getTypeStyle(selectedIssue?.status ?? ""),
                            borderRadius: 3,
                            p: 1,
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
                        pt: 0,
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
                        <FeedbackIssueInfoLeft issuesData={issuesData} selectedRow={selectedRow} />
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
                        <FeedbackIssueInfoRight selectedIssue={selectedIssue} selectedRow={selectedRow} />
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
                            backgroundColor: "#004D99",
                            color: "#fff",
                            borderRadius: 2.5,
                            px: 4,
                            boxShadow: "none",
                            border: '1px solid #D1D5DB',
                            "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon sx={{ fontSize: 16, mr: 1 }} />
                        ปิด
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default FeedbackIssueInfo