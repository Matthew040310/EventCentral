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
    <Card sx={{ width: "25vh", color: color, }}>
        <CardContent sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6" component="div">
                {children}
            </Typography>
            <Typography variant="h4">
                {count}
            </Typography>
        </CardContent>
    </Card>
)

export default EventStatisticsCard;