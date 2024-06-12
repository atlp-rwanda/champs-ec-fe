import React from 'react';

const Drawer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full sm:w-[500px] h-[calc(100vh-5rem)] bg-grey p-5 fixed top-20 right-0 duration-200">
      {children}
    </div>
  );
};

export default Drawer;
