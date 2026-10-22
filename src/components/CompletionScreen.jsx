import { Box, Button, Container, Paper, Typography } from "@mui/material";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { keyframes } from "@mui/material/styles";
import { gameConfig } from "../config/gameConfig.js";

const pop = keyframes`
  from { transform: scale(0.7); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

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
          animation: `${fadeIn} 300ms ease-out both`,
          background: "linear-gradient(160deg, rgba(34,211,238,0.10), rgba(11,23,48,0.95) 55%)",
        }}
      >
        <Box
          sx={{
            width: 76,
            height: 76,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(135deg, #2F7BFF, #22D3EE)",
            color: "#031024",
            animation: `${pop} 400ms ease-out both`,
          }}
        >
          <EmojiEventsRoundedIcon sx={{ fontSize: 42 }} />
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
            fontSize: { xs: "3rem", sm: "3.6rem" },
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
      </Paper>
    </Container>
  );
}