"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, ClientSafeProvider, } from "next-auth/react";
import { AppBar, Box, Grid, IconButton, Toolbar, Menu, MenuItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AccountCircle, AddCircleOutline, Assessment, CalendarMonth, Home, Group, Logout, ManageAccounts, Search, Info } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import fetchProviders from "@/util/fetchProviders";
import NavBarButton from "./NavBarButton";

const CustomNavBar: React.FC = () => {
  // const { data: session } = useSession();
  const theme = useTheme();
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);

  // Collapsable Menu State
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(750));       // true when screen width <= 750px
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // useEffect(() => {
  //   fetchProviders(setProviders)
  //   if (!session?.user && providers.length > 0) {
  //     signIn(providers[0].id, { callbackUrl: "/" });
  //   }
  // }, [session]);

  const HomeButton = <NavBarButton href="/" icon={<CalendarMonth />} title="Home" />
  const CMMReportButton = <NavBarButton href="/CMMReport" icon={<Assessment />} title="Overview" />
  const InfoButton = <NavBarButton href="#" icon={<Info />} title="Wiki" />
  const SubmitNewEventButton = <NavBarButton href="/EDC-Submission-Form" icon={<AddCircleOutline />} title="Submit New Event" />
  const SearchButton = <NavBarButton href="/SearchEvents" icon={<Search />} title="Search Events" />
  const ManageUsersButton = <NavBarButton href="/ManageUsers" icon={<ManageAccounts />} title="Manage Users" />
  const LogoutButton = <NavBarButton href="/" icon={<Logout />} title="Exit Event Central" iconAsContent={true} />

  // const loggedInUser = (
  //   session?.user &&
  //   <Typography fontSize={16} variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
  //     <AccountCircle sx={{ mr: 1 }} /><span className="span-bold-underline">{session?.user?.name}</span>
  //   </Typography>
  // );

  // if (session?.user) 
  {
    return (
      <AppBar position="static">
        <Toolbar>
          {isSmallScreen ?
            /* Layout for smaller screens */
            (<Grid container alignItems="center" width="100%">
              {/* Menu Dropdown Button */}
              <Grid size={2}>
                <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}><MenuIcon /></IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}>
                  <MenuItem onClick={() => setAnchorEl(null)}>{HomeButton}</MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>{CMMReportButton}</MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>{InfoButton}</MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>{SubmitNewEventButton}</MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>{SearchButton}</MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>{ManageUsersButton}</MenuItem>
                </Menu>
              </Grid>
              {/* <Grid ml="auto">{loggedInUser}</Grid> */}
              <Grid ml="auto">{LogoutButton}</Grid>
            </Grid>)
            :
            /* Layout for larger screens */
            (<>
              <Box ml={2}>{HomeButton}</Box>
              <Box ml={2}>{CMMReportButton}</Box>
              <Box ml={2}>{InfoButton}</Box>
              <Box ml="auto">{SubmitNewEventButton}</Box>
              <Box ml={2}>{SearchButton}</Box>
              <Box ml={2}>{ManageUsersButton}</Box>
              {/* <Box ml={2}>{loggedInUser}</Box> */}
              <Box ml={2}>{LogoutButton}</Box>
            </>)}
        </Toolbar>
      </AppBar>
    );
  }
};

export default CustomNavBar;