import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div
        className="
          w-12 h-12 rounded-full border-4
          border-t-transparent border-white
          animate-spin
        "
      ></div>
    </div>
  );
};

export default Loader;