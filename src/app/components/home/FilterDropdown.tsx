// "use client";

// import React from 'react'
// import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

// interface FilterDropdownProps {
//     label: string;
//     value: string;
//     options: { value: string; label: string }[];
//     onChange: (value: string) => void;
//     showLabelPrefix?: boolean; // ✅ เพิ่ม prop ตัวเลือก
// }

// const FilterDropdown = ({ label, value, options, onChange, showLabelPrefix }: FilterDropdownProps) => {
//     const handleChange = (event: SelectChangeEvent) => {
//         onChange(event.target.value as string);
//     };

//     return (
//         <FormControl size="small" sx={{ minWidth: 100 }}>
//             <Select
//                 value={value}
//                 onChange={handleChange}
//                 displayEmpty
//                 renderValue={(selected) => {
//                     if (!selected) {
//                         return <>{label}</>;
//                     }
//                     return selected;
//                 }}
//                 sx={{
//                     bgcolor: "white",
//                     borderRadius: 2,
//                     height: `36px`,
//                     fontFamily: "Kanit, sans-serif", // ✅ ใช้ Kanit
//                     "& .MuiSelect-select": {
//                         fontFamily: "Kanit, sans-serif", // ✅ ข้อความใน select
//                         fontSize: 14,
//                     },
//                 }}
//             >
//                 {/* <MenuItem value="" sx={{ fontSize: 13 }}>
//                     <>{label}</>
//                 </MenuItem> */}
//                 {options.map((opt) => (
//                     <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>
//                         {opt.label}
//                     </MenuItem>
//                 ))}
//             </Select>
//         </FormControl>

//     )
// }

// export default FilterDropdown

"use client";

import React from "react";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface FilterDropdownProps {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    showLabelPrefix?: boolean;
}

const FilterDropdown = ({
    label,
    value,
    options,
    onChange,
    showLabelPrefix = true, // ✅ default true
}: FilterDropdownProps) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <FormControl size="small" sx={{ minWidth: 120, flexShrink: 0 }}>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                    if (!selected) {
                        return showLabelPrefix ? `${label}: ทั้งหมด` : label;
                    }
                    return showLabelPrefix ? `${label}: ${selected}` : selected;
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
                {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterDropdown;
