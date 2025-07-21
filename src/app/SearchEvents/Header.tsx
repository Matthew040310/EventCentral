import React from 'react'
import { Grid, InputAdornment, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'

interface SearchEventHeaderProps {
    searchKeyword: string;
    setSearchKeyword: (keyword: string) => void;
}

const SearchEventHeader: React.FC<SearchEventHeaderProps> = ({
    searchKeyword, setSearchKeyword
}) => (
    <Grid container mt={3} justifyContent="center">
        <Grid size={{ xl: 6, md: 9, xs: 10 }}>
            <TextField
                fullWidth
                sx={{ bgcolor: "white" }}
                margin="dense"
                label="Search Event Keywords"
                size="medium"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>)
                    }
                }} />
        </Grid>
    </Grid >
)

export default SearchEventHeader;