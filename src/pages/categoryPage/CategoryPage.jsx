import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { CategorySection } from "./categoryStyle";
import { ProductData } from "../../components/data/ProductData";
import ProductCard from "../../components/productPreview/ProductCard";

const CategoryPage = () => {
  const [sort, setSort] = useState(false);

  const handleSort = () => {
    if (sort === true) {
      setSort(false);
    } else {
      setSort(true);
    }
  };

  return (
    <CategorySection>
      <div className="category-header">
        <h2>Dresses</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
          facere, eos temporibus eius et odio illo enim nisi consequuntur quod
          saepe laborum. Facilis praesentium, aliquid pariatur, cumque dolores
          architecto doloribus velit, eaque magni nisi iusto. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Fugit, illum.
        </p>
      </div>
      <div className="category-flex">
        <div className="flex-one">
          <h3>FILTER BY</h3>
          <div className="category-filter">
            <div className="filter-header">
              <h3>COLOUR</h3>
              <FaAngleDown />
            </div>
          </div>
          <div className="category-filter">
            <div className="filter-header">
              <h3>LENGTH</h3>
              <FaAngleDown />
            </div>
          </div>
          <div className="category-filter">
            <div className="filter-header">
              <h3>SLEEVE</h3>
              <FaAngleDown />
            </div>
          </div>
          <div className="category-filter">
            <div className="filter-header">
              <h3>SIZE</h3>
              <FaAngleDown />
            </div>
          </div>
          <div className="category-filter">
            <div className="filter-header">
              <h3>FABRIC</h3>
              <FaAngleDown />
            </div>
          </div>
        </div>
        <div className="flex-two">
          <div className="category-sort">
            <div className="sort-header">
              <button className="filter-btn">filter</button>

              <div className="sort-div">
                <div className="sort-cta" onClick={handleSort}>
                  <p>Sort:</p>
                  <p>Date, new to old</p>
                <FaAngleDown />
                </div>
                {sort && (
                  <div className="sort-options">
                    <div>
                      <label htmlFor="a-z">Alphabetically, A-Z</label>
                      <input type="radio" name="sort" id="a-z" />
                    </div>
                    <div>
                      <label htmlFor="z-a">Alphabetically, Z-A</label>
                      <input type="radio" name="sort" id="z-a" />
                    </div>
                    <div>
                      <label htmlFor="low-high">Price, low to high</label>
                      <input type="radio" name="sort" id="low-high" />
                    </div>
                    <div>
                      <label htmlFor="high-low">Price, high to low</label>
                      <input type="radio" name="sort" id="high-low" />
                    </div>
                    <div>
                      <label htmlFor="old-new">Date, old to new</label>
                      <input type="radio" name="sort" id="old-new" />
                    </div>
                    <div>
                      <label htmlFor="new-old">Date, new to old</label>
                      <input type="radio" name="sort" id="new-old" />
                    </div>
                  </div>
                )}
              </div>

              <button className="sort-btn">sort</button>
            </div>
            
            <div className="category-grid">
              {ProductData &&
                ProductData.map((product, index) => (
                  <div key={product.name + index}>
                    <ProductCard
                      width={"100%"}
                      height={"27rem"}
                      product={product}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </CategorySection>
  );
};

export default CategoryPage;
