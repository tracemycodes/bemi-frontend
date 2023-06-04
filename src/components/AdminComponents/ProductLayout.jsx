import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoMdOpen } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SINGLE_PRODUCT } from "../../queries/productQuery";
import ProductDetails from "../productDetails/ProductDetails";
import ProductThumbnail from "../productThumbnail/ProductThumbnail";

const ProductLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productData, setProductData] = useState({});
  const { loading, error, data } = useQuery(SINGLE_PRODUCT, {
    variables: { productId: productId.trim() },
  });

  console.log(location.pathname.includes("admin"));

  useEffect(() => {
    if (!loading) {
      setProductData(data.singleProduct);
    }
  }, [loading, data]);

  return (
    <div>
      {location.pathname.includes("admin") && (
        <div className="flex justify-between items-baseline">
          <button
            className="flex items-center gap-2 border-2 border-border-blue px-2 mb-4"
            onClick={() => navigate("/admin/product")}
          >
            <FiArrowLeft className=" text-xl" />
            <p className="">back</p>
          </button>
          <button className=" text-border-blue flex gap-2 items-center" onClick={() => navigate(`/admin/product/${productId}`)}>
            <IoMdOpen className="text-lg text-border-blue" />
            update product
          </button>
        </div>
      )}
      <div className="flex justify-between">
        <div className="max-w-[28rem] max-h-[39rem]">
          <ProductThumbnail product={productData} />
        </div>
        <div className="max-w-[35rem]">
          <ProductDetails product={productData} isAdmin={true} />
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
