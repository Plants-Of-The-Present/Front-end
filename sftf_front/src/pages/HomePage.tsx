import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// URL da logo no Imgur
const ECO_CERTIFY_LOGO_URL = "https://i.imgur.com/rZUW4pU.png"; 

// URL da imagem de fundo
const BACKGROUND_IMAGE_URL = "https://images.pexels.com/photos/6942509/pexels-photo-6942509.jpeg?_gl=1*s642ox*_ga*NTQ3MTc1NDA0LjE3NTkyODQ2NTM.*_ga_8JE65Q40S6*czE3NTkyODg5ODEkbzIkZzEkdDE3NTkyOTI3OTMkajM4JGwwJGgw";

// --- ESTILOS INALTERADOS ---

const BackgroundBox = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column", 
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: "#D16B3F", // Cor laranja sólida (100% opacidade)
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: "#C86F4A", // Cor mais escura no hover
  },
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: "none",
  minWidth: 150, 
  // A fonte não será definida aqui para manter a fonte padrão da HomePage
}));

// --- FIM DOS ESTILOS INALTERADOS ---


const HomePage = () => {
  const navigate = useNavigate();

  const handleEntrar = () => {
    navigate('/login'); 
  };

  return (
    <BackgroundBox> 
      
      {/* Logo da Veridis */}
      <Box
        component="img"
        src={ECO_CERTIFY_LOGO_URL} 
        alt="Logo da Veridis"
        sx={{
          width: 'auto',
          height: '200px', 
          mb: 2,
          // REMOVIDO: boxShadow foi removido daqui
        }}
      />

      {/* Tagline / Slogan */}
      <Typography 
        variant="h6" 
        component="p"
        sx={{
          color: '#F5F5F0', 
          mb: 4,
          maxWidth: '1000px',
          fontWeight: 'bold',
          textAlign: 'center',
          textShadow: '1px 1px 3px rgba(0,0,0,0.7)', // Sombra ao texto para melhorar a leitura
          fontFamily: "Belleza"
        }}
      >
        Trazendo o selo de confiança que você merece
      </Typography>

      {/* Botão de Entrar */}
      <StyledButton 
        variant="contained"
        size="large"
        onClick={handleEntrar}
      >
        Entrar
      </StyledButton>

    </BackgroundBox>
  );
};

export default HomePage;