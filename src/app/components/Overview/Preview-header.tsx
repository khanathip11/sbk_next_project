// // ✅ PreviewHeader.tsx
// import { StaticImageData } from "next/image";
// import { Box, CardMedia } from "@mui/material";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// interface PreviewHeaderProps {
//     imageSrc: string | StaticImageData;
//     onClose: () => void;
// }

// const PreviewHeader: React.FC<PreviewHeaderProps> = ({ imageSrc, onClose }) => {
//     const imageUrl = typeof imageSrc === "string" ? imageSrc : imageSrc.src;

//     return (
//         <>
//             <Box
//                 sx={{
//                     position: "absolute",
//                     top: 8,
//                     right: 8,
//                     zIndex: 10,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                 }}
//             >
//                 <CloseOutlinedIcon
//                     onClick={onClose}
//                     sx={{
//                         fontSize: 18,
//                         color: "text.secondary",
//                         cursor: "pointer",
//                     }}
//                 />
//             </Box>

//             <CardMedia
//                 component="img"
//                 image={imageUrl}
//                 alt="Preview"
//                 sx={{ width: "100%", height: "auto", objectFit: "cover" }}
//             />
//         </>
//     );
// };

// export default PreviewHeader;


// ✅ PreviewHeader.tsx
import { StaticImageData } from "next/image";
import { Box, CardMedia } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

/**
 * 🔹 Props ที่ใช้ใน PreviewHeader
 * - imageSrc: รูปภาพ (อาจเป็น string หรือ StaticImageData)
 * - onClose: ฟังก์ชันสำหรับปิดหน้า preview
 */
interface PreviewHeaderProps {
    imageSrc: string | StaticImageData;
    onClose: () => void;
}

/**
 * ✅ Component: PreviewHeader
 * แสดงภาพ header ด้านบนของ preview panel
 * พร้อมปุ่ม "ปิด" (X) ที่มุมขวาบน
 */
const PreviewHeader: React.FC<PreviewHeaderProps> = ({ imageSrc, onClose }) => {
    // 🔸 ตรวจสอบว่าภาพเป็น string หรือ StaticImageData
    const imageUrl = typeof imageSrc === "string" ? imageSrc : imageSrc.src;

    return (
        <>
            {/* 🔹 ปุ่ม X ปิดหน้า Preview */}
            <Box
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 10, // ✅ ให้อยู่เหนือรูปภาพ
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CloseOutlinedIcon
                    onClick={onClose}
                    sx={{
                        fontSize: 18,
                        color: "text.secondary",
                        cursor: "pointer",
                        transition: "0.2s",
                        "&:hover": { color: "#000" }, // 🔸 เพิ่ม hover effect
                    }}
                />
            </Box>

            {/* 🔹 แสดงรูปภาพ */}
            <CardMedia
                component="img"
                image={imageUrl}
                alt="Preview"
                sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover", // ✅ ปรับภาพให้พอดีกับกรอบ
                    borderRadius: "8px 8px 0 0", // ✅ มุมบนโค้งเล็กน้อย
                }}
            />
        </>
    );
};

export default PreviewHeader;
