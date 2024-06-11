import React, { useState, useEffect } from 'react';
interface TypesNumber {
  initialSeconds: number;
}
const CountdownTimer = ({ initialSeconds }: TypesNumber) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (secondsRemaining > 0) {
      const intervalId = setInterval(() => {
        setSecondsRemaining((prevSeconds: number) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [secondsRemaining]);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;
    return `${days} : ${hours} : ${minutes} : ${secs < 10 ? `${secs}` : secs}`;
  };

  return (
    <div>
      <div className="font-bold sm:text-4xl text-white text-xsm">
        {formatTime(secondsRemaining)}
      </div>
    </div>
  );
};

export default CountdownTimer;
