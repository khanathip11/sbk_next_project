"use client";

import React from "react";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface FilterDropdownProps {
    label: string; // 🔹 ชื่อของ dropdown เช่น "ประเภทปัญหา", "ภาค"
    value: string; // 🔹 ค่าปัจจุบันที่ถูกเลือก
    options: { value: string; label: string }[]; // 🔹 รายการตัวเลือกทั้งหมด
    onChange: (value: string) => void; // 🔹 ฟังก์ชัน callback เมื่อมีการเปลี่ยนค่า
    showLabelPrefix?: boolean; // 🔸 ตัวเลือก: แสดง prefix ชื่อ label ด้านหน้า เช่น "ประเภทปัญหา: ถนน"
}

/**
 * ✅ FilterDropdown
 * ใช้สำหรับสร้าง dropdown แบบ reusable (ใช้ได้ทุกหน้า)
 * - รองรับ label prefix (เช่น "ประเภท: ถนน")
 * - ปรับแต่งขนาด, สีพื้นหลัง, และ font ให้เหมาะกับ design system ของโครงการ
 */
const FilterDropdown = ({
    label,
    value,
    options,
    onChange,
    showLabelPrefix = true, // 🟢 ค่าเริ่มต้นให้แสดง label prefix
}: FilterDropdownProps) => {

    // เมื่อมีการเลือกค่าใหม่จาก dropdown
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <FormControl size="small" sx={{ minWidth: 120, flexShrink: 0 }}>
            <Select
                value={value} // ✅ ค่าเลือกปัจจุบัน
                onChange={handleChange}
                displayEmpty // ✅ แสดงค่ากำหนดเองตอนยังไม่มีการเลือก
                renderValue={(selected) => {
                    // 🔸 ถ้ายังไม่มีค่า (selected == "")
                    if (!selected) {
                        return showLabelPrefix
                            ? `${label}: ทั้งหมด`
                            : label;
                    }
                    // 🔸 ถ้ามีค่าแล้ว (selected != "")
                    return showLabelPrefix
                        ? `${label}: ${selected}`
                        : selected;
                }}
                sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    height: 36,
                    fontFamily: "Kanit, sans-serif",
                    "& .MuiSelect-select": {
                        fontFamily: "Kanit, sans-serif",
                        fontSize: 14,
                    },
                }}
            >
                {/* 🔹 สร้างรายการตัวเลือกทั้งหมดจาก props.options */}
                {options.map((opt) => (
                    <MenuItem
                        key={opt.value}
                        value={opt.value}
                        sx={{ fontSize: 13 }}
                    >
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterDropdown;
