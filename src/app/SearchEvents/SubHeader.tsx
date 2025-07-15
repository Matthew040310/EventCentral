import React from 'react'
import { Grid, InputAdornment, TextField, Typography } from '@mui/material'
import CustomDatePicker from '@/components/CustomDatePicker'
import { Search } from '@mui/icons-material'
import Legend from '@/components/Legend'
import dateFormatter from '@/util/dateFormatter'

interface SubHeaderProps {
    datumStartDate: Date | null;
    setDatumStartDate: (date: Date | null) => void;
    datumEndDate: Date | null;
    setDatumEndDate: (date: Date | null) => void;
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({
    datumStartDate,
    setDatumStartDate,
    datumEndDate,
    setDatumEndDate,
    selectedCategories,
    setSelectedCategories,
    searchKeyword,
    setSearchKeyword
}) => (
    <Grid container mt={1} alignItems={"center"}
        justifyContent={{ lg: "center", sm: "flex-start" }}
        textAlign={{ lg: "center", sm: "left" }} bgcolor={"white"} >

        <Grid size={1} display={{ xs: "none", md: "block" }}></Grid>

        <Grid size={{ xl: 1.5, md: 3, xs: 12 }}>
            <CustomDatePicker md={10}
                label={"Start Date"} required={false}
                value={datumStartDate} minSelectableDate={null}
                onChange={(date) => { setDatumStartDate(date); }}
            />
        </Grid>

        <Grid size={{ xl: 1.5, md: 3, xs: 12 }}>
            <CustomDatePicker md={10}
                label={"End Date"} required={false}
                value={datumEndDate} minSelectableDate={null}
                onChange={(date) => { setDatumEndDate(date); }}
            />
        </Grid>

        <Grid size={{ md: 3, xs: 12 }} display={{ xs: "block", xl: "none" }} mt={1}>
            <TextField
                sx={{ width: "100%" }}
                margin="dense"
                label={"Search Event Keywords"}
                size="medium"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>)
                    }
                }} />
        </Grid>

        <Grid mt={2} size={{ xl: 4.5, lg: 12 }}>
            <Legend
                width="100%"
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories} />
        </Grid>

        <Grid size={2.5} display={{ xs: "none", xl: "block" }}>
            <TextField
                sx={{ width: "100%" }}
                margin="dense"
                label={"Search Event Keywords"}
                size="medium"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>)
                    }
                }} />
        </Grid>

        <Grid size={1} display={{ xs: "none", xl: "block" }}></Grid>

        <Grid size={12}>
            <Typography variant='h6' fontSize={"3vh"} mb={1}>
                All Events From <u>{dateFormatter(datumStartDate)}</u> to <u>{dateFormatter(datumEndDate)}</u>
            </Typography>
        </Grid>
    </Grid >
)


export default SubHeader