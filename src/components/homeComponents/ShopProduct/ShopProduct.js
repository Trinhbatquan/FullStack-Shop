import React, { useEffect, useState } from "react";
import { Pagination, Rating } from "../../../components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAllProducts, getFavoriteByUser } from "api/index";
import { NavLink } from "react-router-dom";
import { Loading } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import {
  getProductsByAll,
  getProductsBySearch,
} from "reduxToolkit/productSlice";
import { AnimatePresence } from "framer-motion";
import ProductItem from "./ProductItem";
import LoadingSkeleton from "./LoadingSkeleton";
import lozad from "lozad";
import { useTranslation } from "react-i18next";

import "./ShopProduct.css";

const ShopProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userSlice.user);
  const { products, pages, ...numberOfPage } = useSelector(
    (state) => state?.productsReducer?.allProducts
  );
  console.log({ products, pages, ...numberOfPage });

  let page = 0,
    sort = "",
    type = "";
  const setPage = (value) => {
    page = value;
  };
  const setSort = (value) => {
    sort = value;
  };
  const setType = (value) => {
    type = value;
  };
  const keyArr = ["page", "type", "sort"];
  const variableArr = [setPage, setType, setSort];

  const queryParams = useLocation()?.search;
  console.log(queryParams);
  let params = [];
  const splitString = queryParams?.split("?")[1];
  params = splitString?.split("&");
  console.log(params);
  if (params?.length > 0) {
    params?.forEach((item) => {
      for (let i = 0; i < keyArr.length; i++) {
        if (item.split("=")[0] === keyArr[i]) {
          variableArr[i](item.split("=")[1]);
          break;
        }
      }
    });
  }
  console.log(page, sort, type);
  console.log(sort === "");

  useEffect(() => {
    const data = {
      page,
      type,
      sort,
    };
    setIsLoading(true);
    getAllProducts(data).then((res) => {
      console.log(res);
      if (res?.code === 0) {
        dispatch(getProductsByAll(res?.result));
        setIsLoading(false);
      } else {
        dispatch(getProductsByAll(null));
        setIsLoading(false);
      }
    });
  }, [page, type, sort]);

  useEffect(() => {
    if (user && user?.name) {
      getFavoriteByUser().then((data) => {
        console.log(data);
      });
    }
  }, []);

  //handle show price
  const handleShowPrice = () => {
    setShowPrice(!showPrice);
  };

  const handleNavigatePage = (numberOfPage) => {
    if (!type && !sort) {
      navigate(`?page=${numberOfPage}`);
    } else if (type && !sort) {
      navigate(`?type=${type}&page=${numberOfPage}`);
    } else if (sort && !type) {
      navigate(`?sort=${sort}&page=${numberOfPage}`);
    } else {
      navigate(`?type=${type}&sort=${sort}&page=${numberOfPage}`);
    }
  };

  return (
    <div className="mx-auto w-[90%] min-w-[90%] sm:w-full">
      <div className="row row-small-Gutters">
        <div className="col l-2 m-grid-0  c-0">
          <div
            className="category bg-white"
            style={{
              borderRadius: "2px",
              boxShadow: "0 1px 2px rgb(232,229,229)",
              paddingBottom: "1px",
              border: "1px solid rgb(232,229,229)",
            }}
          >
            <div
              className="category-heading text-lg font-semibold flex items-center justify-start gap-2"
              style={{
                padding: "16px 10px",
                color: "#333",
                borderBottom: "1px solid rgb(241,238,238",
              }}
            >
              <FaBars className="text-xl" />
              {t("category.name")}
            </div>
            <ul
              className="category-list flex flex-col items-start justify-center py-2"
              style={{ paddingLeft: 0, listStyle: "none" }}
            >
              <NavLink
                className="text-md hover:translate-x-1 transition-all duration-200"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=`
                    : "/?type="
                }
                style={{
                  width: "100%",
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                }}
              >
                <span
                  className={`${!type ? "text-red-600" : "text-gray-400"}
                `}
                >
                  {t("category.common")}
                </span>
                {!type && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor:
                        "transparent transparent transparent rgb(247, 70, 46)",
                      position: "absolute",
                      left: "12px",
                      top: "32%",
                    }}
                  ></div>
                )}
              </NavLink>
              <NavLink
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=shirt`
                    : "/?type=shirt"
                }
                className="text-md hover:translate-x-1 transition-all duration-200"
                style={{
                  width: "100%",
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  right: 0,
                }}
              >
                <span
                  className={`${
                    type && type === "shirt" ? "text-red-600" : "text-gray-400"
                  }`}
                >
                  {t("category.shirt")}
                </span>
                {type && type === "shirt" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor:
                        "transparent transparent transparent rgb(247, 70, 46)",
                      position: "absolute",
                      left: "12px",
                      top: "32%",
                      // transform: "translateY(50%)",
                    }}
                  ></div>
                )}
              </NavLink>
              <NavLink
                className="text-md hover:translate-x-1 transition-all duration-200"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=pant`
                    : "/?type=pant"
                }
                style={{
                  width: "100%",
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  right: 0,
                }}
              >
                <span
                  className={`${
                    type && type === "pant" ? "text-red-600" : "text-gray-400"
                  }`}
                >
                  {t("category.pant")}
                </span>
                {type && type === "pant" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor:
                        "transparent transparent transparent rgb(247, 70, 46)",
                      position: "absolute",
                      left: "12px",
                      top: "32%",
                      // transform: "translateY(50%)",
                    }}
                  ></div>
                )}
              </NavLink>
              <NavLink
                className="text-md hover:translate-x-1 transition-all duration-200"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=jewelry`
                    : "/?type=jewelry"
                }
                style={{
                  width: "100%",
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  right: 0,
                }}
              >
                <span
                  className={`${
                    type && type === "jewelry"
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                >
                  {t("category.jewelry")}
                </span>
                {type && type === "jewelry" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor:
                        "transparent transparent transparent rgb(247, 70, 46)",
                      position: "absolute",
                      left: "12px",
                      top: "32%",
                      // transform: "translateY(50%)",
                    }}
                  ></div>
                )}
              </NavLink>
              <NavLink
                className="text-md hover:translate-x-1 transition-all duration-200"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=clock`
                    : "/?type=clock"
                }
                style={{
                  width: "100%",
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  right: 0,
                }}
              >
                <span
                  className={`${
                    type && type === "clock" ? "text-red-600" : "text-gray-400"
                  }`}
                >
                  {t("category.watch")}
                </span>
                {type && type === "clock" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor:
                        "transparent transparent transparent rgb(247, 70, 46)",
                      position: "absolute",
                      left: "12px",
                      top: "32%",
                      // transform: "translateY(50%)",
                    }}
                  ></div>
                )}
              </NavLink>
              <NavLink
                className="text-md hover:translate-x-1 transition-all duration-200"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=glasses`
                    : "/?type=glasses"
                }
                style={{
                  width: "100%",
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  right: 0,
                }}
              >
                <span
                  className={`${
                    type && type === "glasses"
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                >
                  {t("category.glass")}
                </span>
                {type && type === "glasses" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor:
                        "transparent transparent transparent rgb(247, 70, 46)",
                      position: "absolute",
                      left: "12px",
                      top: "32%",
                      // transform: "translateY(50%)",
                    }}
                  ></div>
                )}
              </NavLink>
              <NavLink
                className="text-md hover:translate-x-1 transition-all duration-200"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=shoe`
                    : "/?type=shoe"
                }
                style={{
                  width: "100%",
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  right: 0,
                }}
              >
                <span
                  className={`${
                    type && type === "shoe" ? "text-red-600" : "text-gray-400"
                  }`}
                >
                  {t("category.shoe")}
                </span>
                {type && type === "shoe" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor:
                        "transparent transparent transparent rgb(247, 70, 46)",
                      position: "absolute",
                      left: "12px",
                      top: "32%",
                      // transform: "translateY(50%)",
                    }}
                  ></div>
                )}
              </NavLink>
            </ul>
          </div>
        </div>
        <div
          className="products col l-10  m-grid-12 c-12 sm:w-full"
          // style={{ minWidth: "90%", width: "90%" }}
        >
          <ul
            class="xl:hidden lg:hidden list-none sm:flex sm:px-1 md:flex py-2 items-center overflow-x-hidden w-full"
            style={{ overflowX: "scroll" }}
          >
            <li class="category-mobile-tablet__item mr-[10px]">
              <NavLink
                className="sm:text-sm text-md text-white font-semibold block max-h-[36px] text-center"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=`
                    : "/?type="
                }
                style={{
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  backgroundColor: "#87AFD8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
              >
                <span className="block w-full">{t("category.common")}</span>
                {!type && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor: "transparent transparent transparent #fff",
                      position: "absolute",
                      left: "10px",
                      top: "32%",
                    }}
                  ></div>
                )}
              </NavLink>
            </li>

            <li class="category-mobile-tablet__item mr-[10px]">
              <NavLink
                className="sm:text-sm text-md text-white font-semibold min-w-[120px] block text-center"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=shirt`
                    : "/?type=shirt"
                }
                style={{
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  backgroundColor: "#76C9BD",
                  borderRadius: "4px",
                }}
              >
                <span className="block w-full">{t("category.shirt")}</span>
                {type && type === "shirt" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor: "transparent transparent transparent #fff",
                      position: "absolute",
                      left: "16px",
                      top: "32%",
                    }}
                  ></div>
                )}
              </NavLink>
            </li>

            <li class="category-mobile-tablet__item mr-[10px]">
              <NavLink
                className="sm:text-sm text-md text-white font-semibold block text-center"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=pant`
                    : "/?type=pant"
                }
                style={{
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  backgroundColor: "#88CF81",
                  borderRadius: "4px",
                }}
              >
                <span className="w-full block">{t("category.pant")}</span>
                {type && type === "pant" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor: "transparent transparent transparent #fff",
                      position: "absolute",
                      left: "10px",
                      top: "32%",
                    }}
                  ></div>
                )}
              </NavLink>
            </li>

            <li class="category-mobile-tablet__item mr-[10px]">
              <NavLink
                className="sm:text-sm text-md text-white font-semibold block text-center min-w-[120px]"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=jewelry`
                    : "/?type=jewelry"
                }
                style={{
                  maxHeight: "36px",
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  backgroundColor: "#87AFD8",
                  borderRadius: "4px",
                }}
              >
                <span className="block w-full">{t("category.jewelry")}</span>
                {type && type === "jewelry" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor: "transparent transparent transparent #fff",
                      position: "absolute",
                      left: "16px",
                      top: "32%",
                    }}
                  ></div>
                )}
              </NavLink>
            </li>

            <li class="category-mobile-tablet__item mr-[10px]">
              <NavLink
                className="sm:text-sm text-md text-white font-semibold block min-w-[120px] max-h-[36px] text-center"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=clock`
                    : "/?type=clock"
                }
                style={{
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  backgroundColor: "#76C9BD",
                  borderRadius: "4px",
                }}
              >
                <span className="w-full block">{t("category.watch")}</span>
                {type && type === "clock" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor: "transparent transparent transparent #fff",
                      position: "absolute",
                      left: "16px",
                      top: "32%",
                    }}
                  ></div>
                )}
              </NavLink>
            </li>

            <li class="category-mobile-tablet__item mr-[10px]">
              <NavLink
                className="sm:text-sm text-md text-white font-semibold block min-w-[120px] mx-h-[36px] text-center"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=glasses`
                    : "/?type=glasses"
                }
                style={{
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  backgroundColor: "#88CF81",
                  borderRadius: "4px",
                }}
              >
                <span className="block w-full">{t("category.glass")}</span>
                {type && type === "glasses" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor: "transparent transparent transparent #fff",
                      position: "absolute",
                      left: "16px",
                      top: "32%",
                    }}
                  ></div>
                )}
              </NavLink>
            </li>

            <li class="category-mobile-tablet__item mr-[10px]">
              <NavLink
                className="sm:text-sm text-md text-white font-semibold text-center block max-h-[36px]"
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&sort=${sort}&type=shoe`
                    : "/?type=shoe"
                }
                style={{
                  fontWeight: "400",
                  padding: "6px 20px 6px 20px",
                  position: "relative",
                  backgroundColor: "#87AFD8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
              >
                <span className="w-full block">{t("category.shoe")}</span>
                {type && type === "shoe" && (
                  <div
                    style={{
                      border: "7px solid",
                      borderColor: "transparent transparent transparent #fff",
                      position: "absolute",
                      left: "10px",
                      top: "32%",
                    }}
                  ></div>
                )}
              </NavLink>
            </li>
          </ul>
          <div
            class="flex h-[60px] sm:h-[50px] items-center justify-between sm:justify-start sm:gap-2 sm:px-1 mb-3 w-full"
            style={{
              backgroundColor: "rgba(0,0,0,0.08)",
              borderRadius: "2px",
            }}
          >
            <div className="flex items-center gap-6 sm:gap-[10px] justify-start w-2/3 h-full md:ml-3 sm:w-full">
              <span
                class="content-filterControl__sort text-md md:hidden sm:hidden"
                style={{ margin: "0 20px", color: "#333" }}
              >
                {t("sort.by")}
              </span>
              <NavLink
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&type=${type}&sort=`
                    : "/?sort="
                }
                class="text-md sm:text-sm block"
                // style={({ isActive }) => ({
                //   color: isActive ? "#fff" : "#333",
                //   background: isActive ? "rgb(247, 70, 46)" : "#fff",
                // })}
                style={
                  !sort
                    ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                    : { color: "#333", backgroundColor: "#fff" }
                }
              >
                <span className="text-md sm:text-sm w-28 sm:w-20 block px-1.5 py-1.5 text-center">
                  {i18n.language === "en" ? "Selling" : "Bán chạy"}
                </span>
              </NavLink>
              <NavLink
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&type=${type}&sort=newest`
                    : "/?sort=newest"
                }
                class="text-md sm:text-sm block"
                // style={({ isActive }) => ({
                //   color: isActive ? "#fff" : "#333",
                //   background: isActive ? "rgb(247, 70, 46)" : "#fff",
                // })}
                style={
                  sort && sort === "newest"
                    ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                    : { color: "#333", backgroundColor: "#fff" }
                }
              >
                <span className="text-md sm:text-sm w-28 sm:w-20 block px-1.5 py-1.5 text-center">
                  {t("sort.newest")}
                </span>
              </NavLink>
              <NavLink
                to={
                  queryParams[0] === "?"
                    ? `?page=${page}&type=${type}&sort=rating`
                    : "/?sort=rating"
                }
                class="text-md sm:text-sm block"
                // style={({ isActive }) => ({
                //   color: isActive ? "#fff" : "#333",
                //   background: isActive ? "rgb(247, 70, 46)" : "#fff",
                // })}
                style={
                  sort && sort === "rating"
                    ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                    : { color: "#333", backgroundColor: "#fff" }
                }
              >
                <span className="text-md sm:text-sm w-28 sm:w-20 block px-1.5 py-1.5 text-center">
                  {t("sort.rating")}
                </span>
              </NavLink>
              <div
                className="xl:hidden lg:hidden md:hidden"
                style={
                  sort && (sort === "desc" || sort === "asc")
                    ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                    : { color: "#333", backgroundColor: "#fff" }
                }
              >
                <NavLink
                  to={
                    queryParams[0] === "?"
                      ? sort === "desc"
                        ? `?page=${page}&type=${type}&sort=asc`
                        : `?page=${page}&type=${type}&sort=desc`
                      : "/?sort=asc"
                  }
                  class="text-md sm:text-sm "
                >
                  <span className="text-md sm:text-sm w-28 sm:w-20 block px-1.5 py-1.5 text-center sm:flex sm:items-center sm:justify-center sm:gap-1">
                    {t("sort.price")}
                    {(sort === "desc" || sort === "asc") && (
                      <>
                        {sort === "desc" ? (
                          <span>
                            <BsArrowDown className="text-lg" />
                          </span>
                        ) : (
                          <span>
                            <BsArrowUp className="text-lg" />
                          </span>
                        )}
                      </>
                    )}
                  </span>
                </NavLink>
              </div>
            </div>
            <div class="w-c-1/3 sm:hidden">
              <div
                className=" cursor-pointer flex items-center justify-between w-52 px-1.5 py-1.5 rounded-sm relative"
                // style={{ backgroundColor: "#fff", color: "#000" }}
                style={
                  sort && (sort === "desc" || sort === "asc")
                    ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                    : { color: "#333", backgroundColor: "#fff" }
                }
                onClick={() => handleShowPrice()}
              >
                <span class="text-md sm:text-sm">
                  {!sort
                    ? t("sort.price")
                    : sort === "desc"
                    ? t("sort.desc")
                    : sort === "asc"
                    ? t("sort.asc")
                    : t("sort.price")}
                </span>
                {showPrice ? (
                  <IoIosArrowUp className="text-md sm:text-sm" />
                ) : (
                  <IoIosArrowDown className="text-md" />
                )}
                <AnimatePresence>
                  {showPrice && (
                    <motion.ul
                      initial={{ opacity: 0, translateY: -50 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      exit={{ opacity: 0, translateY: -50 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      class="flex flex-col 
                  items-start justify-center absolute top-12 left-0 w-full z-10"
                    >
                      <NavLink
                        to={
                          queryParams[0] === "?"
                            ? `?page=${page}&type=${type}&sort=desc`
                            : "/?sort=desc"
                        }
                        className="w-full px-1.5 py-2.5"
                        // style={({ isActive }) => ({
                        //   color: isActive ? "#fff" : "#000",
                        //   background: isActive ? "rgb(247, 70, 46)" : "#fff",
                        // })}
                        style={
                          sort && sort === "desc"
                            ? {
                                color: "#fff",
                                backgroundColor: "rgb(247, 70, 46)",
                              }
                            : { color: "#333", backgroundColor: "#fff" }
                        }
                      >
                        <span>{t("sort.desc")}</span>
                      </NavLink>
                      <hr />
                      <NavLink
                        to={
                          queryParams[0] === "?"
                            ? `?page=${page}&type=${type}&sort=asc`
                            : "/?sort=asc"
                        }
                        className="w-full px-1.5 py-2.5"
                        // style={({ isActive }) => ({
                        //   color: isActive ? "#fff" : "#000",
                        //   background: isActive ? "rgb(247, 70, 46)" : "#fff",
                        // })}
                        style={
                          sort && sort === "asc"
                            ? {
                                color: "#fff",
                                backgroundColor: "rgb(247, 70, 46)",
                              }
                            : { color: "#333", backgroundColor: "#fff" }
                        }
                      >
                        <span>{t("sort.asc")}</span>
                      </NavLink>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          {isLoading ? (
            <>
              <div className="row row-small-Gutters">
                {Array(5)
                  .fill(0)
                  ?.map((item, index) => {
                    return (
                      <div
                        // to={`/products/${product._id}`}
                        key={index}
                        className="col l-2-4 m-grid-4 c-6 mb-3"
                      >
                        <LoadingSkeleton />
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <div className="row row-small-Gutters">
                {products?.map((product, index) => {
                  return (
                    <NavLink
                      to={`/products/${product._id}`}
                      key={index}
                      className="col l-2-4 m-grid-4 c-6 mb-3"
                    >
                      <ProductItem product={product} />
                    </NavLink>
                  );
                })}
              </div>
              <div className="row row-small_Gutters ml-8 items-center justify-start pl-2">
                <Pagination
                  numberOfPage={numberOfPage?.page}
                  pages={pages}
                  handleNavigatePage={handleNavigatePage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;
