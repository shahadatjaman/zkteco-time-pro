import React from 'react';
import { SiDatabricks } from 'react-icons/si';

const NoData = () => {
  return (
    <div className="w-full flex justify-center flex-col items-center pt-32 pb-10 border-b-2 border-gray-700">
      <SiDatabricks size={'40'} />

      <h5 className="mt-4">No data</h5>
    </div>
  );
};

export default NoData;
