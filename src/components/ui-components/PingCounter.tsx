import React from 'react';

interface PingCounterProps {
  count: number;
  color: string;
}

const PingCounter: React.FC<PingCounterProps> = ({ count, color }) => (
  <span className="absolute  top-[20px] right-[45px] flex h-4 w-4 text-white">
    <span
      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}
    ></span>
    <span
      className={`relative inline-flex rounded-full h-4 w-4 ${color} text-xs text-center `}
    >
      <p className="absolute right-[5px]">{count}</p>
    </span>
  </span>
);

export default PingCounter;
