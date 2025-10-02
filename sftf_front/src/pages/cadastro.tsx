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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// import { apiService } from "../services/api"; // Descomente quando for integrar
// import { authManager } = "../utils/auth"; // Descomente quando for integrar

// A URL da logo foi removida, pois não é mais necessária.

// URL da imagem de fundo (a mesma usada no login)
const BACKGROUND_IMAGE_URL = "https://images.pexels.com/photos/6916877/pexels-photo-6916877.jpeg?_gl=1*nk6i9f*_ga*NTQ3MTc1NDA0LjE3NTkyODQ2NTM.*_ga_8JE65Q40S6*czE3NTkyODg5ODEkbzIkZzEkdDE3NTkyODk5NzUkajU5JGwwJGgw";

// Definindo estilos usando styled do MUI para a estética desejada
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  // MODIFICAÇÃO: Diminuir padding vertical e aumentar largura
  padding: theme.spacing(3, 4), // Diminui o padding top/bottom para 3, mantém left/right em 4
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 450, // MODIFICAÇÃO: Aumenta a largura
  margin: "auto",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
}));

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
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[600],
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.success.dark,
  },
}));

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


interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  cnpjCpf: string;
  profileType: 'comprador' | 'provedor' | '';
}

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    cnpjCpf: "",
    profileType: "",
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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      profileType: e.target.value as 'comprador' | 'provedor',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validações básicas
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.companyName || !formData.cnpjCpf || !formData.profileType) {
      setError("Por favor, preencha todos os campos e selecione um perfil.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não correspondem.");
      return;
    }

    setLoading(true);

    try {
      // Exemplo de como você chamaria sua API de cadastro
      // const response = await apiService.register({
      //   email: formData.email,
      //   password: formData.password,
      //   companyName: formData.companyName,
      //   cnpjCpf: formData.cnpjCpf,
      //   profileType: formData.profileType,
      // });

      // Simulação de sucesso de cadastro
      const response = { success: true, data: { message: "Cadastro realizado com sucesso!" } };

      if (response.success) {
        alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");
        navigate("/login"); // Redireciona para a tela de login
      } else {
        // setError(response.error || "Erro no cadastro"); // Descomente quando integrar com a API
        setError("Erro no cadastro (simulado)");
      }
    } catch (error) {
      setError("Erro de conexão com o servidor (simulado)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundBox>
        <StyledPaper>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} alignItems="center">
              {/* MODIFICAÇÃO: Logo removida */}

              <Typography variant="h5" sx={{ color: "text.primary", fontWeight: 600 }}>
                Crie sua conta
              </Typography>

              <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center", mb: 2 }}>
                Preencha os dados abaixo para se cadastrar.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                  {error}
                </Alert>
              )}

              <StyledTextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleInputChange}
                size="small"
                type="email"
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

              <StyledTextField
                name="confirmPassword"
                label="Confirmar Senha"
                variant="outlined"
                fullWidth
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                size="small"
              />

              <StyledTextField
                name="companyName"
                label="Nome da Empresa"
                variant="outlined"
                fullWidth
                value={formData.companyName}
                onChange={handleInputChange}
                size="small"
              />

              <StyledTextField
                name="cnpjCpf"
                label="CNPJ ou CPF"
                variant="outlined"
                fullWidth
                value={formData.cnpjCpf}
                onChange={handleInputChange}
                size="small"
              />

              {/* Seleção de Perfil */}
              <FormControl component="fieldset" sx={{ width: '100%', mt: 1 }}>
                <FormLabel component="legend" sx={{ textAlign: 'left', color: 'text.secondary' }}>
                  Selecione seu perfil
                </FormLabel>
                <RadioGroup
                  // MODIFICAÇÃO: Removido justifyContent: 'center' para alinhar à esquerda
                  row
                  name="profileType"
                  value={formData.profileType}
                  onChange={handleProfileChange}
                  sx={{ justifyContent: 'flex-start' }} // Alinha as opções à esquerda
                >
                  <FormControlLabel
                    value="comprador"
                    control={<Radio sx={{ color: '#2E7D32', '&.Mui-checked': { color: '#1B5E20' } }} />}
                    label={<Typography variant="body2" sx={{ color: "text.secondary" }}>Comprador</Typography>}
                  />
                  <FormControlLabel
                    value="provedor"
                    control={<Radio sx={{ color: '#2E7D32', '&.Mui-checked': { color: '#1B5E20' } }} />}
                    label={<Typography variant="body2" sx={{ color: "text.secondary" }}>Provedor de créditos de carbono</Typography>}
                  />
                </RadioGroup>
              </FormControl>

              <StyledButton
                type="submit"
                variant="contained"
                disabled={loading}
                fullWidth
                sx={{ mt: 3 }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    Cadastrando...
                  </>
                ) : (
                  'Cadastrar'
                )}
              </StyledButton>

              {/* Link para voltar ao Login */}
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                sx={{ mt: 2 }}
              >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Já possui uma conta?
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontSize: "0.9rem",
                    color: "#1B5E20",
                    "&:hover": { color: "#2e7d32" },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Faça Login
                </Button>
              </Stack>
            </Stack>
          </form>
        </StyledPaper>
    </BackgroundBox>
  );
};

export default Cadastro;