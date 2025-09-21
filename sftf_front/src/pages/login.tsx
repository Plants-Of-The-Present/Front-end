import React, { useState } from "react";
import {
  Container,
  Stack,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  boxStyle,
  paperStyle,
  textFieldStyle,
  buttonStyle,
} from "../components/Login.styles";
import { apiService } from "../services/api";
import { authManager } from "../utils/auth";

interface SignUpFormData {
  id_method: string;
  password: string;
  keep_logged_in: boolean;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    id_method: "",
    password: "",
    keep_logged_in: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.id_method || !formData.password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.login({
        username: formData.id_method,
        password: formData.password,
      });

      if (response.success && response.data) {
        // Salvar dados de autenticação
        authManager.saveAuthData(response.data.token, response.data.user);

        // Redirecionar para a página principal
        navigate("/template");
      } else {
        setError(response.error || "Erro no login");
      }
    } catch (error) {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={1}>
        <Paper sx={paperStyle}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Typography variant="h3" sx={{ color: "#F5F5F0" }}>
                Entrar
              </Typography>

              <Typography variant="body1" color="#F5F5F0">
                Para entrar, digite o seu e-mail e senha.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                name="id_method"
                label="Digite o seu e-mail:"
                variant="outlined"
                sx={textFieldStyle}
                fullWidth
                value={formData.id_method}
                onChange={handleInputChange}
              />

              <TextField
                name="password"
                label="Digite a sua senha:"
                variant="outlined"
                sx={textFieldStyle}
                fullWidth
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />

              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  fontSize: "0.9rem",
                  color: "#F5F5F0",
                  "&:hover": { color: "#8B0000" },
                  alignSelf: "flex-start",
                }}
                onClick={() => navigate("/recuperacao")}
              >
                Esqueceu a senha?
              </Button>

              <FormControlLabel
                control={
                  <Checkbox
                    name="keep_logged_in"
                    checked={formData.keep_logged_in}
                    onChange={handleInputChange}
                  />
                }
                label={<Typography sx={{ color: "#F5F5F0" }}>Manter-me conectado</Typography>}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  ...buttonStyle,
                  alignSelf: "flex-end",
                  position: 'relative',
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
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
        >
          <Typography variant="body2" sx={{ color: "#2E7D32" }}>
            Não possui uma conta?
          </Typography>
          <Button
            variant="text"
            sx={{
              textTransform: "none",
              fontSize: "0.9rem",
              color: "#2E7D32",
              "&:hover": { color: "#D16B3F" },
            }}
            onClick={() => navigate("/cadastro")}
          >
            Cadastre-se
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Login;
