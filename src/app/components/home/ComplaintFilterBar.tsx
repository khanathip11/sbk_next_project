"use client";

import React, { useState } from 'react'
import FilterDropdown from './FilterDropdown';
import { Box, Button } from '@mui/material';
import DatePickerWithDefaultText from '../IssueMenagement/DateRangePickerDemo';
import ComplaintDatePicker from './ComplaintDatePicker';

interface ComplaintFilterBarProps {
    open: boolean;
}

const ComplaintFilterBar: React.FC<ComplaintFilterBarProps> = ({ open }) => {
    const [days, setDays] = useState("");
    const [problemType, setProblemType] = useState("");
    const [region, setRegion] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [subdistrict, setSubdistrict] = useState("");
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

    function handleOpenDatePicker() {
        setOpenDatePicker((prev) => !prev)
    }

    // const dropdowns = [
    //     <FilterDropdown key="problemType" label="ประเภทปัญหา" value={problemType} onChange={setProblemType}
    //         options={[{ value: "all", label: "ทั้งหมด" }, { value: "road", label: "ถนน" }]} />,
    //     <FilterDropdown key="region" label="ภาค" value={region} onChange={setRegion}
    //         options={[{ value: "all", label: "ทั้งหมด" }, { value: "north", label: "เหนือ" }]} />,
    //     <FilterDropdown key="province" label="จังหวัด" value={province} onChange={setProvince}
    //         options={[{ value: "all", label: "ทั้งหมด" }]} />,
    //     <FilterDropdown key="district" label="อำเภอ" value={district} onChange={setDistrict}
    //         options={[{ value: "all", label: "ทั้งหมด" }]} />,
    //     <FilterDropdown key="subdistrict" label="ตำบล" value={subdistrict} onChange={setSubdistrict}
    //         options={[{ value: "all", label: "ทั้งหมด" }]} />,
    // ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: 'column',
                flexWrap: "wrap",
                gap: 0.5,
                alignItems: "flex-start",
                maxWidth: "calc(100% - 20px)",
            }}
        >
            <Box sx={{ display: "flex", gap: 0.5, flexWrap: 'wrap' }}>
                <FilterDropdown label="ทั้งหมด" value={days} onChange={setDays}
                    options={[{ value: "วันนี้", label: "วันนี้" }, { value: "3 วันย้อนหลัง", label: "3 วันย้อนหลัง" }, { value: "7 วันย้อนหลัง", label: "7 วันย้อนหลัง" }]} />

                <Button
                    variant="contained"
                    onClick={handleOpenDatePicker}
                    sx={{
                        width: 'auto',
                        height: 35,
                        borderRadius: 2,
                        backgroundColor: '#fff',
                        color: '#000',
                        textAlign: 'center',
                        fontWeight: 'normal',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 2,
                        pt: 1.1,
                        boxShadow: 'none',
                        transition: 'none',
                        '&:hover': {
                            // border: '1px solid #000',   
                            boxShadow: 'none',
                            transform: 'none',
                        },
                    }}
                >
                    กำหนดเอง
                </Button>

                {/* {dropdowns} */}

                <FilterDropdown key="problemType" label="ประเภทปัญหา" value={problemType} onChange={setProblemType}
                    options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }, { value: "ถนน", label: "ถนน" }]} />

                <FilterDropdown key="region" label="ภาค" value={region} onChange={setRegion}
                    options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }, { value: "เหนือ", label: "เหนือ" }]} />

                <FilterDropdown key="province" label="จังหวัด" value={province} onChange={setProvince}
                    options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }]} />

                <FilterDropdown key="district" label="อำเภอ" value={district} onChange={setDistrict}
                    options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }]} />

                <FilterDropdown key="subdistrict" label="ตำบล" value={subdistrict} onChange={setSubdistrict}
                    options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }]} />
            </Box>
            <Box>
                {openDatePicker && <ComplaintDatePicker />}
            </Box>
        </Box>
    )
}

export default ComplaintFilterBar;
