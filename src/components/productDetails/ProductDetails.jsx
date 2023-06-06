import React, { useContext, useEffect, useState } from "react";
import { AccordionDiv, DetailsSection } from "./productDetailsStyle";
import {
  FaPencilRuler,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaAngleDown,
} from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";
import BemiIvoryContext from "../../context/BemiIvory/bemiIvoryContext";

const ProductDetails = ({ product, isAdmin }) => {
  const [state, setState] = useState(0);
  const [productCount, setProductCount] = useState(1);
  const [productSize, setProductSize] = useState("");
  const [productColor, setProductColor] = useState("");

  const [storage, setStorage] = useLocalStorage("ivoryStore", []);

  useEffect(() => {
    dispatch({ type: "UPDATE_COUNT", payload: storage.length });
    //eslint-disable-next-line
  }, [storage])

  useEffect(() => {
    if (Object.keys(product)?.length > 0) {
      setProductColor(product.color[0].color);
      setProductSize(product.size[0]);
    }
  }, [product]);

  const bemiIvoryContext = useContext(BemiIvoryContext);
  const { dispatch } = bemiIvoryContext;

  const handleAccordion = (num) => {
    if (state === num) {
      setState(0);
    } else {
      setState(0);
      setState(num);
    }
  };

  const handleCount = (operand) => {
    onclick = { handleSizeSelect };
    if (operand === "-" && productCount === 0) {
      return;
    } else if (operand === "-" && productCount > 0) {
      setProductCount(productCount - 1);
    } else {
      setProductCount(productCount + 1);
    }
  };

  const handleSizeSelect = (e) => {
    setProductSize(e.target.innerText);
    [...e.target.parentElement.children].forEach((btn) => {
      btn.style.backgroundColor = "#fff";
      btn.style.color = "black";
    });
    e.target.style.backgroundColor = "black";
    e.target.style.color = "#fff";
  };

  const handleColor = (color) => {
    setProductColor(color);
  };

  const handleAddCart = () => {
    let cloth = {
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: productSize,
      color: productColor,
      count: productCount,
      stock: product.inStock,
    };

    let currentProduct = storage.filter((item) => item.name === product.name);
    if (currentProduct.length > 0) {
      setStorage(
        storage.map((item) => {
          if (item.name === product.name) {
            return { ...cloth, count: (item.count += cloth.count) };
          } else {
            return item;
          }
        })
      );
    } else {
      setStorage([...storage, cloth]);
    }
    
  };

  return (
    <DetailsSection>
      <h2 className="poduct-name">{product?.name}</h2>
      <p className="product-price text-base">
        ${product?.price && product?.price.toLocaleString(`en-US`)}
      </p>
      <hr />
      <div className="product-size-guide">
        <FaPencilRuler />
        <button>size guide</button>
      </div>
      <div className="product-sizes">
        {!isAdmin && (
          <p>
            <strong>size:</strong>
            {productSize}
          </p>
        )}
        <div className="product-size-btn">
          {product?.size &&
            product?.size.map((item, index) => (
              <button key={item + index} onClick={handleSizeSelect}>
                {item}
              </button>
            ))}
        </div>
      </div>
      <div className="product-color">
        <p>
          <strong>Color:</strong>
          {productColor}
        </p>
        <div className="shed-div">
          {product?.color &&
            product?.color.map((item, index) => (
              <div
                key={item + index}
                style={{ backgroundColor: item.shed }}
                onClick={() => handleColor(item.color)}
                className="product-shed"
              ></div>
            ))}
        </div>
      </div>
      {!isAdmin && (
        <div className="product-quantity">
          <h3 className=" font-bold">Quantity</h3>
          <div className="product-qun-btn">
            <button onClick={() => handleCount("-")}>-</button>
            <p>{productCount}</p>
            <button onClick={() => handleCount("+")}>+</button>
          </div>
        </div>
      )}
      {!isAdmin && (
        <div className="product-purchase">
          <button onClick={handleAddCart}>Add to cart</button>
          <button>Make purchase</button>
        </div>
      )}
      {!isAdmin && (
        <div className="product-contact">
          <h3>contact us</h3>
          <p>share on below social media</p>
          <div className="product-media-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      )}
      <section className="product-info">
        <div className="product-desc">
          <div className="info-div" onClick={() => handleAccordion(1)}>
            <h3>Description</h3>
            <FaAngleDown />
          </div>
          <AccordionDiv toggle={state === 1}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, placeat ex illum mollitia accusantium, doloremque
            repellendus quasi officia magnam molestiae iusto numquam quos sit.
            Maiores, repellendus. Dolor nisi impedit necessitatibus!
          </AccordionDiv>
        </div>
        <div className="product-materials">
          <div className="info-div" onClick={() => handleAccordion(2)}>
            <h3>Materials</h3>
            <FaAngleDown />
          </div>
          <AccordionDiv toggle={state === 2}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, placeat ex illum mollitia accusantium, doloremque
            repellendus quasi officia magnam molestiae iusto numquam quos sit.
            Maiores, repellendus. Dolor nisi impedit necessitatibus!
          </AccordionDiv>
        </div>
        <div className="product-care">
          <div className="info-div" onClick={() => handleAccordion(3)}>
            <h3>Care Advice</h3>
            <FaAngleDown />
          </div>
          <AccordionDiv toggle={state === 3}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, placeat ex illum mollitia accusantium, doloremque
            repellendus quasi officia magnam molestiae iusto numquam quos sit.
            Maiores, repellendus. Dolor nisi impedit necessitatibus!
          </AccordionDiv>
        </div>
        <div className="product-about">
          <div className="info-div" onClick={() => handleAccordion(4)}>
            <h3>About Delivery</h3>
            <FaAngleDown />
          </div>
          <AccordionDiv toggle={state === 4}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, placeat ex illum mollitia accusantium, doloremque
            repellendus quasi officia magnam molestiae iusto numquam quos sit.
            Maiores, repellendus. Dolor nisi impedit necessitatibus!
          </AccordionDiv>
        </div>
      </section>
    </DetailsSection>
  );
};

export default ProductDetails;
