import React from "react";
import IssueTable from "../components/IssueMenagement/Issue-table";
import NavigatLayout from "../components/layout/Navigat-layout";
import { Box } from "@mui/material";

const Issues = () => {
    return (
        <NavigatLayout>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden", // ✅ ป้องกันการล้น container
                    boxSizing: "border-box",
                }}
            >
                <IssueTable />
            </Box>
        </NavigatLayout>
    );
};

export default Issues;
