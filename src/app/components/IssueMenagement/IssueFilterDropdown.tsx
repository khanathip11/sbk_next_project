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
        <FormControl size="small" sx={{ minWidth: 'auto' }}>
            <Select
                value={value}
                onChange={handleChange}
                sx={{
                    borderRadius: 2,
                    fontSize: 13,
                    backgroundColor: "#fff",
                }}
            >
                {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13 }}>
                        {`${label}: ${opt.label}`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default IssueFilterDropdown