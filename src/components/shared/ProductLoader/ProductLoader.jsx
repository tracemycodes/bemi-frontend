import React from 'react';
import { LoaderDiv } from '../../slider/sliderStyle';

const ProductLoader = () => {
  return (
    <LoaderDiv>
      <div className="flex justify-between">
        <div className="shadow-sm md:w-[47%] xl:w-[31%] card">
          <div
            role="status"
            className="animate-pulse flex content-between place-content-between align-middle flex-col w-full"
          >
            <div className="h-[28rem] bg-gray dark:bg-ash/20 rounded-lg" />
            <div className="h-3 bg-gray dark:bg-ash/20 rounded-lg my-3 w-28" />
            <div
              className="flex animate-pulse items-center justify-between"
              role="status"
            >
              <div className="h-3 bg-gray dark:bg-ash/20 rounded-lg w-28" />
              <div className="h-3 bg-gray dark:bg-ash/20 rounded-lg w-20" />
            </div>
          </div>
        </div>

        <div className="hidden md:block w-[47%] xl:w-[31%] shadow-sm card">
          <div
            role="status"
            className="animate-pulse flex content-between place-content-between align-middle flex-col w-full"
          >
            <div className="h-[28rem] bg-gray dark:bg-ash/20 rounded-lg" />
            <div className="h-3 bg-gray dark:bg-ash/20 rounded-lg my-3 w-28" />
            <div
              className="flex animate-pulse items-center justify-between"
              role="status"
            >
              <div className="h-3 bg-gray dark:bg-ash/20 rounded-lg w-28" />
              <div className="h-3 bg-gray dark:bg-ash/20 rounded-lg w-20" />
            </div>
          </div>
        </div>

        <div className="hidden xl:block w-[31%] shadow-sm card">
          <div
            role="status"
            className="animate-pulse flex content-between place-content-between align-middle flex-col w-full"
          >
            <div className="h-[28rem] bg-gray dark:bg-ash/20 rounded-lg" />
            <div className="h-3 bg-gray dark:bg-ash/20 rounded-lg my-3 w-28" />
            <div
              className="flex animate-pulse items-center justify-between"
              role="status"
            >
              <div className="h-3 bg-gray dark:bg-ash/20 rounded-lg w-28" />
              <div className="h-3 bg-gray dark:bg-ash/20 rounded-lg w-20" />
            </div>
          </div>
        </div>
      </div>
    </LoaderDiv>
  );
};

export default ProductLoader;
