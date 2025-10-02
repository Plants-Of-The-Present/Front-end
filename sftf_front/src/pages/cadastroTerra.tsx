import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  MenuItem,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// Remova esta linha se Login.styles.ts não existe ou não será usado:
// import { boxStyle, paperStyle, textFieldStyle, buttonStyle } from "../components/Login.styles"; 
import { apiService, CreateAreaRequest } from "../services/api";
import { authManager } from "../utils/auth";
import { SxProps, Theme } from "@mui/system"; // Importe SxProps e Theme

// Definição dos estilos diretamente no arquivo
const BACKGROUND_IMAGE_URL = "https://images.pexels.com/photos/15517974/pexels-photo-15517974.jpeg?_gl=1*1gereap*_ga*NTQ3MTc1NDA0LjE3NTkyODQ2NTM.*_ga_8JE65Q40S6*czE3NTkyODg5ODEkbzIkZzEkdDE3NTkyODkyNDMkajYwJGwwJGgw";

const boxStyle: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const paperStyle: SxProps<Theme> = {
  backgroundColor: "rgba(255, 255, 255, 0.4)", // Fundo semi-transparente
  backdropFilter: "blur(10px)", // Efeito de blur (vidro fosco)
  borderRadius: "16px",
  padding: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 800, // Ajuste a largura máxima conforme necessário
  width: "90%",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  color: "white", // Cor padrão de texto para o Paper, se não sobrescrita
};

const textFieldStyle: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fundo mais opaco para o input
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
      color: "#333", // Cor do texto digitado
      fontFamily: '"Belleza", sans-serif', // <-- FONTE APLICADA AQUI (input)
    },
  },
  "& .MuiInputLabel-root": {
    color: "#4CAF50", // Cor do label
    fontFamily: '"Belleza", sans-serif', // <-- FONTE APLICADA AQUI (label)
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2E7D32", // Cor do label focado
  },
  // Estilo para o helperText
  "& .MuiFormHelperText-root": {
    fontFamily: '"Belleza", sans-serif', // <-- FONTE APLICADA AQUI (helperText)
  },
};

const buttonStyle: SxProps<Theme> = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "12px 24px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#2E7D32",
  },
  fontFamily: '"Belleza", sans-serif', // <-- FONTE APLICADA AQUI (button)
  fontSize: "16px",
  fontWeight: "bold",
};


interface CadastroTerraFormData {
  areaName: string;
  point1X: string;
  point1Y: string;
  point2X: string;
  point2Y: string;
  point3X: string;
  point3Y: string;
  point4X: string;
  point4Y: string;
  sold: string;
  buyerCnpj: string;
}

const CadastroTerra: React.FC = () => {
  const [formData, setFormData] = useState<CadastroTerraFormData>({
    areaName: "",
    point1X: "",
    point1Y: "",
    point2X: "",
    point2Y: "",
    point3X: "",
    point3Y: "",
    point4X: "",
    point4Y: "",
    sold: "nao",
    buyerCnpj: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  // Verificar autenticação ao carregar a página
  useEffect(() => {
    const token = authManager.getToken();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.areaName.trim()) {
      return "Nome da área é obrigatório";
    }

    const coordinates = [
      formData.point1X, formData.point1Y,
      formData.point2X, formData.point2Y,
      formData.point3X, formData.point3Y,
      formData.point4X, formData.point4Y,
    ];

    for (let coord of coordinates) {
      if (!coord.trim()) {
        return "Todas as coordenadas são obrigatórias";
      }
      if (isNaN(parseFloat(coord))) {
        return "Todas as coordenadas devem ser números válidos";
      }
    }

    // Validar latitudes (-90 a 90)
    const latitudes = [formData.point1Y, formData.point2Y, formData.point3Y, formData.point4Y];
    for (let lat of latitudes) {
      const latFloat = parseFloat(lat);
      if (latFloat < -90 || latFloat > 90) {
        return "Latitudes devem estar entre -90 e 90";
      }
    }

    // Validar longitudes (-180 a 180)
    const longitudes = [formData.point1X, formData.point2X, formData.point3X, formData.point4X];
    for (let lon of longitudes) {
      const lonFloat = parseFloat(lon);
      if (lonFloat < -180 || lonFloat > 180) {
        return "Longitudes devem estar entre -180 e 180";
      }
    }

    if (formData.sold === "sim" && !formData.buyerCnpj.trim()) {
      return "CNPJ do comprador é obrigatório quando a área foi vendida";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const token = authManager.getToken();
    if (!token) {
      setError("Usuário não autenticado");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const areaData: CreateAreaRequest = {
        name: formData.areaName.trim(),
        point1X: parseFloat(formData.point1X),
        point1Y: parseFloat(formData.point1Y),
        point2X: parseFloat(formData.point2X),
        point2Y: parseFloat(formData.point2Y),
        point3X: parseFloat(formData.point3X),
        point3Y: parseFloat(formData.point3Y),
        point4X: parseFloat(formData.point4X),
        point4Y: parseFloat(formData.point4Y),
        isAllocated: formData.sold === "sim",
        buyerCnpj: formData.sold === "sim" ? formData.buyerCnpj.trim() : undefined,
      };

      const response = await apiService.createArea(areaData, token);

      if (response.success) {
        setSuccess("Área cadastrada com sucesso!");
        setTimeout(() => {
          navigate("/areas");
        }, 2000);
      } else {
        setError(response.error || "Erro ao cadastrar área");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error("Erro ao cadastrar área:", err);
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
              {/* Título "Cadastro de Terra" */}
              <Typography variant="h3" sx={{ color: "#F5F5F0", fontFamily: '"Belleza", sans-serif' }}> 
                Cadastro de Terra
              </Typography>

              {/* Descrição inicial */}
              <Typography variant="body1" sx={{ color: "#F5F5F0", fontFamily: '"Belleza", sans-serif' }}> 
                Informe os dados da área abaixo. As coordenadas serão usadas para calcular automaticamente a área total e os créditos de carbono.
              </Typography>

              {/* Mensagem de Erro */}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography sx={{ fontFamily: '"Belleza", sans-serif' }}> 
                    {error}
                  </Typography>
                </Alert>
              )}

              {/* Mensagem de Sucesso */}
              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography sx={{ fontFamily: '"Belleza", sans-serif' }}> 
                    {success}
                  </Typography>
                </Alert>
              )}

              {/* TextField: Nome da Área */}
              <TextField
                name="areaName"
                label="Nome da Área"
                variant="outlined"
                sx={textFieldStyle} // Estilo definido acima
                fullWidth
                required
                value={formData.areaName}
                onChange={handleInputChange}
                disabled={loading}
              />

              {/* Título: Coordenadas */}
              <Typography variant="h6" sx={{ color: "#F5F5F0", mt: 2, fontFamily: '"Belleza", sans-serif' }}> 
                Coordenadas dos 4 pontos da área (em graus decimais):
              </Typography>

              {/* Fields de Coordenadas (já pegam o estilo de textFieldStyle) */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="point1X"
                    label="Ponto 1 - Longitude"
                    variant="outlined"
                    sx={textFieldStyle} 
                    fullWidth
                    required
                    type="number"
                    inputProps={{ step: "any" }}
                    value={formData.point1X}
                    onChange={handleInputChange}
                    disabled={loading}
                    helperText="Ex: -46.633308"
                    FormHelperTextProps={{ sx: { color: "#FFF", fontFamily: '"Belleza", sans-serif' } }} // <-- HelperText personalizado
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="point1Y"
                    label="Ponto 1 - Latitude"
                    variant="outlined"
                    sx={textFieldStyle}
                    fullWidth
                    required
                    type="number"
                    inputProps={{ step: "any" }}
                    value={formData.point1Y}
                    onChange={handleInputChange}
                    disabled={loading}
                    helperText="Ex: -23.550520"
                    FormHelperTextProps={{ sx: { color: "#FFF", fontFamily: '"Belleza", sans-serif' } }} // <-- HelperText personalizado
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="point2X"
                    label="Ponto 2 - Longitude"
                    variant="outlined"
                    sx={textFieldStyle}
                    fullWidth
                    required
                    type="number"
                    inputProps={{ step: "any" }}
                    value={formData.point2X}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="point2Y"
                    label="Ponto 2 - Latitude"
                    variant="outlined"
                    sx={textFieldStyle}
                    fullWidth
                    required
                    type="number"
                    inputProps={{ step: "any" }}
                    value={formData.point2Y}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="point3X"
                    label="Ponto 3 - Longitude"
                    variant="outlined"
                    sx={textFieldStyle}
                    fullWidth
                    required
                    type="number"
                    inputProps={{ step: "any" }}
                    value={formData.point3X}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="point3Y"
                    label="Ponto 3 - Latitude"
                    variant="outlined"
                    sx={textFieldStyle}
                    fullWidth
                    required
                    type="number"
                    inputProps={{ step: "any" }}
                    value={formData.point3Y}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="point4X"
                    label="Ponto 4 - Longitude"
                    variant="outlined"
                    sx={textFieldStyle}
                    fullWidth
                    required
                    type="number"
                    inputProps={{ step: "any" }}
                    value={formData.point4X}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="point4Y"
                    label="Ponto 4 - Latitude"
                    variant="outlined"
                    sx={textFieldStyle}
                    fullWidth
                    required
                    type="number"
                    inputProps={{ step: "any" }}
                    value={formData.point4Y}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>
              </Grid>

              {/* Texto "Área já foi vendida..." */}
              <Typography sx={{ color: 'white', textAlign: 'left', fontFamily: '"Belleza", sans-serif' }}> 
                Área já foi vendida a um cliente?
              </Typography>

              {/* TextField: Select 'sold' */}
              <TextField
                select
                name="sold"
                value={formData.sold}
                onChange={handleInputChange}
                disabled={loading}
                sx={{
                  "& .MuiInputLabel-root": { color: "#FFF", fontFamily: '"Belleza", sans-serif' }, 
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FFF" },
                  "& .MuiInputBase-root": { color: "#FFF", fontFamily: '"Belleza", sans-serif' }, 
                  "& .MuiSelect-icon": { color: "#FFF" },
                }}
                InputLabelProps={{
                  sx: { color: "#FFF", fontFamily: '"Belleza", sans-serif' }, 
                }}
              >
                {/* MenuItems - Para estilizá-los, o ideal seria sobrescrever o Theme ou usar StyledComponent.
                    Mas para este caso, podemos aplicar o sx diretamente, pois são poucos. */}
                <MenuItem value="nao" sx={{ fontFamily: '"Belleza", sans-serif' }}>Não</MenuItem>
                <MenuItem value="sim" sx={{ fontFamily: '"Belleza", sans-serif' }}>Sim</MenuItem>
              </TextField>

              {/* TextField: CNPJ do Comprador */}
              {formData.sold === "sim" && (
                <TextField
                  name="buyerCnpj"
                  label="CNPJ do Comprador"
                  variant="outlined"
                  sx={textFieldStyle} 
                  fullWidth
                  required
                  value={formData.buyerCnpj}
                  onChange={handleInputChange}
                  disabled={loading}
                  helperText="Digite apenas números"
                  FormHelperTextProps={{ sx: { color: "#FFF", fontFamily: '"Belleza", sans-serif' } }} // <-- HelperText personalizado
                />
              )}

              {/* Botão de Submit */}
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  ...buttonStyle, // Estilo definido acima
                  alignSelf: "flex-end",
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1, color: "white" }} /> 
                    <Typography component="span" sx={{ fontFamily: '"Belleza", sans-serif', color: "white" }}> 
                      Cadastrando...
                    </Typography>
                  </>
                ) : (
                  <Typography component="span" sx={{ fontFamily: '"Belleza", sans-serif', color: "white" }}> 
                    Cadastrar Terra
                  </Typography>
                )}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Box>
  );
};

export default CadastroTerra;