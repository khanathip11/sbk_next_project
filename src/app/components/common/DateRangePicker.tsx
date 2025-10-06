"use client";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Box, TextField, Typography } from "@mui/material";
import "dayjs/locale/th"; // โหลดภาษาไทย

export default function DateRangePickerDemo() {
    const [value, setValue] = React.useState([null, null]);

    return (
        <Box
            sx={{
                p: 3,
                backgroundColor: "#fafafa",
                borderRadius: 2,
                boxShadow: 1,
                maxWidth: 400,
            }}
        >
            <Typography variant="h6" gutterBottom>
                เลือกช่วงวันที่ (ตั้งแต่ - ถึง)
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
                <DateRangePicker
                    localeText={{
                        start: "วันที่เริ่มต้น",
                        end: "วันที่สิ้นสุด",
                    }}
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    slots={{
                        textField: (params) => (
                            <TextField {...params} fullWidth sx={{ mb: 2 }} />
                        ),
                    }}
                />
            </LocalizationProvider>

            {value[0] && value[1] && (
                <Typography sx={{ mt: 2 }}>
                    📅 ช่วงวันที่ที่เลือก: {value[0].format("DD/MM/YYYY")} -{" "}
                    {value[1].format("DD/MM/YYYY")}
                </Typography>
            )}
        </Box>
    );
}
