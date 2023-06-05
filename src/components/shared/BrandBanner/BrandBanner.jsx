import React from "react";
import { BannerSection } from "./brandBannerStyle";
import logo from "../../../assets/images/bemi-logo.jpeg";

const BrandBanner = () => {
  return (
    <BannerSection>
      <div className="max-w-7xl mx-auto my-10 p-5 bg-lightash shadow-lg">
        <div className="border-2 sm:h-56 border-blue-500 p-5 flex sm:flex-row flex-col">
          <div className="sm:basis-5/12 basis-full w-full m-auto border-b-2 sm:border-r-2 sm:border-b-0 h-30 self-center flex justify-center sm:justify-end align-bottom">
            <div className="p-4 w-48 h-48 sm:mr-10 self-center">
              <img src={logo} alt="logo" className=" " />
            </div>
          </div>

          <div className="sm:basis-7/12">
            <div className="sm:ml-10 mt-4 sm:mt-0">
              <h3 className="text-lg">Bemi Ivory</h3>
              <p className="text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Id animi optio nesciunt quod inventore nostrum similique aspernatur rerum ab quidem.</p>
            </div>
          </div>
        </div>
      </div>
    </BannerSection>
  );
};

export default BrandBanner;
