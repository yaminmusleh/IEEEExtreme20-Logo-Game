import { Box, Button, Container, Paper, Typography } from "@mui/material";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { keyframes } from "@mui/material/styles";
import { gameConfig } from "../config/gameConfig.js";

const pop = keyframes`
  0% { transform: scale(0.6); opacity: 0; }
  70% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); }
`;
const glow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.35); }
  50% { box-shadow: 0 0 0 22px rgba(34,211,238,0); }
`;
const rise = keyframes`
  0% { transform: translateY(0); opacity: 0; }
  20% { opacity: 0.9; }
  100% { transform: translateY(-140px); opacity: 0; }
`;

// Fixed positions so the effect is stable between renders.
const DOTS = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  delay: `${(i % 8) * 0.25}s`,
  size: 4 + (i % 3) * 2,
  color: i % 2 ? "#22D3EE" : "#2F7BFF",
}));

export default function CompletionScreen({ score, maxScore, onRestart }) {
  const { text, rules } = gameConfig;
  const eligible = score >= rules.qualificationThreshold;
  const message = (eligible ? text.eligibleMessage : text.notEligibleMessage).replace(
    "{threshold}",
    String(rules.qualificationThreshold)
  );

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(160deg, rgba(34,211,238,0.12), rgba(11,23,48,0.95) 55%)",
        }}
      >
        <Box aria-hidden sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {DOTS.map((dot, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                bottom: 0,
                left: dot.left,
                width: dot.size,
                height: dot.size,
                borderRadius: "50%",
                bgcolor: dot.color,
                opacity: 0,
                animation: `${rise} 3.2s ease-out ${dot.delay} infinite`,
              }}
            />
          ))}
        </Box>

        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              width: 84,
              height: 84,
              mx: "auto",
              mb: 2,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #2F7BFF, #22D3EE)",
              color: "#031024",
              animation: `${pop} 600ms ease-out both, ${glow} 2.4s ease-in-out 600ms infinite`,
            }}
          >
            <EmojiEventsRoundedIcon sx={{ fontSize: 46 }} />
          </Box>

          <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
            {text.completionHeading}
          </Typography>

          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: "0.2em" }}>
            Your final score
          </Typography>
          <Typography
            variant="h2"
            sx={{
              my: 1,
              fontSize: { xs: "3.2rem", sm: "4rem" },
              background: "linear-gradient(90deg, #2F7BFF, #22D3EE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {score} / {maxScore}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {text.thankYou}
          </Typography>

          <Typography sx={{ mb: 4 }}>{message}</Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onRestart}
            startIcon={<ReplayRoundedIcon />}
            sx={{ py: 1.5, px: 5 }}
          >
            {text.playAgainButton}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}