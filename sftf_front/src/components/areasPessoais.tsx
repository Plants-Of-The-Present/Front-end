import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// --- Dados de exemplo com seus links ---
const areasData = [
    {
        id: 1,
        regiao: 'Fazenda Castanho',
        creditosCarbono: 820,
        areaTotal: '1350',
        localizacao: 'Goiás - GO',
        imagemAreaUrl: 'https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg',
        proprietario: {
          nome: 'Seu Zé',
          avatarUrl: 'https://www.gastronomia.com.br/wp-content/uploads/2023/09/dia-do-fazendeiro-celebrando-a-agricultura-e-o-campo.jpg',
          propriedadesCadastradas: 95,
          certificado: true,
        },
        seloUrl: 'https://i.imgur.com/CscvHw1.png',
      },
      {
        id: 2,
        regiao: 'Bosque da Esperança',
        creditosCarbono: 480,
        areaTotal: '530',
        localizacao: 'Brasília-DF',
        imagemAreaUrl: 'https://images.unsplash.com/photo-1591389703635-e15a07b842d7?q=80&w=1333&auto-format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        proprietario: {
          nome: 'Seu Zé',
          avatarUrl: 'https://www.gastronomia.com.br/wp-content/uploads/2023/09/dia-do-fazendeiro-celebrando-a-agricultura-e-o-campo.jpg',
          propriedadesCadastradas: 12,
          certificado: true,
        },
        seloUrl: 'https://i.imgur.com/CscvHw1.png',
      },
];

const AreasPessoais = () => {
  const [termoBusca, setTermoBusca] = useState('');

  const areasFiltradas = areasData.filter(area =>
    area.regiao.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Pesquise o local que deseja encontrar"
        value={termoBusca}
        onChange={e => setTermoBusca(e.target.value)}
        InputProps={{
          startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
          sx: { borderRadius: '25px', backgroundColor: '#fff', mb: 4 },
        }}
      />

      {areasFiltradas.length > 0 ? (
        areasFiltradas.map((area) => (
          <Card key={area.id} sx={{ 
              mb: 3, 
              borderRadius: '15px', 
              backgroundColor: '#DCDCBC',
              boxShadow: 'none'
          }}>
            <CardContent sx={{ p: { xs: 1, md: 6 } }}>
              <Typography variant="h5" component="div" fontWeight="bold" sx={{ mb: 2, color: '#36454F' }}>
                Região: {area.regiao}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>

                {/* Coluna Esquerda */}
                <Box sx={{ flex: 1, width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <img src={area.seloUrl} alt="Selo Veridis" style={{ width: 95, height: 90, marginRight: '16px' }} />
                    <Box>
                      <Typography variant="body1">
                        <Box component="span" sx={{ color: 'black' }}><strong>Créditos de Carbono:</strong></Box>
                        <Box component="span" sx={{ color: '#555555' }}>{' '}{area.creditosCarbono}</Box>
                      </Typography>
                      <Typography variant="body1">
                        <Box component="span" sx={{ color: 'black' }}><strong>Área total:</strong></Box>
                        <Box component="span" sx={{ color: '#555555' }}>{' '}{area.areaTotal}</Box>
                      </Typography>
                      <Typography variant="body1">
                        <Box component="span" sx={{ color: 'black' }}><strong>Localização:</strong></Box>
                        <Box component="span" sx={{ color: '#555555' }}>{' '}{area.localizacao}</Box>
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#36454F' }}>Proprietário:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Avatar src={area.proprietario.avatarUrl} sx={{ width: 60, height: 60, mr: 2 }} />
                    <Box>
                      <Typography variant="body1">
                        <Box component="span" sx={{ color: 'black' }}><strong>Proprietário:</strong></Box>
                        <Box component="span" sx={{ color: '#555555' }}>{' '}{area.proprietario.nome}</Box>
                      </Typography>
                      <Typography variant="body1">
                        <Box component="span" sx={{ color: 'black' }}><strong>N° de propriedades cadastradas:</strong></Box>
                        <Box component="span" sx={{ color: '#555555' }}>{' '}{area.proprietario.propriedadesCadastradas}</Box>
                      </Typography>
                      {area.proprietario.certificado && <Chip icon={<CheckCircleIcon />} label="Proprietário certificado VERIDIS" color="success" variant="outlined" size="small" sx={{ mt: 1 }} />}
                    </Box>
                  </Box>
                </Box>

                {/* Coluna Direita */}
                <Box sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Box sx={{ width: '60%' }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: '#36454F', textAlign: 'left' }}
                    >
                      Imagem da área:
                    </Typography>
                    <Box
                      component="img"
                      // ALTERADO: Corrigido para usar a imagem de cada área específica
                      src={area.imagemAreaUrl}
                      alt={`Imagem da área ${area.regiao}`}
                      sx={{
                        width: '100%', 
                        height: 'auto',
                        borderRadius: '10px',
                        mt: 1,
                        border: '1px solid #ddd',
                      }}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ width: '100%', textAlign: 'left', color: '#555555' }}
                    >
                      Fonte: Monitoramento INPE
                    </Typography>
                  </Box>
                </Box>

              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6" textAlign="center" sx={{ color: 'text.secondary' }}>
          Nenhuma região encontrada.
        </Typography>
      )}
    </Box>
  );
};

export default AreasPessoais;