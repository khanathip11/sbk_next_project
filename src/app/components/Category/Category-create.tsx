import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

/**
 * ✅ Interface: CategoryCreateProps
 * รับ props จาก parent (เช่น CategoryTable)
 * - open: สถานะเปิด/ปิด Dialog
 * - handleClose: ฟังก์ชันปิด Dialog
 * - mode: ระบุว่าอยู่ในโหมด "create" หรือ "edit"
 * - initialData: ข้อมูลเริ่มต้นของหมวดหมู่ (ใช้เฉพาะตอนแก้ไข)
 */
interface CategoryCreateProps {
    open: boolean;
    handleClose: () => void;
    mode: "edit" | "create" | "sub";
    initialData?: {
        categoryName: string;
        parentCategory?: string | null;
    };
}

/**
 * 🧩 Component: CategoryCreate
 * ใช้สำหรับ “เพิ่ม” หรือ “แก้ไข” หมวดหมู่
 * แสดงเป็น Dialog popup
 */
const CategoryCreate: React.FC<CategoryCreateProps> = ({
    open,
    handleClose,
    mode,
    initialData,
}) => {
    /** ✅ เก็บประเภทหมวดหมู่ เช่น “main” (หมวดหลัก) — ใช้ในอนาคตหากต้องมีหมวดย่อย */
    const [categoryType, setCategoryType] = useState("main");

    /** ✅ เก็บชื่อหมวดหมู่ที่ผู้ใช้กรอกใน TextField */
    const [categoryName, setCategoryName] = useState("");

    /**
     * ✅ ฟังก์ชันบันทึกข้อมูล (กดปุ่ม "บันทึก" หรือ "อัปเดต")
     * - แยกการทำงานตามโหมด (create/edit)
     * - แสดงข้อมูลใน console (สำหรับพัฒนา)
     * - ปิด modal หลังบันทึก
     */
    const handleSave = () => {
        if (mode === "create") {
            console.log("🟢 เพิ่มหมวดหลัก:", categoryName);
        } else if (mode === "sub") {
            console.log("🟣 เพิ่มหมวดย่อย:", categoryName, "ภายใต้:", initialData?.parentCategory);
        } else {
            console.log("🟡 แก้ไขหมวดหมู่:", categoryName);
        }
        handleClose();
    };

    /**
     * ✅ useEffect: เมื่อ modal ถูกเปิด (`open === true`)
     * จะโหลดค่าจาก initialData (ในกรณีโหมดแก้ไข)
     */
    useEffect(() => {
        if (open) {
            setCategoryName(initialData?.categoryName || "");
        }
    }, [open, initialData]);

    // ------------------------------------------------------------
    // 🧭 Render ส่วนของ UI
    // ------------------------------------------------------------

    return (
        <Box>
            <Dialog
                open={open}
                // onClose={handleClose}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, p: 0 },
                }}
            >
                {/* 🔹 ส่วนหัวของ Dialog */}
                <DialogTitle sx={{ fontWeight: "bold", pb: 2.5, textAlign: 'center' }}>
                    {mode === "create"
                        ? "เพิ่มหมวดหมู่หลัก"
                        : mode === "sub"
                            ? "เพิ่มหมวดหมู่ย่อย"
                            : initialData?.parentCategory
                                ? "แก้ไขหมวดหมู่ย่อย"
                                : "แก้ไขหมวดหมู่หลัก"}
                </DialogTitle>

                {/* 🔹 ส่วนเนื้อหาใน Dialog */}
                <DialogContent
                    sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
                >
                    {/* แสดงชื่อหมวดหลัก (เฉพาะตอนแก้ไขหมวดย่อย) */}
                    {mode !== "create" && initialData?.parentCategory && (
                        <Typography sx={{ fontSize: 13, color: "#666" }}>
                            หมวดหลัก: {initialData.parentCategory}
                        </Typography>
                    )}

                    {/* 🔸 กล่องใส่ TextField พร้อมพื้นหลังเทา */}
                    <Box
                        sx={{
                            backgroundColor: "#F9F9FA",
                            borderRadius: 4,
                            p: 1,
                            pb: 2,
                            border: '1px solid #F2F2F2'
                        }}
                    >
                        <Typography sx={{ py: 1, fontWeight: 100, color: '#A6A6A6', fontSize: 13 }}>
                            {mode === "create"
                                ? "ชื่อหมวดหมู่หลัก"
                                : mode === "sub"
                                    ? "ชื่อหมวดหมู่ย่อย"
                                    : "ชื่อหมวดหมู่ที่จะแก้ไข"}
                        </Typography>

                        {/* 📝 ช่องกรอกชื่อหมวดหมู่ */}
                        <TextField
                            size="small"
                            label="ชื่อหมวดหมู่"
                            placeholder="กรอกชื่อหมวดหมู่"
                            fullWidth
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            sx={{
                                fontSize: 13,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 3, // ✅ มุมโค้งมน
                                    backgroundColor: "#fff", // พื้นหลังขาว
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

                {/* 🔹 ส่วนปุ่มด้านล่างของ Dialog */}
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    {/* ปุ่ม “ยกเลิก” */}
                    <Button
                        onClick={handleClose}
                        color="inherit"
                        sx={{
                            borderRadius: 3,
                            border: "1px solid #F2F2F2",
                            display: 'flex',
                            gap: 0.5
                        }}
                    >
                        <CloseRoundedIcon sx={{ fontSize: 16 }} />
                        ยกเลิก
                    </Button>

                    {/* ปุ่ม “บันทึก” หรือ “อัปเดต” */}
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{ borderRadius: 3, display: 'flex', gap: 0.5 }}
                        disabled={!categoryName.trim()} // ✅ ปิดปุ่มถ้ายังไม่กรอกชื่อ
                    >
                        {/* {mode === "edit" ? "อัปเดต" : "บันทึก"} */}
                        <CheckCircleRoundedIcon sx={{ fontSize: 16 }} />
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default CategoryCreate;
