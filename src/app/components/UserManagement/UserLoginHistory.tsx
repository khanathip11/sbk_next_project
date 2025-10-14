import React from "react";
import {
    Box,
    Button,
    Typography,
    Modal,
    InputAdornment,
    TextField,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BaseTable, { Column } from "../common/BaseTable"; // ✅ ใช้ตารางกลาง
import { UserItem } from "@/app/data/user";
import SearchIcon from "@mui/icons-material/Search";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

interface UserLoginHistoryProps {
    open: boolean;
    handleClose: () => void;
    user?: UserItem | null;
}

interface LoginHistoryItem {
    id: number;
    action: string;
    date: string;
    ip: string;
    browser: string;
}

const UserLoginHistory: React.FC<UserLoginHistoryProps> = ({
    open,
    handleClose,
    user,
}) => {
    // ✅ ข้อมูลจำลอง
    const dummyLogs: LoginHistoryItem[] = [
        { id: 1, action: "login", date: "15 ส.ค. 2568 15:39:21", ip: "111.003.43536.432", browser: "chrome" },
        { id: 2, action: "login", date: "15 ส.ค. 2568 15:40:21", ip: "111.003.43536.432", browser: "safari" },
        { id: 3, action: "login", date: "15 ส.ค. 2568 15:41:21", ip: "111.003.43536.432", browser: "edge" },
        { id: 4, action: "logout", date: "15 ส.ค. 2568 15:42:21", ip: "111.003.43536.432", browser: "chrome" },
    ];

    // ✅ columns สำหรับ BaseTable
    const columns: Column<LoginHistoryItem>[] = [
        { id: "action", label: "พฤติกรรม" },
        { id: "date", label: "วันที่" },
        { id: "ip", label: "IP" },
        { id: "browser", label: "บราวเซอร์" },
    ];


    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 900,
                    bgcolor: "#fff",
                    borderRadius: 4,
                    boxShadow: 24,
                    p: 3,
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >
                {/* 🔹 Title */}
                <Typography
                    variant="h6"
                    sx={{ textAlign: "center", mb: 2, fontWeight: "400", color: '#000' }}
                >
                    ประวัติการเข้าใช้งาน
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // px: 2,
                    }}
                >
                    {/* 🔹 User Name */}
                    <Typography
                        sx={{
                            fontWeight: 500,
                            mb: 2,
                            fontSize: 18,
                            color: "#333",
                        }}
                    >
                        {user?.fullname || "-"}
                    </Typography>


                    {/* ปุ่มส่งออก */}
                    <Button
                        variant="contained"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            borderRadius: 2,
                            backgroundColor: "#004D99",
                            fontSize: 13,
                        }}
                    >
                        <ReplyRoundedIcon sx={{ fontSize: 18, transform: "scaleX(-1)" }} />
                        ส่งออก
                    </Button>

                </Box>

                <Box sx={{ mb: 1 }}>
                    <TextField
                        id="user-search"
                        placeholder="ค้นหา"
                        variant="outlined"
                        size="small"
                        sx={{
                            width: 250,
                            bgcolor: "#F9FAFB", // สีพื้นหลังช่องทั้งหมด
                            borderRadius: 2,

                            "& .MuiOutlinedInput-root": {
                                height: 36, // ✅ ปรับความสูง
                                borderRadius: 3,
                                "& fieldset": {
                                    borderColor: "#D1D5DB", // ✅ สีเส้นขอบปกติ
                                },
                                "&:hover fieldset": {
                                    borderColor: "#9CA3AF", // ✅ สีเส้นขอบตอน hover
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#004D99", // ✅ สีเส้นขอบตอน focus
                                    borderWidth: 1.5,
                                },
                                "& input": {
                                    color: "#111827", // ✅ สีข้อความ
                                },
                            },

                            "& .MuiOutlinedInput-input::placeholder": {
                                color: "#9CA3AF", // ✅ สี placeholder
                                opacity: 1, // ต้องใส่เพื่อให้สีทำงานบนบาง browser
                            },

                            "& .MuiInputBase-input": {
                                fontSize: 14,
                                fontWeight: 400,
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ fontSize: 18, color: "#6B7280" }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                </Box>

                {/* 🔹 ตาราง */}
                <BaseTable<LoginHistoryItem>
                    columns={columns}
                    rows={dummyLogs}
                    loading={false}
                    emptyText="ไม่มีข้อมูลการเข้าใช้งาน"
                    rowHeight={48}
                    rowsPerPageOptions={[5, 10, 25]}
                />

                {/* 🔹 ปุ่มปิด */}
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        startIcon={<CloseRoundedIcon />}
                        sx={{
                            borderRadius: 3,
                            px: 3,
                            "&:hover": {
                                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                            },
                        }}
                    >
                        ปิด
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UserLoginHistory;
