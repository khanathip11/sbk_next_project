'use client';
import React, { useState } from 'react';
import {
    Box,
    Typography,
} from '@mui/material';
import { IssueItem } from '@/app/types/IssueItem';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import MediaSlider from '../common/MediaSlider';
import { MediaItem } from '../common/MediaSlider';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

interface OfficerFormProps {
    selectedIssue?: IssueItem | null;
    selectedRow: IssueItem | null;
}

const FeedbackIssueInfoRight: React.FC<OfficerFormProps> = ({ selectedIssue, selectedRow }) => {
    const mediaItems: MediaItem[] = [
        ...(selectedRow?.img ? selectedRow.img.map((src) => ({ type: 'image' as const, src })) : []),
        ...(selectedRow?.video ? selectedRow.video.map((src) => ({ type: 'video' as const, src })) : []),
        ...(selectedRow?.qrCode ? [{ type: 'qrcode' as const, src: selectedRow.qrCode }] : []),
    ];
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
                <Typography sx={{ color: '#000' }}>ผลการดำเนินการ</Typography>
            </Box>
            <Box
                sx={{
                    color: '#000',
                    width: '100%',
                    minHeight: 200,
                    maxHeight: "auto",
                    border: '1px solid #F0F0F0',
                    borderRadius: 4,
                    backgroundColor: '#F7F7F7',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    overflowY: "auto",
                    scrollbarWidth: "none",   // Firefox
                    msOverflowStyle: "none",  // IE, Edge
                    "&::-webkit-scrollbar": {
                        display: "none",        // Chrome, Safari, Opera
                    },
                }}
            >
                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <DescriptionOutlinedIcon sx={{ fontSize: 18, mr: 0.8 }} />
                        <Typography variant="subtitle1" sx={{ color: '#0A0C11', fontSize: 13 }}>
                            รายละเอียด
                        </Typography>
                    </Box>
                    <Typography sx={{ pl: 4, color: '#5B616D', fontSize: 13 }}>{selectedIssue?.problem}</Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                        <PhotoLibraryOutlinedIcon sx={{ fontSize: 18, mr: 0.8 }} />
                        <Typography variant="subtitle1" sx={{ color: '#0A0C11', fontSize: 13 }}>
                            รูปภาพและวิดีโอ
                        </Typography>
                    </Box>
                    <MediaSlider media={mediaItems} />
                </Box>

            </Box>

            <Box sx={{ textAlign: 'center', mb: 1, mt: 1, }}>
                <Typography sx={{ color: '#000' }}>ผลการประเมิน</Typography>
            </Box>
            <Box
                sx={{
                    color: '#000',
                    width: '100%',
                    minHeight: 200,
                    maxHeight: "auto",
                    border: '1px solid #F0F0F0',
                    borderRadius: 4,
                    backgroundColor: '#F7F7F7',
                    p: 2,

                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    overflowY: "auto",
                    scrollbarWidth: "none",   // Firefox
                    msOverflowStyle: "none",  // IE, Edge
                    "&::-webkit-scrollbar": {
                        display: "none",        // Chrome, Safari, Opera
                    },
                }}
            >
                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <FavoriteBorderRoundedIcon sx={{ fontSize: 18, mr: 0.8 }} />
                        <Typography variant="subtitle1" sx={{ color: '#0A0C11', fontSize: 13 }}>
                            ระดับความพึงพอใจ
                        </Typography>
                    </Box>
                    <Typography sx={{ pl: 4, color: '#5B616D', fontSize: 13 }}>{selectedIssue?.satisfactionLevel}</Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <RateReviewOutlinedIcon sx={{ fontSize: 18, mr: 0.8 }} />
                        <Typography variant="subtitle1" sx={{ color: '#0A0C11', fontSize: 13 }}>
                            ข้อเสนอแนะ
                        </Typography>
                    </Box>
                    <Typography sx={{ pl: 4, color: '#5B616D', fontSize: 13 }}>{selectedIssue?.suggestionCategory}</Typography>
                </Box>
            </Box>

        </Box >
    )
}

export default FeedbackIssueInfoRight