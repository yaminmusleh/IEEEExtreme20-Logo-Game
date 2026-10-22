import { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { keyframes } from "@mui/material/styles";
import { gameConfig } from "../config/gameConfig.js";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// App.jsx renders this with key={logo.id}, so all local state resets every round.
export default function ChallengeCard({ logo, isSubmitting, onSubmit }) {
  const { text } = gameConfig;
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Enter key and button both land here
    if (isSubmitting) return;
    const result = onSubmit(value);
    setError(!result.accepted && result.reason === "empty" ? text.emptyAnswerError : "");
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: { xs: 2.5, sm: 4 }, width: "100%", animation: `${fadeIn} 200ms ease-out both` }}
    >
      {/* White tile so monochrome logos stay visible on the dark theme */}
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: 4,
          height: { xs: 200, sm: 240 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        {!imageFailed && (
          <Box
            component="img"
            src={logo.image}
            alt="Mystery technology logo"
            draggable={false}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            sx={{
              // Fixed size: SVGs without intrinsic dimensions would otherwise fill the tile.
              width: { xs: 120, sm: 150 },
              height: { xs: 120, sm: 150 },
              objectFit: "contain",
              display: imageLoaded ? "block" : "none",
              userSelect: "none",
            }}
          />
        )}
        {!imageLoaded && !imageFailed && <CircularProgress aria-label="Loading logo" />}
        {imageFailed && (
          <Box sx={{ textAlign: "center", color: "#5A6B8C", px: 2 }}>
            <ImageNotSupportedOutlinedIcon sx={{ fontSize: 48 }} />
            <Typography variant="body2">Logo unavailable. Type your best guess or ask an organizer.</Typography>
          </Box>
        )}
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label={text.inputLabel}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError("");
          }}
          inputRef={inputRef}
          disabled={isSubmitting}
          error={Boolean(error)}
          helperText={error || " "}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          slotProps={{ htmlInput: { maxLength: 80 } }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={isSubmitting}
          endIcon={<SendRoundedIcon />}
          sx={{ py: 1.5, mt: 0.5 }}
        >
          {text.submitButton}
        </Button>

        <Box
          role="status"
          aria-live="polite"
          sx={{ minHeight: 32, mt: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
        >
          {isSubmitting && (
            <>
              <CircularProgress size={16} color="secondary" />
              <Typography variant="body2" color="text.secondary">
                {text.submissionNotice}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
}