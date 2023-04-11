import { ordersByUser } from "api/index";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersByUser } from "reduxToolkit/orderSlice";
import Loading from "components/loadingToast/Loading";
import { NavLink } from "react-router-dom";
import moment from 'moment'

const Order = () => {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const orders = useSelector((state) => state.orderSlice.ordersByUser)


  useEffect(() => {
    ordersByUser().then((orders) => {
      dispatch(getOrdersByUser(orders))
      setLoading(false)
    })

  }, [])


  return (
    <div className="flex flex-col w-full mx-auto">
      <div className="w-full flex items-center mb-3">
        <p
          className="font-semibold text-xl"
          style={{ minWidth: "30%", width: "30%" }}
        >
          ID
        </p>
        <div
          className="font-semibold text-xl flex items-center justify-evenly"
          style={{ minWidth: "50%", width: "50%" }}
        >
          <p className="font-semibold text-xl">STATUS</p>
        </div>
        <p
          className="font-semibold text-xl"
          style={{ minWidth: "15%", width: "15%" }}
        >
          TOTAL
        </p>
      </div>

      <div className="bg-slate-300 flex flex-col py-3">
      {
        loading && <Loading />
      }

      {
        !orders ? (
          <div className="flex flex-col items-center">
            <span className="text-xl text-headingColor font-semibold mb-4">
              Don't have order.
            </span>
            <NavLink
              to="/"
              style={{ minWidth: "50%", width: "50%" }}
              className=" bg-textColor text-white h-14
              text-center cursor-pointer text-xl hover:opacity-90 flex items-center 
              rounded-md shadow-lg backdrop-blur-sm justify-center"
            >
              Go Shopping
            </NavLink>
          </div>
        ) : (
          orders.map((order, index) => {
            return <>
                <div key={index} className="w-full flex items-center mb-2 px-2 py-2 mx-auto">
                  <NavLink className="text-blue-800" to={`/order/${order?._id}?redirect=/order`}
                      style={{ minWidth: "30%", width: "30%" }}
                  >
                    <p
                      className="text-lg"
                    >
                      {order?._id}
                    </p>
                  </NavLink>
                  <div
                    className="text-lg flex items-center justify-center text-center"
                    style={{ minWidth: "50%", width: "50%" }}
                  >
                    <p className="text-lg mr-8">{order?.isPaid ? "Paid" : "Not Paid"}</p>
                    <p className="text-lg">{order?.isPaid ? `${moment(order?.paidAt).calendar()}` : `${moment(order?.createdAt).calendar()}`}</p>
                  </div>
                  <p
                    className="text-lg"
                    style={{ minWidth: "15%", width: "15%" }}
                  >
                    {order?.totalPrice}
                  </p>
                </div>
                <hr />
            </>
          })
         
        )
      }





       

      </div>
    </div>
  );
};

export default Order;
