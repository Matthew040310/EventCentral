import React from 'react'
import { PropsWithChildren } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

interface EventStatisticsCardProps extends PropsWithChildren {
    color?: string;
    count: number;
}

const EventStatisticsCard: React.FC<EventStatisticsCardProps> = ({
    color = "", count, children
}) => (
    <Card sx={{
        color: color,
        width: "200px",
        boxShadow: '0 1px 5px rgba(0,0,0,0.10)',
        border: '1px solid #ddd',
    }}>
        <CardContent sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            <Typography gutterBottom variant="subtitle2" component="div">
                {children}
            </Typography>
            <Typography variant="h5" mt="auto">
                {count}
            </Typography>
        </CardContent>
    </Card>
)

export default EventStatisticsCard;