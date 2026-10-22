import { useCallback, useEffect, useRef, useState } from "react";
import { selectRandomLogos } from "../utils/selectRandomLogos.js";
import { isAnswerCorrect, isEmptyAnswer } from "../utils/normalizeAnswer.js";

export const GAME_STATUS = {
  WELCOME: "welcome",
  PLAYING: "playing",
  COMPLETE: "complete",
};

export function useGame({ database, rules }) {
  const [status, setStatus] = useState(GAME_STATUS.WELCOME);
  const [roundIndex, setRoundIndex] = useState(0);
  const [logos, setLogos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  // Mutable session data: not rendered, always current inside callbacks.
  const session = useRef({ status: GAME_STATUS.WELCOME, logos: [], answers: [], index: 0 });
  const lock = useRef(false);
  const timer = useRef(null);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => clearTimer, []);

  const startGame = useCallback(() => {
    clearTimer();
    lock.current = false;

    const selected = selectRandomLogos(database, rules); // once per session
    session.current = { status: GAME_STATUS.PLAYING, logos: selected, answers: [], index: 0 };

    setLogos(selected);
    setRoundIndex(0);
    setFinalScore(null);
    setIsSubmitting(false);
    setStatus(GAME_STATUS.PLAYING);
  }, [database, rules]);

  const submitAnswer = useCallback(
    (rawAnswer) => {
      const s = session.current;
      if (s.status !== GAME_STATUS.PLAYING || lock.current) {
        return { accepted: false, reason: "busy" };
      }
      if (isEmptyAnswer(rawAnswer) && !rules.allowSkip) {
        return { accepted: false, reason: "empty" };
      }

      lock.current = true; // blocks double submissions immediately
      setIsSubmitting(true);
      s.answers[s.index] = typeof rawAnswer === "string" ? rawAnswer : "";

      timer.current = setTimeout(() => {
        const next = s.index + 1;
        if (next >= s.logos.length) {
          // Score is calculated only now, after the last round.
          const score = s.logos.reduce(
            (sum, logo, i) => sum + (isAnswerCorrect(s.answers[i], logo) ? rules.pointsPerCorrect : 0),
            0
          );
          s.status = GAME_STATUS.COMPLETE;
          setFinalScore(score);
          setStatus(GAME_STATUS.COMPLETE);
        } else {
          s.index = next;
          setRoundIndex(next);
        }
        lock.current = false;
        setIsSubmitting(false);
      }, rules.transitionMs);

      return { accepted: true };
    },
    [rules]
  );

  const current = logos[roundIndex];

  return {
    status,
    // Only the id and image are exposed to the UI: no name, aliases, category or difficulty.
    currentLogo: current ? { id: current.id, image: current.image } : null,
    roundNumber: roundIndex + 1,
    totalRounds: logos.length,
    isSubmitting,
    finalScore,
    maxScore: logos.length * rules.pointsPerCorrect,
    startGame,
    submitAnswer,
    restart: startGame, // a fresh selection, answers cleared, round reset
  };
}