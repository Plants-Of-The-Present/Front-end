import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { apiService, AreaData } from '../services/api';
import { authManager } from '../utils/auth';

const AreasPessoais = () => {
  const [termoBusca, setTermoBusca] = useState('');
  const [areas, setAreas] = useState<AreaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = authManager.getToken();
        if (!token) {
          setError('Usuário não autenticado');
          return;
        }

        console.log('Fazendo requisição para buscar áreas...');
        const response = await apiService.getMyAreas(token);
        console.log('Resposta da API:', response);

        if (response.success && response.data) {
          console.log('Áreas encontradas:', response.data.areas);
          setAreas(response.data.areas || []);
        } else {
          console.error('Erro na resposta:', response.error);
          setError(response.error || 'Erro ao carregar áreas');
        }
      } catch (err) {
        console.error('Erro na requisição:', err);
        setError('Erro de conexão com o servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  const areasFiltradas = areas.filter(area =>
    area.name.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const formatCoordinates = (area: AreaData) => {
    try {
      if (!area || typeof area.point1X === 'undefined') return 'Coordenadas não disponíveis';

      const p1x = parseFloat(area.point1X.toString());
      const p1y = parseFloat(area.point1Y.toString());
      const p2x = parseFloat(area.point2X.toString());
      const p2y = parseFloat(area.point2Y.toString());
      const p3x = parseFloat(area.point3X.toString());
      const p3y = parseFloat(area.point3Y.toString());
      const p4x = parseFloat(area.point4X.toString());
      const p4y = parseFloat(area.point4Y.toString());

      return `(${p1x.toFixed(6)}, ${p1y.toFixed(6)}) - (${p2x.toFixed(6)}, ${p2y.toFixed(6)}) - (${p3x.toFixed(6)}, ${p3y.toFixed(6)}) - (${p4x.toFixed(6)}, ${p4y.toFixed(6)})`;
    } catch (err) {
      console.error('Erro ao formatar coordenadas:', err, area);
      return 'Coordenadas inválidas';
    }
  };

  const getOwnerName = (area: AreaData) => {
    try {
      const user = authManager.getUser();
      if (!user) return 'Desconhecido';

      // Se há um comprador e é o usuário atual
      if (area.buyerCnpj && area.buyerCnpj === user.companyCnpj) {
        return user.companyName;
      }

      // Se não há comprador ou o usuário atual é o fornecedor
      return area.supplier?.companyName || user.companyName || 'Desconhecido';
    } catch (err) {
      console.error('Erro ao obter nome do proprietário:', err);
      return 'Desconhecido';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

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
        areasFiltradas.map((area) => {
          if (!area) return null;

          return (
            <Card key={area.id} sx={{
                mb: 3,
                borderRadius: '15px',
                backgroundColor: '#DCDCBC',
                boxShadow: 'none'
            }}>
              <CardContent sx={{ p: { xs: 1, md: 6 } }}>
                <Typography variant="h5" component="div" fontWeight="bold" sx={{ mb: 2, color: '#36454F' }}>
                  Região: {area.name}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>

                  {/* Coluna Esquerda */}
                  <Box sx={{ flex: 1, width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <img
                        src="https://i.imgur.com/CscvHw1.png"
                        alt="Selo Veridis"
                        style={{ width: 95, height: 90, marginRight: '16px' }}
                      />
                      <Box>
                        <Typography variant="body1">
                          <Box component="span" sx={{ color: 'black' }}><strong>Créditos de Carbono:</strong></Box>
                          <Box component="span" sx={{ color: '#555555' }}>{' '}{parseFloat((area.carbonCredits || 0).toString()).toLocaleString('pt-BR')}</Box>
                        </Typography>
                        <Typography variant="body1">
                          <Box component="span" sx={{ color: 'black' }}><strong>Área total:</strong></Box>
                          <Box component="span" sx={{ color: '#555555' }}>{' '}{parseFloat((area.totalArea || 0).toString()).toLocaleString('pt-BR')} hectares</Box>
                        </Typography>
                        <Typography variant="body1">
                          <Box component="span" sx={{ color: 'black' }}><strong>Coordenadas:</strong></Box>
                          <Box component="span" sx={{ color: '#555555', fontSize: '0.8rem', display: 'block' }}>
                            {formatCoordinates(area)}
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#36454F' }}>Proprietário:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Box>
                        <Typography variant="body1">
                          <Box component="span" sx={{ color: 'black' }}><strong>Proprietário:</strong></Box>
                          <Box component="span" sx={{ color: '#555555' }}>{' '}{getOwnerName(area)}</Box>
                        </Typography>
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Proprietário certificado VERIDIS"
                          color="success"
                          variant="outlined"
                          size="small"
                          sx={{ mt: 1 }}
                        />
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
                      {area.image ? (
                        <>
                          <Box
                            component="img"
                            src={area.image.url}
                            alt={`Imagem da área ${area.name}`}
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
                        </>
                      ) : (
                        <Box
                          sx={{
                            width: '100%',
                            height: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '10px',
                            mt: 1,
                            border: '1px solid #ddd',
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Imagem não encontrada
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>

                </Box>
              </CardContent>
            </Card>
          );
        })
      ) : areas.length === 0 ? (
        <Typography variant="h6" textAlign="center" sx={{ color: 'text.secondary' }}>
          Você não possui áreas registradas.
        </Typography>
      ) : (
        <Typography variant="h6" textAlign="center" sx={{ color: 'text.secondary' }}>
          Nenhuma região encontrada com esse termo de busca.
        </Typography>
      )}
    </Box>
  );
};

export default AreasPessoais;