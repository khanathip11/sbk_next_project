"use client";
import React, { useState } from "react";
import {
    Stack,
    FormControl,
    Select,
    MenuItem,
    InputAdornment,
    OutlinedInput,
    Tooltip,
    IconButton,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
export interface FilterValues {
    search?: string;
    status?: string;
    unit?: string;
    priority?: string;
    category?: string;
    level?: string
    auditTrail?: string;
}

export interface GenericFilterProps {
    role: string;
    organizationUnit: string;
    visibleFilters?: (keyof FilterValues)[];
    onChange: (filters: Partial<FilterValues>) => void;
}

/** ✅ Filter กลางแบบ Type-safe และใช้ Select Style ตามที่กำหนด */
export const GenericFilter: React.FC<GenericFilterProps> = ({
    role,
    organizationUnit,
    visibleFilters = ["search", "status", "unit", "level", "auditTrail"],
    onChange,
}) => {
    const canViewAllUnits = role === "admin" || organizationUnit === "หน่วยแม่";

    /** 🔹 options */
    const statusOptions = [
        { label: "ทั้งหมด", value: "" },
        { label: "ระบบรับข้อมูลแล้ว", value: "pending" },
        { label: "เจ้าหน้าที่ตรวจสอบ", value: "in-progress" },
        { label: "ส่งต่อให้หน่วยงาน", value: "send-unit" },
        { label: "หน่วยงานกำลังดำเนินการ", value: "going-do" },
        { label: "ดำเนินการเสร็จสิ้น", value: "done" },
        { label: "ไม่สามารถดำเนินการได้", value: "not-don" },
    ];

    const levelOptions = [
        { label: "ทั้งหมด", value: "" },
        { label: "เร่งด่วน", value: "fast" },
        { label: "ทั่วไป", value: "original" },
    ];

    // const unitOptions = canViewAllUnits
    //     ? [
    //         { label: "ทุกหน่วย", value: "" },
    //         { label: "ศูนย์ กทม.", value: "ศูนย์ กทม." },
    //         { label: "ศูนย์ ภาคเหนือ", value: "ศูนย์ ภาคเหนือ" },
    //         { label: "จังหวัด", value: "จังหวัด" },
    //     ]
    //     : [{ label: organizationUnit, value: organizationUnit }];

    const unitOptions = [
        { label: "ทุกหน่วย", value: "" },
        { label: "ศูนย์ กทม.", value: "ศูนย์ กทม." },
        { label: "ศูนย์ ภาคเหนือ", value: "ศูนย์ ภาคเหนือ" },
        { label: "จังหวัด", value: "จังหวัด" },
    ]

    /** 🔧 State ภายใน (optional) */
    const [filters, setFilters] = React.useState<FilterValues>({
        search: "",
        status: "",
        unit: "",
    });

    /** 🧩 handleChange — ปลอดภัยด้วย keyof */
    const handleChange = <K extends keyof FilterValues>(
        key: K,
        value: FilterValues[K]
    ) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onChange(newFilters);
    };

    const [activeButton, setActiveButton] = useState<"audit" | "overview">("audit");

    // เปลี่ยนหน้าและสถานะปุ่ม
    const handleClick = (type: "audit" | "overview") => {
        setActiveButton(type);

        if (type === "audit") {
            console.log("📘 เปิดหน้า: รายการใช้ระบบ (Audit Trail)");
            // TODO: setPageData(auditData)
        } else {
            console.log("🏠 เปิดหน้า: ภาพรวมรายหน่วย (Overview)");
            // TODO: setPageData(overviewData)
        }
    };

    return (
        <Stack direction="row" spacing={1}>
            {/* Audit trail */}
            {visibleFilters.includes("auditTrail") && (
                <Box
                    sx={{
                        backgroundColor: '#F2F2F4',
                        display: 'flex',
                        height: 36,
                        gap: 0.3,
                        p: 0.3,
                        borderRadius: 3,
                        border: '1px solid #EBEBEB',
                        flexShrink: 0,
                    }}
                >
                    <Tooltip title="ดูรายการใช้ระบบ">
                        <IconButton
                            size="small"
                            sx={{
                                p: 0.5,
                                px: 1,
                                borderRadius: 2,
                                backgroundColor: activeButton === "audit" ? "#004D99" : "transparent",
                                // border: "1px solid #004D99",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    backgroundColor: activeButton === "audit" ? "#003970" : "#E5E8EB",
                                },
                            }}
                            onClick={() => handleClick("audit")}
                        >
                            <PersonRoundedIcon
                                sx={{
                                    fontSize: 16,
                                    color: activeButton === "audit" ? "#fff" : "#8C929C",
                                    mr: 1,
                                }}
                            />
                            <Typography
                                sx={{
                                    color: activeButton === "audit" ? "#fff" : "#8C929C",
                                    fontSize: 12,
                                    fontWeight: 500,
                                }}
                            >
                                รายการใช้ระบบ
                            </Typography>
                        </IconButton>
                    </Tooltip>

                    {/* 🔹 ปุ่ม Overview */}
                    <Tooltip title="ภาพรวมรายหน่วย">
                        <IconButton
                            size="small"
                            sx={{
                                p: 0.5,
                                px: 1,
                                borderRadius: 2,
                                backgroundColor: activeButton === "overview" ? "#004D99" : "transparent",
                                // border: "1px solid #004D99",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    backgroundColor: activeButton === "overview" ? "#003970" : "#E5E8EB",
                                },
                            }}
                            onClick={() => handleClick("overview")}
                        >
                            <HomeRoundedIcon
                                sx={{
                                    fontSize: 16,
                                    color: activeButton === "overview" ? "#fff" : "#8C929C",
                                    mr: 1,
                                }}
                            />
                            <Typography
                                sx={{
                                    color: activeButton === "overview" ? "#fff" : "#8C929C",
                                    fontSize: 12,
                                    fontWeight: 500,
                                }}
                            >
                                ภาพรวมรายหน่วย
                            </Typography>
                        </IconButton>
                    </Tooltip>
                </Box>
            )}

            {/* 🔍 Search Box */}
            {visibleFilters.includes("search") && (
                <OutlinedInput
                    size="small"
                    placeholder="ค้นหา..."
                    value={filters.search || ""}
                    onChange={(e) => handleChange("search", e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon sx={{ fontSize: 18, color: "#5f6470" }} />
                        </InputAdornment>
                    }
                    sx={{
                        minWidth: 180,
                        height: 36,
                        borderRadius: 3,
                        backgroundColor: "#f2f2f4",
                        fontSize: 13,
                    }}
                />
            )}

            {/* 🏢 ระดับของปัญหา */}
            {visibleFilters.includes("level") && (
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                        value={filters.level || ""}
                        onChange={(e) => handleChange("level", e.target.value)}
                        displayEmpty
                        renderValue={(selected) => {
                            const selectedOption = levelOptions.find(
                                (opt) => opt.value === selected
                            );
                            return selectedOption
                                ? `ระดับของปัญหา: ${selectedOption.label}`
                                : "ระดับของปัญหา: -";
                        }}
                        sx={{
                            borderRadius: 2,
                            fontSize: 13,
                            backgroundColor: "#fff",
                        }}
                    >
                        {levelOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {/* 🔹 สถานะ */}
            {visibleFilters.includes("status") && (
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                        value={filters.status || ""}
                        onChange={(e) => handleChange("status", e.target.value)}
                        displayEmpty
                        renderValue={(selected) => {
                            const selectedOption = statusOptions.find(
                                (opt) => opt.value === selected
                            );
                            return selectedOption
                                ? `สถานะการแก้ไขปัญหา: ${selectedOption.label}`
                                : "สถานะการแก้ไขปัญหา: -";
                        }}
                        sx={{
                            borderRadius: 2,
                            fontSize: 13,
                            backgroundColor: "#fff",
                        }}
                    >
                        {statusOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {/* 🏢 หน่วย */}
            {visibleFilters.includes("unit") && (
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                        value={filters.unit || ""}
                        onChange={(e) => handleChange("unit", e.target.value)}
                        displayEmpty
                        renderValue={(selected) => {
                            const selectedOption = unitOptions.find(
                                (opt) => opt.value === selected
                            );
                            return selectedOption
                                ? `หน่วย: ${selectedOption.label}`
                                : "หน่วย: -";
                        }}
                        sx={{
                            borderRadius: 2,
                            fontSize: 13,
                            backgroundColor: "#fff",
                        }}
                    >
                        {unitOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </Stack>
    );
};
