import React, { useContext, useEffect, useState } from 'react';
import Boutique from '../../components/layouts/assets/boutique.jpg';
import Gallery from '../../components/productGallery/Gallery';
import BrandBanner from '../../components/shared/BrandBanner/BrandBanner';
import Category from '../../components/shopByCategory/Category';
import Slider from '../../components/slider/Slider';
import CategoryPreview from '../../components/categoryPreview/CategoryPreview';
import BrandStory from '../../components/brandStory/BrandStory';
import { useQuery } from '@apollo/client';
import { ALL_PRODUCTS } from '../../queries/productQuery';
import BemiIvoryContext from '../../context/BemiIvory/bemiIvoryContext';
import { PROFILE_CHECK } from '../../context/types';
import ProductLoader from '../../components/shared/ProductLoader/ProductLoader';

function Home() {
  const bemiIvoryContext = useContext(BemiIvoryContext);
  const { dispatch } = bemiIvoryContext;
  const [sliderData, setSliderData] = useState({
    one: [],
    two: [],
  });
  const { loading, data } = useQuery(ALL_PRODUCTS);

  useEffect(() => {
    const getClient = async () => {
      try {
        const res = await fetch(
          `${'https://good-rose-coral-fez.cyclic.app/auth/login/success'}`,
          {
            method: 'GET',
          }
        );

        const resData = await res.json();

        if (resData) {
          localStorage.setItem('token', resData.token);
          dispatch({ type: PROFILE_CHECK, payload: true });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getClient();
    //eslint-disable-next-line
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
      {loading ? <ProductLoader /> : <Slider ProductData={sliderData.one} />}
      <CategoryPreview />
      {loading ? <ProductLoader /> : <Slider ProductData={sliderData.two} />}
      <BrandStory />
      <Gallery />
      <Category />
    </div>
  );
}

export default Home;
