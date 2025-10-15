import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
    { name: "ปัญหายาเสพติด", value: 15 },
    { name: "ความปลอดภัยในชีวิตและทรัพย์สิน", value: 12 },
    { name: "ความปลอดภัยในถนน", value: 10 },
    { name: "อื่น ๆ", value: 43 },
    { name: "อื่น ๆ", value: 43 },
    { name: "อื่น ๆ", value: 43 },
];

const COLORS = ["#0052cc", "#007fff", "#66b2ff", "#cce5ff"];

export default function ProblemChart() {
    return (
        <Box
            sx={{
                width: 200,
                height: 200,
                position: "relative",
                // backgroundColor: "#001a33",
                borderRadius: 2,
                p: 2,
            }}
        >
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* ข้อความตรงกลาง */}
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" color="white" sx={{ fontSize: 16 }}>80</Typography>
                <Typography variant="body2" color="white" sx={{ fontSize: 16 }}>ปัญหา</Typography>
            </Box>
        </Box>
    );
}
