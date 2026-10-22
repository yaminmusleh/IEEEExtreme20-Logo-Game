import { createTheme } from "@mui/material/styles";
import { gameConfig } from "../config/gameConfig.js";

const { colors } = gameConfig;

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: { default: colors.background, paper: colors.surface },
    text: { primary: colors.textPrimary, secondary: colors.textSecondary },
  },
  shape: { borderRadius: 20 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: { fontWeight: 800, letterSpacing: "-0.02em" },
    h3: { fontWeight: 800, letterSpacing: "-0.02em" },
    h4: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(120, 160, 255, 0.18)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 14, paddingInline: 28 },
        containedPrimary: {
          backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          color: "#031024",
          boxShadow: "0 8px 28px rgba(34, 211, 238, 0.25)",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 10, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.08)" },
        bar: {
          borderRadius: 999,
          backgroundImage: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        },
      },
    },
  },
});