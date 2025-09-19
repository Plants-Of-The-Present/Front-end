import React from "react";
import { Box, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";

interface TituloPaginaProps {
  titulo: string;
  backRoute: string; // Nova prop para a rota de retorno
}

export const TituloPagina: React.FC<TituloPaginaProps> = ({ titulo, backRoute }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(backRoute); // Usa a rota passada como prop
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Typography
        sx={{
          fontFamily: "Nunito",
          fontWeight: "bold",
          fontSize: "64px",
          color: "#2E7D32",
        }}
      >
        {titulo}
      </Typography>
    </Box>
  );
};