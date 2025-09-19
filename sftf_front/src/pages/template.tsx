// src/pages/template.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import SideMenu from "../components/menu_lat";

const TemplatePage: React.FC = () => {
  return (
    <Box display="flex" minHeight="100vh">
      <SideMenu />
      <Box flex={1} p={4}>
        <Typography variant="h4">Template de páginas</Typography>
      </Box>
    </Box>
  );
};

export default TemplatePage;