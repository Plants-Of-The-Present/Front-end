import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ButtonAtom } from "./ButtonAtom";
import { ImageWithBadge } from "./ImageWithBadge";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import SearchIcon from "@mui/icons-material/Search";
import InsertChartIcon from '@mui/icons-material/InsertChart';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";


export const SideMenu: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const handleHover = (hovering: boolean) => setIsExpanded(hovering);

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
      {/* Foto do perfil com redirecionamento */}
    {/*<Link to="/perfil" style={{ textDecoration: "none" }}>  colocar o image with badge no meio   </Link> */}
        <ImageWithBadge
          src="images/image.png"
          alt={userName}
          isExpanded={isExpanded}
        />

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
          icon={<SearchIcon />}
          label="Busca"
          backgroundColor="#2E7D32"
          isExpanded={isExpanded}
          onClick={() => navigate("/Pesquisa")} // Redireciona para a página de pesquisa
        />
        <ButtonAtom
          icon={<InsertChartIcon />}
          label="Dashboard"
          backgroundColor="#2E7D32"
          isExpanded={isExpanded}
        />
        <ButtonAtom
          icon={<WorkspacePremiumIcon/>}
          label="Certificados"
          backgroundColor="#2E7D32"
          isExpanded={isExpanded}
        />
        
        <ButtonAtom
          icon={<LogoutSharpIcon />}
          label="Sair"
          backgroundColor="#46685B"
          isExpanded={isExpanded}
          //onClick={handleLogout}
        />
      </Box>
    </Box>
  );
};

export default SideMenu;
