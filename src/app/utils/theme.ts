import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontSize: 13, // ✅ ฟอนต์ขนาด 13px ทั่วระบบ
        fontFamily: "Prompt, sans-serif", // (เลือกได้ตามฟอนต์โปรเจกต์)
    },
    shape: {
        borderRadius: 8, // ✅ radius 8px ทั่วระบบ
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    fontSize: "13px", // ✅ ฟอนต์ใน input
                    borderRadius: "8px", // ✅ มุมโค้งกล่อง input
                    backgroundColor: "#fff",
                },
                input: {
                    padding: "8px 10px",
                    fontSize: "13px",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    "& fieldset": {
                        borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                        borderColor: "#999",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#1976d2",
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: "13px", // ✅ label ขนาดเดียวกัน
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    fontSize: "13px",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                    },
                },
            },
        },
    },
});

export default theme;