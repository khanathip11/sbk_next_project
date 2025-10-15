// ✅ PreviewHeader.tsx
import { StaticImageData } from "next/image";
import { Box, CardMedia } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface PreviewHeaderProps {
    imageSrc: string | StaticImageData;
    onClose: () => void;
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({ imageSrc, onClose }) => {
    const imageUrl = typeof imageSrc === "string" ? imageSrc : imageSrc.src;

    return (
        <>
            <Box
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 10,
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
                    }}
                />
            </Box>

            <CardMedia
                component="img"
                image={imageUrl}
                alt="Preview"
                sx={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
        </>
    );
};

export default PreviewHeader;
