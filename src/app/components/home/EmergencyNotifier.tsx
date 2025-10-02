
import { Avatar, Box, Button, Card, CardMedia, Chip, FormControl, FormControlLabel, FormLabel, InputAdornment, MenuItem, OutlinedInput, Paper, Radio, RadioGroup, Select, SelectChangeEvent, TextField, ThemeProvider, Typography } from '@mui/material'
import React, { useState } from 'react'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import notification from '../../assets/noti.jpg'
import { provinces } from '@/app/data/provinces';
import { Province, District, Subdistrict } from '@/app/types/provinceOptions';

type EmergencyNotifierProps = {
    handleClose: () => void;
}

const EmergencyNotifier: React.FC<EmergencyNotifierProps> = ({ handleClose }) => {

    // state หลัก
    const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedSubdistricts, setSelectedSubdistricts] = useState<string[]>([]);

    // province -> districts
    const availableDistricts: District[] = provinces
        .filter((p) => selectedProvinces.includes(p.value))
        .flatMap((p) => p.districts);

    // district -> subdistricts
    const availableSubdistricts: Subdistrict[] = availableDistricts
        .filter((d) => selectedDistricts.includes(d.value))
        .flatMap((d) => d.subdistricts);

    // event handlers
    const handleProvinceChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedProvinces(value);
        setSelectedDistricts([]);
        setSelectedSubdistricts([]);
    };

    const handleDistrictChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedDistricts(value);
        setSelectedSubdistricts([]);
    };

    const handleSubdistrictChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedSubdistricts(value);
    };

    return (
        <Box
            sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', m: 'auto', }}
        >
            <Paper sx={{ width: '900px', height: 'auto', borderRadius: 4, backgroundColor: 'white', p: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', pt: 2 }}>
                    <ReportProblemIcon sx={{ fontSize: 60, color: '#FBD026' }} />
                    <Typography>สร้างการแจ้งเตือนฉุกเฉิน</Typography>
                </Box>

                <Box sx={{ display: 'flex', width: '100%', height: '100%', gap: 0 }}>

                    <Box sx={{ width: '80%', height: '500px', p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ mb: 1 }}>ร่าง</Typography>
                        <Box sx={{
                            p: 2,
                            borderRadius: 4, width: '90%', height: '85%', border: '1px solid #D4D0D2', overflow: 'auto',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                        }}>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    id="emergency-title"
                                    label="หัวข้อ"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            backgroundColor: '#fff',
                                            '&.Mui-focused': { backgroundColor: '#F0F0F0' },
                                        },
                                    }}
                                />

                                <TextField
                                    id="emergency-details"
                                    label="รายละเอียด"
                                    multiline
                                    rows={4}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            backgroundColor: '#fff',
                                            '&.Mui-focused': { backgroundColor: '#F0F0F0' },
                                        },
                                    }}
                                />

                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <TextField
                                        id="emergency-location"
                                        label="โลเคชั่นที่ต้องการแจ้ง"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon sx={{ fontSize: 18, color: '#7D7A7A' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        placeholder="ค้นหาสถานที่"
                                    />
                                    <Button variant="contained" sx={{ borderRadius: 3 }}>
                                        เลือก
                                    </Button>
                                </Box>

                                <hr style={{ width: '100%', color: '#F0F0F0' }} />

                                {/* ส่วนของ Radio + Select แนะนำให้แต่ละ Select ครอบด้วย FormControl แยกกัน */}
                                <FormLabel sx={{ fontSize: 13, color: '#000', mb: 1 }}>เลือกพื้นที่การส่ง</FormLabel>
                                <RadioGroup defaultValue="all">
                                    <FormControlLabel
                                        value="all"
                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />}
                                        label="ส่งให้ผู้ใช้ทั้งหมด"
                                    />
                                    <FormControlLabel
                                        value="region"
                                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />}
                                        label="ส่งตามพื้นที่"
                                    />
                                </RadioGroup>

                                {/* จังหวัด */}
                                <FormControl fullWidth size="small">
                                    <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                                        จังหวัด
                                    </Typography>
                                    <Select
                                        multiple
                                        value={selectedProvinces}
                                        onChange={handleProvinceChange}
                                        renderValue={(selected) =>
                                            selected.length === 0 ? (
                                                <em>กรุณาเลือกจังหวัด</em>
                                            ) : (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => {
                                                        const label = provinces.find((p) => p.value === value)?.label || value;
                                                        return <Chip key={value} label={label} size="small" />;
                                                    })}
                                                </Box>
                                            )
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>กรุณาเลือกจังหวัด</em>
                                        </MenuItem>
                                        {provinces.map((p) => (
                                            <MenuItem key={p.value} value={p.value}>
                                                {p.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* อำเภอ */}
                                <FormControl fullWidth size="small" disabled={!selectedProvinces.length}>
                                    <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                                        อำเภอ
                                    </Typography>
                                    <Select
                                        multiple
                                        value={selectedDistricts}
                                        onChange={handleDistrictChange}
                                        renderValue={(selected) =>
                                            selected.length === 0 ? (
                                                <em>กรุณาเลือกอำเภอ</em>
                                            ) : (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => {
                                                        const label = availableDistricts.find((d) => d.value === value)?.label || value;
                                                        return <Chip key={value} label={label} size="small" />;
                                                    })}
                                                </Box>
                                            )
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>กรุณาเลือกอำเภอ</em>
                                        </MenuItem>
                                        {availableDistricts.map((d) => (
                                            <MenuItem key={d.value} value={d.value}>
                                                {d.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* ตำบล */}
                                <FormControl fullWidth size="small" disabled={!selectedDistricts.length}>
                                    <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
                                        ตำบล
                                    </Typography>
                                    <Select
                                        multiple
                                        value={selectedSubdistricts}
                                        onChange={handleSubdistrictChange}
                                        renderValue={(selected) =>
                                            selected.length === 0 ? (
                                                <em>กรุณาเลือกตำบล</em>
                                            ) : (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => {
                                                        const label = availableSubdistricts.find((s) => s.value === value)?.label || value;
                                                        return <Chip key={value} label={label} size="small" />;
                                                    })}
                                                </Box>
                                            )
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>กรุณาเลือกตำบล</em>
                                        </MenuItem>
                                        {availableSubdistricts.map((s) => (
                                            <MenuItem key={s.value} value={s.value}>
                                                {s.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '25%' }}>
                        <Button variant="contained" sx={{ fontSize: 13, gap: 1, borderRadius: 3, height: '40px', mx: -1 }}>
                            <ElectricBoltIcon sx={{ fontSize: 20 }} />
                            ร่างตัวอย่าง
                        </Button>
                    </Box>

                    <Box sx={{ width: '80%', height: '500px', p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ mb: 1 }}>ดูตัวอย่าง</Typography>
                        <Box sx={{ borderRadius: 4, width: '90%', height: '85%', border: '1px solid #D4D0D2', backgroundColor: '#305F99' }}>
                            <Box
                                component="form"
                                noValidate
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    p: 4,
                                    pl: 2
                                }}
                            >
                                <Avatar sx={{ width: 24, height: 24 }} />
                                <Card sx={{ width: 180, minHeight: 300, maxHeight: 'auto', backgroundColor: 'white', borderRadius: 3 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
                                        <CardMedia
                                            component="img"
                                            image={notification.src}
                                            alt="Thailand"
                                            sx={{
                                                width: '100%',
                                                height: '100px',
                                                objectFit: 'cover',
                                                // outline: '1px solid red'
                                            }}
                                        />

                                        <Box sx={{ px: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Typography sx={{ fontSize: 10 }}>
                                                <ReportProblemIcon sx={{ fontSize: 10, }} />
                                                แจ้งเตือนแผนดินไหว
                                            </Typography>
                                            <Typography sx={{ fontSize: 8, color: '#7D7878' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, veniam, quaerat est voluptatibus unde eos et dolores quibusdam consequatur id quas sequi laboriosam velit maxime consectetur perferendis quam accusantium voluptatum.</Typography>
                                            <Typography sx={{ fontSize: 10, color: '#7D7878' }}>
                                                <LocationOnIcon sx={{ fontSize: 10 }} />
                                                แจ้งเตือนแผนดินไหว
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto' }}>
                                            <Button
                                                variant="contained"
                                                sx={{ width: 100, height: 24, fontSize: 8, color: '#ffffff', borderRadius: 2, mb: 1 }}
                                            >
                                                ตรวจสอบพื้นที่
                                            </Button>
                                        </Box>

                                    </Box>
                                </Card>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Typography fontSize={8}>Datetime</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: 1,
                                px: 2,
                                pt: 1
                            }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    borderRadius: 3
                                }}
                                onClick={handleClose}
                            >
                                <CloseIcon sx={{ fontSize: 16, mr: 1 }} />
                                ปิด
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    color: '#ffffff',
                                    borderRadius: 3
                                }}
                            >
                                <SendIcon sx={{ fontSize: 16, mr: 1 }} />
                                ส่งแจ้งเตือน
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default EmergencyNotifier