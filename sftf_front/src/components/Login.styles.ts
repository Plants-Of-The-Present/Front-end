import { SxProps, Theme } from "@mui/material";

export const boxStyle: SxProps<Theme> = {
  background: "linear-gradient(to bottom right, #F5F5F0 30%, #F5F5F0)",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 0,
  padding: 0,
  width: "100%",
};

export const paperStyle: SxProps<Theme> = {
  padding: "50px 30px",
  textAlign: "center",
  borderRadius: "30px",
  backgroundColor: "#2E7D32",
  width: "700px",
};

export const textFieldStyle: SxProps<Theme> = {
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
    "& .MuiInputLabel-root": {
      color: "#46685B",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#46685B",
    },
  },
};

export const buttonStyle: SxProps<Theme> = {
  backgroundColor: "#D16B3F",
  borderRadius: "13px",
  padding: "10px 20px",
  fontSize: "1rem",
};