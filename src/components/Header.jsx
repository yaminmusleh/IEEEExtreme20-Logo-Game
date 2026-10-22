import { AppBar, Box, Chip, Toolbar, Typography } from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";
import { gameConfig } from "../config/gameConfig.js";

function BrandMark({ src, alt }) {
  if (src) {
    return <Box component="img" src={src} alt={alt} sx={{ height: 36, display: "block" }} />;
  }
  return (
    <Box
      aria-hidden
      sx={{
        width: 36,
        height: 36,
        borderRadius: 2,
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg, #2F7BFF, #22D3EE)",
        color: "#031024",
      }}
    >
      <TerminalIcon fontSize="small" />
    </Box>
  );
}

export default function Header() {
  const { event, branding } = gameConfig;
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid rgba(120,160,255,0.15)", backdropFilter: "blur(6px)" }}
    >
      <Toolbar sx={{ gap: 1.5, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <BrandMark src={branding.eventLogo} alt={`${event.name} logo`} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              {event.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {event.organizer}
            </Typography>
          </Box>
        </Box>
        {branding.organizerLogo ? (
          <Box component="img" src={branding.organizerLogo} alt={`${event.organizer} logo`} sx={{ height: 32 }} />
        ) : (
          <Chip label="Logo Challenge" size="small" color="secondary" variant="outlined" />
        )}
      </Toolbar>
    </AppBar>
  );
}