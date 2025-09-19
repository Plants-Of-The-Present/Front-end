// src/pages/Cadastro.tsx
import React, { useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  boxStyle,
  paperStyle,
  textFieldStyle,
  buttonStyle,
  loginLinkStyle,
} from "../components/Cadastro.styles";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  document: string;
  profile: "buyer" | "provider" | "";
}

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    document: "",
    profile: "",
  });

  const navigate = useNavigate();

  const handleCheckboxChange = (name: "buyer" | "provider") => {
    setFormData((prev) => ({
      ...prev,
      profile: prev.profile === name ? "" : name,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!formData.profile) {
      alert("Selecione um perfil!");
      return;
    }

    console.log("Dados do formulário de cadastro:", formData);
    alert("Cadastro realizado com sucesso! (simulação)");
    navigate("/login");
  };

  return (
    <Box sx={boxStyle}>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ width: "100%", maxWidth: "500px" }}
      >
        <Paper sx={paperStyle}>
          <Typography
            variant="h3"
            sx={{ color: "#F5F5F0", marginBottom: "30px" }}
          >
            Cadastro
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="E-mail"
                variant="outlined"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                label="Senha"
                variant="outlined"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                label="Confirmar Senha"
                variant="outlined"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                label="Nome da Empresa"
                variant="outlined"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                label="CNPJ ou CPF"
                variant="outlined"
                name="document"
                type="text"
                value={formData.document}
                onChange={handleInputChange}
                sx={textFieldStyle}
              />

              <Stack spacing={1} sx={{ margin: "20px 0" }}>
                <Typography variant="subtitle1" sx={{ color: "#F5F5F0" }}>
                  Selecione o seu perfil:
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.profile === "buyer"}
                      onChange={() => handleCheckboxChange("buyer")}
                    />
                  }
                  label="Comprador"
                  sx={{ color: "#FFF" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.profile === "provider"}
                      onChange={() => handleCheckboxChange("provider")}
                    />
                  }
                  label="Provedor de créditos de carbono"
                  sx={{ color: "#FFF" }}
                />
              </Stack>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={buttonStyle}
              >
                Cadastre-se
              </Button>
            </Stack>
          </form>
        </Paper>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: "20px" }}
        >
          <Typography variant="body2" sx={{ color: "#2E7D32" }}>
            Já possui uma conta?
          </Typography>
          <Button
            variant="text"
            sx={loginLinkStyle}
            onClick={() => navigate("/login")}
          >
            Faça login
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Cadastro;
