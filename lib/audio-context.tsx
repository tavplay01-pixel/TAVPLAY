"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { Platform } from "react-native";

interface AudioContextType {
  playCorrectSound: () => void;
  playWrongSound: () => void;
  playVictorySound: () => void;
  playClickSound: () => void;
  playBackgroundMusic: (musicType: "home" | "quiz") => void;
  stopBackgroundMusic: () => void;
  toggleMute: () => void;
  isMuted: boolean;
  initialized: boolean;
}

const AudioCtx = createContext<AudioContextType | undefined>(undefined);

// ---- Web Audio API sound generator ----
function getAudioContext(): AudioContext | null {
  if (Platform.OS !== "web") return null;
  if (typeof window === "undefined") return null;
  const W = window as any;
  if (!W._tavAudioCtx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    W._tavAudioCtx = new AC();
  }
  return W._tavAudioCtx as AudioContext;
}

function ensureResumed(ctx: AudioContext) {
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume: number = 0.3,
  rampDown: boolean = true,
) {
  ensureResumed(ctx);
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  if (rampDown) {
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  }
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playCorrectTone(ctx: AudioContext) {
  // Ascending two-note chime
  playTone(ctx, 523.25, 0.15, "sine", 0.25); // C5
  setTimeout(() => playTone(ctx, 659.25, 0.25, "sine", 0.25), 100); // E5
}

function playWrongTone(ctx: AudioContext) {
  // Descending buzz
  playTone(ctx, 300, 0.15, "square", 0.15);
  setTimeout(() => playTone(ctx, 200, 0.25, "square", 0.15), 120);
}

function playVictoryTone(ctx: AudioContext) {
  // Ascending arpeggio
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(ctx, freq, 0.3, "sine", 0.2), i * 120);
  });
}

function playClickTone(ctx: AudioContext) {
  // Short tick
  playTone(ctx, 800, 0.05, "sine", 0.15, false);
}

// Simple background music using oscillators
let bgMusicInterval: ReturnType<typeof setInterval> | null = null;
let bgMusicGain: GainNode | null = null;
let bgMusicOscillators: OscillatorNode[] = [];

function stopBgMusic() {
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
  bgMusicOscillators.forEach((osc) => {
    try { osc.stop(); } catch {}
  });
  bgMusicOscillators = [];
  if (bgMusicGain) {
    try { bgMusicGain.disconnect(); } catch {}
    bgMusicGain = null;
  }
}

function startBgMusic(ctx: AudioContext, musicType: "home" | "quiz") {
  stopBgMusic();
  ensureResumed(ctx);

  bgMusicGain = ctx.createGain();
  bgMusicGain.gain.setValueAtTime(0.06, ctx.currentTime);
  bgMusicGain.connect(ctx.destination);

  // Simple ambient pad with slow chord changes
  const homeChords = [
    [261.63, 329.63, 392.00], // C major
    [293.66, 369.99, 440.00], // D major
    [246.94, 311.13, 369.99], // B minor
    [261.63, 329.63, 392.00], // C major
  ];
  const quizChords = [
    [329.63, 415.30, 493.88], // E major
    [349.23, 440.00, 523.25], // F major
    [392.00, 493.88, 587.33], // G major
    [329.63, 415.30, 493.88], // E major
  ];
  const chords = musicType === "home" ? homeChords : quizChords;
  let chordIdx = 0;

  function playChord() {
    if (!bgMusicGain) return;
    const chord = chords[chordIdx % chords.length];
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0.04, ctx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);
      osc.connect(noteGain);
      noteGain.connect(bgMusicGain!);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 4);
      bgMusicOscillators.push(osc);
    });
    chordIdx++;
  }

  playChord();
  bgMusicInterval = setInterval(playChord, 4000);
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const mutedRef = useRef(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      // Initialize on first user interaction
      const initOnInteraction = () => {
        const ctx = getAudioContext();
        if (ctx) {
          ensureResumed(ctx);
          setInitialized(true);
        }
        document.removeEventListener("click", initOnInteraction);
        document.removeEventListener("touchstart", initOnInteraction);
      };
      document.addEventListener("click", initOnInteraction);
      document.addEventListener("touchstart", initOnInteraction);

      // Try immediately too
      const ctx = getAudioContext();
      if (ctx && ctx.state === "running") {
        setInitialized(true);
      }

      return () => {
        document.removeEventListener("click", initOnInteraction);
        document.removeEventListener("touchstart", initOnInteraction);
        stopBgMusic();
      };
    }
    return undefined;
  }, []);

  const playCorrectSound = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = getAudioContext();
    if (ctx) playCorrectTone(ctx);
  }, []);

  const playWrongSound = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = getAudioContext();
    if (ctx) playWrongTone(ctx);
  }, []);

  const playVictorySound = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = getAudioContext();
    if (ctx) playVictoryTone(ctx);
  }, []);

  const playClickSound = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = getAudioContext();
    if (ctx) playClickTone(ctx);
  }, []);

  const playBackgroundMusic = useCallback((musicType: "home" | "quiz") => {
    if (mutedRef.current) return;
    const ctx = getAudioContext();
    if (ctx) startBgMusic(ctx, musicType);
  }, []);

  const stopBackgroundMusic = useCallback(() => {
    stopBgMusic();
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      mutedRef.current = next;
      if (next) {
        stopBgMusic();
      }
      return next;
    });
  }, []);

  return (
    <AudioCtx.Provider
      value={{
        playCorrectSound,
        playWrongSound,
        playVictorySound,
        playClickSound,
        playBackgroundMusic,
        stopBackgroundMusic,
        toggleMute,
        isMuted,
        initialized,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioCtx);
  if (!context) {
    throw new Error("useAudioContext must be used within AudioProvider");
  }
  return context;
}
