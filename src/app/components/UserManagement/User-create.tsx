import {
    Button,
    DialogActions,
    FormControl,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Modal,
    Select,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AuditItem } from "@/app/types/userType";
import { auditData } from '@/app/data/user';

interface UserCreateProps {
    open: boolean;
    handleClose: () => void;
    mode: 'create' | 'edit';
    initialData?: AuditItem | null;
    onSubmit?: (data: AuditItem) => void;
}

// ใช้ defaultUser แบบ AuditItem
const defaultUser: AuditItem = {
    username: "",
    fullname: "",
    email: "",
    department: "",
    role: "เจ้าหน้าที่",
    status: "ใช้งานอยู่",
    lastLogin: "",
    password: "", // เพิ่มได้ถ้าคุณต้องใช้ในฟอร์ม
    origin: "user",
};

const UserCreate: React.FC<UserCreateProps> = ({
    open,
    handleClose,
    mode,
    initialData,
    onSubmit,
}) => {
    const [formData, setFormData] = useState<AuditItem>(defaultUser);

    // ✅ โหลดข้อมูลเริ่มต้นเมื่อแก้ไข
    useEffect(() => {
        if (open) {
            if (mode === 'edit' && initialData) {
                setFormData(initialData);
            } else {
                setFormData(defaultUser);
            }
        }
    }, [open, mode, initialData]);

    const handleModalClose = () => {
        setFormData(defaultUser);
        handleClose();
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = () => {
        if (onSubmit) onSubmit(formData);
        setFormData(defaultUser); // ✅ ล้างค่าหลัง submit
        handleClose();
    };

    // ✅ style reuse
    const textFieldStyle = {
        width: '100%',
        flexShrink: 0,
        '& .MuiOutlinedInput-root': {
            height: 40,
            backgroundColor: '#fff',
            borderRadius: 3,
            '& fieldset': { borderColor: '#D1D5DB' },
            '&:hover fieldset': { borderColor: '#9CA3AF' },
            '&.Mui-focused fieldset': { borderColor: '#1976d2' },
        },
        '& .MuiOutlinedInput-input': {
            fontSize: 14,
            color: '#000',
            padding: '8px 12px',
            backgroundColor: '#F2F2F4',
            borderRadius: 2,
        },
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: '#fff',
                    borderRadius: 4,
                    boxShadow: 24,
                    p: 3,
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ mb: 2, textAlign: 'center', color: '#000' }}
                >
                    {mode === 'create' ? 'เพิ่มผู้ใช้ใหม่' : 'แก้ไขข้อมูลผู้ใช้'}
                </Typography>

                <Box
                    sx={{
                        backgroundColor: '#F9F9FA',
                        borderRadius: 4,
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        border: '1px solid #F0F0F0',
                    }}
                >
                    {/* ✅ ฟิลด์พื้นฐาน */}
                    <Box>
                        <Typography sx={{ fontSize: 13, color: '#8C929C', mb: 1 }}>
                            ชื่อผู้ใช้
                        </Typography>
                        <TextField
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                            sx={textFieldStyle}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ fontSize: 13, color: '#8C929C', mb: 1 }}>
                            ชื่อ - สกุล
                        </Typography>
                        <TextField
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                            sx={textFieldStyle}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ fontSize: 13, color: '#8C929C', mb: 1 }}>
                            อีเมล
                        </Typography>
                        <TextField
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                            sx={textFieldStyle}
                        />
                    </Box>

                    {/* ✅ ซ่อน password ถ้าอยู่ในโหมด edit */}
                    {/* {mode === 'create' && (
                        <Box>
                            <Typography sx={{ fontSize: 13, color: '#8C929C', mb: 1 }}>
                                รหัสผ่าน
                            </Typography>
                            <TextField
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                sx={textFieldStyle}
                            />
                        </Box>
                    )} */}
                    <Box>
                        <Typography sx={{ fontSize: 13, color: '#8C929C', mb: 1 }}>
                            รหัสผ่าน
                        </Typography>
                        <TextField
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                            sx={textFieldStyle}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ fontSize: 13, color: '#8C929C', mb: 1 }}>
                            หน่วยงาน
                        </Typography>
                        <TextField
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                            sx={textFieldStyle}
                        />
                    </Box>

                    {/* ✅ Role Dropdown */}
                    <Box>
                        <Typography sx={{ fontSize: 13, color: '#8C929C', mb: 1 }}>
                            บทบาท
                        </Typography>
                        <FormControl fullWidth size="small">
                            <Select
                                name="role"
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        role: e.target.value,
                                    }))
                                }
                                sx={{
                                    borderRadius: 3,
                                    backgroundColor: '#fff',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#D1D5DB',
                                    },
                                }}
                            >
                                <MenuItem value="แอดมิน">แอดมิน</MenuItem>
                                <MenuItem value="ผู้บังคับบัญชา">ผู้บังคับบัญชา</MenuItem>
                                <MenuItem value="เจ้าหน้าที่">เจ้าหน้าที่</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* ✅ Switch เปิด/ปิดการใช้งาน */}
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        // checked={formData.active}
                                        onChange={handleSwitchChange}
                                        name="active"
                                    />
                                }
                                label="เปิดใช้งาน"
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        color: '#000',
                                        fontSize: 14,
                                        fontWeight: 500,
                                    },
                                }}
                            />
                            <Typography
                                sx={{
                                    color: '#5B616D',
                                    ml: 6,
                                    mt: -1,
                                    mb: -1,
                                    fontSize: 13,
                                }}
                            >
                                หากปิดผู้ใช้งานจะไม่สามารถเข้าใช้งานได้
                            </Typography>
                        </FormGroup>
                    </FormControl>
                </Box>

                {/* ✅ ปุ่ม Action */}
                <DialogActions sx={{ px: 0, pb: 0, pt: 2 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            borderRadius: 3,
                            border: '1px solid #F2F2F2',
                            color: '#000',
                            px: 3,
                            transition: 'all 0.25s ease',
                            '&:hover': {
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                                backgroundColor: '#f9f9f9',
                            },
                        }}
                    >
                        <CloseRoundedIcon sx={{ fontSize: 16 }} />
                        ปิด
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            borderRadius: 3,
                            backgroundColor: '#004D99',
                            display: 'flex',
                            gap: 0.5,
                        }}
                    >
                        <CheckCircleRoundedIcon sx={{ fontSize: 16 }} />
                        {mode === 'create' ? 'ยืนยัน' : 'อัปเดต'}
                    </Button>
                </DialogActions>
            </Box>
        </Modal>
    );
};

export default UserCreate;
