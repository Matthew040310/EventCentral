import React from 'react'
import { Autocomplete, Chip, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import CustomDatePicker from '@/components/CustomDatePicker'
import { Search } from '@mui/icons-material'
import Legend from '@/components/Legend'
import dateFormatter from '@/util/dateFormatter'
import { ALL_DEPARTMENTS } from '@/constants/EventCentralConstants'

interface SearchEventToolBarProps {
    datumStartDate: Date | null;
    setDatumStartDate: (date: Date | null) => void;
    datumEndDate: Date | null;
    setDatumEndDate: (date: Date | null) => void;
    selectedDepartments: string[];
    setSelectedDepartments: (departments: string[]) => void;
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
}

const SearchEventToolBar: React.FC<SearchEventToolBarProps> = ({
    datumStartDate, setDatumStartDate,
    datumEndDate, setDatumEndDate,
    selectedDepartments, setSelectedDepartments,
    selectedCategories, setSelectedCategories,
    searchKeyword, setSearchKeyword
}) => (
    <Grid container mt={1}
        alignItems={"center"}
        textAlign={{ lg: "center", sm: "left" }} spacing={1} bgcolor={"white"} >

        {/* <Grid size={1} display={{ xs: "none", md: "block" }}></Grid> */}
        <Grid size={1}></Grid>

        <Grid size={{ xl: 1.5, md: 2.5, xs: 5 }}>
            <CustomDatePicker md={10} sm={12}
                label={"Start Date"} required={false}
                value={datumStartDate} minSelectableDate={null}
                onChange={(date) => { setDatumStartDate(date); }}
            />
        </Grid>

        <Grid size={{ xl: 1.5, md: 2.5, xs: 5 }}>
            <CustomDatePicker md={10} sm={12}
                label={"End Date"} required={false}
                value={datumEndDate} minSelectableDate={datumStartDate}
                onChange={(date) => { setDatumEndDate(date); }}
            />
        </Grid>

        <Grid pb={1} size={{ xl: 4, xs: 12 }} display={{ xl: "flex", xs: "none" }} justifyContent="center">
            <Legend
                width="100%"
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                noDraftChip={true} />
        </Grid>

        <Grid mt={1} size={{ xl: 1.5, md: 2.5, xs: 12 }} display="flex"
            justifyContent={{ xs: "center" }}>
            <Autocomplete
                sx={{ width: { md: "90%", xs: "83%" } }}
                multiple
                options={ALL_DEPARTMENTS}
                value={selectedDepartments}
                onChange={(_, newValue) => setSelectedDepartments(newValue)}
                renderValue={(value, props) =>
                    value.map((option, index) => (
                        <Chip label={option} {...props({ index })} key={index} />
                    ))
                }
                renderInput={(params) => (
                    <TextField {...params} label={"Filter by Dept"} />
                )}
            />
        </Grid>

        <Grid mt={1.5} size={{ xl: 1.5, md: 2.5, xs: 12 }} display="flex"
            justifyContent={{ xs: "center" }}>
            <TextField
                sx={{ width: { md: "90%", xs: "83%" } }}
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

        <Grid pb={1} size={{ xl: 4, xs: 12 }} display={{ xl: "none", xs: "flex" }} justifyContent="center">
            <Legend
                width="100%"
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                noDraftChip={true} />
        </Grid>

        <Grid size={1} display={{ xs: "none", xl: "block" }}></Grid>

        <Grid size={12} textAlign="center">
            <Typography variant='h6' fontSize={"3vh"} mb={1}>
                All Events From <u>{dateFormatter(datumStartDate)}</u> to <u>{dateFormatter(datumEndDate)}</u>
            </Typography>
        </Grid>
    </Grid >
)


export default SearchEventToolBar;