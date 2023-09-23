import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { BsFacebook, BsSearch } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  AiFillInstagram,
  AiFillYoutube,
  AiFillGithub,
  AiFillEdit,
  AiFillUnlock,
  AiOutlineBell,
  AiFillShopping,
  AiFillHome,
} from "react-icons/ai";
import { BsXLg } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { FaShopify } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { loginUserShop } from "reduxToolkit/userSlice";
import { getProductsBySearch } from "reduxToolkit/productSlice";
import { AiOutlineHeart } from "react-icons/ai";

// import "../Responsive.css";
import { FaUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { getAllNotification, getFavoriteByUser } from "api";
import { getAllFavorites } from "reduxToolkit/favoriteSlice";
import { saveTotalNotification } from "reduxToolkit/notificationSlice";
import { setValueSearchRedux } from "reduxToolkit/searchProductSlice";

const Header = () => {
  const cartProduct = useSelector((state) => state.cartSlice.carts);
  const user = useSelector((state) => state.userSlice.user);
  const favoriteRedux = useSelector(
    (state) => state.favoriteReducer.favoriteProducts
  );
  const readNotifications = useSelector(
    (state) => state.notificationReducer.readNotification
  );
  const totalNotifications = useSelector(
    (state) => state.notificationReducer.totalNotification
  );
  // console.log(readNotifications, totalNotifications);
  const dispatch = useDispatch();

  const location = useLocation().pathname;
  console.log(location);
  const paramNavigate = location.split("/")[1];
  console.log(paramNavigate);
  const navigate = useNavigate();
  const dataListSearchEn = [
    "shirt",
    "pant",
    "clock",
    "jewelry",
    "glasses",
    "shoe",
  ];
  const dataListSearchVn = [
    "áo",
    "quần",
    "đồng hồ",
    "trang sức",
    "kính mắt",
    "giày",
  ];

  const [input, setInput] = useState("");

  const [isProfile, setIsProfile] = useState(false);

  const [showTranslate, setShowTranslate] = useState(false);

  const [isShowLoginRegister, setIsShowLoginRegister] = useState(false);

  const [showNavbarMobile, setShowNavbarMobile] = useState(false);

  const [inputSearch, setInputSearch] = useState(false);

  const [searchMobile, setSearchMobile] = useState(false);

  //i18n
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (user && user?.name) {
      getFavoriteByUser().then((res) => {
        if (res?.code === 0) {
          dispatch(getAllFavorites(res?.favoriteArr));
        }
      });
      getAllNotification().then((res) => {
        if (res?.code === 0) {
          dispatch(saveTotalNotification(res?.notification?.length));
        }
      });
    }
  }, []);
  const handleProfile = () => {
    setIsProfile(!isProfile);
  };

  const handleShowLoginRegister = () => {
    setIsShowLoginRegister(!isShowLoginRegister);
  };

  const handleShowMobile = () => {
    setShowNavbarMobile(!showNavbarMobile);
  };

  const handleSearch = (e) => {
    dispatch(setValueSearchRedux(e.target.value.toLowerCase()));
    navigate(`/search?type=${e.target.value}`);
  };

  const handleEnterEvent = (e) => {
    console.log(e);
    if (e.keyCode === 13) {
      handleSearch(e);
    }
  };

  const handleLogOut = () => {
    dispatch(loginUserShop(null));
    localStorage.setItem("userShop", null);
  };

  const handleShowTranslate = () => {
    setShowTranslate(!showTranslate);
  };

  const handleFavoriteProductList = () => {
    if (user && user?.name) {
      navigate("/favorite");
    } else {
      navigate(`/login?redirect=/favoriteProductList`);
    }
  };

  const handleNotificationProductList = () => {
    if (user && user?.name) {
      navigate("/notification");
    } else {
      navigate(`/login?redirect=/notification`);
    }
  };

  const showSearchMobile = () => {
    setSearchMobile(!searchMobile);
  };

  return (
    <div className="w-full cursor-pointer flex flex-col fixed top-0 left-0 right-0 z-50">
      <div
        className="w-full px-[5%] lg:px-[3%] sm:px-[2%] cursor-pointer flex items-center justify-around py-3  sm:justify-start relative bg-headerColor xl:shadow-sm"
        style={{
          maxHeight: "65px",
          minHeight: "65px",
          border: "1px solid #dee5e8",
        }}
      >
        <div
          className="w-full h-full cursor-pointer flex items-center sm:justify-end y-6 px-3 lg:px-0 relative"
          style={{
            maxHeight: "65px",
            minHeight: "65px",
          }}
        >
          <Link
            to="/"
            className="absolute top-[10%] left-[41%] hidden sm:block"
          >
            <FaShopify className="text-5xl md:text-4xl sm:text-5xl cursor-pointer text-slate-400" />
          </Link>
          <div
            className="xl:flex-1 lg:flex-1 sm:hidden h-full cursor-pointer flex items-center justify-start sm:justify-center lg:justify-start lg:gap-10 py-6  px-3 lg:px-0"
            style={{
              maxHeight: "65px",
              minHeight: "65px",
            }}
          >
            <div
              className="xl:w-1/5 md:ml-5 sm:flex-1 sm:ml-3 h-full flex items-center justify-start sm:justify-center"
              style={{
                maxHeight: "65px",
                minHeight: "65px",
              }}
            >
              <Link to="/">
                <FaShopify className="text-5xl md:text-4xl sm:text-5xl cursor-pointer text-slate-400" />
              </Link>
            </div>
            <div
              className="xl:w-4/5 md:hidden h-full sm:hidden flex items-center justify-start lg:justify-end gap-10"
              style={{
                maxHeight: "65px",
                minHeight: "65px",
              }}
            >
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "4px solid red" : "",
                  height: "65px",
                  display: "flex",
                  alignItems: "center",
                })}
              >
                <p>{t("header.product")}</p>
              </NavLink>
              <NavLink
                to="/inform"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "4px solid red" : "",
                  height: "65px",
                  display: "flex",
                  alignItems: "center",
                })}
              >
                <p>{t("header.inform")}</p>
              </NavLink>
              <NavLink
                to="/connect"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "4px solid red" : "",
                  height: "65px",
                  display: "flex",
                  alignItems: "center",
                })}
              >
                <p>{t("header.contact&support")}</p>
              </NavLink>
            </div>
          </div>
          <div className="xl:flex-1 lg:flex-1 md:flex-1 sm:pl-1 cursor-pointer flex items-center justify-end sm:justify-end py-6 gap-6">
            <div
              className={`sm:hidden rounded-3xl relative w-1/2 flex items-center justify-start ${
                inputSearch
                  ? "bg-white duration-200 transition-all"
                  : "bg-gray-200 duration-200 transition-all"
              }`}
            >
              <CiSearch className="h-8 w-8 pl-2 sm:hidden" />
              <input
                list="browsers"
                onFocus={() => setInputSearch(true)}
                onBlur={() => setInputSearch(false)}
                type="text"
                value={input}
                autoComplete="on"
                placeholder={t("header.search")}
                className={`flex-1 sm:w-full sm:px-2 rounded-3xl py-2 pl-1 pr-2 placeholder:text-sm sm:placeholder:n text-black outline-none
              text-sm sm:text-xs ${
                inputSearch
                  ? "bg-white duration-200 transition-all"
                  : "bg-gray-200 duration-200 transition-all"
              }`}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={(e) => handleEnterEvent(e)}
              />
              <datalist id="browsers">
                {i18n.language === "en"
                  ? dataListSearchEn.map((item, index) => {
                      return <option key={index} value={item} />;
                    })
                  : dataListSearchVn.map((item, index) => {
                      return <option key={index} value={item} />;
                    })}
              </datalist>

              {/* <BsSearch
                className="sm:hidden absolute font-semibold text-2xl top-3 right-6 cursor-pointer text-headingColor"
                onClick={handleSearch}
              /> */}
            </div>
            <div className="ml-6 flex items-center justify-between sm:justify-end sm:ml-0 relative flex-1 gap-4  sm:gap-2">
              <div
                className="cursor-pointer flex items-center justify-center gap-1 relative"
                onClick={handleShowTranslate}
                // style={{ minWidth: "90px" }}
              >
                <span className="cursor-pointer text-gray-600 block sm:text-sm">
                  {i18n.language === "en" ? "EN" : "VN"}
                </span>
                <BsChevronDown className="text-sm" />
                {/* <AnimatePresence> */}
                {showTranslate && (
                  <ul
                    // initial={{ opacity: 0, translateY: -50 }}
                    // animate={{ opacity: 1, translateY: 0 }}
                    // exit={{ opacity: 0, translateY: -50 }}
                    // transition={{ duration: 0.5, delay: 0.1 }}
                    className="absolute -right-2 top-8 bg-white w-32 sm:w-28 shadow-sm rounded-md z-20"
                  >
                    <li
                      className={`px-0.5 transition-all sm:text-sm duration-500 py-2 text-center hover:text-blue-700 border-b border-gray-200 ${
                        i18n.language === "en"
                          ? "text-blue-700"
                          : "text-headingColor"
                      } `}
                      onClick={() => i18n.changeLanguage("en")}
                    >
                      {t("header.english")}
                    </li>
                    <li
                      className={`px-0.5 transition-all sm:text-sm duration-500 py-2 text-center hover:text-blue-700 ${
                        i18n.language === "en"
                          ? "text-headingColor"
                          : "text-blue-700"
                      }`}
                      onClick={() => i18n.changeLanguage("vi")}
                    >
                      {t("header.vietnamese")}
                    </li>
                  </ul>
                )}
                {/* </AnimatePresence> */}
              </div>
              <div
                className="flex items-center sm:hidden justify-center gap-0.5 cursor-pointer"
                onClick={handleNotificationProductList}
              >
                <AiOutlineBell className="h-8 w-6 cursor-pointer text-gray-600" />
                {totalNotifications &&
                totalNotifications - readNotifications?.length ? (
                  <span
                    style={{
                      fontSize: "14px",
                      position: "relative",
                      top: "5px",
                      opacity: 0.6,
                    }}
                  >{`(${
                    totalNotifications - readNotifications?.length
                  })`}</span>
                ) : (
                  ""
                )}
              </div>
              <div
                className="flex sm:hidden items-center justify-center gap-0.5 cursor-pointer"
                onClick={handleFavoriteProductList}
              >
                <AiOutlineHeart className="h-8 w-6 cursor-pointer text-gray-600" />
                {favoriteRedux?.length > 0 && (
                  <span
                    style={{
                      fontSize: "14px",
                      position: "relative",
                      top: "5px",
                      opacity: 0.6,
                    }}
                  >{`(${favoriteRedux.length})`}</span>
                )}
              </div>

              <NavLink to="/cart" className=" cursor-pointer relative">
                <AiFillShopping className="h-8 w-6 cursor-pointer text-gray-600" />
                <span
                  className=" li rounded-full bg-red-700 text-white absolute -top-3 -right-2 w-5 h-5 
                  text-center sm:w-4 sm:h-4 sm:text-xs sm:-top-2 sm:-right-1"
                >
                  {cartProduct.length}
                </span>
              </NavLink>

              {user?.name ? (
                <>
                  <div
                    className="xl:block medium:block sm:hidden relative flex items-center justify-center gap-1"
                    onClick={handleProfile}
                  >
                    <FaUserCircle className="avatar relative w-7 h-7 text-gray-400 cursor-pointer" />
                    <AnimatePresence>
                      {isProfile && (
                        <motion.div
                          initial={{ opacity: 0, translateY: -50 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          exit={{ opacity: 0, translateY: -50 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="avatar-modal absolute top-9 right-0 z-50 rounded-lg  w-fit bg-white"
                          style={{ boxShadow: "0 4px 20px rgba(0,0,0,.25)" }}
                        >
                          <div className="text-xs text-headingColor">
                            <div className="h-full w-full flex items-center justify-center cursor-text pr-3">
                              <div
                                className="relative flex items-center justify-center"
                                style={{
                                  width: "80px",
                                  minWidth: "80px",
                                  height: "65px",
                                  minHeight: "65px",
                                }}
                              >
                                <div
                                  className="flex items-center justify-center rounded-full bg-blue-700 text-white
                          absolute top-0 right-0 bottom-0 left-0 w-full h-full m-auto"
                                  style={{ width: "35px", height: "35px" }}
                                >
                                  <span
                                    className=""
                                    style={{ fontSize: "30px" }}
                                  >
                                    {user?.name?.slice(0, 1)}
                                  </span>
                                </div>
                              </div>
                              <div className="h-full flex flex-col items-start gap-1">
                                <span className="font-semibold text-lg">
                                  {user?.name}
                                </span>
                                <span className="text-md">
                                  {" "}
                                  {user?.email
                                    ? user.email
                                    : "expamle@gamil.com"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ul className="py-1 text-headingColor border-t border-b border-gray-200">
                            <NavLink to="/profile">
                              <div className="flex transition-all duration-500 items-center gap-2 px-4 py-2 hover:text-blue-700">
                                <AiFillEdit />{" "}
                                <span className="text-md">
                                  {t("header.account")}
                                </span>
                              </div>
                            </NavLink>
                          </ul>
                          <div className="py-1">
                            <div
                              className="flex transition-all duration-500 items-center gap-2 px-4 py-2  hover:text-blue-700 text-headingColor"
                              onClick={() => handleLogOut()}
                            >
                              <BiLogOutCircle />{" "}
                              <span className="text-md">
                                {t("header.logOut")}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="sm:hidden relative"
                    onClick={handleShowLoginRegister}
                  >
                    <FaUserCircle className="avatar relative w-7 h-7 text-gray-400 cursor-pointer" />
                    <AnimatePresence>
                      {isShowLoginRegister && (
                        <motion.div
                          initial={{ opacity: 0, translateY: -50 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          exit={{ opacity: 0, translateY: -50 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="avatar-modal absolute top-9 right-0 z-50 rounded-lg  w-git bg-white"
                          style={{ boxShadow: "0 4px 20px rgba(0,0,0,.25)" }}
                        >
                          <div className="text-xs text-headingColor">
                            <div className="h-full w-full flex items-center justify-center cursor-text pr-3">
                              <div
                                className="relative flex items-center justify-center"
                                style={{
                                  width: "80px",
                                  minWidth: "80px",
                                  height: "65px",
                                  minHeight: "65px",
                                }}
                              >
                                <div
                                  className="flex items-center justify-center rounded-full bg-blue-700 text-white
                          absolute top-0 right-0 bottom-0 left-0 w-full h-full m-auto"
                                  style={{ width: "35px", height: "35px" }}
                                >
                                  <span
                                    className=""
                                    style={{ fontSize: "30px" }}
                                  >
                                    {/* {user?.name?.slice(0, 1)} */}
                                  </span>
                                </div>
                              </div>
                              <div className="h-full mx-auto">
                                <span className="font-semibold text-lg">
                                  Nothing
                                </span>
                                <span className="text-md">
                                  {" "}
                                  {user?.email
                                    ? user.email
                                    : "expamle@gmail.com"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ul className="py-1 text-headingColor border-t border-b border-gray-200">
                            <NavLink to="/register">
                              <div className="flex items-center gap-2 px-4 py-2 hover:text-blue-700">
                                <BiLogOutCircle />
                                <span className="text-md">
                                  {" "}
                                  {t("header.signUp")}
                                </span>
                              </div>
                            </NavLink>
                          </ul>
                          <NavLink to="/login" className="py-1">
                            <div className="flex items-center gap-2 px-4 py-2  hover:text-blue-700 text-headingColor">
                              <BiLogOutCircle />{" "}
                              <span className="text-md">
                                {" "}
                                {t("header.logIn")}
                              </span>
                            </div>
                          </NavLink>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <FaBars
          className="xl:hidden lg:hidden md:block text-2xl text-gray-500 opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer 
        absolute top-1/3 md:left-8 sm:left-2"
          onClick={() => handleShowMobile()}
        />

        <CiSearch
          className="xl:hidden lg:hidden md:hidden sm:block text-2xl text-gray-500 opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer 
        absolute top-1/3 md:left-8 sm:left-10"
          onClick={showSearchMobile}
        />

        <AnimatePresence>
          {searchMobile && (
            <motion.div
              className="hidden sm:block absolute top-full left-0 right-0 z-10"
              initial={{ opacity: 0, translateY: "-100%" }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: "-100%" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input
                list="browsers"
                onFocus={() => setInputSearch(true)}
                onBlur={() => setInputSearch(false)}
                type="text"
                value={input}
                autoComplete="on"
                placeholder={t("header.search")}
                className={`flex-1 sm:w-full sm:px-2  py-3 pl-1 pr-2 placeholder:text-sm  text-black outline-none
               sm:text-xs ${
                 inputSearch
                   ? "bg-white duration-200 transition-all"
                   : "bg-gray-200 duration-200 transition-all"
               }`}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={(e) => handleEnterEvent(e)}
              />
              <datalist id="browsers">
                {i18n.language === "en"
                  ? dataListSearchEn.map((item, index) => {
                      return <option key={index} value={item} />;
                    })
                  : dataListSearchVn.map((item, index) => {
                      return <option key={index} value={item} />;
                    })}
              </datalist>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showNavbarMobile && (
            <motion.div
              initial={{ opacity: 0, translateX: "-100%" }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: "-100%" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full xl:hidden lg:hidden md:block sm:block
                absolute top-0 left-0 right-0 bottom-0 sm:z-10 flex flex-col items-start cursor-text justify-start h-[100vh] px-2 py-4"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <BsXLg
                className="absolute top-2 right-2 text-2xl  cursor-pointer"
                onClick={() => handleShowMobile()}
              />
              <div
                className="text-blue-600 px-2 py-3"
                style={{ borderBottom: "1px solid #ebebeb" }}
              >
                <AiFillHome
                  className="h-6 w-6 p-1 rounded-full bg-gray-300 cursor-pointer"
                  onClick={() => {
                    handleShowMobile();
                    navigate("/");
                  }}
                />
              </div>
              <div
                className={`text-headingColor px-2 py-3 hover:text-blue-600 cursor-pointer ${
                  paramNavigate === "inform" ? "text-blue-600" : ""
                }`}
                style={{ borderBottom: "1px solid #ebebeb" }}
                onClick={() => {
                  handleShowMobile();
                  navigate("/inform");
                }}
              >
                {t("header.inform")}
              </div>
              <div
                className={`text-headingColor px-2 py-3 hover:text-blue-600 cursor-pointer ${
                  paramNavigate === "connect" ? "text-blue-600" : ""
                }`}
                style={{ borderBottom: "1px solid #ebebeb" }}
                onClick={() => {
                  handleShowMobile();
                  navigate("/connect");
                }}
              >
                <p>{t("header.contact&support")}</p>
              </div>
              <div
                className={`hidden sm:flex items-center justify-between
                text-headingColor px-2 py-3 hover:text-blue-600 cursor-pointer ${
                  paramNavigate === "notification" ? "text-blue-600" : ""
                }`}
                style={{ borderBottom: "1px solid #ebebeb" }}
                onClick={handleNotificationProductList}
              >
                <span>
                  {i18n.language === "en" ? "Notification" : "Thông báo"}
                </span>
                {totalNotifications &&
                totalNotifications - readNotifications?.length ? (
                  <span
                    style={{
                      fontSize: "14px",
                      // position: "relative",
                      // top: "5px",
                      opacity: 0.6,
                    }}
                  >{`(${
                    totalNotifications - readNotifications?.length
                  })`}</span>
                ) : (
                  ""
                )}
              </div>
              <div
                className={`hidden sm:flex items-center justify-between
                text-headingColor px-2 py-3 hover:text-blue-600 cursor-pointer ${
                  paramNavigate === "favorite" ? "text-blue-600" : ""
                }`}
                style={{ borderBottom: "1px solid #ebebeb" }}
                onClick={handleFavoriteProductList}
              >
                <span>{i18n.language === "en" ? "Favorite" : "Yêu thích"}</span>
                {favoriteRedux?.length > 0 && (
                  <span
                    style={{
                      fontSize: "14px",
                      // position: "relative",
                      // top: "5px",
                      opacity: 0.6,
                    }}
                  >{`(${favoriteRedux.length})`}</span>
                )}
              </div>

              <div
                className={`hidden sm:block text-headingColor px-2 py-3 hover:text-blue-600 cursor-pointer`}
                style={{ borderBottom: "1px solid #ebebeb" }}
              >
                {user?.name ? (
                  <div className="w-full flex items-center justify-between">
                    <button
                      class="px-5 py-1.5 flex transition-all ease-in duration-150 items-center justify-center overflow-hidden text-sm font-semibold border border-blue-500 text-white  rounded-md bg-blue-500 hover:text-blue-500 hover:bg-white"
                      onClick={() => navigate(`/profile`)}
                    >
                      <span class="">
                        {i18n.language === "en" ? "Profile" : "Tài khoản"}
                      </span>
                    </button>
                    <button
                      class="px-5 py-1.5 flex transition-all ease-in duration-150 items-center justify-center overflow-hidden text-sm font-semibold border border-red-500 text-white  rounded-md bg-red-500 hover:text-red-500 hover:bg-white"
                      onClick={handleLogOut}
                    >
                      <span class="">
                        {i18n.language === "en" ? "Log out" : "Đăng xuất"}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <button
                      class="px-5 py-1.5 flex transition-all ease-in duration-150 items-center justify-center overflow-hidden text-sm font-semibold border border-blue-500 text-white  rounded-md bg-blue-500 hover:text-blue-500 hover:bg-white"
                      onClick={() => navigate(`/login`)}
                    >
                      <span class="">
                        {i18n.language === "en" ? "Login" : "Đăng nhập"}
                      </span>
                    </button>
                    <button
                      class="px-5 py-1.5 flex transition-all ease-in duration-150 items-center justify-center overflow-hidden text-sm font-semibold border border-red-500 text-white  rounded-md bg-red-500 hover:text-red-500 hover:bg-white"
                      onClick={() => navigate(`/register`)}
                    >
                      <span class="">
                        {i18n.language === "en" ? "Register" : "Đăng ký"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;
