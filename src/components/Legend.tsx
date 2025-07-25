import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { Event_Legend } from '@/styles/theme';

const legendItems = Object.entries(Event_Legend);
const LegendExplanation = [
    "Potential to cause perceived unhappiness among members \nOR \nEmbargoed Event \nOR \nCohort Size >= 2m",
    "New or Existing with Changes Event",
    "Existing Event above 100k (inclusive)",
    "Existing Event below 100k",
    "Draft Event"
]

interface LegendProps {
    width: string;
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    showExplaination?: boolean;
    noDraftChip?: boolean;
}

const Legend: React.FC<LegendProps> = ({
    width,
    selectedCategories,
    setSelectedCategories,
    showExplaination = true,
    noDraftChip = false
}) => {
    const handleChipClick = (category: string) => {
        setSelectedCategories(prev => prev.includes(category)
            ? prev.filter(cat => cat !== category)
            : [...prev, category]
        );
    };

    const getChipStyles = (color: string, selected: boolean) => ({
        backgroundColor: selected ? `${color} !important` : 'white',
        color: selected ? 'white' : color,
        borderColor: color,
        fontWeight: 500,
        boxShadow: 1,
        minWidth: '7vw',
    });

    return (
        <Box justifyContent="center" textAlign="center" width={width} >
            {showExplaination &&
                <Typography variant='h6' mb={1}>Click to Filter by Category</Typography>
            }
            <Stack direction="row" textAlign="center" justifyContent="center" spacing={2}>
                {legendItems.map(([category, color], index) => {
                    if (noDraftChip && category === 'Draft') return null; // Skip Draft chip if noDraftChip is true. Used for SearchEvents page only

                    const selected = selectedCategories.includes(category);
                    return (
                        <Chip
                            key={category}
                            label={category}
                            title={LegendExplanation[index]}
                            variant={selected ? 'filled' : 'outlined'}
                            sx={getChipStyles(color, selected)}
                            onClick={() => handleChipClick(category)}
                        />
                    );
                })}
            </Stack>
        </Box>
    );
};

export default Legend;