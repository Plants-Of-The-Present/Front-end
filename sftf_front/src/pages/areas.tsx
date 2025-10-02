import React from 'react';
import { Box, Typography } from '@mui/material'; // <-- Importar Typography

import MenuLat from '../components/menu_lat';
// REMOVIDO: import { TituloPagina } from '../components/TituloPagina'; // <-- Removido
import AreasPessoais from '../components/areasPessoais';

const AreasPage = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      
      <MenuLat />

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          backgroundColor: '#FFFFFF', // Fundo branco aplicado aqui
        }}
      >
        {/* ALTERADO: Substituído <TituloPagina /> por Typography direto */}
        <Typography 
          variant="h3" // Escolha o variant que melhor se adequa ao tamanho do título
          sx={{ 
            fontFamily: 'Belleza', // <-- APLICAÇÃO DA FONTE AQUI
            fontWeight: 'bold', // Opcional, para dar mais destaque
            color: '#1B5E20', // Opcional: Cor verde para o título
            mb: 4, // Margem inferior, para dar espaço ao conteúdo abaixo
          }}
        >
          Minhas Áreas Certificadas
        </Typography>
        
        <AreasPessoais />
      </Box>
    </Box>
  );
};

export default AreasPage;