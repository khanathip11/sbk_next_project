import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

// ✅ รับ props จาก parent
interface CategoryCreateProps {
    open: boolean;
    handleClose: () => void;
}

const CategoryCreate: React.FC<CategoryCreateProps> = ({ open, handleClose }) => {
    const [categoryType, setCategoryType] = React.useState("main");
    const [categoryName, setCategoryName] = React.useState("");

    const handleSave = () => {
        console.log("สร้างหมวดหมู่ใหม่:", {
            type: categoryType,
            name: categoryName,
        });

        // ✅ ปิด modal และรีเซ็ตค่า
        handleClose();
        setCategoryName("");
        setCategoryType("main");
    };

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, p: 1 },
                }}
            >
                <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
                    เพิ่มหมวดหมู่ใหม่
                </DialogTitle>

                <DialogContent
                    sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#F9F9FA",
                            borderRadius: 4,
                            p: 1,
                            pb: 2,
                        }}
                    >
                        <Typography sx={{ py: 1, fontWeight: 500 }}>ชื่อหมวดหมู่หลัก</Typography>

                        {/* 🔹 TextField พร้อม radius */}
                        <TextField
                            size="small"
                            label="ชื่อหมวดหมู่"
                            placeholder="กรอกชื่อหมวดหมู่"
                            fullWidth
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 3, // ✅ กำหนดความโค้งมน
                                    backgroundColor: "#fff", // ให้ตัดกับพื้นหลังเทา
                                    "& fieldset": {
                                        borderColor: "#D1D5DB", // ขอบปกติ
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#9CA3AF", // ขอบตอน hover
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#1976d2", // ขอบตอน focus
                                    },
                                },
                            }}
                        />
                    </Box>
                </DialogContent>


                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={handleClose}
                        color="inherit"
                        sx={{
                            borderRadius: 3,
                            border: '1px solid #F2F2F2'
                        }}>
                        ยกเลิก
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{ borderRadius: 3 }}
                        disabled={!categoryName.trim()}
                    >
                        บันทึก
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CategoryCreate;
