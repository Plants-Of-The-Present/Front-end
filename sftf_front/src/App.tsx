import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
} from "@mui/material";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/700.css";
import "./App.css";
import TemplatePage from "./pages/template";
import Login from "./pages/login";

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
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">Página Inicial</Typography>
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
