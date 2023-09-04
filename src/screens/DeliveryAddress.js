import { Header, Loading } from "components";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addDeliveryAddress } from "reduxToolkit/cartSlice";

const DeliveryAddress = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const addressRef = useRef();
  const cityRef = useRef();
  const postalCodeRef = useRef();
  const countryRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartsAddressDelivery = useSelector(
    (state) => state.cartSlice.deliveryAddress
  );
  localStorage.setItem("deliveryAddress", JSON.stringify(cartsAddressDelivery));

  useEffect(() => {
    if (cartsAddressDelivery !== {}) {
      setIsLoading(true);
      setAddress(cartsAddressDelivery?.address);
      setCity(cartsAddressDelivery?.city);
      setPostalCode(cartsAddressDelivery?.postalCode);
      setCountry(cartsAddressDelivery?.country);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, []);

  const handleAddDeliveryAddress = () => {
    if (!address || !city || !postalCode || !country) {
      toast.error("please enter all fields", {
        autoClose: 2000,
      });
    } else {
      setIsLoading(true);
      dispatch(
        addDeliveryAddress({
          address,
          city,
          postalCode,
          country,
        })
      );
      // toast.success("Saved deliveryAddress Successfully", {
      //     autoClose: 1500
      // })
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setTimeout(() => {
        navigate("/paymentMethod");
      }, 1000);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-full">
        <ToastContainer />

        <div
          className="w-c-1/3 medium:w-1/2 sm:w-c-1 shadow-lg backdrop-blur-sm medium:backdrop-blur-none sm:backdrop-blur-none
                rounded-sm px-2 py-4 mt-16 border border-gray-200"
        >
          <form
            className="flex flex-col items-center"
            style={{ minWidth: "100%", width: "100%" }}
          >
            {isLoading && <Loading />}

            <input
              className="py-3 px-4 mb-3 mt-1 bg-slate-200 text-headingColor text-lg 
                    placeholder:text-headingColor placeholder:text-lg
                    placeholder:opacity-70 mx-auto
                    medium:border-none medium:outline-none sm:border-none sm:outline-none"
              required
              name="address"
              type="text"
              placeholder="Enter Address"
              style={{ maxWidth: "90%", width: "90%" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              ref={addressRef}
            />
            <input
              className="py-3 px-4 mb-3 mt-1 bg-slate-200 text-headingColor text-lg 
                    placeholder:text-headingColor placeholder:text-lg
                    placeholder:opacity-70 mx-auto
                    medium:border-none medium:outline-none sm:border-none sm:outline-none"
              required
              name="city"
              type="text"
              placeholder="Enter city"
              style={{ maxWidth: "90%", width: "90%" }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              ref={cityRef}
            />

            <input
              className="py-3 px-4 mb-3 mt-1 bg-slate-200 text-headingColor text-lg 
                    placeholder:text-headingColor placeholder:text-lg
                    placeholder:opacity-70 mx-auto
                    medium:border-none medium:outline-none sm:border-none sm:outline-none"
              required
              name="code"
              type="text"
              placeholder="Enter postal code"
              style={{ maxWidth: "90%", width: "90%" }}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              ref={postalCodeRef}
            />
            <input
              className="py-3 px-4 mb-6 mt-1 bg-slate-200 text-headingColor text-lg 
                    placeholder:text-headingColor placeholder:text-lg
                    placeholder:opacity-70 mx-auto
                    medium:border-none medium:outline-none sm:border-none sm:outline-none"
              required
              name="country"
              type="text"
              placeholder="Enter country"
              style={{ maxWidth: "90%", width: "90%" }}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              ref={countryRef}
            />

            <div
              className="py-4 px-4 mb-6 mt-1 cursor-pointer text-headingColor text-lg 
                        font-semibold opacity-80 hover:opacity-100
                        mx-auto"
              style={{
                maxWidth: "90%",
                width: "90%",
                backgroundColor: "#1cb803",
              }}
            >
              <button
                type="button"
                className="w-full"
                onClick={handleAddDeliveryAddress}
              >
                CONTINUE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeliveryAddress;
