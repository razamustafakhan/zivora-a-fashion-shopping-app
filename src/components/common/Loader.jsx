import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-white">
      <ClipLoader size={16} color="#000000" />
    </div>
  );
};

export default Loader;