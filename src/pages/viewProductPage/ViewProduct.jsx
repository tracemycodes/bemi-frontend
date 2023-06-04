import React, { useEffect, useState } from "react";
import ProductThumbnail from "../../components/productThumbnail/ProductThumbnail";
import { ViewProductSection } from "./viewProductStyle";
import { ClothingData } from "../../components/data/ProductData";
import Slider from "../../components/slider/Slider";
import ProductDetails from "../../components/productDetails/ProductDetails";
import { useQuery } from "@apollo/client";
import { SINGLE_PRODUCT } from "../../queries/productQuery";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
  const { cloth } = useParams();

  const [productData, setProductData] = useState({});

  const { loading, error, data } = useQuery(SINGLE_PRODUCT, {
    variables: { productId: cloth.trim() },
  });

  useEffect(() => {
    if (!loading) {
      setProductData(data?.singleProduct);
    }
  }, [loading, data]);

  return (
    <>
      <ViewProductSection>
        <div className="product-info">
          <div className="flex-2 flex-one">
            {data && <ProductThumbnail product={productData} />}
          </div>
          <div className="flex-2 flex-two">
            {data && <ProductDetails product={productData} />}
          </div>
        </div>
        <Slider ProductData={ClothingData} />
      </ViewProductSection>
    </>
  );
};

export default ViewProduct;
