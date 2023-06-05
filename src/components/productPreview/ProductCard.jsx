import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductDiv, ViewBtn } from "./productCardStyle";

const ProductCard = ({ width, height, product }) => {
  const [imgSrc, setImgscr] = useState(product.images[0]);

  const handleMouseEnter = () => {
    setImgscr(product.images[1]);
  };
  const handleMouseLeave = () => {
    setImgscr(product.images[0]);
  };

  return (
    <ProductDiv width={width} height={height}>
      <div
        className="product-img"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={imgSrc} alt="" srcSet="" />
        <ViewBtn>
          <Link to={`/product/${product.name}`}>Quick View</Link>
        </ViewBtn>
      </div>
      <h4 className="product-name truncate">{product.name}</h4>
      <div className="product-shed flex">
        <p className="product-price mr-auto">{product.price}</p>
        {product &&
          product.color.map((shed, index) => (
            <span
              key={shed + index}
              style={{ backgroundColor: shed.shed }}
            ></span>
          ))}
      </div>
    </ProductDiv>
  );
};

export default ProductCard;
