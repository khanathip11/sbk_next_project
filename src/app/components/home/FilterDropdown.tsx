"use client";

import React from 'react'
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface FilterDropdownProps {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}

const FilterDropdown = ({ label, value, options, onChange }: FilterDropdownProps) => {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                    if (!selected) {
                        return <em>{label}</em>;
                    }
                    return selected;
                }}
                sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                    height: `36px`
                }}
            >
                <MenuItem value="">
                    <em>{label}</em>
                </MenuItem>
                {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default FilterDropdown