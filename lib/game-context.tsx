import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type GameId =
  | "quiz"
  | "verdadeiro-falso"
  | "quem-sou-eu"
  | "forca"
  | "memoria"
  | "caca-palavras"
  | "palavras-cruzadas"
  | "ordem-cronologica";

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
  bestScore: number;
  lastPlayed?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface PlayerState {
  name: string;
  totalScore: number;
  level: number;
  xp: number;
  coins: number; // moedas do jogo
  gameStats: Record<GameId, GameStats>;
  achievements: Achievement[];
  seals: string[]; // IDs dos selos desbloqueados
  unlockedItems: string[]; // IDs dos itens desbloqueados
  streakDays: number;
  lastLoginDate?: string;
}

type Action =
  | { type: "RECORD_GAME"; gameId: GameId; score: number; won: boolean }
  | { type: "UNLOCK_ACHIEVEMENT"; achievement: Achievement }
  | { type: "SET_NAME"; name: string }
  | { type: "LOAD_STATE"; state: PlayerState }
  | { type: "RESET" };

const defaultGameStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  totalScore: 0,
  bestScore: 0,
};

const initialState: PlayerState = {
  name: "Peregrino",
  totalScore: 0,
  level: 1,
  xp: 0,
  coins: 0,
  gameStats: {
    quiz: { ...defaultGameStats },
    "verdadeiro-falso": { ...defaultGameStats },
    "quem-sou-eu": { ...defaultGameStats },
    forca: { ...defaultGameStats },
    memoria: { ...defaultGameStats },
    "caca-palavras": { ...defaultGameStats },
    "palavras-cruzadas": { ...defaultGameStats },
    "ordem-cronologica": { ...defaultGameStats },
  },
  achievements: [],
  seals: [],
  unlockedItems: [],
  streakDays: 0,
};

function xpForLevel(level: number) {
  return level * 100;
}

function reducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case "LOAD_STATE":
      return action.state;

    case "SET_NAME":
      return { ...state, name: action.name };

    case "RECORD_GAME": {
      const prev = state.gameStats[action.gameId] ?? { ...defaultGameStats };
      const newStats: GameStats = {
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + (action.won ? 1 : 0),
        totalScore: prev.totalScore + action.score,
        bestScore: Math.max(prev.bestScore, action.score),
        lastPlayed: new Date().toISOString(),
      };
      const newXp = state.xp + action.score;
      const xpNeeded = xpForLevel(state.level);
      const levelUp = newXp >= xpNeeded;
      return {
        ...state,
        totalScore: state.totalScore + action.score,
        xp: levelUp ? newXp - xpNeeded : newXp,
        level: levelUp ? state.level + 1 : state.level,
        gameStats: { ...state.gameStats, [action.gameId]: newStats },
      };
    }

    case "UNLOCK_ACHIEVEMENT": {
      const already = state.achievements.some((a) => a.id === action.achievement.id);
      if (already) return state;
      return {
        ...state,
        achievements: [
          ...state.achievements,
          { ...action.achievement, unlockedAt: new Date().toISOString() },
        ],
      };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

interface GameContextValue {
  player: PlayerState;
  recordGame: (gameId: GameId, score: number, won: boolean) => void;
  unlockAchievement: (achievement: Achievement) => void;
  setName: (name: string) => void;
  getGameStats: (gameId: GameId) => GameStats;
  levelProgress: number; // 0–1
}

const GameContext = createContext<GameContextValue | null>(null);
const STORAGE_KEY = "tav_player_state";

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [player, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const saved = JSON.parse(raw) as PlayerState;
          dispatch({ type: "LOAD_STATE", state: { ...initialState, ...saved } });
        } catch {}
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(player));
  }, [player]);

  const recordGame = useCallback(
    (gameId: GameId, score: number, won: boolean) => {
      dispatch({ type: "RECORD_GAME", gameId, score, won });
    },
    []
  );

  const unlockAchievement = useCallback((achievement: Achievement) => {
    dispatch({ type: "UNLOCK_ACHIEVEMENT", achievement });
  }, []);

  const setName = useCallback((name: string) => {
    dispatch({ type: "SET_NAME", name });
  }, []);

  const getGameStats = useCallback(
    (gameId: GameId) => player.gameStats[gameId] ?? { ...defaultGameStats },
    [player.gameStats]
  );

  const levelProgress = Math.min(player.xp / xpForLevel(player.level), 1);

  return (
    <GameContext.Provider
      value={{ player, recordGame, unlockAchievement, setName, getGameStats, levelProgress }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
