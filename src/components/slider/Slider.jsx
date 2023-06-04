import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { SliderSection } from "./sliderStyle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
// import required modules
import { Navigation } from "swiper";
import useViewPort from "../../utils/ViewPort";
import ProductCard from "../productPreview/ProductCard";

const Slider = ({ ProductData }) => {
  const { width } = useViewPort();
  // const [sliderWidth, setSliderWidth] = useState("");
  const [sliderHeight, setSliderHeight] = useState("");
  const [slideCount, setSlideCount] = useState(3);

  useEffect(() => {
    // setSliderWidth(width);
    if (Number(width) <= 700) {
      setSlideCount(1);
    } else if (Number(width) <= 1200 && Number(width) >= 700) {
      setSlideCount(2);
    } else {
      setSlideCount(3);
    }

    if (Number(width) <= 1359 && Number(width) >= 908) {
      setSliderHeight("39rem");
    } else if (Number(width) <= 908 && Number(width) >= 810) {
      setSliderHeight("38rem");
    } else if (Number(width) <= 810 && Number(width) >= 699) {
      setSliderHeight("35rem");
    } else {
      setSliderHeight("39rem");
    }
  }, [width]);

  return (
    <div>
      <SliderSection>
        <div className="slider-header">
          <h2>Signature Collection</h2>
          <p>Lorem ipsum dolor sit amet.</p>
          <button>
            <Link to={"category"}>Shop signature collection</Link>
          </button>
        </div>
        <Swiper
          slidesPerView={slideCount}
          spaceBetween={30}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwip"
        >
          {ProductData &&
            ProductData.map((product, index) => (
              <SwiperSlide key={product.name + index}>
                <ProductCard
                  width={"100%"}
                  height={sliderHeight}
                  product={product}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </SliderSection>
    </div>
  );
};

export default Slider;
