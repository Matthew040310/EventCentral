import React from 'react'
import { Autocomplete, Chip, Grid, TextField } from '@mui/material'
import CustomDatePicker from '@/components/CustomDatePicker'
import Legend from '@/components/Legend'
import { ALL_DEPARTMENTS } from '@/constants/EventCentralConstants'

interface SearchEventToolBarProps {
    datumStartDate: Date;
    setDatumStartDate: (date: Date) => void;
    datumEndDate: Date;
    setDatumEndDate: (date: Date) => void;
    selectedDepartments: string[];
    setSelectedDepartments: (departments: string[]) => void;
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchEventToolBar: React.FC<SearchEventToolBarProps> = ({
    datumStartDate, setDatumStartDate,
    datumEndDate, setDatumEndDate,
    selectedDepartments, setSelectedDepartments,
    selectedCategories, setSelectedCategories,
}) => (
    <Grid container py={3} alignItems="center"
        justifyContent="center">

        <Grid size={1} display={{ xl: "block", xs: "none" }}></Grid>

        <Grid size={{ xl: 1.5, md: 3, xs: 5 }}>
            <CustomDatePicker md={10} sm={12}
                label={"Start Date"} required={false}
                value={datumStartDate} minSelectableDate={null}
                onChange={(date) => { setDatumStartDate(date as Date); }}
            />
        </Grid>

        <Grid size={{ xl: 1.5, md: 3, xs: 5 }}>
            <CustomDatePicker md={10} sm={12}
                label={"End Date"} required={false}
                value={datumEndDate} minSelectableDate={datumStartDate}
                onChange={(date) => { setDatumEndDate(date as Date); }}
            />
        </Grid>

        <Grid pb={1} size={4} display={{ xl: "flex", xs: "none" }} justifyContent="center">
            <Legend
                width="100%"
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                noDraftChip={true} />
        </Grid>

        <Grid mt={{ md: 1, xs: 3 }}
            size={{ xl: 1.5, md: 3, xs: 12 }} display="flex"
            ml={{ xl: "auto" }}
            justifyContent={{ xl: "center", md: "flex-end", xs: "center" }}
        >
            <Autocomplete
                sx={{ width: { md: "90%", xs: "83%" }, bgcolor: "white" }}
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

        <Grid mt={3} pb={1} size={{ xl: 4, xs: 12 }} display={{ xl: "none", xs: "flex" }} justifyContent="center">
            <Legend
                width="100%"
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                noDraftChip={true} />
        </Grid>
    </Grid >
)


export default SearchEventToolBar;