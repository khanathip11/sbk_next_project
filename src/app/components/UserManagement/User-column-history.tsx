import { Column } from "../common/BaseTable";
import { LoginHistoryItem } from "@/app/types/userType";

export const userColumnHistory = (): Column<LoginHistoryItem>[] => [
    { id: "action", label: "พฤติกรรม", align: "left" },
    { id: "date", label: "วันที่", align: "center" },
    { id: "ip", label: "IP", align: "center" },
    { id: "browser", label: "บราวเซอร์", align: "center" },
];
