import React from 'react';

const Ping = (): React.JSX.Element => {
  return (
    <span className="absolute -top-1 -right-1 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warningRed opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-warningRed"></span>
    </span>
  );
};

export default Ping;
