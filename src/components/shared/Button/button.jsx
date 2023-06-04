import React from "react";
import ReactLoading from "react-loading";

const Button = ({
  buttonText,
  buttonIcon,
  btnBgColor,
  btnColor,
  handleClick,
  classnames,
  hoverColor,
  loading,
}) => {
  return (
    <div className={classnames}>
      <button
        className="mb-1.5 w-full text-center flex justify-center items-center gap-2 text-white bg-black hover:opacity-75 px-2 py-2.5"
        style={{
          boxShadow: "inset 0 1px 0 0 hsl(0deg 0% 100% / 40%)",
        }}
        onClick={(e) => handleClick(e)}
      >
        {loading && (
          <ReactLoading
            type="cylon"
            color="#fff"
            className=""
            height={20}
            width={20}
          />
        )}
        {buttonText ? buttonText : ""}
      </button>
    </div>
  );
};

export default Button;
