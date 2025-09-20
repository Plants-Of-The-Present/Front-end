import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import "./App.css";

// Importando suas páginas
import TemplatePage from "./pages/template";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import SolicitacaoEmAnalise from "./pages/SolicitacaoEmAnalise";
import RecuperacaoSenha from "./pages/RecuperacaoDeSenha";
import VerCertificados from "./pages/certificados";
import CadastroTerra from "./pages/cadastroTerra";
import VerAreas from "./pages/areas"; 
// ALTERADO: O caminho do arquivo de volta para 'H' maiúsculo
import HomePage from "./pages/HomePage"; 

// ... o resto do seu código do 'theme' continua igual ...
const theme = createTheme({
  palette: {
    text: {
      primary: "#66BB6A",
    },
    background: {
      default: "#F5F5F0",
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          background: "linear-gradient(to bottom right, #F5F5F0 30%, #F5F5F0)",
          overflowX: "hidden",
        },
      },
    },
  },
});


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* A rota continua a mesma, usando o componente importado */}
          <Route path="/" element={<HomePage />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/template" element={<TemplatePage />} />
          <Route path="/cadastro" element={<Cadastro />} /> 
          <Route path="/analise" element={<SolicitacaoEmAnalise />} />
          <Route path="/recuperacao" element={<RecuperacaoSenha />} />
          <Route path="/certificados" element={<VerCertificados />} />
          <Route path="/cadastroTerra" element={<CadastroTerra />} />
          <Route path="/areas" element={<VerAreas />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}