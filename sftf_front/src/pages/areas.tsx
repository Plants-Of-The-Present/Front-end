import React from 'react';
import { Box } from '@mui/material';

import MenuLat from '../components/menu_lat';
import { TituloPagina } from '../components/TituloPagina';
import AreasPessoais from '../components/areasPessoais';

const AreasPage = () => {
  return (
    // ALTERADO: Este é o container principal que agora controla a altura.
    // 'minHeight: '100vh'' garante que ele ocupe, no mínimo, a tela inteira.
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* O MenuLat não precisa mais de um wrapper especial. */}
      {/* Assumimos que o próprio componente MenuLat já tem seu fundo verde. */}
      <MenuLat />

      {/* Este é o container do conteúdo principal. */}
      {/* Ele vai se esticar automaticamente para preencher a altura do pai. */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          backgroundColor: '#FFFFFF' // Fundo branco aplicado aqui
        }}
      >
        <TituloPagina titulo="Minhas Áreas Certificadas" />
        
        <AreasPessoais />
      </Box>
    </Box>
  );
};

export default AreasPage;