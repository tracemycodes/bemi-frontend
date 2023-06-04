import React from "react";
import { Link } from "react-router-dom";
import { CategorySection } from "./categoryPreviewStyle";

const CategoryPreview = () => {
  return (
    <div className=" p-5 m-0">
      <CategorySection>
        <div className="grid-2 grid-box1">
          <div className="grid-text">
            <h4>New In</h4>
            <h2>Lorem, ipsum dolor.</h2>
            {/* <h2>Latest Collection</h2> */}
            <button>
              <Link to={"category"}>SHOP NOW</Link>
            </button>
          </div>
        </div>
        <div className="grid-2 grid-box2">
          <div className="grid-text">
            <h4>Kids</h4>
            <h2>Lorem ipsum dolor sit.</h2>
            {/* <h2>We've got your kids covered</h2> */}
            <button>
              <Link to={"category"}>SHOP NOW</Link>
            </button>
          </div>
        </div>
      </CategorySection>
    </div>
  );
};

export default CategoryPreview;
