import React from 'react';

interface PingCounterProps {
  count: number;
  color: string;
}

const PingCounter: React.FC<PingCounterProps> = ({ count, color }) => (
  <span className="absolute  top-[-15px] left-[1px] flex h-6 w-6 text-white">
    <span
      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}
    ></span>
    <span
      className={`relative inline-flex rounded-full h-6 w-6 ${color} text-xs text-center `}
    >
      <p
        className={`absolute ${count > 9 ? 'right-[5px] top-[1px]' : 'right-[9px] top-[3px]'}`}
      >
        {count > 9 ? `9+` : count}
      </p>
    </span>
  </span>
);

export default PingCounter;
