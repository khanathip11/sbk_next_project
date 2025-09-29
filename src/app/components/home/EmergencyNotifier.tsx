import { Avatar, Box, Button, Card, CardMedia, FormControl, InputAdornment, InputLabel, ListItemButton, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import notification from '../../assets/noti.jpg'

type EmergencyNotifierProps = {
    handleClose: () => void;
}

const EmergencyNotifier: React.FC<EmergencyNotifierProps> = ({ handleClose }) => {
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
                        <Box sx={{ borderRadius: 4, width: '90%', height: '85%', border: '1px solid #D4D0D2' }}>
                            <Box
                                component="form"
                                noValidate
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr',
                                    gap: 2,
                                    p: 2,
                                }}
                            >
                                <FormControl variant="standard" sx={{ display: 'flex', gap: 2 }}>

                                    <TextField
                                        label="หัวข้อ"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                            },
                                        }}
                                    />

                                    <TextField
                                        id="outlined-multiline-static"
                                        label="รายละเอียด"
                                        multiline
                                        rows={4}
                                        InputLabelProps={{ shrink: true }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 3,
                                            },
                                        }}
                                    />

                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <TextField
                                            label="โลเคชั่นที่ต้องการแจ้ง"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon sx={{ fontSize: 18, color: '#D4D0D2' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                width: '100%', '& .MuiOutlinedInput-root': {
                                                    borderRadius: 3,
                                                },
                                                '& .MuiInputBase-input::placeholder': {
                                                    fontSize: 13,
                                                    color: '#D4D0D2',
                                                    opacity: 1,
                                                },
                                            }}
                                            placeholder='ค้นหาสถานที่'
                                        />
                                        <Button variant="contained" sx={{ borderRadius: 3 }}>
                                            เลือก
                                        </Button>
                                    </Box>

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