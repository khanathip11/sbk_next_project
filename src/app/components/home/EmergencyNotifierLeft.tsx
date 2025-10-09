import { Button, Chip, FormControl, FormControlLabel, FormLabel, InputAdornment, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import RoomIcon from '@mui/icons-material/Room';
import { regions } from '@/app/data/regions';
import { Region } from '@/app/types/Region';
import { provinces } from '@/app/data/provinces';
import { Province, District, Subdistrict } from '@/app/types/provinceOptions';
import { title } from 'process';
interface EmergencyNotifierLeftProps {
    sendType: "all" | "region";
    handleSendTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
    detail: string;
    location: string;
    setTitle: (value: string) => void;
    setDetail: (value: string) => void;
    setLocation: (value: string) => void;
}

const EmergencyNotifierLeft: React.FC<EmergencyNotifierLeftProps> = ({ sendType, handleSendTypeChange, title, detail, location, setTitle, setDetail, setLocation }) => {
    const [selectRegions, setSelectRegions] = useState<string[]>([]);
    const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedSubdistricts, setSelectedSubdistricts] = useState<string[]>([]);

    const handleRegionsChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectRegions(value);
        setSelectedProvinces([]);
    };

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
        // setSelectedDistricts([]);
        // setSelectedSubdistricts([]);
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

    const availableProvinces = regions.filter((r) => selectRegions.includes(r.value)).flatMap((r) => r.provinces)

    return (
        <Box sx={{ width: '80%', height: '500px', p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: '#fff',
                            },
                            "& .MuiInputBase-input": {
                                fontSize: 14,
                                color: "black",
                            },
                        }}
                    />

                    <TextField
                        id="emergency-details"
                        label="รายละเอียด"
                        multiline
                        rows={4}
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: '#fff',
                            },
                            "& .MuiInputBase-input": {
                                fontSize: 14,
                                color: "black",
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
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    backgroundColor: '#fff',
                                },
                                "& .MuiInputBase-input": {
                                    fontSize: 14,
                                    color: "black",
                                },
                            }}
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
                            <RoomIcon sx={{ fontSize: 18, mr: 0.2 }} />
                            เลือก
                        </Button>
                    </Box>

                    <hr style={{ width: '100%', color: '#F0F0F0' }} />

                    <FormLabel sx={{ fontSize: 13, color: '#000', mb: -2 }}>เลือกพื้นที่การส่ง</FormLabel>
                    <RadioGroup value={sendType} onChange={handleSendTypeChange}>
                        <FormControlLabel
                            value="all"
                            control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />}
                            label="ส่งให้ผู้ใช้ทั้งหมด"
                            sx={{ '& .MuiFormControlLabel-label': { fontSize: 12 } }}
                        />
                        <Typography sx={{ mt: -1, pl: 3, fontSize: 12, color: '#7D7A7A' }}>จะส่งให้ผู้ใช้ทั้งหมดที่เป็นเพื่อนใน Line Official</Typography>
                        <FormControlLabel
                            value="region"
                            control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />}
                            label="ส่งตามพื้นที่"
                            sx={{ '& .MuiFormControlLabel-label': { fontSize: 12 } }}
                        />
                        <Typography sx={{ mt: -1, pl: 3, fontSize: 12, color: '#7D7A7A' }}>สามารถเลือกส่งได้ตามพื้นที่ที่กำหนด</Typography>
                    </RadioGroup>

                    {sendType === 'region' && (
                        <>
                            {/* ภาค */}
                            <FormControl fullWidth size="small" sx={{mb:-2}}>
                                <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500, color: '#7D7A7A' }}>
                                    ภาค
                                </Typography>
                                <Select
                                    sx={{ borderRadius: 3, mb: 1 }}
                                    multiple
                                    value={selectRegions}
                                    onChange={handleRegionsChange}
                                    renderValue={(selected) =>
                                        selected.length === 0 ? (
                                            <>{'กรุณาเลือกภาค'}</>
                                        ) : (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => {
                                                    const regionLabel = regions.find((r) => r.value === value)?.label || value;
                                                    return <Chip key={value} label={regionLabel} size="small" />;
                                                })}
                                            </Box>
                                        )
                                    }
                                >
                                    <MenuItem value="">
                                        <>{'กรุณาเลือกภาค'}</>
                                    </MenuItem>
                                    {regions.map((r) => (
                                        <MenuItem key={r.value} value={r.value}>
                                            {r.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* จังหวัด */}
                            <FormControl fullWidth size="small" sx={{mb:2}}>
                                <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500, color: '#7D7A7A' }}>
                                    จังหวัด
                                </Typography>
                                <Select
                                    sx={{ borderRadius: 3, mb: -1.5 }}
                                    multiple
                                    value={selectedProvinces}
                                    onChange={handleProvinceChange}
                                    renderValue={(selected) =>
                                    selected.length === 0 ? (
                                        <em>กรุณาเลือกจังหวัด</em>
                                    ) : (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => {
                                            const label = availableProvinces.find((p) => p.value === value)?.label || value;
                                            return <Chip key={value} label={label} size="small" />;
                                        })}
                                        </Box>
                                    )
                                    }
                                >
                                    <MenuItem value="">
                                    <em>กรุณาเลือกจังหวัด</em>
                                    </MenuItem>
                                    {availableProvinces.map((p) => (
                                    <MenuItem key={p.value} value={p.value}>
                                        {p.label}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>


                            {/* อำเภอ */}
                            {/* <FormControl fullWidth size="small">
                                            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500, color: '#7D7A7A' }}>
                                                อำเภอ
                                            </Typography>
                                            <Select
                                                sx={{ borderRadius: 3, mb: -1.5 }}
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
                                        </FormControl> */}

                            {/* ตำบล */}
                            {/* <FormControl fullWidth size="small">
                                            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500, color: '#7D7A7A' }}>
                                                ตำบล
                                            </Typography>
                                            <Select
                                                sx={{ borderRadius: 3 }}
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
                                        </FormControl> */}
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default EmergencyNotifierLeft