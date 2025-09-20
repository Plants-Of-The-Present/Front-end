import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Button
} from "@mui/material";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import "./App.css";
import TemplatePage from "./pages/template";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import SolicitacaoEmAnalise from "./pages/SolicitacaoEmAnalise";
import RecuperacaoSenha from "./pages/RecuperacaoDeSenha";
import VerCertificados from "./pages/certificados";
import CadastroTerra from "./pages/cadastroTerra";


// Criação do tema global
const theme = createTheme({
  palette: {
    text: {
      primary: "#66BB6A", // Verde nos textos
    },
    background: {
      default: "#F5F5F0", // Cor de fundo base
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif", // Fonte global
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          background: "linear-gradient(to bottom right, #F5F5F0 30%, #F5F5F0)",
          overflowX: "hidden", // Remove rolagem horizontal
        },
      },
    },
  },
});

// Exemplo de páginas
function Home() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Container sx={{ py: 4 }}>
      <Button
        onClick={() => navigate("/Login")}
        sx={{
          width: "187px",
          height: "66px",
          backgroundColor: "#648A64",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#2E7D32",
          },
        }}
      >
        <Typography
          variant="button"
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        >
          Login Teste
        </Typography>
      </Button>
    </Container>
  );
}
/*
function Login() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">Login</Typography>
    </Container>
  );
}
*/
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/template" element={<TemplatePage />} />
          <Route path="/cadastro" element={<Cadastro />} /> 
          <Route path="/analise" element={<SolicitacaoEmAnalise />} />
          <Route path="/recuperacao" element={<RecuperacaoSenha />} />
          <Route path="/certificados" element={<VerCertificados />} />
          <Route path="/cadastroTerra" element={<CadastroTerra />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
