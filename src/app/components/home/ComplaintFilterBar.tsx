"use client";

import React, { useState } from 'react'
import FilterDropdown from './FilterDropdown';
import { Box } from '@mui/material';

const ComplaintFilterBar = () => {
    const [problemType, setProblemType] = useState("");
    const [region, setRegion] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [subdistrict, setSubdistrict] = useState("");

    const dropdowns = [
        <FilterDropdown key="problemType" label="ประเภทปัญหา" value={problemType} onChange={setProblemType}
            options={[{ value: "all", label: "ทั้งหมด" }, { value: "road", label: "ถนน" }]} />,
        <FilterDropdown key="region" label="ภาค" value={region} onChange={setRegion}
            options={[{ value: "all", label: "ทั้งหมด" }, { value: "north", label: "เหนือ" }]} />,
        <FilterDropdown key="province" label="จังหวัด" value={province} onChange={setProvince}
            options={[{ value: "all", label: "ทั้งหมด" }]} />,
        <FilterDropdown key="district" label="อำเภอ" value={district} onChange={setDistrict}
            options={[{ value: "all", label: "ทั้งหมด" }]} />,
        <FilterDropdown key="subdistrict" label="ตำบล" value={subdistrict} onChange={setSubdistrict}
            options={[{ value: "all", label: "ทั้งหมด" }]} />,
        <FilterDropdown key="period" label="ช่วงเวลา" value={subdistrict} onChange={setSubdistrict}
            options={[{ value: "all", label: "ทั้งหมด" }]} />,
        <FilterDropdown key="statuss" label="ตัวเลือก" value={subdistrict} onChange={setSubdistrict}
            options={[{ value: "all", label: "ทั้งหมด" }, { value: "open", label: "เปิด" }, { value: "close", label: "ปิด" }]} />,
        <FilterDropdown key="statusss" label="ตัวเลือก" value={subdistrict} onChange={setSubdistrict}
            options={[{ value: "all", label: "ทั้งหมด" }, { value: "open", label: "เปิด" }, { value: "close", label: "ปิด" }]} />,
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                alignItems: "flex-start",
                maxWidth: "calc(100% - 20px)",
            }}
        >
            {dropdowns}
        </Box>
    )
}

export default ComplaintFilterBar;
