import { Box, Typography } from "@mui/material";
import { gameConfig } from "../config/gameConfig.js";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, textAlign: "center" }}>
      <Typography variant="caption" color="text.secondary" display="block">
        {gameConfig.event.name} · Organized by {gameConfig.event.organizer}
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ opacity: 0.75 }}>
        {gameConfig.text.footerNote}
      </Typography>
    </Box>
  );
}