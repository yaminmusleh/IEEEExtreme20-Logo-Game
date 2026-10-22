import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProgressHeader({ roundNumber, totalRounds, isSubmitting }) {
  const completed = roundNumber - 1 + (isSubmitting ? 1 : 0);
  const value = totalRounds > 0 ? (completed / totalRounds) * 100 : 0;

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Typography
        variant="overline"
        sx={{ letterSpacing: "0.18em", fontWeight: 800, color: "secondary.main" }}
      >
        ROUND {roundNumber} OF {totalRounds}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={value}
        aria-label={`Round ${roundNumber} of ${totalRounds}`}
      />
    </Box>
  );
}