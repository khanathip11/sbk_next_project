import { Typography } from "@mui/material";
import { Column } from "../common/BaseTable";
import { IssueItem } from "@/app/types/IssueItem";

export const feedbackColumns = (): Column<IssueItem>[] => [
    {
        id: "id",
        label: "รหัสข้อเสนอแนะ",
        render: (row) => <Typography sx={{ fontSize: 13 }}>{row.id}</Typography>,
    },
    { id: "suggestionType", label: "ประเภท", align: "left" },
    { id: "reporter", label: "ผู้แจ้ง", align: "left", },
] 