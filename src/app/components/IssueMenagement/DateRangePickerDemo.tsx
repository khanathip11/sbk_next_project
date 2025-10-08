import * as React from "react";
import { Stack, Typography, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/th";

export default function DatePickerWithDefaultText() {
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

    // ✅ ฟังก์ชันสร้าง TextField สำหรับ date picker
    const renderInputWithDefault = (
        params: React.ComponentProps<typeof TextField>
    ) => (
        <TextField
            {...params}
            placeholder="ทั้งหมด"
            size="small"
            sx={{
                width: 160,
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
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
            >
                {/* ---------- วันที่เริ่มต้น ---------- */}
                <DatePicker
                    label={null}
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    enableAccessibleFieldDOMStructure={false} // ✅ ป้องกัน sectionListRef error
                    slots={{
                        textField: renderInputWithDefault,
                    }}
                />

                <Typography >ถึง</Typography>

                {/* ---------- วันที่สิ้นสุด ---------- */}
                <DatePicker
                    label={null}
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    enableAccessibleFieldDOMStructure={false} // ✅ เช่นเดียวกัน
                    slots={{
                        textField: renderInputWithDefault,
                    }}
                />
            </Stack>
        </LocalizationProvider>
    );
}
