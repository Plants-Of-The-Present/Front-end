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
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  boxStyle,
  paperStyle,
  textFieldStyle,
  buttonStyle,
  loginLinkStyle,
} from "../components/Cadastro.styles";
import { apiService } from "../services/api";
import { authManager } from "../utils/auth";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validações básicas
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    if (!formData.profile) {
      setError("Selecione um perfil!");
      return;
    }

    if (formData.document.length !== 14) {
      setError("CNPJ deve ter 14 dígitos");
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.register({
        username: formData.email,
        password: formData.password,
        userType: formData.profile === "buyer" ? "BUYER" : "SUPPLIER",
        companyName: formData.companyName,
        companyCnpj: formData.document,
      });

      if (response.success && response.data) {
        // Salvar dados de autenticação
        authManager.saveAuthData(response.data.token, response.data.user);
        setSuccess("Cadastro realizado com sucesso! Redirecionando...");

        // Redirecionar após 2 segundos
        setTimeout(() => {
          navigate("/template");
        }, 2000);
      } else {
        setError(response.error || "Erro no cadastro");
      }
    } catch (error) {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
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

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

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
                disabled={loading}
                sx={{
                  ...buttonStyle,
                  position: 'relative',
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    Cadastrando...
                  </>
                ) : (
                  'Cadastre-se'
                )}
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
