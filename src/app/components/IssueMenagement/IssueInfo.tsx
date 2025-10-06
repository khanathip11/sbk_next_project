import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import type { DateRow } from "./TypeDate";

interface IssueInfoProps {
    open: boolean;
    selectedRow: DateRow | null;
    handleClose: () => void;
}

const IssueInfo: React.FC<IssueInfoProps> = ({ open, selectedRow, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose} sx={{ overflow: 'hidden' }}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "70%",
                    height: "80%",
                    maxWidth: 1200,
                    bgcolor: "white",
                    borderRadius: 4,
                    boxShadow: 24,
                    p: 4,
                    px: 2,
                    maxHeight: "90vh",
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2 }}>
                    <Typography sx={{ color: '#000' }}>พบการบินโกรน 1</Typography>
                </Box>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2
                }}>

                    <Box sx={{ width: '100%' }}>
                        <Box sx={{
                            color: '#000',
                            width: '100%',
                            height: '600px',
                            border: '1px solid #D9D9D9',
                            borderRadius: 4,
                            backgroundColor: '#F5F5F5',
                            p: 1,
                            px: 2
                        }}>Left</Box>
                    </Box>

                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{
                            color: '#000',
                            width: '100%',
                            height: '600px',
                            border: '1px solid #D9D9D9',
                            borderRadius: 4,
                            backgroundColor: '#F5F5F5',
                            p: 1,
                            px: 2
                        }}>Right</Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: 1,
                                mt: 1
                            }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    borderRadius: 2,
                                }}
                                onClick={handleClose}
                            >
                                <CloseIcon sx={{ fontSize: 16, mr: 1 }} />
                                ปิด
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    color: '#ffffff',
                                    borderRadius: 2
                                }}
                            >
                                <SendIcon sx={{ fontSize: 16, mr: 1 }} />
                                ยืนยัน
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default IssueInfo;
