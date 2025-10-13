import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { StaticImageData } from "next/image";

export interface MediaItem {
    type: "image" | "video" | "qrcode";
    src: string | StaticImageData;
}

interface MediaSliderProps {
    media: MediaItem[];
}

const MediaSlider: React.FC<MediaSliderProps> = ({ media }) => {
    if (!media || media.length === 0) return null;

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 520,
                borderRadius: 4,
                overflow: "hidden", // ✅ ไม่ให้ภาพล้น container
                mx: "auto",
                display: 'flex'
                // position: "relative",
                // "& .swiper": {
                //     paddingBottom: "12px", // ✅ ระยะใต้ภาพ (เว้นให้จุดไข่ปลา)
                // },
                // "& .swiper-wrapper": {
                //     margin: 0, // ✅ เอาช่องว่างซ้าย-ขวาออก
                // },
                // "& .swiper-slide": {
                //     display: "flex",
                //     justifyContent: "center",
                //     alignItems: "center",
                // },
                // "& .swiper-pagination": {
                //     bottom: "10px",
                // },
                // "& .swiper-pagination-bullet": {
                //     backgroundColor: "#ccc",
                //     opacity: 1,
                //     width: 6,
                //     height: 6,
                //     mx: "2px",
                // },
                // "& .swiper-pagination-bullet-active": {
                //     backgroundColor: "#1976d2",
                // },
            }}
        >
            {/* <Swiper
                modules={[Pagination]} // ✅ ไม่มีปุ่มลูกศรแล้ว
                pagination={{ clickable: true }}
                loop={media.length > 3}
                grabCursor
                spaceBetween={4} // ✅ รูปชิดกัน
                slidesPerView={3} // ✅ แสดง 3 รูป
                breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 4 },
                    600: { slidesPerView: 2, spaceBetween: 4 },
                    900: { slidesPerView: 3, spaceBetween: 4 },
                }}
                style={{
                    "--swiper-pagination-color": "#333",
                } as React.CSSProperties}
            >
                {media.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {item.type === "image" && (
                                <Box
                                    component="img"
                                    src={
                                        typeof item.src === "string"
                                            ? item.src
                                            : (item.src as StaticImageData).src
                                    }
                                    alt={`image-${index}`}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        objectFit: "cover",
                                        borderRadius: 2,
                                        border: "1px solid #eee",
                                        backgroundColor: "#fff",
                                    }}
                                />
                            )}

                            {item.type === "video" && (
                                <Box
                                    component="video"
                                    {...({
                                        src:
                                            typeof item.src === "string"
                                                ? item.src
                                                : (item.src as StaticImageData).src,
                                        controls: true,
                                    } as React.VideoHTMLAttributes<HTMLVideoElement>)}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 2,
                                        backgroundColor: "#000",
                                        border: "1px solid #ddd",
                                        objectFit: "cover",
                                    }}
                                />
                            )}

                            {item.type === "qrcode" && (
                                <Box
                                    component="img"
                                    src={
                                        typeof item.src === "string"
                                            ? item.src
                                            : (item.src as StaticImageData).src
                                    }
                                    alt={`qr-${index}`}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 2,
                                        border: "1px solid #ddd",
                                        backgroundColor: "#fff",
                                        objectFit: "contain",
                                    }}
                                />
                            )}
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper> */}

            <Box sx={{ width: '100px', height: '100px', border: '1px solid #D1D5DB', borderRadius: 3, ml: 2 }}>
                <img src="#" alt="" />
            </Box>

            <Box sx={{ width: '100px', height: '100px', border: '1px solid #D1D5DB', borderRadius: 3, ml: 2 }}>
                <img src="#" alt="" />
            </Box>

            <Box sx={{ width: '100px', height: '100px', border: '1px solid #D1D5DB', borderRadius: 3, ml: 2 }}>
                <img src="#" alt="" />
            </Box>
        </Box>


    );
};

export default MediaSlider;
