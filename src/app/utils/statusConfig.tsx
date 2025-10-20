import { ReactNode } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

export interface TimelineStep {
    id: number;
    label: string;
    color: string;
    bg: string;
    icon: ReactNode; // ✅ ใช้ ReactNode แทน JSX.Element
}

export const TIMELINE_STEPS: TimelineStep[] = [
    {
        id: 1,
        label: "หน่วยงานกำลังดำเนินการ",
        color: "#2E7D32",
        bg: "#E8F5E9",
        icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
    },
    {
        id: 2,
        label: "ส่งต่อให้หน่วยรับผิดชอบ",
        color: "#2E7D32",
        bg: "#E8F5E9",
        icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
    },
    {
        id: 3,
        label: "รับเรื่องสำเร็จ",
        color: "#2E7D32",
        bg: "#E8F5E9",
        icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
    },
];

export const FAILED_STEP: TimelineStep = {
    id: 3,
    label: "ไม่สามารถดำเนินการได้",
    color: "#C62828",
    bg: "#FFEBEE",
    icon: <CloseIcon sx={{ fontSize: 16 }} />,
};
