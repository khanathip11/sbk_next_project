// "use client";
// import React, { useState } from 'react';
// import { Stack, Box, Typography } from "@mui/material";
// import { DateRangeFilter } from '../common/DateRangeFilter';
// import { issuesData } from "@/app/data/issuesData";
// import { GenericFilter } from '../common/GenericFilter';
// import { FilterValues } from '../common/GenericFilter';
// import FeedbackIssueTableChild from './Feedback-issue-table-child';
// import FeedbackIssueSummarySection from './Feedback-issue-summary-section';

// const FeedbackIssueTable = () => {
//     const currentRole = "admin";
//     const currentUnit = "สบข";
//     const [filters, setFilters] = useState<Partial<FilterValues>>({});

//     return (
//         <Box
//             sx={{
//                 height: "100%",
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 overflow: "hidden",
//                 bgcolor: "#F7F7F7",
//                 borderRadius: 4,
//                 boxSizing: "border-box",
//             }}
//         >
//             {/* 🔹 Header */}
//             <Box
//                 sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 1,
//                 }}
//             >
//                 <Typography
//                     sx={{
//                         px: 2,
//                         pb: 1,
//                         fontSize: 24,
//                         fontWeight: "bold",
//                         color: "#000",
//                     }}
//                 >
//                     ปัญหาที่เสร็จสิ้น
//                 </Typography>
//             </Box>

//             <Box sx={{ p: 2, pt: 0 }}>
//                 <FeedbackIssueSummarySection />
//             </Box>

//             {/* 🔹 Filter Section */}
//             <Stack
//                 sx={{
//                     display: "flex",
//                     width: "100%",
//                     gap: 1,
//                     px: 2,
//                     pb: 1.5,
//                     flexShrink: 0,
//                     flexWrap: "nowrap",
//                     overflowX: "auto",
//                     "&::-webkit-scrollbar": { display: "none" },
//                     scrollbarWidth: "none",
//                 }}
//                 direction="row"
//                 alignItems="center"
//             >
//                 <GenericFilter
//                     role="operator-view-update"
//                     organizationUnit=""
//                     visibleFilters={["search", "level", "status"]}
//                     onChange={(f) => setFilters({ ...filters, ...f })}
//                 />

//                 <Box flexGrow={1} />

//                 <Box
//                     sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         flexShrink: 0,
//                         overflowX: "auto",
//                         "&::-webkit-scrollbar": { display: "none" },
//                         scrollbarWidth: "none",
//                     }}
//                 >
//                     <DateRangeFilter
//                         startDate={null}
//                         endDate={null}
//                         onChange={({ startDate, endDate }) => {
//                             console.log("ช่วงวันที่ที่เลือก:", startDate?.format("YYYY-MM-DD"), endDate?.format("YYYY-MM-DD"));
//                             // 🔹 คุณสามารถนำไป filter issuesData ต่อได้เลย
//                         }}
//                     />
//                     <Typography sx={{ fontSize: 12 }}>ผลลัพธ์</Typography>
//                     <Typography
//                         sx={{
//                             height: 35,
//                             border: "1px solid #D9D9D9",
//                             px: 1.5,
//                             borderRadius: 2,
//                             backgroundColor: "#ffffff",
//                             display: "flex",
//                             alignItems: "center",
//                             fontSize: 12,
//                         }}
//                     >
//                         {issuesData.length}
//                     </Typography>
//                 </Box>
//             </Stack>

//             {/* 🔹 ตาราง Scroll ภายใน */}
//             <Box
//                 sx={{
//                     flex: 1,
//                     overflowY: "auto",
//                     overflowX: "hidden",
//                     p: 2,
//                     "&::-webkit-scrollbar": { display: "none" },
//                     scrollbarWidth: "none",
//                 }}
//             >
//                 <FeedbackIssueTableChild
//                     issues={issuesData}
//                     role={currentRole}
//                     organizationUnit={currentUnit}
//                 />
//             </Box>
//         </Box>
//     )
// }

// export default FeedbackIssueTable

"use client";
import React, { useState } from 'react';
import { Stack, Box, Typography } from "@mui/material";
import { DateRangeFilter } from '../common/DateRangeFilter';
import { issuesData } from "@/app/data/issuesData";
import { GenericFilter } from '../common/GenericFilter';
import { FilterValues } from '../common/GenericFilter';
import FeedbackIssueTableChild from './Feedback-issue-table-child';
import FeedbackIssueSummarySection from './Feedback-issue-summary-section';

const FeedbackIssueTable = () => {
    const currentRole = "admin";
    const currentUnit = "สบข";
    const [filters, setFilters] = useState<Partial<FilterValues>>({});
    const [filteredIssues, setFilteredIssues] = useState(issuesData);

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                bgcolor: "#F7F7F7",
                borderRadius: 4,
                boxSizing: "border-box",
            }}
        >
            {/* 🔹 Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <Typography
                    sx={{
                        px: 2,
                        pb: 1,
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#000",
                    }}
                >
                    ปัญหาที่เสร็จสิ้น
                </Typography>
            </Box>

            {/* 🔹 Section: Summary Cards */}
            <Box sx={{ p: 2, pt: 0 }}>
                <FeedbackIssueSummarySection
                    onFilterChange={(filtered, level) => {
                        setFilteredIssues(filtered);
                    }}
                />
            </Box>

            {/* 🔹 Filter Bar */}
            <Stack
                sx={{
                    display: "flex",
                    width: "100%",
                    gap: 1,
                    px: 2,
                    pb: 1.5,
                    flexShrink: 0,
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                }}
                direction="row"
                alignItems="center"
            >
                <GenericFilter
                    role="operator-view-update"
                    organizationUnit=""
                    visibleFilters={["search", "level", "status"]}
                    onChange={(f) => setFilters({ ...filters, ...f })}
                />

                <Box flexGrow={1} />

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexShrink: 0,
                        overflowX: "auto",
                        "&::-webkit-scrollbar": { display: "none" },
                        scrollbarWidth: "none",
                    }}
                >
                    <DateRangeFilter
                        startDate={null}
                        endDate={null}
                        onChange={({ startDate, endDate }) => {
                            console.log("ช่วงวันที่ที่เลือก:", startDate?.format("YYYY-MM-DD"), endDate?.format("YYYY-MM-DD"));
                        }}
                    />
                    <Typography sx={{ fontSize: 12 }}>ผลลัพธ์</Typography>
                    <Typography
                        sx={{
                            height: 35,
                            border: "1px solid #D9D9D9",
                            px: 1.5,
                            borderRadius: 2,
                            backgroundColor: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                    >
                        {filteredIssues.length}
                    </Typography>
                </Box>
            </Stack>

            {/* 🔹 ตาราง */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    p: 2,
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                }}
            >
                <FeedbackIssueTableChild
                    issues={filteredIssues}
                    role={currentRole}
                    organizationUnit={currentUnit}
                />
            </Box>
        </Box>
    );
};

export default FeedbackIssueTable;
