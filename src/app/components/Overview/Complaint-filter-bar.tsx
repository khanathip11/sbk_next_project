// "use client";

// import React, { useState } from 'react'
// import FilterDropdown from './Filter-dropdown';
// import { Box, Button } from '@mui/material';
// import { DateRangeFilter } from '../common/DateRangeFilter';
// import ComplaintDatePicker from './Complain-datepicker';

// interface ComplaintFilterBarProps {
//     open: boolean;
// }

// const ComplaintFilterBar: React.FC<ComplaintFilterBarProps> = ({ open }) => {
//     const [days, setDays] = useState("วันนี้");
//     const [problemType, setProblemType] = useState("ทั้งหมด");
//     const [region, setRegion] = useState("ทั้งหมด");
//     const [province, setProvince] = useState("ทั้งหมด");
//     const [district, setDistrict] = useState("ทั้งหมด");
//     const [subdistrict, setSubdistrict] = useState("ทั้งหมด");
//     const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

//     function handleOpenDatePicker() {
//         setOpenDatePicker((prev) => !prev)
//     }

//     // const dropdowns = [
//     //     <FilterDropdown key="problemType" label="ประเภทปัญหา" value={problemType} onChange={setProblemType}
//     //         options={[{ value: "all", label: "ทั้งหมด" }, { value: "road", label: "ถนน" }]} />,
//     //     <FilterDropdown key="region" label="ภาค" value={region} onChange={setRegion}
//     //         options={[{ value: "all", label: "ทั้งหมด" }, { value: "north", label: "เหนือ" }]} />,
//     //     <FilterDropdown key="province" label="จังหวัด" value={province} onChange={setProvince}
//     //         options={[{ value: "all", label: "ทั้งหมด" }]} />,
//     //     <FilterDropdown key="district" label="อำเภอ" value={district} onChange={setDistrict}
//     //         options={[{ value: "all", label: "ทั้งหมด" }]} />,
//     //     <FilterDropdown key="subdistrict" label="ตำบล" value={subdistrict} onChange={setSubdistrict}
//     //         options={[{ value: "all", label: "ทั้งหมด" }]} />,
//     // ];

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 flexDirection: 'column',
//                 flexWrap: "wrap",
//                 gap: 0.5,
//                 alignItems: "flex-start",
//                 maxWidth: "calc(100% - 20px)",
//             }}
//         >
//             <Box sx={{ display: "flex", gap: 0.5, flexWrap: 'wrap' }}>
//                 <FilterDropdown
//                     label="วันนี้"
//                     value={days}
//                     onChange={setDays}
//                     showLabelPrefix={false} // ✅ ไม่มี prefix
//                     options={[
//                         { value: "วันนี้", label: "วันนี้" },
//                         { value: "3 วันย้อนหลัง", label: "3 วันย้อนหลัง" },
//                         { value: "7 วันย้อนหลัง", label: "7 วันย้อนหลัง" },
//                     ]}
//                 />

//                 {/* <DateRangeFilter
//                     startDate={null}
//                     endDate={null}
//                     onChange={({ startDate, endDate }) => {
//                         console.log("ช่วงวันที่ที่เลือก:", startDate?.format("YYYY-MM-DD"), endDate?.format("YYYY-MM-DD"));
//                         // 🔹 คุณสามารถนำไป filter issuesData ต่อได้เลย
//                     }}
//                 /> */}

//                 <ComplaintDatePicker />
//                 {/* {dropdowns} */}

//                 <FilterDropdown key="problemType" label="ประเภทปัญหา" value={problemType} onChange={setProblemType}
//                     options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }, { value: "ถนน", label: "ถนน" }]} />

//                 <FilterDropdown key="region" label="ภาค" value={region} onChange={setRegion}
//                     options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }, { value: "เหนือ", label: "เหนือ" }]} />

//                 <FilterDropdown key="province" label="จังหวัด" value={province} onChange={setProvince}
//                     options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }]} />

//                 <FilterDropdown key="district" label="อำเภอ" value={district} onChange={setDistrict}
//                     options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }]} />

//                 <FilterDropdown key="subdistrict" label="ตำบล" value={subdistrict} onChange={setSubdistrict}
//                     options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }]} />
//             </Box>
//             <Box>
//                 {openDatePicker && <ComplaintDatePicker />}
//             </Box>
//         </Box>
//     )
// }

// export default ComplaintFilterBar;

"use client";

import React, { useState } from 'react'
import FilterDropdown from './Filter-dropdown';
import { Box, Button } from '@mui/material';
import ComplaintDatePicker from './Complain-datepicker'; // ✅ ใช้ DatePicker สำหรับกรองช่วงวัน

interface ComplaintFilterBarProps {
    open: boolean; // รับค่า state จาก parent เพื่อกำหนดว่า filter bar เปิดอยู่ไหม
}

const ComplaintFilterBar: React.FC<ComplaintFilterBarProps> = ({ open }) => {
    // 🎯 state สำหรับเก็บค่าที่เลือกใน dropdown แต่ละตัว
    const [days, setDays] = useState("วันนี้");           // ตัวเลือกช่วงวัน
    const [problemType, setProblemType] = useState("ทั้งหมด");
    const [region, setRegion] = useState("ทั้งหมด");
    const [province, setProvince] = useState("ทั้งหมด");
    const [district, setDistrict] = useState("ทั้งหมด");
    const [subdistrict, setSubdistrict] = useState("ทั้งหมด");

    // 🧭 state สำหรับควบคุมการเปิด/ปิด DatePicker “กำหนดเอง”
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

    // 🔘 toggle เปิด/ปิด date picker
    function handleOpenDatePicker() {
        setOpenDatePicker((prev) => !prev)
    }

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
            {/* 🔹 แถวแรก: Dropdown สำหรับตัวกรอง */}
            <Box sx={{ display: "flex", gap: 0.5, flexWrap: 'wrap' }}>
                {/* ✅ ตัวเลือกช่วงวัน (วันนี้, 3 วันย้อนหลัง, 7 วันย้อนหลัง) */}
                <FilterDropdown
                    label="วันนี้"
                    value={days}
                    onChange={setDays}
                    showLabelPrefix={false} // ❌ ไม่แสดง prefix เช่น "ช่วงวัน:"
                    options={[
                        { value: "วันนี้", label: "วันนี้" },
                        { value: "3 วันย้อนหลัง", label: "3 วันย้อนหลัง" },
                        { value: "7 วันย้อนหลัง", label: "7 วันย้อนหลัง" },
                    ]}
                />

                {/* 🗓️ ปุ่ม “กำหนดเอง” สำหรับเปิด DatePicker */}
                <ComplaintDatePicker />

                {/* 🔽 Dropdown กรองข้อมูลอื่น ๆ */}
                <FilterDropdown
                    key="problemType"
                    label="ประเภทปัญหา"
                    value={problemType}
                    onChange={setProblemType}
                    options={[
                        { value: "ทั้งหมด", label: "ทั้งหมด" },
                        { value: "ถนน", label: "ถนน" },
                    ]}
                />

                <FilterDropdown
                    key="region"
                    label="ภาค"
                    value={region}
                    onChange={setRegion}
                    options={[
                        { value: "ทั้งหมด", label: "ทั้งหมด" },
                        { value: "เหนือ", label: "เหนือ" },
                    ]}
                />

                <FilterDropdown
                    key="province"
                    label="จังหวัด"
                    value={province}
                    onChange={setProvince}
                    options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }]}
                />

                <FilterDropdown
                    key="district"
                    label="อำเภอ"
                    value={district}
                    onChange={setDistrict}
                    options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }]}
                />

                <FilterDropdown
                    key="subdistrict"
                    label="ตำบล"
                    value={subdistrict}
                    onChange={setSubdistrict}
                    options={[{ value: "ทั้งหมด", label: "ทั้งหมด" }]}
                />
            </Box>

            {/* 🔹 แถวที่สอง: แสดง DatePicker เมื่อกด “กำหนดเอง” */}
            <Box>
                {openDatePicker && <ComplaintDatePicker />}
            </Box>
        </Box>
    )
}

export default ComplaintFilterBar;
