// AuditTrailTableChild.tsx
import React from "react";
import { Paper, Box } from "@mui/material";
import BaseTable from "../common/BaseTable";
import { auditData } from "@/app/data/user";
import { AuditTrailColumns } from "./Audit-trail-columns";

const columns = AuditTrailColumns();

const AuditTrailTableChild: React.FC = () => {
    return (
        <Paper sx={{ flex: 1, borderRadius: 4, overflow: "hidden" }}>
            <Box sx={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}>
                <BaseTable
                    columns={columns}
                    rows={auditData}
                    loading={false}
                    rowsPerPageOptions={[10, 25, 100]}
                />
            </Box>
        </Paper>
    );
};

export default AuditTrailTableChild;
