import { ordersByUser } from "api/index";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersByUser } from "reduxToolkit/orderSlice";
import Loading from "components/loadingToast/Loading";
import { NavLink } from "react-router-dom";
import moment from "moment";

const Order = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orderSlice.ordersByUser);

  useEffect(() => {
    ordersByUser().then((orders) => {
      dispatch(getOrdersByUser(orders));
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col w-full mx-auto">
      <div className="w-full flex items-center sm:justify-evenly mb-3">
        <p className="w-c-1/3 medium:w-c-70 sm:w-c-3/5 font-semibold sm:text-lg">
          ID
        </p>
        <div
          className="medium:hidden sm:hidden font-semibold sm:text-lg flex items-center justify-evenly"
          style={{ minWidth: "50%", width: "50%" }}
        >
          <p className="font-semibold sm:text-lg">STATUS</p>
        </div>
        <p
          className="font-semibold sm:text-lg pl-6 sm:pl-4"
          style={{ minWidth: "10%", width: "10%" }}
        >
          TOTAL
        </p>
      </div>

      <div className="bg-slate-300 flex flex-col py-3 medium:pr-4 sm:pr-4">
        {loading && <Loading />}

        {!orders ? (
          <div className="flex flex-col items-center">
            <span className="sm:text-lg text-headingColor font-semibold mb-4">
              Don't have order.
            </span>
            <NavLink
              to="/"
              className=" w-1/2 medium:w-c-70 sm:w-c-1 bg-textColor text-white h-14
              text-center cursor-pointer sm:text-lg hover:opacity-90 flex items-center 
              rounded-md shadow-lg backdrop-blur-sm justify-center"
            >
              Go Shopping
            </NavLink>
          </div>
        ) : (
          orders.map((order, index) => {
            return (
              <>
                <div
                  key={index}
                  className="w-full flex items-center justify-between mb-2 px-2 py-2 mx-auto"
                >
                  <div
                    className="flex items-center justify-between w-4/5 
                  medium:flex-col medium:justify-center medium:gap-4
                  sm:flex-col sm:justify-center sm:gap-4"
                  >
                    <NavLink
                      className="text-blue-800 w-3/5 medium:w-full sm:w-full"
                      to={`/order/${order?._id}?redirect=/order`}
                    >
                      <p className="sm:text-md">{order?._id}</p>
                    </NavLink>
                    <div className="sm:text-md flex items-center justify-start gap-4 flex-1 medium:w-full medium:gap-0 sm:w-full sm:gap-0">
                      <p className="sm:text-md mr-8 w-c-1/3 sm:w-auto">
                        {order?.isPaid ? "Paid" : "Not Paid"}
                      </p>
                      <p className="sm:text-md w-c-3/5 sm:w-auto">
                        {order?.isPaid
                          ? `${moment(order?.paidAt).calendar()}`
                          : `${moment(order?.createdAt).calendar()}`}
                      </p>
                    </div>
                  </div>
                  <p
                    className="sm:text-md"
                    style={{ minWidth: "15%", width: "15%" }}
                  >
                    {order?.totalPrice}
                  </p>
                </div>
                <hr />
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Order;
