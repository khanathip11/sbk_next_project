"use client";
import * as React from "react";
import { Stack, Typography, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/th";

interface DateRangeFilterProps {
    /** 📅 วันที่เริ่มต้น */
    startDate?: Dayjs | null;
    /** 📅 วันที่สิ้นสุด */
    endDate?: Dayjs | null;
    /** 🧩 ฟังก์ชัน callback เมื่อเปลี่ยนช่วงวันที่ */
    onChange: (range: { startDate: Dayjs | null; endDate: Dayjs | null }) => void;
    /** 🔤 กำหนด placeholder หรือข้อความเริ่มต้น */
    placeholderStart?: string;
    placeholderEnd?: string;
    /** 🎨 กำหนดความกว้าง (optional) */
    width?: number;
    /** 🧭 กำหนด role / organizationUnit เผื่อในอนาคตต้องปรับสิทธิ์ */
    role?: string;
    organizationUnit?: string;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
    startDate = null,
    endDate = null,
    onChange,
    placeholderStart = "เริ่มต้น",
    placeholderEnd = "สิ้นสุด",
    width = 160,
    role,
    organizationUnit,
}) => {
    const [start, setStart] = React.useState<Dayjs | null>(startDate);
    const [end, setEnd] = React.useState<Dayjs | null>(endDate);

    /** 🔧 เมื่อเปลี่ยนค่า */
    const handleChange = (key: "start" | "end", value: Dayjs | null) => {
        const newRange =
            key === "start"
                ? { startDate: value, endDate: end }
                : { startDate: start, endDate: value };
        setStart(newRange.startDate);
        setEnd(newRange.endDate);
        onChange(newRange);
    };

    /** 🧱 ฟังก์ชันสร้าง TextField */
    const renderInputWithDefault = (
        params: React.ComponentProps<typeof TextField>,
        placeholder: string
    ) => (
        <TextField
            {...params}
            placeholder={placeholder}
            size="small"
            sx={{
                width,
                "& .MuiOutlinedInput-root": {
                    height: 35,
                    borderRadius: 2,
                },
                "& .MuiOutlinedInput-input": {
                    fontSize: 13,
                },
            }}
        />
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
            <Stack direction="row" spacing={1} alignItems="center">
                {/* 🔹 วันที่เริ่มต้น */}
                <DatePicker
                    label={null}
                    value={start}
                    onChange={(newValue) => handleChange("start", newValue)}
                    enableAccessibleFieldDOMStructure={false}
                    slots={{
                        textField: (params) =>
                            renderInputWithDefault(params, placeholderStart),
                    }}
                />

                <Typography sx={{ fontSize: 12 }}>ถึง</Typography>

                {/* 🔹 วันที่สิ้นสุด */}
                <DatePicker
                    label={null}
                    value={end}
                    onChange={(newValue) => handleChange("end", newValue)}
                    enableAccessibleFieldDOMStructure={false}
                    slots={{
                        textField: (params) =>
                            renderInputWithDefault(params, placeholderEnd),
                    }}
                />
            </Stack>
        </LocalizationProvider>
    );
};
