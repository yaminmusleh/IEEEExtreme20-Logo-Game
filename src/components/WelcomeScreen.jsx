import { Box, Button, Chip, Container, Paper, Typography } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { keyframes } from "@mui/material/styles";
import { gameConfig } from "../config/gameConfig.js";

const fadeUp = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export default function WelcomeScreen({ onStart }) {
  const { event, text } = gameConfig;

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          textAlign: "center",
          animation: `${fadeUp} 600ms ease-out both`,
          background: "linear-gradient(160deg, rgba(47,123,255,0.14), rgba(11,23,48,0.95) 55%)",
        }}
      >
        <Chip label={`${event.name} · ${event.organizer}`} color="secondary" variant="outlined" sx={{ mb: 3, maxWidth: "100%" }} />

        <Typography variant="h3" component="h1" sx={{ fontSize: { xs: "2rem", sm: "2.8rem" }, mb: 2 }}>
          {text.welcomeHeading}
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 4 }}>
          {text.welcomeSubtitle}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onStart}
          startIcon={<PlayArrowRoundedIcon />}
          sx={{ py: 1.6, px: 5, fontSize: "1.1rem" }}
        >
          {text.startButton}
        </Button>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            {text.welcomeNote}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}