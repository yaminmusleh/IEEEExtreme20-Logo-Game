import { Box, Container } from "@mui/material";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";
import ChallengeCard from "./components/ChallengeCard.jsx";
import CompletionScreen from "./components/CompletionScreen.jsx";
import { GAME_STATUS, useGame } from "./hooks/useGame.js";
import { logoDatabase } from "./data/logoDatabase.js";
import { gameConfig } from "./config/gameConfig.js";

export default function App() {
  const game = useGame({ database: logoDatabase, rules: gameConfig.rules });

  return (
    <>
      <Header />

      <Box component="main" sx={{ flex: 1 }}>
        {game.status === GAME_STATUS.WELCOME && <WelcomeScreen onStart={game.startGame} />}

        {game.status === GAME_STATUS.PLAYING && game.currentLogo && (
          <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
            <ProgressHeader
              roundNumber={game.roundNumber}
              totalRounds={game.totalRounds}
              isSubmitting={game.isSubmitting}
            />
            <ChallengeCard
              key={game.currentLogo.id}
              logo={game.currentLogo}
              isSubmitting={game.isSubmitting}
              onSubmit={game.submitAnswer}
            />
          </Container>
        )}

        {game.status === GAME_STATUS.COMPLETE && (
          <CompletionScreen score={game.finalScore} maxScore={game.maxScore} onRestart={game.restart} />
        )}
      </Box>

      <Footer />
    </>
  );
}