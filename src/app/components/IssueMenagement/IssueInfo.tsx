import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { IssueItem } from "@/app/types/IssueItem";

interface IssueInfoProps {
  open: boolean;
  selectedRow: IssueItem | null;
  issuesData: IssueItem[];
  handleClose: () => void;
}

const IssueInfo: React.FC<IssueInfoProps> = ({
  open,
  selectedRow,
  handleClose,
  issuesData,
}) => {
  if (!selectedRow) return null;

  // ✅ ใช้ id ซึ่งมีอยู่ใน IssueItem
  const selectedIssue = issuesData.find((item) => item.id === selectedRow.id);

  return (
    <Modal open={open} onClose={handleClose} sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          maxWidth: 1200,
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: 24,
          p: 2,
          maxHeight: "90vh",
        }}
      >
        {/* ✅ หัวข้อปัญหา */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pb: 2,
          }}
        >
          <Typography sx={{ color: "#000", fontSize: 20, fontWeight: 600 }}>
            {selectedIssue?.problem ?? "ไม่พบข้อมูลปัญหา"}
          </Typography>
        </Box>

        {/* ✅ เนื้อหาหลัก */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          {/* ✅ Left Panel */}
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                color: "#000",
                width: "100%",
                height: "600px",
                border: "1px solid #D9D9D9",
                borderRadius: 4,
                backgroundColor: "#F5F5F5",
                p: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                รายละเอียดปัญหา
              </Typography>
              <Typography>ประเภท: {selectedIssue?.category}</Typography>
              <Typography>สถานะ: {selectedIssue?.status}</Typography>
              <Typography>ระดับ: {selectedIssue?.level}</Typography>
              <Typography>สถานที่: {selectedIssue?.location}</Typography>
              <Typography>หน่วยงาน: {selectedIssue?.department}</Typography>
              <Typography>ผู้แจ้ง: {selectedIssue?.reporter}</Typography>
              <Typography>
                ระยะเวลาที่เหลือ: {selectedIssue?.remainingDays}
              </Typography>
            </Box>
          </Box>

          {/* ✅ Right Panel */}
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                color: "#000",
                width: "100%",
                height: "600px",
                border: "1px solid #D9D9D9",
                borderRadius: 4,
                backgroundColor: "#F5F5F5",
                p: 1,
                px: 2,
              }}
            >
              Right
            </Box>

            {/* ✅ ปุ่มด้านล่าง */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                my: 1,
                pt: 1,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderRadius: 2,
                }}
                onClick={handleClose}
              >
                <CloseIcon sx={{ fontSize: 16, mr: 1 }} />
                ปิด
              </Button>
              <Button
                variant="contained"
                sx={{
                  color: "#ffffff",
                  borderRadius: 2,
                }}
              >
                <SendIcon sx={{ fontSize: 16, mr: 1 }} />
                ยืนยัน
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default IssueInfo;
