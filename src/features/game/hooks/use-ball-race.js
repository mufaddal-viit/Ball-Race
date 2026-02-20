import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const TARGET_SIZE = 54;
const EDGE_GUTTER = 10;
const NORMAL_INTERVAL = 2000;
const HARD_INTERVAL = 1000;
const MAX_ROUNDS = 12;

function getRandomPosition(stageElement) {
  const width = stageElement.clientWidth;
  const height = stageElement.clientHeight;

  const maxX = Math.max(EDGE_GUTTER, width - TARGET_SIZE - EDGE_GUTTER);
  const maxY = Math.max(EDGE_GUTTER, height - TARGET_SIZE - EDGE_GUTTER);

  return {
    x: Math.floor(Math.random() * (maxX - EDGE_GUTTER + 1)) + EDGE_GUTTER,
    y: Math.floor(Math.random() * (maxY - EDGE_GUTTER + 1)) + EDGE_GUTTER,
  };
}

function createRoundSummary({ hits, attempts, hardMode, accuracy }) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    mode: hardMode ? "Hard" : "Normal",
    hits,
    attempts,
    accuracy,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export function useBallRace() {
  const stageRef = useRef(null);

  const [position, setPosition] = useState({ x: 22, y: 22 });
  const [hits, setHits] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hardMode, setHardMode] = useState(false);
  const [targetLocked, setTargetLocked] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const [history, setHistory] = useState([]);

  const accuracy = useMemo(() => {
    if (!attempts) {
      return 0;
    }
    return Math.round((hits / attempts) * 100);
  }, [attempts, hits]);

  const spawnTarget = useCallback(() => {
    const stageElement = stageRef.current;
    if (!stageElement) {
      return;
    }

    setPosition(getRandomPosition(stageElement));
    setTargetLocked(false);
    setAttempts((previous) => previous + 1);
    setPulseKey((previous) => previous + 1);
  }, []);

  useEffect(() => {
    spawnTarget();
    const intervalId = window.setInterval(
      spawnTarget,
      hardMode ? HARD_INTERVAL : NORMAL_INTERVAL
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [hardMode, spawnTarget]);

  const commitRound = useCallback(() => {
    if (!attempts) {
      return;
    }

    const summary = createRoundSummary({
      hits,
      attempts,
      hardMode,
      accuracy,
    });

    setHistory((previous) => [summary, ...previous].slice(0, MAX_ROUNDS));
    setHits(0);
    setAttempts(0);
  }, [accuracy, attempts, hardMode, hits]);

  const restartRound = useCallback(() => {
    commitRound();
    spawnTarget();
  }, [commitRound, spawnTarget]);

  const toggleMode = useCallback(() => {
    commitRound();
    setHardMode((previous) => !previous);
  }, [commitRound]);

  const onTargetHit = useCallback(() => {
    if (targetLocked) {
      return;
    }

    setHits((previous) => previous + 1);
    setTargetLocked(true);
  }, [targetLocked]);

  return {
    stageRef,
    position,
    pulseKey,
    hardMode,
    hits,
    attempts,
    accuracy,
    history,
    restartRound,
    toggleMode,
    onTargetHit,
  };
}
