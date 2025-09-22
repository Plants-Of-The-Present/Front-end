import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ButtonAtom } from "./ButtonAtom";
import AddIcon from '@mui/icons-material/Add';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { authManager } from "../utils/auth";


export const SideMenu: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const handleHover = (hovering: boolean) => setIsExpanded(hovering);

  useEffect(() => {
    const user = authManager.getUser();
    if (user) {
      setUserName(user.companyName);
    }
  }, []);

  return (
    <Box
      sx={{
        width: isExpanded ? 280 : 140,
        flexShrink: 0,
        backgroundColor: "#2E7D32",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        transition: "width 0.3s",
        overflow: "hidden",
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Nome do usuário */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar
          sx={{
            width: 60,
            height: 60,
            backgroundColor: "#4CAF50",
            fontSize: "24px",
            fontWeight: "bold"
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </Avatar>
        {isExpanded && (
          <Typography
            variant="h6"
            color="white"
            sx={{
              fontFamily: "Nunito",
              fontWeight: "bold",
              fontSize: "16px",
              marginTop: "8px",
              textAlign: "center",
              wordBreak: "break-word"
            }}
          >
            {userName}
          </Typography>
        )}
      </Box>

      {/* Botões */}
      <Box
        mt={4}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="16px"
        width="100%"
        sx={{
          paddingLeft: isExpanded ? "28px" : "0px",
        }}
      >
        <ButtonAtom
          icon={<InsertChartIcon />}
          label="Meus Créditos"
          backgroundColor="#2E7D32"
          isExpanded={isExpanded}
          onClick={() => navigate("/areas")} Esse vai pra home que será a tela de dashboards
        />
        <ButtonAtom
          icon={<WorkspacePremiumIcon/>}
          label="Certificados"
          backgroundColor="#2E7D32"
          isExpanded={isExpanded}
          onClick={() => navigate("/certificados")} 
        />

        <ButtonAtom
          icon={<AddIcon />}
          label="Adicionar área"
          backgroundColor="#2E7D32"
          isExpanded={isExpanded}
          onClick={() => navigate("/CadastroTerra")} // Redireciona para a página de cadastro de terra
        />
        
        <ButtonAtom
          icon={<LogoutSharpIcon />}
          label="Sair"
          backgroundColor="#46685B"
          isExpanded={isExpanded}
          onClick={() => {
            authManager.logout();
            navigate("/Login");
          }}
        />
      </Box>
    </Box>
  );
};

export default SideMenu;
