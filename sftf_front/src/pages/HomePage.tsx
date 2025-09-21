import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// REMOVIDO: A linha de importação do logo local não é mais necessária.
// import logoVeridis from '../assets/images/logo-veridis.png'; 

const HomePage = () => {
  const navigate = useNavigate();

  const handleEntrar = () => {
    navigate('/login'); 
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#F5F5F0',
        textAlign: 'center',
        p: 2
      }}
    >
      {/* Logo da Veridis */}
      <Box
        component="img"
        // ALTERADO: Usando a sua URL do Imgur diretamente.
        src={"https://i.imgur.com/rZUW4pU.png"}
        alt="Logo da Veridis"
        sx={{
          width: 'auto',
          height: '200px', 
          mb: 4 
        }}
      />

      {/* Tagline / Slogan */}
      <Typography 
        variant="h6" 
        component="p"
        sx={{
          color: '#555555',
          mb: 4,
          maxWidth: '400px',
          fontWeight: 'bold'
        }}
      >
        Trazendo o selo de confiança que você merece
      </Typography>

      {/* Botão de Entrar */}
      <Button
        variant="contained"
        size="large"
        onClick={handleEntrar}
        sx={{
          backgroundColor: '#D97D54',
          color: '#FFFFFF',
          borderRadius: '20px',
          px: 6,
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: '#C86F4A',
          },
        }}
      >
        Entrar
      </Button>
    </Box>
  );
};

export default HomePage;