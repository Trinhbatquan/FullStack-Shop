import React, { useState, useEffect } from "react";

// import { Banner } from "../assets/img";
import { Header, Order } from "components";
import { getOrdersByUser } from "reduxToolkit/orderSlice";
import { ordersByUser } from "api/index";
import { SiGravatar } from "react-icons/si";
import Loading from "./../components/loadingToast/Loading";
import { profileUser, updateProfileUser } from "api/index";
import { useSelector, useDispatch } from "react-redux";
import { loginUserShop, profileUserShop } from "reduxToolkit/userSlice";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [focusButton, setFocusButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userSlice.profileUser);
  const orders = useSelector((state) => state.orderSlice.ordersByUser);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      profileUser().then((user) => {
        if (user) {
          dispatch(profileUserShop(user));
          setIsLoading(false);
          setName(user?.name);
          setEmail(user?.email);
          setPassword("");
          setConfirmPassword("");
        }
      });
      ordersByUser().then((orders) => {
        dispatch(getOrdersByUser(orders));
      });
      setIsLoading(false);
    }, 500);
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match!", {
        autoClose: 2000,
      });
    } else {
      setIsLoading(true);
      console.log({ name, email, password });
      updateProfileUser(name, email, password).then((user) => {
        localStorage.setItem("userShop", JSON.stringify(user));
        dispatch(profileUserShop(user));
        dispatch(loginUserShop(user));
        setIsLoading(false);
        toast.success("Update User Successfully!", {
          autoClose: 3000,
        });
      });
    }
  };

  return (
    <>
      <Header />
      <div
        className="mx-auto mt-8 flex items-center justify-between sm:flex-col
        sm:justify-center gap-10"
        style={{
          minWidth: "90%",
          width: "90%",
        }}
      >
        <ToastContainer />
        <div
          className="w-2/5 sm:w-full flex flex-col relative bg-white p-3 shadow-xl backdrop-blur-lg border border-gray-200"
          style={{
            minHeight: "450px",
            height: "450px",
          }}
        >
          <div
            className="w-full"
            style={{
              // backgroundImage: `url(${Banner})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "400px",
            }}
          ></div>
          <div
            className="p-8 sm:p-6 rounded-full absolute left-8 top-20 sm:top-28 bg-primary border border-gray-200
          shadow-md backdrop-blur-md medium:backdrop-blur-none sm:backdrop-blur-none"
          >
            <SiGravatar className="text-5xl sm:text-3xl text-backColor" />
          </div>

          <div className="w-full h-96 mt-4 flex items-center justify-end">
            <div className="float-right">
              <p className="font-semibold text-lg text-black">
                {currentUser?.name}
              </p>
              <p className="text-headingColor mt-1 opacity-80">{`${moment(
                currentUser?.createdAt
              ).format("LL")}`}</p>
            </div>
          </div>

          <button
            className={`px-3 py-4 w-full outline-none border border-gray-200 text-left 
          text-lg font-semibold text-headingColor ${
            focusButton && "bg-slate-100"
          } mb-3`}
            type="button"
            name="setting"
            onClick={() => setFocusButton(true)}
          >
            Profile Settings
          </button>

          <button
            className={`px-3 py-4 w-full outline-none border border-gray-200 text-left 
          text-lg font-semibold text-headingColor ${
            focusButton || "bg-slate-100"
          } relative`}
            type="button"
            name="orderList"
            onClick={() => setFocusButton(false)}
          >
            Order List
            <span className="absolute px-2 py-0 rounded-full text-white bg-red-800 right-2 top-4">
              {orders?.length === 0 ? 0 : orders.length}
            </span>
          </button>
        </div>

        <div className="w-c-55 sm:w-full mx-auto">
          {focusButton && (
            <form
              className="w-full mx-auto medium:pt-6"
              onSubmit={handleUpdateProfile}
            >
              {isLoading && <Loading />}
              <div
                className="flex items-center justify-between px-4 py-2 mt-2 mb-6
                medium:flex-col medium:justify-center medium:gap-6
                sm:flex-col sm:justify-center sm:gap-6"
              >
                <div className="flex flex-col justify-center items-start flex-1 medium:w-full sm:w-full">
                  <label className="mb-2 text-sm text-headingColor opacity-80">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={name}
                    className="w-c-85 medium:w-c-1 sm:w-full px-2 py-3 border
                    border-gray-300 rounded-md bg-slate-100 text-lg font-semibold"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col justify-center items-start flex-1 medium:w-full sm:w-full">
                  <label className="mb-2 text-sm text-headingColor opacity-80">
                    E-MAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className="w-c-85 medium:w-c-1 sm:w-full px-2 py-3 border
                    border-gray-300 rounded-md bg-slate-100 text-lg font-semibold"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div
                className="flex items-center justify-between px-4 py-2 mb-6
              medium:flex-col medium:justify-center medium:gap-6
              sm:flex-col sm:justify-center sm:gap-6"
              >
                <div className="flex flex-col justify-center items-start flex-1 medium:w-full sm:w-full">
                  <label className="mb-2 text-sm text-headingColor opacity-80">
                    NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    className="w-c-85 medium:w-c-1 sm:w-full px-2 py-3 border
                    border-gray-300 rounded-md bg-slate-100 text-lg font-semibold"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col justify-center items-start flex-1 medium:w-full sm:w-full">
                  <label className="mb-2 text-sm text-headingColor opacity-80">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    className="w-c-85 medium:w-c-1 sm:w-full px-2 py-3 border
                    border-gray-300 rounded-md bg-slate-100 text-lg font-semibold"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div
                className="flex items-center justify-center  py-2 mb-6
               medium:mr-3 sm:w-full"
              >
                <input
                  type="submit"
                  name="submit"
                  value="UPDATE PROFILE"
                  className="w-1/2 medium:w-c-85 sm:w-c-1 py-4 px-4 rounded-md cursor-pointer text-headingColor text-lg 
                        font-semibold opacity-80 hover:opacity-100
                        mx-auto bg-backColor"
                />
              </div>
            </form>
          )}

          {focusButton || <Order />}
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
