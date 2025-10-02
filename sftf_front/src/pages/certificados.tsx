import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import SideMenu from "../components/menu_lat"; // Componente do menu lateral
import { TituloPagina } from "../components/TituloPagina"; // Título da página
import { CardCertificado } from "../components/CardCertificado";
//import { fetchCertificates } from "../api/certificateService";
//Organizar o stack com os certificados gerados dinamicamente

interface Certificate {
  curso: string;
  url: string;
}

const VerCertificados: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
/*
  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const response = await fetchCertificates();
        if (response.data && response.data.download_url) {
          setCertificates(response.data.download_url);
        } else {
          setError("Nenhum certificado encontrado.");
        }
      } catch (error) {
        setError("Erro ao carregar certificados.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);
*/
  // Simulação de carregamento e dados para testes, remova após conectar à API real
  useEffect(() => {
    const simulateLoad = setTimeout(() => {
      // Exemplo de certificados (você removerá isso quando descomentar a API)
      setCertificates([
        { curso: "Curso de Sustentabilidade Avançada", url: "#" },
        { curso: "Gestão de Carbono Nível I", url: "#" },
      ]);
      setLoading(false);
    }, 1500); // Simula 1.5 segundos de carregamento
    return () => clearTimeout(simulateLoad);
  }, []);
  // Fim da simulação

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Menu Lateral */}
      <SideMenu />

      {/* Conteúdo Principal */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          padding: "24px",
          background: "linear-gradient(to bottom right, #F5F5F0 30%, #F5F5F0)",
          overflowX: "hidden",
        }}
      >
        <Stack direction="column" spacing={2} alignItems="left">
          {/* Título da Página (Controlado por TituloPagina, não mexemos aqui) */}
          <TituloPagina  titulo="Certificados" backRoute={""} /> 
          
          {/* Texto "Acesse aqui os seus certificados!" */}
          <Typography fontSize={24} sx={{ fontFamily: '"Belleza", sans-serif' }}> {/* <-- FONTE APLICADA AQUI */}
            Acesse aqui os seus certificados!
          </Typography>
        </Stack>

        {/* Exibição dos Certificados */}
        {loading ? (
          <Typography sx={{ fontFamily: '"Belleza", sans-serif' }}> {/* <-- FONTE APLICADA AQUI */}
            Carregando certificados...
          </Typography>
        ) : error ? (
          <Typography color="error" sx={{ fontFamily: '"Belleza", sans-serif' }}> {/* <-- FONTE APLICADA AQUI */}
            {error}
          </Typography>
        ) : (
          <Stack direction="column" spacing={1} alignItems="left">
            {certificates.map((cert, index) => (
              <CardCertificado
                key={index}
                imageUrl="https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?_gl=1*hfssrv*_ga*NTQ3MTc1NDA0LjE3NTkyODQ2NTM.*_ga_8JE65Q40S6*czE3NTkyODg5ODEkbzIkZzEkdDE3NTkyODkxMTkkajU5JGwwJGgw" 
                altText={`Certificado do curso ${cert.curso}`}
                titulo={cert.curso}
                descricao={`Certificado de conclusão do curso ${cert.curso}.`}
                downloadUrl={cert.url}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default VerCertificados;