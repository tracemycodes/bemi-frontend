import React from "react";
import styled from "styled-components";
import { BannerSection } from "../shared/BrandBanner/brandBannerStyle";
import decorativeImg from "../../assets/images/DecorativeOrnament_vector.svg";

const AboutUs = styled(BannerSection)`
  height: unset;

  .about-brand,
  .about-brand2 {
    background-repeat: no-repeat;
    background-size: 10rem 5rem;
    background-repeat: no-repeat;
    @media (max-width: 520px) {
      background-size: 7rem 3.5rem;
    }
  }

  .about-brand {
    background-position: top 1rem left 1.1rem;
    background-image: url(${decorativeImg});
  }
  .about-brand2 {
    background-image: url(${decorativeImg});
    background-position: bottom -0.4rem right;
    h2 {
      text-align: center;
      font-size: 2rem;
      @media (max-width: 400px) {
        margin-top: 1rem;
      }
    }
    p {
      max-width: 50rem;
      margin: 1rem auto;
      text-align: center;
      width: 70%;
      @media (max-width: 940px) {
        max-width: 80rem;
        width: 100%;
        margin-bottom: 4rem;
      }
    }
  }
`;

const BrandStory = () => {
  return (
    <AboutUs>
      <div className="max-w-7xl mx-auto my-10 p-5 bg-lightash about-brand">
        <div className="border-2 border-blue-500 p-5 about-brand2">
          <h2>Our Story</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, praesentium animi. Minus, delectus consequuntur soluta
            fuga in optio repellat quas eveniet vero libero tenetur voluptatum
            dolor, temporibus odit ea non iste laborum quae eos asperiores.
          </p>
        </div>
      </div>
    </AboutUs>
  );
};

export default BrandStory;
