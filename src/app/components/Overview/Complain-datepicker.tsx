import React from 'react'
import { Stack, Typography, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/th"; // ✅ ตั้งค่า locale ภาษาไทยให้ DatePicker

const ComplaintDatePicker = () => {
    // 🧠 เก็บค่าวันเริ่มต้นและวันสิ้นสุดของช่วงวันที่ที่เลือก
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

    // 🧩 ฟังก์ชัน custom สำหรับ render input ของ DatePicker
    // เพื่อให้ style ของ TextField ตรงกับดีไซน์ในระบบ
    const renderInputWithDefault = (
        params: React.ComponentProps<typeof TextField>
    ) => (
        <TextField
            {...params}
            placeholder="ทั้งหมด" // 🪶 แสดงค่าเริ่มต้นเมื่อยังไม่เลือกวัน
            size="small"
            sx={{
                width: 140,
                "& .MuiOutlinedInput-root": {
                    backgroundColor: '#fff',
                    height: 36,
                    borderRadius: 2,
                },
                "& .MuiOutlinedInput-input": {
                    fontSize: 13,
                },
            }}
        />
    );

    return (
        // 🗓️ LocalizationProvider ใช้ AdapterDayjs เพื่อให้ DatePicker ทำงานกับ Dayjs
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th" >
            <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                justifyContent="center"
            >
                {/* ---------------- วันที่เริ่มต้น ---------------- */}
                <DatePicker
                    label={null}
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)} // ✅ อัปเดตค่า startDate เมื่อเลือกวัน
                    enableAccessibleFieldDOMStructure={false} // 🔒 ป้องกัน warning จาก MUI เกี่ยวกับ DOM structure
                    slots={{
                        textField: renderInputWithDefault, // ใช้ฟังก์ชัน renderInput ที่เรากำหนดเอง
                    }}
                />

                {/* คำเชื่อม "ถึง" ระหว่างช่องวันที่ */}
                <Typography sx={{ color: '#fff', fontSize: 11 }}>ถึง</Typography>

                {/* ---------------- วันที่สิ้นสุด ---------------- */}
                <DatePicker
                    label={null}
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)} // ✅ อัปเดตค่า endDate
                    enableAccessibleFieldDOMStructure={false}
                    slots={{
                        textField: renderInputWithDefault, // ใช้สไตล์ input เดียวกัน
                    }}
                />
            </Stack>
        </LocalizationProvider>
    );
}

export default ComplaintDatePicker;
