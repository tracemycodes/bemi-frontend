import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch, FiEdit } from "react-icons/fi";
import { MdDelete, MdOutlineAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
// import RedDress from "../../assets/images/red-ball-dress-1.jpeg";
import { ALL_PRODUCTS } from "../../queries/productQuery";
import ReactPaginate from "react-paginate";
import LightBox from "../shared/LightBox/LightBox";
import { ImWarning } from "react-icons/im";
import { DELETE_PRODUCT } from "../../mutations/productMutations";
import ReactLoading from "react-loading";
import { IoMdOpen } from "react-icons/io";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(ALL_PRODUCTS);

  const [productData, setProductData] = useState([]);
  const [request, setRequest] = useState(true);
  const [productID, setProductID] = useState("");
  const [modal, setModal] = useState(false);
  const [delRequest, setDelRequest] = useState(false);

  const cancelButtonRef = useRef();

  const [
    deleteProduct,
    { data: delData, loading: delLoading, error: delError },
  ] = useMutation(DELETE_PRODUCT, {
    variables: {
      productID,
    },
  });

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 7;
  const currentItems = productData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(productData.length / 7);

  useEffect(() => {
    if (!loading) {
      setProductData(data.products);
    }
    setRequest(loading);
  }, [loading, data]);

  useEffect(() => {
    if (delData && delRequest) {
      handleOpenModal(false);
      setDelRequest(false);
      setProductID("");
      toast.success('item deleted successfully', {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (delError) {
      toast.error(delError.message, {
        pauseOnFocusLoss: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.removeItem("token");
      navigate("/login");
    }
    //eslint-disable-next-line
  }, [delLoading, delRequest]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % productData.length;
    setItemOffset(newOffset);
  };

  const handleOpenModal = (bool, proID) => {
    if (proID) {
      setProductID(proID);
    }
    setModal(bool);
  };

  const handleDelete = () => {
    deleteProduct(productID);
    setDelRequest(true);
  };

  return (
    <>
      <div className="flex justify-between sm:mb-12 mb-4">
        <h1 className="sm:text-2xl text-xl text-font-blue">Product</h1>
        <form className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 rounded-md items-center shadow-md bg-white pl-2">
            <label htmlFor="search" className="bg-white">
              <FiSearch />
            </label>
            <input
              type="text"
              name="search"
              id="search"
              className="py-2 sm:w-80 text-sm border-0 outline-0"
            />
          </div>

          <Link to={"/admin/product/add"} className="justify-items-end ml-auto">
            <button className="sm:px-3 px-2 sm:py-2 py-1 sm:text-sm text-xs bg-border-blue rounded shadow text-white flex items-center justify-between gap-2">
              Add Product
              <MdOutlineAdd className="sm:text-lg" />
            </button>
          </Link>
        </form>
      </div>

      <div className="relative pb-16 rounded-lg shadow-md bg-white">
        <div className="rounded-lg bg-white sm:px-6 px-3 py-3 overflow-x-auto relative">
          <table className="w-full rounded-lg bg-white min-w-[50rem]">
            <thead className="text-text-header rounded-t-lg border-b border-text-para/40">
              <tr className="rounded-t-lg">
                <th className="py-2 sm:py-3 pl-3 sm:text-sm text-xs font-light text-left text-text-para">
                  Product ID
                </th>
                <th className="py-2 sm:py-3 sm:text-sm text-xs font-light text-left text-text-para">
                  Image
                </th>
                <th className="py-2 sm:py-3 sm:text-sm text-xs font-light text-left text-text-para">
                  Product Name
                </th>
                <th className="py-2 sm:py-3 sm:text-sm text-xs font-light text-left text-text-para">
                  Price
                </th>
                <th className="py-2 sm:py-3 sm:text-sm text-xs font-light text-left text-text-para">
                  Num
                </th>
                <th className="py-2 sm:py-3 sm:text-sm text-xs font-light text-left text-text-para">
                  Update
                </th>
                <th className="py-2 sm:py-3 sm:text-sm text-xs font-light text-left text-text-para">
                  Delete
                </th>
              </tr>
            </thead>

            {!request && (
              <tbody className="w-full relative">
                {currentItems
                  ? currentItems.map((dress, index) => (
                      <tr
                        className={`text-font-blue rounded ${
                          index % 2 !== 0 ? "bg-bs-light/80" : ""
                        }`}
                        key={dress.name + index}
                      >
                        <td
                          className="sm:py-3 py-2 sm:pl-3 pl-2 cursor-pointer"
                          onClick={() =>
                            navigate(`/admin/product/view/${dress.name}`)
                          }
                        >
                          <p className="text-xs flex sm:gap-3 gap-2">
                            <IoMdOpen className="sm:text-lg text-base text-border-blue" />
                            {dress._id.slice(-5)}
                          </p>
                        </td>

                        <td className="sm:py-3 py-2">
                          <div className="w-9 rounded-sm">
                            <img
                              src={dress.images[0]}
                              alt=""
                              srcSet=""
                              className="rounded-sm"
                            />
                          </div>
                        </td>

                        <td>
                          <p className="text-sm sm:text-base">{dress.name}</p>
                        </td>

                        <td>
                          <p className="sm:text-sm text-xs">
                            #{dress.price.toLocaleString(`en-US`)}
                          </p>
                        </td>

                        <td>
                          <p className="sm:text-sm text-xs">{dress.inStock}</p>
                        </td>

                        <td>
                          <div className="flex items-center align-middle">
                            <Link to={`/admin/product/${dress.name}`}>
                              <FiEdit
                                color="#0B90E2"
                                className="sm:text-lg text-base"
                              />
                            </Link>
                          </div>
                        </td>

                        <td>
                          <div
                            className="flex items-center align-middle cursor-pointer"
                            onClick={() => handleOpenModal(true, dress._id)}
                          >
                            <MdDelete
                              color="#ff3939d6"
                              className="sm:text-lg text-base"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            )}
          </table>
        </div>

        {request && (
          <div
            role="status"
            className="animate-pulse flex content-between place-content-between align-middle flex-col px-6"
          >
            <div className="h-14 bg-skeleton mt-12" />
            <div className="h-14 bg-skeleton my-14" />
            <div className="h-14 bg-skeleton" />
            <div className="h-14 bg-skeleton mt-14" />
          </div>
        )}

        <div
          className=" absolute bottom-0 w-full left-0 flex items-center align-middle justify-between text-sm gap-10 h-16 px-6 bg-blue-light"
          style={{ borderTop: "1px solid rgba(51, 125, 239, 0.2)" }}
        >
          <p className="opacity-30 text-xs">
            Showing deliverables from {itemOffset + 1} to{" "}
            {endOffset > currentItems.length ? currentItems.length : endOffset}{" "}
            out of {currentItems.length}
          </p>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => handlePageClick(e)}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="<"
            previousClassName="border border-black/5 bg-white shadow self-center flex justify-center align-middle sm:mx-2 text-xs sm:text-base mx-1 py-1 px-2 sm:px-3 rounded"
            previousLinkClassName="text-xs text-blue"
            nextClassName="border border-black/5 bg-white shadow self-center flex justify-center align-middle sm:mx-2 text-xs sm:text-base mx-1 py-1 px-2 sm:px-3 rounded"
            disabledClassName="border-gray-400"
            disabledLinkClassName="text-gray-400"
            nextLinkClassName="text-xs text-blue"
            containerClassName="flex"
            pageClassName="text-gray-300 sm:mx-2 mx-1"
            activeClassName="text-blue"
            activeLinkClassName="text-blue"
          />
        </div>
      </div>

      <LightBox
        modal={modal}
        handleOpenModal={handleOpenModal}
        cancelButtonRef={cancelButtonRef}
      >
        <div className="sm:my-8 px-6">
          <div className="flex gap-4 items-center">
            <div className="p-2 rounded-full bg-red/20">
              <ImWarning className="text-red text-lg" />
            </div>
            <h2>Delete product</h2>
          </div>
          <p className="text-sm text-text-para my-4">
            Are you sure you want to permanently delete this product from your
            store
          </p>
          <div className="bg-gray-50 sm:flex sm:flex-row-reverse mt-8">
            <button
              type="button"
              className="mt-3 inline-flex gap-2 w-full justify-center rounded-md border-2 border-red/80 bg-red/70 text-white bg-white px-4 py-2 text-base font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red/20 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleDelete}
            >
              {delLoading && (
                <ReactLoading
                  type="cylon"
                  color="#fff"
                  className=""
                  height={20}
                  width={20}
                />
              )}
              Delete
            </button>

            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border-2 border-border-blue px-4 py-2 text-base font-medium text-text-header shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-border-blue/20 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleOpenModal(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </div>
      </LightBox>
    </>
  );
};

export default AdminDashboard;
