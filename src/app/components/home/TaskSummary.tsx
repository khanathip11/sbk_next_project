import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type taskProps = {
    count: number;
    closeTask: boolean;
    SetCloseTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskSummary = ({ count, closeTask, SetCloseTask }: taskProps) => {
    return (
        <Box p={1}>
            <Stack direction={!closeTask ? "row" : "column"} spacing={1} alignItems="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                {!closeTask && (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 10, pl: 1, color: count ? 'red' : 'black' }}>
                            {count + ' Result'}
                        </Typography>
                        <Typography sx={{ fontSize: 10, ml: -0.5 }}>in Thailand</Typography>
                    </Box>
                )}

                <Box flexGrow={1} />

                <IconButton
                    sx={{
                        bgcolor: "white",
                        borderRadius: 2,
                        p: 0.8,
                    }}
                    onClick={() => SetCloseTask(!closeTask)}
                >
                    <ArrowForwardIosIcon
                        sx={{
                            fontSize: !closeTask ? 8 : 14,
                            color: "black",
                            transform: closeTask ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.5s ease",
                        }}
                    />
                </IconButton>
            </Stack>

            {closeTask && (
                <Box>
                    <Typography>banan</Typography>
                </Box>
            )}
        </Box>
    )
}

export default TaskSummary