import Image from 'next/image';
import React from 'react';

const BrandingSection = () => {
  return (
    <div className="flex h-[50vh] items-center justify-center rounded-b-[2.25rem] bg-green-300 md:h-[100vh] md:w-[40%] md:rounded-l-[2.25rem]">
      <div className="flex flex-col items-center justify-center gap-11">
        <Image src="/images/board-icon.png" alt="Board Application Logo" priority height={230} width={300} />
        <span className="text-2xl font-bold text-white">a Board</span>
      </div>
    </div>
  );
};

export default BrandingSection;
