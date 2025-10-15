import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
interface CategoryCreateProps {
    open: boolean;
    handleClose: () => void;
    mode: "edit" | "create" | "sub" | "delete";
    initialData?: {
        categoryName: string;
        parentCategory?: string | null;
    };
    deleteTarget?: {
        name: string;
        parent?: string | null;
    } | null;
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
    deleteTarget
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

    const handleDelete = () => {
        console.log("🔴 ลบหมวดหมู่:", deleteTarget);
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

    const textFieldStyle = {
        fontSize: 13,
        "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            backgroundColor: "#fff",
            "& fieldset": { borderColor: "#D1D5DB" },
            "&:hover fieldset": { borderColor: "#9CA3AF" },
            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
        },
    };

    return (
        <Box sx={{ height: "auto" }}>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, height: "auto" },
                }}
            >
                {/* 🎯 เงื่อนไขแยกโหมด */}
                {mode === "delete" ? (
                    <>
                        {/* 🔴 ยืนยันการลบ */}
                        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
                            ยืนยันการลบ
                        </DialogTitle>

                        <DialogContent>
                            <Typography>
                                {`ต้องการลบหมวดหมู่ ${deleteTarget?.name}`}
                                {deleteTarget?.parent && ` (ภายใต้ ${deleteTarget.parent}) `}
                                ใช่หรือไม่?
                            </Typography>
                        </DialogContent>

                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button
                                onClick={handleClose}
                                color="inherit"
                                sx={{
                                    borderRadius: 3,
                                    border: "1px solid #F2F2F2",
                                }}
                            >
                                ยกเลิก
                            </Button>

                            <Button
                                color="error"
                                variant="contained"
                                onClick={handleDelete}
                                sx={{ borderRadius: 3 }}
                            >
                                ลบ
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <>
                        {/* 🟩 ส่วนหัวของ Dialog */}
                        <DialogTitle
                            sx={{ fontWeight: "400", pb: 2.5, textAlign: "center" }}
                        >
                            {mode === "create"
                                ? "เพิ่มหมวดหมู่หลัก"
                                : mode === "sub"
                                    ? "เพิ่มหมวดย่อย"
                                    : initialData?.parentCategory
                                        ? "แก้ไขหมวดหมู่ย่อย"
                                        : "แก้ไขหมวดหมู่หลัก"}
                        </DialogTitle>

                        {/* 🟦 เนื้อหา Dialog */}
                        <DialogContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                pt: 1,
                            }}
                        >
                            {/* ✅ ฟอร์มหมวดหมู่หลัก */}
                            {(mode === "create" ||
                                (mode === "edit" && !initialData?.parentCategory)) && (
                                    <Box
                                        sx={{
                                            backgroundColor: "#F9F9FA",
                                            borderRadius: 4,
                                            p: 1,
                                            pb: 2,
                                            border: "1px solid #F2F2F2",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                py: 1,
                                                fontWeight: 100,
                                                color: "#8C929C",
                                                fontSize: 13,
                                                pl: 0.5
                                            }}
                                        >
                                            {mode === "create"
                                                ? "ชื่อหมวดหมู่หลัก"
                                                : "แก้ไขหมวดหมู่หลัก"}
                                        </Typography>

                                        <TextField
                                            size="small"
                                            // label="ชื่อหมวดหมู่"
                                            placeholder="กรอกชื่อหมวดหมู่"
                                            fullWidth
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            sx={textFieldStyle}
                                        />
                                    </Box>
                                )}

                            {/* 🟨 ฟอร์มหมวดย่อย */}
                            {(mode === "sub" ||
                                (mode === "edit" && initialData?.parentCategory)) && (
                                    <Box
                                        sx={{
                                            height: "auto",
                                            backgroundColor: "#F9F9FA",
                                            borderRadius: 4,
                                            py: 2,
                                            px: 1,
                                            border: "1px solid #F2F2F2",
                                            display: "flex",
                                            gap: 1.5,
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 100, color: "#8C929C", fontSize: 13, pl: 0.5 }}>
                                            ชื่อหมวดหมู่ย่อย
                                        </Typography>

                                        <TextField
                                            size="small"
                                            // label="ชื่อหมวดหมู่ย่อย"
                                            fullWidth
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            sx={textFieldStyle}
                                        />

                                        <Typography sx={{ fontWeight: 100, color: "#8C929C", fontSize: 13, pl: 0.5 }}>
                                            ระดับ
                                        </Typography>

                                        <TextField
                                            size="small"
                                            select
                                            // label="ระดับ"
                                            fullWidth
                                            defaultValue="เร่งด่วน"
                                            sx={{
                                                ...textFieldStyle,
                                                "& .MuiSelect-select": {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    py: 0.8,
                                                    fontSize: 14,
                                                    color: "#374151", // สีตัวอักษร
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    color: "#9CA3AF", // สีลูกศร dropdown
                                                },
                                            }}
                                        >
                                            <MenuItem value="เร่งด่วน">เร่งด่วน</MenuItem>
                                            <MenuItem value="ทั่วไป">ทั่วไป</MenuItem>
                                        </TextField>

                                        <Typography sx={{ fontWeight: 100, color: "#8C929C", fontSize: 13, pl: 0.5 }}>
                                            ระยะเวลาที่ต้องปิดจบ (ชั่วโมง)
                                        </Typography>

                                        <TextField
                                            size="small"
                                            type="number"
                                            // label="ระยะเวลาที่ต้องปิดจบ (ชั่วโมง)"
                                            placeholder="กรอกจำนวนชั่วโมง"
                                            fullWidth
                                            sx={textFieldStyle}
                                        />

                                        <Typography sx={{ fontWeight: 100, color: "#8C929C", fontSize: 13, pl: 0.5 }}>
                                            ระยะเวลาที่ต้องแก้ไข (วัน)
                                        </Typography>

                                        <TextField
                                            size="small"
                                            type="number"
                                            // label="ระยะเวลาที่ต้องแก้ไข (วัน)"
                                            placeholder="กรอกจำนวนวัน"
                                            fullWidth
                                            sx={textFieldStyle}
                                        />

                                        <Typography sx={{ fontWeight: 100, color: "#8C929C", fontSize: 13, pl: 0.5 }}>
                                            หน่วยงานรับผิดชอบ
                                        </Typography>

                                        <TextField
                                            size="small"
                                            select
                                            // label="หน่วยงานรับผิดชอบ"
                                            fullWidth
                                            defaultValue="ศูนย์ 1"
                                            sx={{
                                                ...textFieldStyle,
                                                "& .MuiSelect-select": {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    py: 0.8,
                                                    fontSize: 14,
                                                    color: "#374151", // สีตัวอักษร
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    color: "#9CA3AF", // สีลูกศร dropdown
                                                },
                                            }}
                                        >
                                            <MenuItem value="ศูนย์ 1">ศูนย์ 1</MenuItem>
                                            <MenuItem value="ศูนย์ 2">ศูนย์ 2</MenuItem>
                                            <MenuItem value="ศูนย์ 3">ศูนย์ 3</MenuItem>
                                            <MenuItem value="ศูนย์ 4">ศูนย์ 4</MenuItem>
                                        </TextField>
                                    </Box>
                                )}
                        </DialogContent>

                        {/* 🔹 ปุ่มด้านล่าง */}
                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button
                                onClick={handleClose}
                                color="inherit"
                                sx={{
                                    borderRadius: 3,
                                    border: "1px solid #F2F2F2",
                                    display: "flex",
                                    gap: 0.5,
                                }}
                            >
                                <CloseRoundedIcon sx={{ fontSize: 16 }} />
                                ยกเลิก
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleSave}
                                sx={{ borderRadius: 3, display: "flex", gap: 0.5 }}
                                disabled={!categoryName.trim()}
                            >
                                <CheckCircleRoundedIcon sx={{ fontSize: 16 }} />
                                ยืนยัน
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}

export default CategoryCreate;
