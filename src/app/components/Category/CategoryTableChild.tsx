import { Box, Typography, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, IconButton, Paper, TablePagination } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from "react";
import { categories } from "@/app/data/categoryData";
import { Category, SubCategory } from "@/app/types/categoryType";
/**
 * 🧱 Props ที่รับจาก parent (CategoryTable)
 * - onEdit: ฟังก์ชัน callback สำหรับเปิด modal “แก้ไขหมวดหมู่”
 *   (ส่งข้อมูล category ที่ถูกคลิกกลับไปให้ CategoryTable)
 */
interface CategoryTableChildProps {
    onEdit: (category: Category | SubCategory, parent?: Category) => void;
    onAddSub: (parent: Category) => void;
    onDelete: (category: Category | SubCategory, parent?: Category) => void;
}

/**
 * 🧾 Component: CategoryTableChild
 * หน้าที่หลัก:
 * - แสดงตารางหมวดหมู่แบบ TreeView (มีหมวดหลัก / หมวดย่อย)
 * - จัดการ pagination ของตาราง
 * - เมื่อคลิกปุ่ม "แก้ไข" จะเรียก onEdit() เพื่อส่งข้อมูลกลับไปให้ parent
 */
const CategoryTableChild: React.FC<CategoryTableChildProps> = ({ onEdit, onAddSub, onDelete }) => {

    /** ✅ page: หน้าที่กำลังแสดงอยู่ใน pagination */
    const [page, setPage] = React.useState(0);

    /** ✅ rowsPerPage: จำนวนแถวต่อหน้า */
    const [rowsPerPage, setRowsPerPage] = useState(10);

    /**
     * ✅ handleChangePage:
     * ฟังก์ชันเปลี่ยนหน้าของ pagination
     * @param newPage หมายเลขหน้าที่ผู้ใช้เลือก
     */
    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

    /**
     * ✅ handleChangeRowsPerPage:
     * ฟังก์ชันเมื่อผู้ใช้เปลี่ยนจำนวนแถวต่อหน้า
     * เช่น จาก 10 → 25 รายการต่อหน้า
     */
    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+e.target.value);
        setPage(0); // ✅ รีเซ็ตกลับไปหน้าแรกทุกครั้งเมื่อเปลี่ยนจำนวนแถว
    };

    /**
     * ✅ flattenedRows:
     * รวม (flatten) ข้อมูลหมวดหมู่หลักและหมวดย่อยทั้งหมดให้เป็น array เดียว
     * เพื่อคำนวณจำนวนรวมทั้งหมดในตาราง (เช่นใช้ใน pagination)
     */
    const flattenedRows = categories.flatMap((cat) => [
        { ...cat, isSub: false }, // หมวดหลัก
        ...(cat.children?.map((child) => ({
            ...child,
            isSub: true,            // บ่งบอกว่าเป็นหมวดย่อย
            parentId: cat.id,       // เก็บ id ของหมวดหลัก
            creator: cat.creator,   // สืบทอดข้อมูลจากหมวดหลัก
            createdAt: cat.createdAt,
        })) ?? []),
    ]);

    /**
     * ✅ paginatedCategories:
     * กำหนดให้แสดงเฉพาะหมวดหลักที่อยู่ในหน้าปัจจุบัน (ตาม pagination)
     */
    const paginatedCategories = categories.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // ------------------------------------------------------------

    return (
        <Paper
            elevation={2}
            sx={{
                width: "100%",
                height: "auto",
                pb: 1,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": { display: "none" },
            }}
        >
            {/* 🧭 ตารางหลัก */}
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 3,
                    boxShadow: "none",
                    border: "1px solid #fff",
                    flex: 1,
                    overflow: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                <Table size="small" sx={{ borderCollapse: "collapse" }}>

                    {/* ------------------------------------------------------------
                        ✅ ส่วนหัวของตาราง (Table Head)
                        แสดงชื่อคอลัมน์: หมวดหมู่ / ผู้สร้าง / วันที่ / จัดการ
                    ------------------------------------------------------------ */}
                    <TableHead sx={{ height: 50 }}>
                        <TableRow sx={{ backgroundColor: "#F2F2F4" }}>
                            <TableCell sx={{ fontWeight: "bold", width: "40%" }}>หมวดหมู่</TableCell>
                            <TableCell sx={{ fontWeight: "bold", width: "20%" }}>ผู้สร้าง</TableCell>
                            <TableCell sx={{ fontWeight: "bold", width: "20%" }}>สร้างวันที่</TableCell>
                            <TableCell sx={{ fontWeight: "bold", textAlign: "center", width: "20%" }}>จัดการ</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* ------------------------------------------------------------
                        ✅ ส่วนข้อมูลของตาราง (Table Body)
                        ภายในใช้ <SimpleTreeView> เพื่อแสดงหมวดหลัก + หมวดย่อย
                    ------------------------------------------------------------ */}
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4} sx={{ p: 0 }}>
                                <SimpleTreeView
                                    disableSelection
                                    // defaultExpandedItems={categories.map((c) => c.id)} // ขยายทั้งหมดอัตโนมัติ (option)
                                    slots={{
                                        collapseIcon: ExpandMoreIcon, // ไอคอนตอนขยาย
                                        expandIcon: ChevronRightIcon, // ไอคอนตอนยุบ
                                    }}
                                    sx={{
                                        "& .MuiTreeItem-content": { py: 0 },
                                        "& .MuiTreeItem-label": { width: "100%" },
                                        "& .MuiTreeItem-group": {
                                            borderLeft: "1px dashed #E0E0E0", // เส้นข้างหน้า child
                                            ml: 2,
                                        },
                                    }}
                                >

                                    {/* 🔹 Loop แสดงหมวดหมู่หลัก */}
                                    {paginatedCategories.map((cat) => (
                                        <TreeItem
                                            key={cat.id}
                                            itemId={cat.id}
                                            label={
                                                <Table size="small" sx={{ width: "100%", borderCollapse: "collapse" }}>
                                                    <TableBody>
                                                        <TableRow>
                                                            {/* 🧩 หมวดหลัก */}
                                                            <TableCell sx={{ width: "40%" }}>
                                                                <Typography sx={{ fontWeight: 400, fontSize: 13, color: "#000" }}>
                                                                    {cat.category}
                                                                </Typography>
                                                            </TableCell>

                                                            {/* 🧩 ผู้สร้าง */}
                                                            <TableCell sx={{ width: "20%" }}>
                                                                <Typography sx={{ fontSize: 13 }}>
                                                                    {cat.creator}
                                                                </Typography>
                                                            </TableCell>

                                                            {/* 🧩 วันที่สร้าง */}
                                                            <TableCell sx={{ width: "20%" }}>
                                                                <Typography sx={{ fontSize: 13 }}>
                                                                    {cat.createdAt}
                                                                </Typography>
                                                            </TableCell>

                                                            {/* 🧩 ปุ่มจัดการ */}
                                                            <TableCell
                                                                sx={{
                                                                    textAlign: "center",
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    gap: 0.5,
                                                                }}
                                                            >
                                                                {/* ✏️ ปุ่มแก้ไขหมวดหลัก */}
                                                                <IconButton
                                                                    size="small"
                                                                    color="primary"
                                                                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                                                                    onClick={() => onEdit(cat)}
                                                                >
                                                                    <EditIcon fontSize="small" sx={{ fontSize: 14 }} />
                                                                </IconButton>

                                                                {/* ➕ ปุ่มเพิ่มหมวดย่อย */}
                                                                <IconButton
                                                                    size="small"
                                                                    color="primary"
                                                                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                                                                    onClick={() => onAddSub(cat)}
                                                                >
                                                                    <AddCircleRoundedIcon fontSize="small" sx={{ fontSize: 14 }} />
                                                                </IconButton>

                                                                {/* ❌ ปุ่มลบ */}
                                                                <IconButton
                                                                    size="small"
                                                                    color="error"
                                                                    sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                                                                    onClick={() => onDelete(cat)}
                                                                >
                                                                    <DeleteIcon fontSize="small" sx={{ fontSize: 14 }} />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            }
                                        >
                                            {/* 🔸 แสดงหมวดย่อยของหมวดหลักนั้น */}
                                            {cat.children?.map((child) => (
                                                <TreeItem
                                                    key={child.id}
                                                    itemId={child.id}
                                                    sx={{ backgroundColor: '#F9F9FA' }}
                                                    label={
                                                        <Table size="small" sx={{ width: "100%", borderCollapse: "collapse" }}>
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell sx={{ width: "40%" }}>
                                                                        <Typography sx={{ fontWeight: 300, fontSize: 13, color: "#000" }}>
                                                                            {child.category}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell sx={{ width: "20%" }}>
                                                                        <Typography sx={{ fontSize: 13 }}>{cat.creator}</Typography>
                                                                    </TableCell>
                                                                    <TableCell sx={{ width: "20%" }}>
                                                                        <Typography sx={{ fontSize: 13 }}>{cat.createdAt}</Typography>
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            textAlign: "center",
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            gap: 0.5,
                                                                        }}
                                                                    >
                                                                        {/* ✏️ ปุ่มแก้ไขหมวดย่อย (ส่ง parent กลับไปด้วย) */}
                                                                        <IconButton
                                                                            size="small"
                                                                            color="primary"
                                                                            sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                                                                            onClick={() => onEdit(child, cat)}
                                                                        >
                                                                            <EditIcon fontSize="small" sx={{ fontSize: 14 }} />
                                                                        </IconButton>

                                                                        {/* ❌ ปุ่มลบหมวดย่อย */}
                                                                        <IconButton
                                                                            size="small"
                                                                            color="error"
                                                                            sx={{ backgroundColor: '#fff', borderRadius: 2 }}
                                                                            onClick={() => onDelete(child, cat)}
                                                                        >
                                                                            <DeleteIcon fontSize="small" sx={{ fontSize: 14 }} />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    }
                                                />
                                            ))}
                                        </TreeItem>
                                    ))}
                                </SimpleTreeView>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* ------------------------------------------------------------
                ✅ ส่วน Pagination ด้านล่าง
                ใช้ควบคุมจำนวนแถวต่อหน้า และสลับหน้า
            ------------------------------------------------------------ */}
            <Box sx={{ flexShrink: 0, }}>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={flattenedRows.length} // ✅ ใช้จำนวนทั้งหมดของหมวดหลัก + ย่อย
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Paper>
    );
};

export default CategoryTableChild

// "use client";

// import React, { useState } from "react";
// import { Paper, Typography, IconButton, Stack, Collapse, Box } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import BaseTable, { Column } from "../common/BaseTable";
// import { Category, SubCategory } from "@/app/types/categoryType";
// import { categories } from "@/app/data/categoryData";
// interface FlatCategory {
//     id: string;
//     category: string;
//     creator?: string;
//     createdAt?: string;
//     isChild?: boolean;
//     parentId?: string;
// }

// const flattenCategories = (cats: Category[]): FlatCategory[] => {
//     const rows: FlatCategory[] = [];
//     cats.forEach((cat) => {
//         rows.push({
//             id: cat.id,
//             category: cat.category,
//             creator: cat.creator,
//             createdAt: cat.createdAt,
//             isChild: false,
//         });
//         cat.children?.forEach((child) => {
//             rows.push({
//                 id: child.id,
//                 category: child.category,
//                 creator: cat.creator,
//                 createdAt: cat.createdAt,
//                 isChild: true,
//                 parentId: cat.id,
//             });
//         });
//     });
//     return rows;
// };

// const CategoryTableChild: React.FC = () => {
//     const [expandedIds, setExpandedIds] = useState<string[]>([]);

//     const handleToggleExpand = (id: string) => {
//         setExpandedIds((prev) =>
//             prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//         );
//     };

//     const handleEdit = (item: FlatCategory) => console.log("Edit:", item);
//     const handleAddSub = (item: FlatCategory) => console.log("Add Sub:", item);
//     const handleDelete = (item: FlatCategory) => console.log("Delete:", item);

//     const columns: Column<FlatCategory>[] = [
//         {
//             id: "category",
//             label: "หมวดหมู่",
//             render: (row) => {
//                 const isExpanded = expandedIds.includes(row.id);
//                 const hasChildren =
//                     !row.isChild &&
//                     categories.find((c) => c.id === row.id)?.children?.length;

//                 return (
//                     <Stack direction="row" alignItems="center" spacing={1}>
//                         {/* 🔽 ปุ่ม Expand */}
//                         {hasChildren ? (
//                             <IconButton
//                                 size="small"
//                                 onClick={() => handleToggleExpand(row.id)}
//                                 sx={{ p: 0.3 }}
//                             >
//                                 {isExpanded ? (
//                                     <ExpandMoreIcon fontSize="small" />
//                                 ) : (
//                                     <ChevronRightIcon fontSize="small" />
//                                 )}
//                             </IconButton>
//                         ) : (
//                             <Box sx={{ width: 24 }} /> // เว้นระยะถ้าไม่มีลูก
//                         )}

//                         {/* 🏷️ ชื่อหมวด */}
//                         <Typography
//                             sx={{
//                                 ml: row.isChild ? 3 : 0,
//                                 fontSize: 13,
//                                 fontWeight: row.isChild ? 400 : 600,
//                             }}
//                         >
//                             {row.category}
//                         </Typography>
//                     </Stack>
//                 );
//             },
//         },
//         { id: "creator", label: "ผู้สร้าง" },
//         { id: "createdAt", label: "วันที่สร้าง", align: "center" },
//         {
//             id: "action",
//             label: "จัดการ",
//             align: "center",
//             render: (row) => (
//                 <Stack direction="row" spacing={0.5} justifyContent="center">
//                     <IconButton
//                         size="small"
//                         color="primary"
//                         sx={{ backgroundColor: "#fff", borderRadius: 2 }}
//                         onClick={() => handleEdit(row)}
//                     >
//                         <EditIcon fontSize="small" sx={{ fontSize: 14 }} />
//                     </IconButton>

//                     {!row.isChild && (
//                         <IconButton
//                             size="small"
//                             color="primary"
//                             sx={{ backgroundColor: "#fff", borderRadius: 2 }}
//                             onClick={() => handleAddSub(row)}
//                         >
//                             <AddCircleRoundedIcon fontSize="small" sx={{ fontSize: 14 }} />
//                         </IconButton>
//                     )}

//                     <IconButton
//                         size="small"
//                         color="error"
//                         sx={{ backgroundColor: "#fff", borderRadius: 2 }}
//                         onClick={() => handleDelete(row)}
//                     >
//                         <DeleteIcon fontSize="small" sx={{ fontSize: 14 }} />
//                     </IconButton>
//                 </Stack>
//             ),
//         },
//     ];

//     // ✅ Filter เฉพาะหมวดหลัก + หมวดย่อยที่เปิดอยู่
//     const visibleRows = flattenCategories(categories).filter(
//         (row) =>
//             !row.isChild || (row.isChild && expandedIds.includes(row.parentId!))
//     );

//     return (
//         <Paper
//             elevation={2}
//             sx={{
//                 width: "100%",
//                 borderRadius: 3,
//                 overflow: "hidden",
//                 p: 1,
//             }}
//         >
//             <BaseTable
//                 columns={columns}
//                 rows={visibleRows}
//                 emptyText="ไม่พบข้อมูลหมวดหมู่"
//                 rowsPerPageOptions={[10, 25, 100]}
//             />
//         </Paper>
//     );
// };

// export default CategoryTableChild;
