import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoMdOpen } from "react-icons/io";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import OrderModal from "./OrderModal";
import { useQuery } from "@apollo/client";
import { ALL_ORDERS } from "../../queries/orderQuery";

const OrderPageLayout = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(ALL_ORDERS);
  const [tabState, setTabState] = useState(1);
  const [modal, setModal] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [dateObj, setDateObj] = useState({
    from: "",
    to: "",
  });

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 7;
  const currentItems = orderList?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orderList?.length / 7);

  useEffect(() => {
    setOrderList(data?.orders);
  }, [data]);

  const handleOpenModal = () => {
    setModal(!modal);
  };

  const handleTab = (idx) => {
    setTabState(idx);
    if (idx === 1) {
      setOrderList(data.orders);
    } else if (idx === 2) {
      setOrderList(
        data.orders.filter((order) => order.status.toLowerCase() === "packed")
      );
    } else if (idx === 3) {
      setOrderList(
        data.orders.filter((order) => order.status.toLowerCase() === "shipped")
      );
    } else if (idx === 4) {
      setOrderList(
        data.orders.filter(
          (order) => order.status.toLowerCase() === "delivered"
        )
      );
    }
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 7) % orderList.length;
    setItemOffset(newOffset);
  };

  const handleViewOrder = (idx) => {
    navigate(`/admin/order/${idx}`);
  };

  const handleDate = (e) => {
    setDateObj({
      ...dateObj,
      [e.target.name]: new Date(e.target.value).getTime(),
    });
  };

  return (
    <div>
      <h1 className="sm:text-xl text-lg">Order History</h1>

      <div className="mt-6 mb-4 flex flex-col-reverse gap-4 sm:gap-0 sm:flex-row justify-between sm:align-middle sm:items-center">
        <div className="flex sm:gap-6 gap-3 sm:text-base text-sm">
          <h4
            className={`${
              tabState === 1 && "text-border-blue border-b-2 border-border-blue"
            } cursor-pointer`}
            onClick={() => handleTab(1)}
          >
            All
          </h4>

          <h4
            className={`${
              tabState === 2 && "text-border-blue border-b-2 border-border-blue"
            } cursor-pointer`}
            onClick={() => handleTab(2)}
          >
            Packed
          </h4>

          <h4
            className={`${
              tabState === 3 && "text-border-blue border-b-2 border-border-blue"
            } cursor-pointer`}
            onClick={() => handleTab(3)}
          >
            Shipped
          </h4>

          <h4
            className={`${
              tabState === 4 && "text-border-blue border-b-2 border-border-blue"
            } cursor-pointer`}
            onClick={() => handleTab(4)}
          >
            Delivered
          </h4>
        </div>

        <div className="flex gap-6 items-center text-sm sm:text-base">
          <input
            type="date"
            name="from"
            id="from"
            className="px-3 py-1 border border-border-blue rounded shadow text-xs sm:text-base"
            onChange={handleDate}
          />
          <p>to</p>
          <input
            type="date"
            name="to"
            id="to"
            className="px-3 py-1 border border-border-blue rounded shadow text-xs sm:text-base"
            onChange={handleDate}
          />
        </div>
      </div>

      <div className="relative pb-16 rounded-lg shadow-md bg-white">
        <div className="rounded-lg bg-white px-6 py-3 overflow-x-auto relative">
          <table className="w-full rounded-lg bg-white min-w-[50rem]">
            <thead className="text-text-header rounded-t-lg border-b border-text-para/40">
              <tr className="rounded-t-lg">
                <th className="py-2 sm:py-3 pl-2 sm:pl-3 text-sm font-light text-left text-text-para">
                  Product ID
                </th>
                <th className="py-2 sm:py-3 text-sm font-light text-left text-text-para">
                  Customer name
                </th>
                <th className="py-2 sm:py-3 text-sm font-light text-text-para text-center">
                  No of items
                </th>
                <th className="py-2 sm:py-3 text-sm font-light text-left text-text-para">
                  Date placed
                </th>
                <th className="py-2 sm:py-3 text-sm font-light text-left text-text-para">
                  Status
                </th>
                <th className="py-2 sm:py-3 text-sm font-light text-left text-text-para">
                  Amount
                </th>
                <th className="py-2 sm:py-3 text-sm font-light text-left text-text-para">
                  Update
                </th>
              </tr>
            </thead>

            {data && (
              <tbody className="w-full relative">
                {currentItems
                  ? currentItems.map((order, index) => (
                      <tr
                        className={`text-font-blue rounded ${
                          index % 2 !== 0 ? "bg-bs-light/80" : ""
                        }`}
                        key={order._id + index}
                      >
                        <td className="py-4 sm:py-5 pl-2 sm:pl-3">
                          <p
                            className="text-xs flex gap-4 cursor-pointer items-center"
                            onClick={() => handleViewOrder(order._id)}
                          >
                            <IoMdOpen className="text-lg text-border-blue" />
                            {order.transactionId}
                          </p>
                        </td>

                        <td className="py-4 sm:py-5">
                          <div className="rounded-sm text-sm sm:text-base">{order.email}</div>
                        </td>

                        <td>
                          <p className="text-center text-sm sm:text-base">
                            {order.products.reduce(
                              (acc, curr) => acc + parseInt(curr.count),
                              0
                            )}
                          </p>
                        </td>

                        <td>
                          <p className="sm:text-sm text-xs">
                            {new Date(
                              parseInt(order.createdAt)
                            ).toLocaleDateString()}
                          </p>
                        </td>

                        <td>
                          <p
                            className={`text-sm ${
                              order.orderStatus.status.toLowerCase() ===
                              "shipped"
                                ? "text-[#E3D219]"
                                : order.orderStatus.status.toLowerCase() ===
                                  "packed"
                                ? "text-[#4380dc]"
                                : order.orderStatus.status.toLowerCase() ===
                                  "delivered"
                                ? "text-[#22cd12]"
                                : "text-black"
                            }`}
                          >
                            {order.orderStatus.status}
                          </p>
                        </td>

                        <td>
                          <div className="flex items-center align-middle text-sm sm:text-base">
                            {`#${order.products.reduce(
                              (acc, curr) => acc + parseInt(curr.price),
                              0
                            )}`}
                          </div>
                        </td>

                        <td>
                          <div
                            className="flex items-center align-middle cursor-pointer"
                            onClick={() => handleOpenModal(true, order._id)}
                          >
                            <FiEdit color="#0B90E2" />
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            )}
          </table>
        </div>

        {loading && (
          <div
            role="status"
            className="animate-pulse flex content-between place-content-between align-middle flex-col px-6"
          >
            <div className="h-14 bg-skeleton mt-12" />
            <div className="h-14 bg-skeleton my-14" />
            <div className="h-14 bg-skeleton" />
            <div className="h-14 bg-skeleton my-14" />
          </div>
        )}

        <div
          className="absolute bottom-0 w-full left-0 flex items-center align-middle justify-between text-xs sm:text-sm gap-10 h-16 px-3 sm:px-6 bg-blue-light"
          style={{ borderTop: "1px solid rgba(51, 125, 239, 0.2)" }}
        >
          <p className="opacity-30 text-xs">
            Showing deliverables from {itemOffset} to{" "}
            {endOffset > currentItems?.length
              ? currentItems?.length
              : endOffset}{" "}
            out of {orderList?.length}
          </p>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => handlePageClick(e)}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="<"
            previousClassName="border border-black/5 bg-white shadow self-center flex justify-center align-middle mx-2 py-1 px-3 rounded"
            previousLinkClassName="text-xs text-blue"
            nextClassName="border border-black/5 bg-white shadow self-center flex justify-center align-middle mx-2 py-1 px-3 rounded"
            disabledClassName="border-gray-400"
            disabledLinkClassName="text-gray-400"
            nextLinkClassName="text-xs text-blue"
            containerClassName="flex"
            pageClassName="text-gray-400 mx-2 text-xs sm:text-sm"
            activeClassName="text-blue"
            activeLinkClassName="text-blue"
          />
        </div>
      </div>

      <OrderModal handleOpenModal={handleOpenModal} modal={modal} />
    </div>
  );
};

export default OrderPageLayout;
