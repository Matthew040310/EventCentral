import React from 'react';
import { Grid, Stack, Button } from '@mui/material';

export interface ICustomButtonProps {
    sm?: number;
    xs?: number;
    color: 'primary' | 'error' | 'success' | 'secondary' | 'info' | 'warning';
    onClick: () => void;
    disabled?: boolean;
    endIcon?: React.ReactNode;
    children?: React.ReactNode;
    button_mt?: number;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
    sm = 2.5,
    xs = 4,
    color,
    onClick,
    disabled = false,
    endIcon,
    children,
    button_mt = 2,
}) => (
    <Grid mt={1} size={{ sm: sm, xs: xs }}>
        <Stack alignItems="center" justifyContent="center" sx={{ mt: button_mt }}>
            <Button
                variant="contained"
                color={color}
                onClick={onClick}
                disabled={disabled}
                sx={{ width: 100, mb: 1 }}
                endIcon={endIcon}
            >
                {children}
            </Button>
        </Stack>
    </Grid>
);

export default CustomButton;
