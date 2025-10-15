"use client";
import { Stack, TextField, InputAdornment, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import CategoryDatePicker from "./Category-datepicker";
import CategoryTableChild from "./Category-table-child";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CategoryCreate from "./Category-create";
import { Category, SubCategory } from "@/app/types/categoryType";
import { categories } from "@/app/data/categoryData";

const CategoryTable = () => {

    /**
     * ✅ State หลักของ Dialog (Modal) ทั้งหมด
     * รวมทุกโหมดไว้ใน object เดียว เช่น:
     *  - open: สถานะเปิด/ปิด modal
     *  - mode: โหมดการทำงาน ("create", "edit", "sub")
     *  - initialData: ข้อมูลเริ่มต้น เช่น ชื่อหมวด หรือชื่อหมวดหลัก
     */
    const [dialog, setDialog] = useState<{
        open: boolean;
        mode: "create" | "edit" | "sub";
        initialData?: {
            categoryName: string;
            parentCategory?: string | null;
        };
    }>({
        open: false,   // เริ่มต้นปิด modal
        mode: "create" // ค่าเริ่มต้นของโหมดคือ "create"
    });

    const [deleteTarget, setDeleteTarget] = useState<{ name: string; parent?: string | null } | null>(null)

    /** 
     * ✅ ฟังก์ชันปิด modal ทุกกรณี 
     * ใช้ร่วมกันได้หมด (create, edit, sub)
     * ทำโดย set ค่า open เป็น false 
     */
    const handleCloseDialog = () =>
        setDialog((prev) => ({ ...prev, open: false }));

    /**
     * ✅ ฟังก์ชันเปิด modal สำหรับ "เพิ่มหมวดหมู่หลัก"
     * เมื่อกดปุ่ม "เพิ่มหมวดหมู่" ที่ด้านบนของหน้า
     * จะเปิด dialog และตั้งโหมดเป็น "create"
     */
    const handleOpenCreate = () =>
        setDialog({ open: true, mode: "create" });

    /**
     * ✅ ฟังก์ชันเปิด modal สำหรับ "แก้ไขหมวดหมู่"
     * @param category  หมวดหมู่ที่ต้องการแก้ไข (อาจเป็นหมวดหลักหรือย่อย)
     * @param parent    หมวดหลัก (ในกรณีที่แก้ไขหมวดย่อย)
     * 
     * ขั้นตอน:
     * 1. เก็บข้อมูลหมวดหมู่ที่ถูกเลือกไว้ใน dialog.initialData
     * 2. กำหนด mode เป็น "edit"
     * 3. เปิด modal
     */
    const handleOpenEdit = (category: Category | SubCategory, parent?: Category) => {
        setDialog({
            open: true,
            mode: "edit",
            initialData: {
                categoryName: category.category,                // ชื่อหมวดหมู่ที่ต้องการแก้ไข
                parentCategory: parent ? parent.category : null, // ถ้ามี parent ให้เก็บชื่อหมวดหลัก
            },
        });
    };

    /**
     * ✅ ฟังก์ชันเปิด modal สำหรับ "เพิ่มหมวดย่อย"
     * @param parent หมวดหมู่หลักที่ต้องการเพิ่มหมวดย่อยเข้าไป
     * 
     * ขั้นตอน:
     * 1. เก็บชื่อหมวดหลักไว้ใน parentCategory
     * 2. ตั้งค่า mode เป็น "sub"
     * 3. เปิด modal
     */
    const handleOpenSub = (parent: Category) => {
        setDialog({
            open: true,
            mode: "sub",
            initialData: {
                categoryName: "",               // ค่าเริ่มต้นเป็นค่าว่าง (ยังไม่ได้ตั้งชื่อ)
                parentCategory: parent.category // แสดงชื่อหมวดหลักใน modal
            },
        });
    };

    /**
     * ✅ ฟังก์ชัน "ลบหมวดหมู่"
     * (ตอนนี้ยังไม่ได้ทำจริง แค่ log ดูใน console)
     * @param category หมวดหมู่ที่ต้องการลบ
     * @param parent   หมวดหลัก (ถ้ามี)
     */
    const handleDelete = (category: Category | SubCategory, parent?: Category) => {
        setDeleteTarget({
            name: category.category,
            parent: parent?.category ?? null
        })
    };

    // ----------------------------------------------------

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                bgcolor: "#F7F7F7",
                borderRadius: 4,
                boxSizing: "border-box",
            }}
        >

            {/* ------------------------------------------------------------
                🔹 ส่วน Header (ชื่อหน้า + ปุ่มเพิ่มหมวดหมู่)
            ------------------------------------------------------------ */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    mb: 1,
                }}
            >
                {/* 🔸 ชื่อหัวข้อหน้า */}
                <Typography
                    sx={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#000",
                    }}
                >
                    จัดการหมวดหมู่ของปัญหา
                </Typography>

                {/* 🔸 ปุ่มเปิด modal เพิ่มหมวดหมู่ */}
                <Button
                    variant="contained"
                    sx={{
                        ml: "auto",
                        display: "flex",
                        gap: 0.5,
                        borderRadius: 2,
                        backgroundColor: '#004D99',
                        fontSize: 10,
                    }}
                    onClick={handleOpenCreate}
                >
                    <AddCircleRoundedIcon sx={{ fontSize: 16 }} />
                    เพิ่มหมวดหมู่
                </Button>
            </Box>

            {/* ------------------------------------------------------------
                🔹 ส่วน Filter ด้านบนของตาราง
                ใช้ค้นหา + เลือกวันที่ + แสดงจำนวนผลลัพธ์
            ------------------------------------------------------------ */}
            <Stack
                sx={{
                    display: "flex",
                    width: "100%",
                    gap: 1,
                    px: 2,
                    pb: 0,
                    pt: 1,
                    flexShrink: 0,
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                }}
                direction="row"
                alignItems="center"
            >
                {/* 🔸 ช่องค้นหา */}
                <TextField
                    id="complaint-search"
                    placeholder="ค้นหา"
                    variant="outlined"
                    size="small"
                    sx={{
                        minWidth: "300px",
                        width: "200px",
                        flexShrink: 0,
                        bgcolor: "#f2f2f4",
                        "& .MuiOutlinedInput-root": {
                            height: 36,
                            borderRadius: 3,
                            "& fieldset": { borderColor: "#D1D5DB" },
                            "&:hover fieldset": { borderColor: "#9CA3AF" },
                            "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: 18, color: "#5f6470" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Box flexGrow={1} />

                {/* 🔸 ส่วนกรองเพิ่มเติม: วันที่ + จำนวนผลลัพธ์ */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexShrink: 0,
                        flexWrap: "nowrap",
                        overflowX: "auto",
                        "&::-webkit-scrollbar": { display: "none" },
                        scrollbarWidth: "none",
                    }}
                >
                    <CategoryDatePicker />

                    <Typography sx={{ fontSize: 12 }}>ผลลัพธ์</Typography>

                    <Typography
                        sx={{
                            height: 35,
                            border: "1px solid #D9D9D9",
                            px: 1,
                            borderRadius: 2,
                            backgroundColor: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                    >
                        {categories.length}
                    </Typography>
                </Box>
            </Stack>

            {/* ------------------------------------------------------------
                🔹 ส่วนหลัก: ตาราง TreeView ของหมวดหมู่
            ------------------------------------------------------------ */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    p: 2,
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                }}
            >

                {/* ✅ ใช้ CategoryCreate ตัวเดียวควบคุมทุกโหมด */}
                <CategoryCreate
                    open={dialog.open}                  // เปิด/ปิด modal
                    handleClose={handleCloseDialog}      // ปิด modal
                    mode={dialog.mode}                   // โหมดการทำงาน (create/edit/sub)
                    initialData={dialog.initialData}     // ข้อมูลเริ่มต้น (ชื่อหมวด / หมวดหลัก)
                    deleteTarget={deleteTarget}
                />

                <Dialog
                    open={!!deleteTarget}
                    onClose={() => setDeleteTarget(null)}
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
                        },
                    }}
                >
                    <DialogTitle>ยืนยันการลบ</DialogTitle>

                    <DialogContent>
                        <Typography>
                            {`ต้องการลบหมวดหมู่ ${deleteTarget?.name}`}
                            {deleteTarget?.parent && ` (ภายใต้ ${deleteTarget.parent}) `} ใช่หรือไม่?
                        </Typography>
                    </DialogContent>

                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button
                            onClick={() => setDeleteTarget(null)}
                            color="inherit"
                            sx={{
                                borderRadius: 3,
                                border: "1px solid #F2F2F2",
                            }}>
                            ยกเลิก
                        </Button>

                        <Button
                            color="error"
                            variant="contained"
                            onClick={() => {
                                console.log("ลบจริง:", deleteTarget);
                                setDeleteTarget(null);
                            }}
                            sx={{ borderRadius: 3 }}
                        >
                            ลบ
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* ✅ ตาราง TreeView ที่ใช้แสดงหมวดหมู่ทั้งหมด */}
                {/* ส่งฟังก์ชัน handleOpenEdit / handleOpenSub / handleDelete
                    ไปให้ child เรียกใช้งานเวลาผู้ใช้คลิกปุ่มต่าง ๆ */}
                <CategoryTableChild
                    onEdit={handleOpenEdit}
                    onAddSub={handleOpenSub}
                    onDelete={handleDelete}
                />
            </Box>
        </Box>
    );
};

export default CategoryTable