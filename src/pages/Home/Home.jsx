import React, { useEffect, useState } from "react";
import Boutique from "../../components/layouts/assets/boutique.jpg";
import Gallery from "../../components/productGallery/Gallery";
import BrandBanner from "../../components/shared/BrandBanner/BrandBanner";
import Category from "../../components/shopByCategory/Category";
import Slider from "../../components/slider/Slider";
import CategoryPreview from "../../components/categoryPreview/CategoryPreview";
import BrandStory from "../../components/brandStory/BrandStory";
import { useQuery } from "@apollo/client";
import { ALL_PRODUCTS } from "../../queries/productQuery";

function Home() {
  const [sliderData, setSliderData] = useState({
    one: [],
    two: [],
  });
  const { loading, error, data } = useQuery(ALL_PRODUCTS);

  useEffect(() => {
    const getClient = async () => {
      try {
        const res = await fetch(
          `${"https://localhost:3000"}/auth/login/success`,
          {
            method: "GET",
          }
        );

        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getClient();
  }, []);

  useEffect(() => {
    console.log(data);
    if (data) {
      setSliderData({
        one: [...data.products.slice(0, 6)],
        two: [...data.products.slice(-6)],
      });
    }
  }, [data]);

  return (
    <div>
      <div className="home object-cover h-[42rem] w-full">
        <img src={Boutique} alt="hero" className="w-full h-full object-cover" />
      </div>
      <BrandBanner />
      <Slider ProductData={sliderData.one} />
      <CategoryPreview />
      <Slider ProductData={sliderData.two} />
      <BrandStory />
      <Gallery />
      <Category />
    </div>
  );
}

export default Home;
