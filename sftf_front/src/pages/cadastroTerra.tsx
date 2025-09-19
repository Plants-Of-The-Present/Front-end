// src/pages/CadastroTerra.tsx
import React, { useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  boxStyle,
  paperStyle,
  textFieldStyle,
  buttonStyle,
} from "../components/Login.styles";

interface CadastroTerraFormData {
  areaName: string;
  coordinates: string;
  sold: string;
  buyerCnpj1: string;
  buyerCnpj2: string;
}

const CadastroTerra: React.FC = () => {
  const [formData, setFormData] = useState<CadastroTerraFormData>({
    areaName: "",
    coordinates: "",
    sold: "nao",
    buyerCnpj1: "",
    buyerCnpj2: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário de cadastro de terra:", formData);
    alert("Cadastro da terra realizado com sucesso! (simulação)");
    navigate("/dashboard");
  };

  return (
    <Box sx={boxStyle}>
      <Stack spacing={1}>
        <Paper sx={paperStyle}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Typography variant="h3" sx={{ color: "#F5F5F0" }}>
                Cadastro de Terra
              </Typography>

              <Typography variant="body1" sx={{ color: "#F5F5F0" }}>
                Informe os dados da área abaixo.
              </Typography>

              <TextField
                name="areaName"
                label="Nome da Área"
                variant="outlined"
                sx={textFieldStyle}
                fullWidth
                value={formData.areaName}
                onChange={handleInputChange}
              />

              <TextField
                name="coordinates"
                label="Coordenadas (separe com ponto e vírgula)"
                variant="outlined"
                sx={textFieldStyle}
                fullWidth
                helperText="Exemplo: -23.55,-46.63; -22.90,-47.06"
                FormHelperTextProps={{ sx: { color: "#FFF" } }}
                value={formData.coordinates}
                onChange={handleInputChange}
              />
              <Typography sx={{color: 'white', textAlign: 'left'}}>
                Área já foi vendida a um cliente?
                </Typography>
             <TextField
                select
                name="sold"
                value={formData.sold}
                onChange={handleInputChange}
                sx={{
                    "& .MuiInputLabel-root": { color: "#FFF" }, 
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FFF" }, 
                    "& .MuiInputBase-root": { color: "#FFF" }, 
                    "& .MuiSelect-icon": { color: "#FFF" }, 
                }}
                InputLabelProps={{
                    sx: { color: "#FFF" }, // Garante que o rótulo inicial seja branco
                }}
>
                <MenuItem value="nao">Não</MenuItem>
                <MenuItem value="sim">Sim</MenuItem>
              </TextField>

              {formData.sold === "sim" && (
                <Stack spacing={2}>
                  <TextField
                    name="buyerCnpj1"
                    label="CNPJ do Comprador"
                    variant="outlined"
                    sx={textFieldStyle}
                    fullWidth
                    value={formData.buyerCnpj1}
                    onChange={handleInputChange}
                  />
                </Stack>
              )}

              <Button
                type="submit"
                variant="contained"
                sx={{
                  ...buttonStyle,
                  alignSelf: "flex-end",
                }}
              >
                Cadastrar Terra
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Box>
  );
};

export default CadastroTerra;
