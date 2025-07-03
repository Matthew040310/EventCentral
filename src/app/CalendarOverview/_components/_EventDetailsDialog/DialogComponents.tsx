import { ReactNode } from 'react'
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Square } from '@mui/icons-material';

const TypographyS2 = ({ children, mt = 2 }:
    { children: ReactNode, mt?: number }) => (
    <Typography variant="subtitle2" color="text.secondary" mt={mt}>
        {children}
    </Typography>
);

const TypographyB2 = ({ children }:
    { children: ReactNode }) => (
    <Grid size={12}>
        <Typography variant="body2" color="text.secondary">
            {children}
        </Typography>
    </Grid>
);

const DividerWithText = ({ children, icon }:
    { icon: ReactNode, children: ReactNode }) => (
    <Divider textAlign="left" sx={{ my: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
            {icon}
            <TypographyS2 mt={0}>{children}</TypographyS2>
        </Stack>
    </Divider>
);

const ImpactAssessmentQuestion = ({ icon, question, answer, types, details, mt = 2 }:
    { icon: ReactNode, question: string, answer?: ReactNode, types?: string[], details?: ReactNode, mt?: number }) => (
    <Grid mt={mt} size={12}>
        <Stack direction="row" alignItems="center" mb={1}>
            <Grid size={6}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    {icon}
                    <Typography variant="body2"><b>{question}</b></Typography>
                </Stack>
            </Grid>
            <Grid size={6}>
                <Typography variant="body2" display="flex" justifyContent="center"
                    sx={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>
                    {answer}
                </Typography>
            </Grid>
        </Stack>
        {answer !== "No" && (
            <>
                {types && (< ImpactAssessmentTypes mapOptions={types} />)}
                {details && (< ImpactAssessmentDetails > {details}</ImpactAssessmentDetails>)}
            </>
        )}
    </Grid >
);

const ImpactAssessmentTypes = ({ mapOptions }: { mapOptions: string[] }) => (
    mapOptions.map((option) => (
        <Typography key={option} variant="body2" color="text.secondary">
            <Square sx={{ fontSize: 8, mx: 2 }} />
            {option}
        </Typography>
    ))
);

const ImpactAssessmentDetails = ({ children }: { children: ReactNode }) => (
    <Typography variant="body2" color="text.secondary" mt={2}>
        {children}
    </Typography>
);

export { TypographyS2, TypographyB2, DividerWithText, ImpactAssessmentQuestion }