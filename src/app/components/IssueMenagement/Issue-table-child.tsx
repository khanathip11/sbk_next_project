import React, { useState } from "react";
import { Paper, Box, } from "@mui/material";
import IssueInfo from "./Issue-info";
import { issuesData } from "@/app/data/issuesData";
import { IssueItem } from "@/app/types/IssueItem";
import { issueColumns } from "./issue-columns"
import BaseTable from "../common/BaseTable";
import { getTypeStyled } from "@/app/utils/getTypeStyled";
interface IssueTableChildProps {
    issues: IssueItem[];
    role: string;
    organizationUnit: string;
}

const IssueTableChild: React.FC<IssueTableChildProps> = ({ issues, role, organizationUnit }) => {
    // const filteredData = issues ? issuesData.filter((i) => i.level === issues) : issuesData;
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<IssueItem | null>(null);

    const handleOpenModal = (issue: IssueItem) => {
        setSelectedRow(issue);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedRow(null);
    };

    const columns = issueColumns({
        handleEdit: handleOpenModal,
        handleView: handleCloseModal,
        role,
        organizationUnit
    });

    return (
        <Paper
            // elevation={2}
            sx={{
                flex: 1,
                borderRadius: 4,
                overflow: "hidden", // ไม่ให้ Paper ขยายเกินขอบ
            }}
        >
            {/* ✅ Container สำหรับ scroll แนวนอน */}
            <Box
                sx={{
                    width: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                    "&::-webkit-scrollbar": { display: "none" }, // ซ่อน scrollbar บน Chrome/Safari
                    scrollbarWidth: "none", // ซ่อน scrollbar บน Firefox
                }}
            >
                <BaseTable
                    columns={columns}
                    rows={issues}
                    loading={false}
                    rowsPerPageOptions={[10, 25, 100]}
                />
            </Box>

            {/* ✅ Modal */}
            <IssueInfo
                getTypeStyle={getTypeStyled}
                open={open}
                selectedRow={selectedRow}
                handleClose={handleCloseModal}
                issuesData={issuesData}
            />
        </Paper>
    );
};

export default IssueTableChild;

// 📁 components/
//  ├── common/
//  │    └── BaseTable.tsx     ← ตารางกลางที่ใช้ซ้ำ
//  ├── issue/
//  │    ├── IssueTableChild.tsx  ← ตารางแสดงข้อมูล
//  │    ├── IssueInfo.tsx        ← Modal แสดงรายละเอียด
//  │    ├── issueColumns.tsx     ← กำหนด column แต่ละคอลัมน์
//  └── utils/
//       └── getTypeStyled.ts     ← ฟังก์ชันกำหนดสีสถานะ
