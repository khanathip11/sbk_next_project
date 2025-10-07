'use client';
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    OutlinedInput,
} from '@mui/material';
import SpokeOutlinedIcon from '@mui/icons-material/SpokeOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

import { STATUS_OPTIONS } from '@/app/constants/statusOptions';
import { IssueItem } from '@/app/types/IssueItem';

interface OfficerFormProps {
    selectedIssue?: IssueItem | null;
}

const IssueInfoRight: React.FC<OfficerFormProps> = ({ selectedIssue }) => {
    const [status, setStatus] = useState<IssueItem['status']>('ระบบรับข้อมูลแล้ว');
    const [center, setCenter] = useState('');
    const [province, setProvince] = useState('');
    const [level, setLevel] = useState('');
    const [note, setNote] = useState('');
    const [region, setRegion] = useState<string>("1");

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
                <Typography sx={{ color: '#000' }}>สำหรับเจ้าหน้าที่</Typography>
            </Box>

            <Box
                sx={{
                    color: '#000',
                    width: '100%',
                    height: "600px",
                    border: '1px solid #F0F0F0',
                    borderRadius: 4,
                    backgroundColor: '#F7F7F7',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    overflowY: "auto",
                    scrollbarWidth: "none",   // Firefox
                    msOverflowStyle: "none",  // IE, Edge
                    "&::-webkit-scrollbar": {
                        display: "none",        // Chrome, Safari, Opera
                    },
                }}
            >
                {/* 🔹 อัปเดตสถานะใหม่ */}
                <Box sx={{ mb: -1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, }}>
                        <SpokeOutlinedIcon sx={{ fontSize: 18 }} />
                        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>อัปเดตสถานะใหม่</Typography>
                    </Box>

                    <FormControl fullWidth size="small" variant="outlined" sx={{ pl: 3 }}>
                        <InputLabel id="status-label" shrink sx={{ pl: 4 }}>
                            สถานะ
                        </InputLabel>
                        <Select
                            labelId="status-label"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as IssueItem['status'])}
                            label="สถานะ"
                            sx={{
                                borderRadius: 3,
                                backgroundColor: '#fff',
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#EDEDED", // เทาอ่อน
                                },
                            }}
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Box>

                {/* 🔹 เลือกหน่วยงานรับผิดชอบ */}
                <Box sx={{ mb: -1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <RecordVoiceOverOutlinedIcon sx={{ fontSize: 18 }} />
                        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            เลือกหน่วยงานรับผิดชอบ
                        </Typography>
                    </Box>

                    {/* 🔹 ศูนย์ / ภาค / จังหวัด */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        {/* 🔸 แถวบน: ศูนย์ + ภาค */}
                        <Box sx={{ display: "flex", gap: 1.5 }}>
                            {/* ศูนย์ */}
                            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5, pl: 3.2, color: '#5B616D' }}>
                                    ศูนย์
                                </Typography>
                                <FormControl fullWidth size="small" variant="outlined" sx={{ pl: 3 }}>
                                    <Select
                                        value={center}
                                        onChange={(e) => setCenter(e.target.value)}
                                        sx={{
                                            borderRadius: 3, backgroundColor: "#fff",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#EDEDED", // เทาอ่อน
                                            },
                                        }}
                                    >
                                        <MenuItem value="ศปบ.1">ศปบ.1</MenuItem>
                                        <MenuItem value="ศปบ.2">ศปบ.2</MenuItem>
                                        <MenuItem value="ศปบ.3">ศปบ.3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* ภาค */}
                            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                                <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5, color: '#5B616D' }}>
                                    ภาค
                                </Typography>
                                <FormControl fullWidth size="small" variant="outlined" >
                                    <Select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        sx={{
                                            borderRadius: 3, backgroundColor: "#fff",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#EDEDED", // เทาอ่อน
                                            },
                                        }}
                                    >
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>

                        {/* 🔸 แถวล่าง: จังหวัด */}
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5, pl: 3.2, color: '#5B616D' }}>
                                จังหวัด
                            </Typography>
                            <FormControl fullWidth size="small" variant="outlined" sx={{ pl: 3 }}>
                                <Select
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                    sx={{
                                        borderRadius: 3, backgroundColor: "#fff",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#EDEDED", // เทาอ่อน
                                        },
                                    }}
                                >
                                    <MenuItem value="กรุงเทพมหานคร">กรุงเทพมหานคร</MenuItem>
                                    <MenuItem value="นครราชสีมา">นครราชสีมา</MenuItem>
                                    <MenuItem value="ชลบุรี">ชลบุรี</MenuItem>
                                    <MenuItem value="เชียงใหม่">เชียงใหม่</MenuItem>
                                    <MenuItem value="ยะลา">ยะลา</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                </Box>

                {/* 🔹 ระดับของปัญหา */}
                <Box sx={{ mb: -1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <DoNotDisturbAltOutlinedIcon sx={{ fontSize: 18 }} />
                        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>ระดับของปัญหา</Typography>
                    </Box>

                    <FormControl fullWidth size="small" sx={{ pl: 3 }}>
                        <Select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            sx={{
                                borderRadius: 3, backgroundColor: '#fff',
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#EDEDED", // เทาอ่อน
                                },
                            }}
                        >
                            <MenuItem value="ทั่วไป">ทั่วไป</MenuItem>
                            <MenuItem value="เร่งด่วน">เร่งด่วน</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* 🔹 ระยะเวลา */}
                <Box sx={{ mb: -1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <ScheduleIcon sx={{ fontSize: 18 }} />
                        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            ระยะเวลาที่ต้องการแก้ไข
                        </Typography>
                    </Box>
                    <FormControl fullWidth size="small" sx={{ pl: 3 }}>
                        <Select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            sx={{
                                borderRadius: 3, backgroundColor: '#fff',
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#EDEDED", // เทาอ่อน
                                },
                            }}
                        >
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* 🔹 แนบไฟล์ */}
                {/* 🔹 แนบไฟล์ (ถ้ามี) */}
                <Box sx={{ mb: -1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <AttachFileOutlinedIcon sx={{ fontSize: 18 }} />
                        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            แนบไฟล์ (ถ้ามี)
                        </Typography>
                    </Box>

                    <Box
                        component="label"
                        sx={{
                            border: "2px dashed #E6E6E6",  // ✅ เส้นประ
                            borderRadius: 3,
                            height: 100,                    // ✅ กำหนดความสูง
                            width: "auto",                  // ✅ เต็มความกว้าง
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // flexDirection: "column",
                            color: "#757575",
                            cursor: "pointer",
                            backgroundColor: "#FAFAFA",
                            transition: "0.2s",
                            ml: 3,
                            "&:hover": {
                                backgroundColor: "#f0f0f0",
                                borderColor: "#9E9E9E",
                            },
                        }}
                    >
                        <Box sx={{
                            display: "flex", gap: 0,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: '#fff',
                            px: 1,
                            py: 0.5,
                            borderRadius: 3
                        }}>
                            <AttachFileOutlinedIcon sx={{ fontSize: 18 }} />
                            <Typography sx={{ fontSize: 14, color: "#616161" }}>
                                แนบไฟล์
                            </Typography>
                        </Box>
                        <input hidden type="file" multiple />
                    </Box>
                </Box>

                {/* 🔹 ข้อความเพิ่มเติม */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <TextsmsOutlinedIcon sx={{ fontSize: 18 }} />
                        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                            ข้อความเพิ่มเติม (ถ้ามี)
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="กรอกข้อความเพิ่มเติม..."
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                                backgroundColor: "#fff",
                            }, pl: 3,
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#D1D5DB", // เทาอ่อน
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box >
    );
};

export default IssueInfoRight;
