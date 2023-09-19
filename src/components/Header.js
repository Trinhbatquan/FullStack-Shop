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
} from "react-icons/ai";
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

  return (
    <div className="w-full cursor-pointer flex flex-col fixed top-0 left-0 right-0 z-50">
      <div
        className="w-full cursor-pointer flex items-center justify-around py-3  sm:justify-start relative bg-headerColor xl:shadow-sm"
        style={{
          maxHeight: "65px",
          minHeight: "65px",
          padding: "0 5%",
          border: "1px solid #dee5e8",
        }}
      >
        <div
          className="w-full h-full sm:w-full cursor-pointer flex items-center py-6 px-3"
          style={{
            maxHeight: "65px",
            minHeight: "65px",
          }}
        >
          <div
            className="flex-1 h-full cursor-pointer flex items-center justify-start py-6  px-3"
            style={{
              maxHeight: "65px",
              minHeight: "65px",
            }}
          >
            <div
              className="xl:w-1/5 lg:w-1/3 sm:1/3 h-full flex items-center justify-start"
              style={{
                maxHeight: "65px",
                minHeight: "65px",
              }}
            >
              <Link to="/">
                <FaShopify className="text-5xl sm:text-4xl cursor-pointer text-slate-400" />
              </Link>
            </div>
            <div
              className="xl:w-4/5 lg:w-2/3 h-full sm:2/3 flex items-center justify-start gap-10"
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
          <div className="flex-1 cursor-pointer flex items-center justify-end py-6 gap-6">
            <div
              className={`rounded-3xl relative w-1/2 flex items-center justify-start ${
                inputSearch
                  ? "bg-white duration-200 transition-all"
                  : "bg-gray-200 duration-200 transition-all"
              }`}
            >
              <CiSearch className="h-8 w-8 pl-2" />
              <input
                list="browsers"
                onFocus={() => setInputSearch(true)}
                onBlur={() => setInputSearch(false)}
                type="text"
                value={input}
                autoComplete="on"
                placeholder={t("header.search")}
                className={`flex-1 rounded-3xl py-2 pl-1 pr-2 placeholder:text-sm text-black outline-none
              text-sm ${
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
            <div className="ml-6 flex items-center justify-between relative flex-1 gap-4">
              <div
                className="cursor-pointer flex items-center justify-center gap-1 relative"
                onClick={handleShowTranslate}
                // style={{ minWidth: "90px" }}
              >
                <span className="cursor-pointer text-gray-600 block">
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
                    className="absolute -right-2 top-8 bg-white w-32 shadow-sm rounded-md"
                  >
                    <li
                      className={`px-0.5 transition-all duration-500 py-2 text-center hover:text-blue-700 border-b border-gray-200 ${
                        i18n.language === "en"
                          ? "text-blue-700"
                          : "text-headingColor"
                      } `}
                      onClick={() => i18n.changeLanguage("en")}
                    >
                      {t("header.english")}
                    </li>
                    <li
                      className={`px-0.5 transition-all duration-500 py-2 text-center hover:text-blue-700 ${
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
                className="flex items-center justify-center gap-0.5 cursor-pointer"
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
                className="flex items-center justify-center gap-0.5 cursor-pointer"
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
                  className="rounded-full bg-red-700 text-white absolute -top-3 -right-2 w-5 h-5 text-center"
                  style={{ lineHeight: "20px" }}
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

        {showNavbarMobile ? (
          <MdOutlineArrowBackIosNew
            className="xl:hidden medium:hidden sm:block text-2xl text-white cursor-pointer 
        absolute top-1/3 left-2"
            onClick={() => handleShowMobile()}
          />
        ) : (
          <FaBars
            className="xl:hidden medium:hidden sm:block text-2xl text-white cursor-pointer 
        absolute top-1/3 left-2"
            onClick={() => handleShowMobile()}
          />
        )}

        <AnimatePresence>
          {showNavbarMobile && (
            <motion.div
              initial={{ opacity: 0, translateX: "-100%" }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: "-100%" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black text-white w-full xl:hidden medium:hidden sm:block
                absolute top-full left-0 sm:z-10"
            >
              <ul className="list-none w-full">
                {user?.name ? (
                  <>
                    <NavLink to="/profile">
                      <li
                        className="w-full cursor-pointer hover:bg-inputColor hover:text-black transition-all duration-300"
                        style={{ borderBottom: "1px solid rgb(134,130,130)" }}
                      >
                        <span className="block px-3 py-4">Profile</span>
                      </li>
                    </NavLink>

                    <li
                      className="w-full cursor-pointer hover:bg-inputColor hover:text-black transition-all duration-300"
                      onClick={handleLogOut}
                    >
                      <span className="block px-3 py-4">Logout</span>
                    </li>
                  </>
                ) : (
                  <>
                    <NavLink to="/register">
                      <li
                        className="w-full cursor-pointer hover:bg-inputColor hover:text-black transition-all duration-300"
                        style={{ borderBottom: "1px solid rgb(134,130,130)" }}
                      >
                        <span className="block px-3 py-4">Register</span>
                      </li>
                    </NavLink>
                    <NavLink to="/login">
                      <li className="w-full cursor-pointer hover:bg-inputColor hover:text-black transition-all duration-300">
                        <span className="block px-3 py-4">Login</span>
                      </li>
                    </NavLink>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;
