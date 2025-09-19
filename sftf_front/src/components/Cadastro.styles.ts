import { height, maxHeight } from "@mui/system";

// Cadastro.styles.ts
export const boxStyle = {
  background: "linear-gradient(to bottom right, #F5F5F0 30%, #F5F5F0)",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 0,
  padding: 0,
  width: "100%",
};

export const paperStyle = {
  padding: "40px",
  textAlign: "center",
  borderRadius: "30px",
  backgroundColor: "#2E7D32",
  width: "700px",
};

export const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#46685B",
      borderRadius: "20px",
      borderWidth: "4px",
      backgroundColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#46685B",
    },
    "& input": {
      color: "#000",
      backgroundColor: "#D9D9D9",
      borderRadius: "20px",
    },
  },
};

export const buttonStyle = {
  backgroundColor: "#D16B3F",
  borderRadius: "13px",
  padding: "10px 20px",
  fontSize: "1rem",
};

export const loginLinkStyle = {
  textTransform: "none",
  fontSize: "0.9rem",
  color: "#2E7D32",
  "&:hover": {
    color: "#D16B3F",
  },
};