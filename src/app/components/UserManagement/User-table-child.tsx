import React from 'react'
import BaseTable from '../common/BaseTable'
import { AuditItem } from '@/app/types/userType';
import { auditData } from "@/app/data/user";
import userColumns from './User-columns';
import { Paper } from '@mui/material';
interface UserTableProps {
    handleEdit: (users: AuditItem) => void;
    handleView: (users: AuditItem) => void;
}

const UserTableChild: React.FC<UserTableProps> = ({ handleEdit, handleView }) => {
    // ✅ สร้าง columns จากฟังก์ชัน userColumns
    const columns = userColumns({
        handleEdit,
        handleView
    });

    return (
        <Paper sx={{
            flex: 1,
            borderRadius: 4,
            overflow: "hidden",
        }}>
            <BaseTable
                columns={columns}
                rows={auditData}
                loading={false} // ถ้ากำลังโหลดข้อมูลจาก API ก็ส่ง true ได
            />
        </Paper>
    )
}

export default UserTableChild

// UserTable (main container)
// │
// ├── Header (ปุ่ม +เพิ่มผู้ใช้, ส่งออก)
// │
// ├── Filter section
// │   ├── ค้นหาผู้ใช้
// │   ├── กรองข้อมูล (UserFilter)
// │   ├── เลือกช่วงเวลา (UserDateRangePicker)
// │
// ├── UserTableChild → แสดงตารางผู้ใช้ทั้งหมด (BaseTable)
// │       └── ใช้ columns จาก userColumns()
// │
// ├── Modal: UserCreate (เพิ่ม/แก้ไขผู้ใช้)
// │
// └── Modal: UserLoginHistory (ประวัติการเข้าใช้งาน)
