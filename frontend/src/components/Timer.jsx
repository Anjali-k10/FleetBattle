import React, { useEffect } from "react";

const Timer = ({ timer, setTimer, isTimerActive }) => {
  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isTimerActive]);

  return (
    <div className={`text-xl mb-4 ${timer === 0 ? "text-red-500" : "text-white"}`}>
      {timer === 0 ? "Setup phase ended" : `${timer} seconds remaining`}
    </div>
  );
};

export default Timer;