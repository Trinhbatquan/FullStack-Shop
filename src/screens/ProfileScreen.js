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
import { useTranslation } from "react-i18next";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { i18n } = useTranslation();

  const [focusButton, setFocusButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userSlice.user);
  const orders = useSelector((state) => state.orderSlice.ordersByUser);

  console.log(currentUser, orders);

  useEffect(() => {
    profileUser().then((res) => {
      if (res.code === 0) {
        dispatch(profileUserShop(res.profile));
        setName(res.profile?.name);
        setEmail(res.profile?.email);
        setPassword("");
        setConfirmPassword("");
        ordersByUser().then((data) => {
          if (data.code === 0) {
            dispatch(getOrdersByUser(data?.orderData));
            setIsLoading(false);
          }
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error(
        `${
          i18n.language === "en"
            ? "Please enter all field."
            : "Vui lòng nhập tất cả các trường."
        }`,
        {
          autoClose: 3000,
          position: "bottom-right",
          theme: "colored",
        }
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error(
        `${
          i18n.language === "en"
            ? "Password do not match. Please try again"
            : "Mật khẩu không khớp. Vui lòng nhập lại."
        }`,
        {
          autoClose: 3000,
          position: "bottom-right",
          theme: "colored",
        }
      );
      return;
    } else {
      setLoading(true);
      updateProfileUser(name, email, password).then((res) => {
        if (res.code === 0) {
          localStorage.setItem("userShop", JSON.stringify(res.user));
          dispatch(profileUserShop(res.user));
          dispatch(loginUserShop(res.user));
          setPassword("");
          setConfirmPassword("");
          setLoading(false);
          toast.success(
            `${
              i18n.language === "en"
                ? "Update password successfully!"
                : "Cập nhật mật khẩu thành công!"
            }`,
            {
              autoClose: 3000,
              position: "bottom-right",
              theme: "colored",
            }
          );
        } else {
          setLoading(false);
          toast.error(
            `${
              i18n.language === "en"
                ? "Error.Please contact admin!"
                : "Có lỗi. Vui lòng liên hệ quản trị viên!"
            }`,
            {
              autoClose: 3000,
              position: "bottom-right",
              theme: "colored",
            }
          );
        }
      });
    }
  };

  return (
    <>
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>
      <div
        className="w-[90%] sm:w-[94%] mx-auto mt-8 flex items-center justify-between sm:flex-col
        sm:justify-center gap-10 md:flex-col
        md:justify-center pb-6"
      >
        <ToastContainer />
        <div
          className="w-2/5 sm:w-full md:w-full flex flex-col relative bg-white p-3 shadow-xl backdrop-blur-lg border border-gray-200"
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
            className="p-8 sm:p-6 md:p-6 rounded-full absolute left-8 top-20 sm:top-28 bg-primary border border-gray-200
          shadow-md medium:backdrop-blur-none sm:backdrop-blur-none"
          >
            <SiGravatar className="text-5xl sm:text-3xl text-backColor" />
          </div>

          <div className="w-full h-96 mt-4 flex items-center justify-end">
            <div className="float-right">
              <p className="font-semibold text-lg text-black">
                {currentUser?.name}
              </p>
              <p className="text-headingColor mt-1 opacity-80">{`${
                currentUser ? moment(currentUser?.createdAt).format("LL") : ""
              }`}</p>
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
            {i18n.language === "en" ? "Profile Settings" : "Cập nhật tài khoản"}
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
            {i18n.language === "en" ? "Order List" : "Lịch sử đơn hàng"}

            <span className="absolute px-2 py-0 rounded-full text-white bg-red-800 right-2 top-4">
              {orders?.length === 0 ? 0 : orders.length}
            </span>
          </button>
        </div>

        <div className="w-c-55 sm:w-full md:w-full mx-auto">
          {focusButton && (
            <form
              className="w-full flex flex-col items-start justify-center gap-4"
              onSubmit={handleUpdateProfile}
            >
              <div className="flex items-center justify-center w-full">
                <span className="text-lg font-semibold text-gray-900">
                  {i18n.language === "en"
                    ? "Update Pasword"
                    : "Cập nhật mật khẩu"}
                </span>
              </div>
              {isLoading && <Loading />}

              <div class="grid gap-6 mb-6 grid-cols-2 w-full">
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    {i18n.language === "en" ? "Full Name" : "Tên đầy đủ"}
                  </label>
                  <input
                    value={name}
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="last_name"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    value={email}
                    type="text"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="company"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    {i18n.language === "en" ? "Password" : "Mật khẩu"}
                  </label>
                  <input
                    value={password}
                    type="text"
                    id="company"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    {i18n.language === "en"
                      ? "Confirm password"
                      : "Nhập lại mật khẩu"}
                  </label>
                  <input
                    value={confirmPassword}
                    type="tel"
                    id="phone"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center w-full">
                <button
                  type="submit"
                  class="py-2.5 w-full px-5 mr-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                >
                  {i18n.language === "en" ? "Confirm" : "Xác nhận"}
                </button>
              </div>
            </form>
          )}

          {focusButton || <Order />}
        </div>
        {loading && (
          <div className="fixed z-50 top-0 bottom-0 flex items-center justify-center mx-auto left-0 right-0 w-full max-h-full bg-black bg-opacity-25">
            <div className="absolute top-[50%] left-[50%]">
              <Loading />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileScreen;
