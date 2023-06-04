import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FormSection, MdSection } from "./productStyle";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
// import ReactHtmlParser from "react-html-parser";
import InputLabel from "../shared/inputLabel/inputLabel";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_PRODUCT,
  PRODUCT_IMAGE,
  UPDATE_PRODUCT,
} from "../../mutations/productMutations";
import { useNavigate, useParams } from "react-router-dom";
import { SINGLE_PRODUCT } from "../../queries/productQuery";
import { FiArrowLeft } from "react-icons/fi";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";

const Product = () => {
  const navigate = useNavigate();
  const { formOption } = useParams();
  const { loading, error, data } = useQuery(SINGLE_PRODUCT, {
    variables: { productId: formOption.trim() },
  });

  // Initialize a markdown parser
  const mdParser = new MarkdownIt();

  // Form State
  const [dropZone, setDropZone] = useState(false);
  const [productState, setProductState] = useState({
    _id: "",
    name: "",
    collectionName: "",
    inStock: 0,
    price: 0.0,
    size: [],
    color: [],
    variant: [],
    images: [],
    discount: 0,
    description: "",
    materials: "",
    careAdvice: "",
  });

  const {
    _id: productId,
    name,
    collectionName,
    inStock,
    price,
    size,
    color,
    variant,
    images,
    discount,
    description,
    materials,
    careAdvice,
  } = productState;

  const releases = collectionName;

  const [markDownText, setMarkDownText] = useState({
    text: "",
    html: "",
  });
  const [clothSize, setClothSize] = useState("");
  const [productShed, setProductShed] = useState({
    color: "",
    shed: "",
  });

  useEffect(() => {
    if (formOption !== "add" && !loading) {
      setProductState({
        ...data?.singleProduct,
        color: data?.singleProduct.color.map((item) => {
          return { color: item.color, shed: item.shed };
        }),
        variant: data?.singleProduct.variant.map((item) => {
          return { color: item.color, images: item.images };
        }),
      });
    }
  }, [formOption, loading, data]);

  const [
    addProduct,
    { data: productData, loading: productLoading, error: productError },
  ] = useMutation(ADD_PRODUCT, {
    variables: {
      name,
      collectionName,
      inStock,
      price,
      releases,
      size,
      color,
      variant,
      images,
      discount,
      description,
      materials,
      careAdvice,
    },
  });

  const [
    updateProduct,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_PRODUCT, {
    variables: {
      productId,
      name,
      collectionName,
      inStock,
      price,
      releases,
      size,
      color,
      variant,
      images,
      discount,
      description,
      materials,
      careAdvice,
    },
  });

  const [
    uploadMedia,
    { data: uploadData, loading: uploadLoading, error: uploadError },
  ] = useMutation(PRODUCT_IMAGE);

  useEffect(() => {
    if (productData) {
      toast.success("Item added to store successfully", {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    //eslint-disable-next-line
  }, [productData]);

  useEffect(() => {
    if (updateData) {
      toast.success("Item updated successfully", {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    //eslint-disable-next-line
  }, [updateData]);

  // Form submission function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formOption === "add") {
      addProduct(
        name,
        collectionName,
        parseInt(inStock),
        parseInt(price),
        releases,
        size,
        color,
        variant,
        images,
        parseInt(discount),
        description,
        materials,
        careAdvice
      );
    } else {
      updateProduct(
        productId,
        name,
        collectionName,
        parseInt(inStock),
        parseInt(price),
        releases,
        size,
        color,
        variant,
        images,
        parseInt(discount),
        description,
        materials,
        careAdvice
      );
    }
  };

  // Form input change function
  const handleProductFormChange = (e) => {
    setProductState({ ...productState, [e.target.name]: e.target.value });
  };

  // Add product sizes functions
  const handleSizeChange = (e) => {
    e.preventDefault();
    setClothSize(e.target.value);
  };
  const handleSizeClick = (e) => {
    e.preventDefault();
    if (clothSize === "" || clothSize === " ") {
      alert("Please select a size");
      return;
    }
    setProductState({
      ...productState,
      size: [...productState.size, clothSize],
    });
    setClothSize("");
  };
  const handleDeleteSize = (size) => {
    setProductState({
      ...productState,
      size: [...productState.size].filter((item) => item !== size),
    });
  };

  // Add color shed functions
  const handleColorChange = (e) => {
    setProductShed({ ...productShed, [e.target.name]: e.target.value });
  };
  const handleAddColor = (e) => {
    e.preventDefault();
    if (productShed.color === "" || productShed.shed === "") {
      alert(`complete product color field`);
      return;
    }
    setProductState({
      ...productState,
      color: [...productState.color, productShed],
    });
    setProductShed({
      color: "",
      shed: "",
    });
  };
  const handleDeleteShed = (index) => {
    setProductState({
      ...productState,
      color: productState.color.filter((item, count) => count !== index),
    });
  };

  // Markdown Editor functions
  const handleEditorChange = ({ html, text }) => {
    setMarkDownText({ ...markDownText, html: html });
  };
  const handleMarkDownSelect = (field) => {
    setMarkDownText({ ...markDownText, text: field });
  };
  const handleSaveMarkDown = (e) => {
    e.preventDefault();
    if (markDownText.html === "" || markDownText.html === "") {
      alert(`complete mark down text field`);
      return;
    }
    let textBtn = markDownText.text;
    let field = markDownText.html;
    setProductState({ ...productState, [textBtn]: field });
    setMarkDownText({ text: "", html: "" });
  };
  const handleCloseMarkDown = () => {
    setMarkDownText({ text: "", html: "" });
  };

  useEffect(() => {
    if (dropZone && uploadData?.uploadMedia?.url) {
      console.log(uploadData?.uploadMedia?.url);
      setProductState({
        ...productState,
        images: [...productState.images, uploadData?.uploadMedia?.url],
      });
    } else {
      setVariantImg({
        ...variantImg,
        images: [...variantImg?.images, uploadData?.uploadMedia?.url],
      });
    }
    //eslint-disable-next-line
  }, [uploadData]);

  // image upload functions
  const onDrop = useCallback((acceptedFiles) => {
    setDropZone(true);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async (e) => {
        await uploadMedia({ variables: { mediaInput: reader.result } });
      };
    });
    // eslint-disable-next-line
  }, []);
  const handleImgDelete = (index) => {
    setProductState({
      ...productState,
      images: [...productState.images].filter((item, count) => count !== index),
    });
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [variantImg, setVariantImg] = useState({
    color: "",
    images: [],
  });

  // Variant img upload function
  const handleVariantImg = async (e) => {
    setDropZone(false);
    let shed = e.target.name;
    setVariantImg({
      color: shed,
      images: [],
    });
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async (e) => {
        await uploadMedia({ variables: { mediaInput: reader.result } });
      };
    }
  };
  const handleAddVariant = (e, shed) => {
    e.preventDefault();
    const currentShed = productState.variant.find(
      (variant) => variant.color === shed
    );
    if (currentShed === undefined) {
      setProductState({
        ...productState,
        variant: [...productState.variant, variantImg],
      });
    } else {
      let recentImg = currentShed.images;
      let pastImg = variantImg.images;
      let updatedShed = {
        color: shed,
        images: recentImg.concat(pastImg),
      };
      let finalArr = productState.variant.filter(
        (variant) => variant.color !== shed
      );
      setProductState({ ...productState, variant: [...finalArr, updatedShed] });
    }
    setVariantImg({
      color: "",
      images: [],
    });
  };
  const handleDeleteVariant = (productColor, index) => {
    const currentShed = productState.variant.find(
      (variant) => variant.color === productColor
    );
    currentShed.images.splice(index, 1);
    console.log(index);
    let finalArr = productState.variant.filter(
      (variant) => variant.color !== productColor
    );
    setProductState({ ...productState, variant: [...finalArr, currentShed] });
  };

  return (
    <FormSection>
      <ToastContainer />
      <div className="mb-6">
        <button
          className="flex items-center gap-2 border-2 border-border-blue px-2"
          onClick={() => navigate("/admin/product")}
        >
          <FiArrowLeft className=" text-xl" />
          <p className="">back</p>
        </button>
      </div>

      <div className="container mx-auto rounded-md shadow-md max-w-5xl px-10 py-3 bg-white">
        <form>
          <div className="flex flex-row space-x-4">
            <div className="basis-1/2">
              <InputLabel
                labelValue={"Name"}
                inputName={"name"}
                placeHolder={"name"}
                inputType={"text"}
                inputValue={productState.name}
                handleInputChange={handleProductFormChange}
              />
            </div>
            <div className="basis-1/2">
              <InputLabel
                labelValue={"Collection"}
                inputName={"collectionName"}
                placeHolder={"collection"}
                inputType={"text"}
                inputValue={productState.collectionName}
                handleInputChange={handleProductFormChange}
              />
            </div>
          </div>
          <div className="flex flex-row space-x-4 max-w-sm">
            <div className="">
              <InputLabel
                labelValue={"inStock"}
                inputName={"inStock"}
                placeHolder={"number of clothings"}
                inputType={"number"}
                inputValue={productState.inStock}
                handleInputChange={handleProductFormChange}
              />
            </div>
            <div className="">
              <InputLabel
                labelValue={"Price"}
                inputName={"price"}
                placeHolder={"price"}
                inputType={"number"}
                inputValue={productState.price}
                handleInputChange={handleProductFormChange}
              />
            </div>
            <div className="">
              <InputLabel
                labelValue={"Discount"}
                inputName={"discount"}
                placeHolder={"percentage discount"}
                inputType={"number"}
                inputValue={productState.discount}
                handleInputChange={handleProductFormChange}
              />
            </div>
          </div>

          <div className="flex flex-row space-x-4 items-end">
            <div className="w-16">
              <InputLabel
                labelValue={"Sizes"}
                inputName={"size"}
                placeHolder={"size"}
                inputType={"text"}
                inputValue={clothSize}
                handleInputChange={handleSizeChange}
                className={"my-0"}
              />
            </div>
            <button
              onClick={handleSizeClick}
              className="border bg-bs-blue text-white mt-8 py-1 px-3 text-sm self-center"
            >
              Add size
            </button>
            <div className="size-bar">
              {size &&
                size.map((size, index) => (
                  <p key={size + index} className="border-dotted border px-2">
                    <IoMdClose onClick={() => handleDeleteSize(size)} />
                    {size}
                  </p>
                ))}
            </div>
          </div>

          <div className="flex flex-row space-x-4 items-center align-middle">
            <div className="">
              <InputLabel
                labelValue={"Color"}
                inputName={"color"}
                placeHolder={"name of color"}
                inputType={"text"}
                inputValue={productShed.color}
                handleInputChange={handleColorChange}
              />
            </div>
            <div className="">
              <InputLabel
                labelValue={"Pick color shed"}
                inputName={"shed"}
                placeHolder={"color shed"}
                inputType={"color"}
                inputValue={productShed.color}
                handleInputChange={handleColorChange}
              />
            </div>
            <button
              onClick={handleAddColor}
              className="border mt-10 py-1 px-3 bg-bs-blue text-white"
            >
              Add color
            </button>
          </div>

          <div className="flex flex-row product-color-div">
            {productState.color &&
              productState.color.map((sheds, index) => (
                <div key={sheds + index} className="product-color-shed">
                  <IoMdClose onClick={() => handleDeleteShed(index)} />
                  <p
                    style={{ backgroundColor: sheds.shed }}
                    className="product-shed-div"
                  ></p>
                  {sheds.color}
                </div>
              ))}
          </div>

          <section className="product-variant-section mt-3">
            <h3>Add product Variants</h3>
            {productState.color &&
              productState.color.map((item, count) => (
                <div
                  className="product-variant-container flex flex-row align-middle items-center my-6"
                  key={item.color + count}
                >
                  <div className="variant-div">
                    <label
                      className="mr-3"
                      style={{ color: item.shed }}
                      htmlFor={item.color}
                    >
                      {item.color}
                    </label>
                    <input
                      type="file"
                      name={item.color}
                      multiple
                      id={item.color}
                      onChange={handleVariantImg}
                      className="w-60"
                    />
                  </div>
                  <button
                    onClick={(e) => handleAddVariant(e, item.color)}
                    className="bg-bs-blue text-white py-1 px-3"
                  >
                    Add image
                  </button>
                  <div className="product-variant-images flex flex-row flex-wrap mx-2 gap-2">
                    {productState.variant &&
                      productState.variant
                        .filter((product) => product.color === item.color)[0]
                        ?.images?.map((image, index) => (
                          <div
                            className="product-image-div"
                            key={image + index}
                          >
                            <IoMdClose
                              onClick={() =>
                                handleDeleteVariant(item.color, index)
                              }
                            />
                            <img src={image} alt="" />
                          </div>
                        ))}
                    {uploadLoading && !dropZone && (
                      <ReactLoading
                        type="cylon"
                        color="#007aff"
                        className=""
                        height={50}
                        width={50}
                      />
                    )}
                  </div>
                </div>
              ))}
          </section>

          <section className="drop-zone-container">
            <div
              className="drop-zone-section"
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              {productState.images &&
                productState.images.map((item, index) => (
                  <div className="product-image-div" key={item + index}>
                    <IoMdClose onClick={() => handleImgDelete(index)} />
                    <img src={item} alt="" />
                  </div>
                ))}
              {uploadLoading && dropZone && (
                <ReactLoading
                  type="cylon"
                  color="#007aff"
                  className=""
                  height={50}
                  width={50}
                />
              )}
            </aside>
          </section>

          <section className="mark-down-section">
            <div className="mark-down-div flex align-middle items-center gap-6">
              <p
                className="mark-down-btn bg-bs-blue text-white py-1 px-3"
                onClick={() => handleMarkDownSelect("description")}
              >
                Description
              </p>
              <div className="mark-down-html">
                {productState.description && "Product description added"}
              </div>
            </div>

            <div className="mark-down-div flex align-middle items-center gap-6">
              <p
                className="mark-down-btn bg-bs-blue text-white py-1 px-3"
                onClick={() => handleMarkDownSelect("materials")}
              >
                Material
              </p>
              <div className="mark-down-html">
                {productState.materials && "Product materials added"}
              </div>
            </div>

            <div className="mark-down-div flex align-middle items-center gap-6">
              <p
                className="mark-down-btn bg-bs-blue text-white py-1 px-3"
                onClick={() => handleMarkDownSelect("careAdvice")}
              >
                Care Advice
              </p>
              <div className="mark-down-html">
                {productState.careAdvice && "Procuct Care advice"}
              </div>
            </div>
          </section>

          {markDownText.text && (
            <MdSection>
              <div className="mark-down-div">
                <div className="mark-down-header">
                  <p>{`Add product ${markDownText.text}`}</p>
                  <button className="close-btn">
                    <IoMdClose onClick={handleCloseMarkDown} />
                  </button>
                </div>
                <MdEditor
                  style={{ height: "350px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange}
                />
                <button onClick={handleSaveMarkDown} className="save-btn">
                  save
                </button>
              </div>
            </MdSection>
          )}

          <div className="flex align-middle justify-end mb-4">
            <button
              type="submit"
              className="bg-bs-blue rounded-md text-white py-2 px-6 flex items-center gap-2"
              onClick={handleSubmit}
            >
              {(productLoading || updateLoading) && (
                <ReactLoading
                  type="cylon"
                  color="#007aff"
                  className=""
                  height={20}
                  width={20}
                />
              )}
              {formOption !== "add" ? "Update product" : "Add product"}
            </button>
          </div>
        </form>
      </div>
    </FormSection>
  );
};

export default Product;
