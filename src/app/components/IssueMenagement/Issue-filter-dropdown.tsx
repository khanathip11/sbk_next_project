"use client";
import React from 'react'
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface Option {
    value: string;
    label: string;
}

interface IssueFilterDropdownProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
}

const IssueFilterDropdown = ({ label, value, onChange, options }: IssueFilterDropdownProps) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value);
    }

    return (
        <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                    const selectedOption = options.find((opt) => opt.value === selected);
                    return selectedOption ? `${label}: ${selectedOption.label}` : `${label}: -`;
                }}
                sx={{
                    borderRadius: 2,
                    fontSize: 13,
                    backgroundColor: "#fff",
                }}
            >
                {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default IssueFilterDropdown