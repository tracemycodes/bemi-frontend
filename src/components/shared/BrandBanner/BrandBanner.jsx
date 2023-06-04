import React from "react";
import { BannerSection } from "./brandBannerStyle";
import logo from "../../../assets/images/bemi-logo.jpeg";

const BrandBanner = () => {
  return (
    <BannerSection>
      <div className="max-w-7xl mx-auto my-10 p-5 bg-lightash">
        <div className="border-2 h-56 border-blue-500 p-5 flex flex-row">
          <div className="basis-5/12 border-r-2 h-30 self-center flex justify-end align-bottom border-b-skyblue">
            <div className="p-4 w-48 h-48 mr-10 self-center">
              <img src={logo} alt="" srcSet="" className=" " />
            </div>
          </div>
          <div className="basis-7/12">
            <div className=" ml-10">
              <h3>Bemi Ivory</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id animi optio nesciunt quod inventore nostrum similique aspernatur rerum ab quidem.</p>
            </div>
          </div>
        </div>
      </div>
    </BannerSection>
  );
};

export default BrandBanner;
