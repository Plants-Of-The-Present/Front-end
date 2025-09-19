import React from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const RecuperacaoSenha: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FAFAF7",
        p: 2,
      }}
    >
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ alignSelf: "flex-start", color: "#2E7D32" }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            backgroundColor: "#2E7D32",
            color: "#fff",
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            maxWidth: 500,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Recuperar Senha
          </Typography>
          <Typography variant="body1">
            As informações para alterar a senha foram enviadas para o seu e-mail.
Não esqueça de checar a caixa de spam.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default RecuperacaoSenha;
