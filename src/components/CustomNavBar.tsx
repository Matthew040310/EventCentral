"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, ClientSafeProvider, } from "next-auth/react";
import { AppBar, Box, Grid, IconButton, Toolbar, Menu, MenuItem, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AccountCircle, CalendarMonth, Home, Group, Logout, Search } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import fetchProviders from "@/util/fetchProviders";
import NavBarButton from "./NavBarButton";

const CustomNavBar: React.FC = () => {
  const { data: session } = useSession();
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

  const homeButton = <NavBarButton href="/" icon={<Home />} title="Home" />
  const calendarOverviewButton = <NavBarButton href="/CalendarOverview" icon={<CalendarMonth />} title="Calendar Overview" />
  const searchButton = <NavBarButton href="/SearchEvents" icon={<Search />} title="Search Events" />
  const manageUsersButton = <NavBarButton href="/manage-users" icon={<Group />} title="Manage Users" />
  const logoutButton = <NavBarButton href="/logout" icon={<Logout />} title="Logout" iconAsContent={true} />

  const loggedInUser = (
    session?.user &&
    <Typography fontSize={16} variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
      <AccountCircle sx={{ mr: 1 }} /><span className="span-bold-underline">{session?.user?.name}</span>
    </Typography>
  );

  // if (session?.user) 
  {
    return (
      <AppBar position="static">
        <Toolbar>
          {isSmallScreen ?
            /* Layout for smaller screens */
            (<Grid container alignItems="center">
              {/* Menu Dropdown Button */}
              <Grid size={2}>
                <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}><MenuIcon /></IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}>
                  <MenuItem onClick={() => setAnchorEl(null)}>{homeButton}</MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>{calendarOverviewButton}</MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>{searchButton}</MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>{manageUsersButton}</MenuItem>
                </Menu>
              </Grid>
              <Grid container justifyContent="center" alignItems="center" size={8}>{loggedInUser}</Grid>
              <Grid container justifyContent="flex-end" size={2}>{logoutButton}</Grid>
            </Grid>)
            :
            /* Layout for larger screens */
            (<>
              <Box>{homeButton}</Box>
              <Box flexGrow={1} sx={{ ml: 2 }}>{calendarOverviewButton}</Box>
              <Box sx={{ mr: 2 }}>{searchButton}</Box>
              <Box sx={{ mr: 2 }}>{manageUsersButton}</Box>
              <Box>{loggedInUser}</Box>
              <Box>{logoutButton}</Box>
            </>)}
        </Toolbar>
      </AppBar>
    );
  }
};

export default CustomNavBar;