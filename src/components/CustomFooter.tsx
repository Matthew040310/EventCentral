import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => (
  <Box sx={{ p: 1, backgroundColor: "#f0f0f0", mt: 3, justifyContent: "center", textAlign: "center" }}>
    <Typography variant="caption" color="textSecondary">
      Made by Matthew Lim (SLD/BIA Intern) | © 2025 Next.js Portal
    </Typography>
  </Box>
);

export default Footer;