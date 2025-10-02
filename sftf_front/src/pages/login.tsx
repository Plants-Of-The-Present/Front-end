import React, { useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import { authManager } from "../utils/auth";

// URL da logo no Imgur
const ECO_CERTIFY_LOGO_URL = "https://i.imgur.com/rZUW4pU.png"; // Seu link direto da logo

// URL da imagem de fundo
const BACKGROUND_IMAGE_URL = "https://images.pexels.com/photos/15517974/pexels-photo-15517974.jpeg?_gl=1*1gereap*_ga*NTQ3MTc1NDA0LjE3NTkyODQ2NTM.*_ga_8JE65Q40S6*czE3NTkyODg5ODEkbzIkZzEkdDE3NTkyODkyNDMkajYwJGwwJGgw";

// Definindo estilos usando styled do MUI para a estética desejada
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 380,
  margin: "auto", // Mantém o quadrado centralizado
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
}));

// Os StyledTextFields agora herdarão a fonte Belleza do tema
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "transparent",
      transition: 'box-shadow 0.3s ease-in-out',
    },
    "&:hover fieldset": {
      borderColor: "transparent",
      boxShadow: '0 0 10px rgba(46, 125, 50, 0.4)',
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
      boxShadow: '0 0 10px rgba(46, 125, 50, 0.6)',
    },
    "& input": {
      color: theme.palette.grey[800],
      // font-family Belleza será herdado do tema automaticamente
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[600],
    // font-family Belleza será herdado do tema automaticamente
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.success.dark,
  },
}));

// O StyledButton agora herdará a fonte Belleza do tema
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: "rgba(209, 107, 63, 0.7)", // D16B3F em RGB com 70% de opacidade
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: "rgba(209, 107, 63, 1)", // Laranja sólido no hover
  },
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: "none",
  // font-family Belleza será herdado do tema automaticamente
}));

const BackgroundBox = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});


interface LoginFormData {
  id_method: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    id_method: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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
        authManager.saveAuthData(response.data.token, response.data.user);
        navigate("/areas");
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
    <BackgroundBox>
        <StyledPaper> {/* Quadrado centralizado */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} alignItems="center">
              <Box sx={{ mb: 1 }}>
                <img
                  src={ECO_CERTIFY_LOGO_URL}
                  alt="EcoCertify Logo"
                  style={{ height: 80 }}
                />
              </Box>

              <Typography variant="body1" sx={{ 
                color: "text.secondary", 
                textAlign: "center", 
                mb: 2, 
                fontWeight: '700' // Mantendo o negrito
              }}>
                Para entrar, digite o seu e-mail e senha.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                  {error}
                </Alert>
              )}

              <StyledTextField
                name="id_method"
                label="Email"
                variant="outlined"
                fullWidth
                value={formData.id_method}
                onChange={handleInputChange}
                size="small"
              />

              <StyledTextField
                name="password"
                label="Senha"
                variant="outlined"
                fullWidth
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                size="small"
              />

              <Button
                variant="text"
                sx={{
                  alignSelf: 'flex-start',
                  textTransform: "none",
                  fontSize: "0.85rem",
                  color: "#1B5E20", // Cor verde (2E7D32)
                  "&:hover": { color: "#2E7D32" }, // Um tom mais escuro para o hover
                  p: 0,
                  mt: -1,
                  mb: 0.5,
                }}
                onClick={() => navigate("/recuperacao")}
              >
                Esqueceu a senha?
              </Button>

              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                sx={{
                  alignSelf: 'flex-start',
                  mb: 2,
                }}
              >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Não tem conta?
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontSize: "0.85rem",
                    color: "#1B5E20", // Cor verde (2E7D32)
                    "&:hover": { color: "#2E7D32" }, // Um tom mais escuro para o hover
                    p: 0,
                  }}
                  onClick={() => navigate("/cadastro")}
                >
                  Cadastre-se
                </Button>
              </Stack>


              <StyledButton
                type="submit"
                variant="contained"
                disabled={loading}
                fullWidth
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </StyledButton>
            </Stack>
          </form>
        </StyledPaper>
    </BackgroundBox>
  );
};

export default Login;