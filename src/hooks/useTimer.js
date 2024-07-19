import { useState, useEffect, useRef, useCallback } from "react";

export default function useTimer() {
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  const updateTimer = useCallback(() => {
    intervalRef.current = setTimeout(() => {
      setTimer((prevTimer) => prevTimer + 1);
      updateTimer();
    }, 1000);
  }, []);

  const startTimer = useCallback(() => {
    setTimer(0);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    updateTimer();
  }, [updateTimer]);

  useEffect(() => {
    startTimer();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [startTimer]);

  const stopTimer = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };

  const resetTimer = () => {
    setTimer(0);
  };

  return { timer, startTimer, stopTimer, resetTimer };
}