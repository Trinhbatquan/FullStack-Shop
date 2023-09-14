import { Contact, Header } from "components";
import React, { useMemo } from "react";
import { NavLink, useNavigation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { i18n, t } from "i18next";

import { FaBars, FaShippingFast } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { AiOutlineTrademarkCircle } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { RxSlash } from "react-icons/rx";
import { getAllProductsBySearch } from "api";

import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  getProductOfFilter,
  getProductOfSearch,
} from "reduxToolkit/searchProductSlice";
import LoadingSkeleton from "components/homeComponents/ShopProduct/LoadingSkeleton";
import ProductItem from "components/homeComponents/ShopProduct/ProductItem";
import { AnimatePresence, motion } from "framer-motion";

const FindBySearch = () => {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  let transportData = [
    {
      type: "express",
      isCheck: false,
    },
    {
      type: "fast",
      isCheck: false,
    },
    {
      type: "economical",
      isCheck: false,
    },
  ];

  const [position, setPosition] = useState([]);
  const [transport, setTransport] = useState(transportData);
  const [loadTransport, setLoadTransport] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [valueSearch, setValueSearch] = useState([]);
  const [loadvalueSearch, setLoadValueSearch] = useState([]);

  // console.log(transport);
  const productBySearch = useSelector(
    (state) => state?.productSearchSlice?.productsOfSearch
  );
  const valueSearchRedux = useSelector(
    (state) => state?.productSearchSlice?.valueSearch
  );
  const filterOfProducts = useSelector(
    (state) => state?.productSearchSlice?.filter
  );

  // console.log(productBySearch);

  const { result, pages } = productBySearch;
  const pageOfNumber = productBySearch?.page;

  const positionOptions = [
    { value: "England", label: "England" },
    { value: "Japan", label: "Japan" },
    { value: "America", label: "America" },
    { value: "Argentina", label: "Argentina" },
    { value: "Korea", label: "Korea" },
    { value: "Italy", label: "Italy" },
    { value: "Australia", label: "Australia" },
    { value: "China", label: "China" },
    { value: "Singapore", label: "Singapore" },
    { value: "India", label: "India" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "France", label: "France" },
    { value: "Mexico", label: "Mexico" },
    { value: "Vietnamese", label: "Vietnamese" },
  ].sort((a, b) => a.value.localeCompare(b.value));

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

  const checkValueSearch = () => {
    console.log("run");
    if (i18n.language === "en") {
      let count = 0;
      for (let i = 0; i < dataListSearchEn.length; i++) {
        if (dataListSearchEn[i] === valueSearchRedux) {
          setValueSearch([{ type: valueSearchRedux }]);
          setLoadValueSearch([valueSearchRedux]);
          break;
        }
        count++;
      }
      if (count === dataListSearchEn.length) {
        const arr = [];
        const loadArr = [];
        for (let i = 0; i < dataListSearchEn.length; i++) {
          if (
            dataListSearchEn[i].includes(valueSearchRedux) ||
            valueSearchRedux.includes(dataListSearchEn[i])
          ) {
            arr.push({ type: dataListSearchEn[i] });
            loadArr.push(dataListSearchEn[i]);
          }
        }
        setValueSearch(arr);
        setLoadValueSearch(loadArr);
      }
    } else {
      let count = 0;
      for (let i = 0; i < dataListSearchVn.length; i++) {
        if (dataListSearchVn[i] === valueSearchRedux) {
          setValueSearch([{ type: dataListSearchEn[i] }]);
          setLoadValueSearch([dataListSearchEn[i]]);
          break;
        }
        count++;
      }
      if (count === dataListSearchEn.length) {
        const arr = [];
        const loadArr = [];
        for (let i = 0; i < dataListSearchVn.length; i++) {
          if (
            dataListSearchVn[i].includes(valueSearchRedux) ||
            valueSearchRedux.includes(dataListSearchVn[i])
          ) {
            arr.push({ type: dataListSearchEn[i] });
            loadArr.push(dataListSearchEn[i]);
          }
        }
        setValueSearch(arr);
        setLoadValueSearch(loadArr);
      }
    }
  };
  const memoFunction = useMemo(() => checkValueSearch(), [valueSearchRedux]);

  useEffect(() => {
    const positionQuery = [];
    const transportQuery = [];
    position.forEach((item) => {
      positionQuery.push({
        position: item?.value,
      });
    });
    console.log(loadTransport);
    loadTransport.forEach((item) => {
      transportQuery.push({
        transport: item?.toLowerCase(),
      });
    });

    const data = {
      key: valueSearch,
      position: positionQuery,
      transport: transportQuery,
      page,
    };
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      getAllProductsBySearch(data).then((res) => {
        console.log(res);
        if (res?.code === 0) {
          dispatch(getProductOfSearch(res?.productSearch));
        } else {
          toast.error(
            `${
              i18n.language === "en"
                ? "Something error. Please contact with admin."
                : "Có lỗi. Vui lòng liên hệ với quản trị viên"
            } `
          );
        }
        setIsLoading(false);
      });
    }, 1000);
  }, [position, loadTransport, loadvalueSearch, page]);

  const handleTransportOption = (typeTransport, status, dataTransport) => {
    for (let i = 0; i < dataTransport.length; i++) {
      if (dataTransport[i]?.type === typeTransport) {
        dataTransport[i].isCheck = status;
      }
    }
    console.log(dataTransport);
    //handle
    let arr = [];
    dataTransport.forEach((item) => {
      if (item?.isCheck) {
        arr.push(item?.type);
      }
    });
    setLoadTransport(arr);
    setTransport(dataTransport);
  };

  const handleRemoveAll = (transportData) => {
    transportData.forEach((item) => {
      item.isCheck = false;
    });
    setLoadTransport([]);
    setTransport(transportData);
    setPosition([]);
  };

  const handleShowPrice = () => setShowPrice(!showPrice);

  const handleFilter = (filter) => {
    dispatch(getProductOfFilter(filter));
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div
        className="mx-auto py-8"
        style={{ minWidth: "90%", width: "90%", marginTop: "65px" }}
      >
        <div className="row row-small-Gutters">
          <div className="col l-2 m-grid-2 c-0">
            <div
              className="category bg-white flex flex-col items-center"
              style={{
                // borderRadius: "2px",
                // boxShadow: "0 1px 2px rgb(232,229,229)",
                paddingBottom: "1px",
                // border: "1px solid rgb(232,229,229)",
              }}
            >
              <div
                className="w-4/5"
                style={
                  {
                    // borderBottom: "1px solid rgb(232,229,229)",
                  }
                }
              >
                <div
                  className="category-heading text-md font-semibold flex items-center justify-start gap-2"
                  style={{
                    // padding: "10x 0",
                    color: "#333",
                  }}
                >
                  <FiFilter className="text-lg" />
                  SEARCH FILTER
                </div>
              </div>
              <div
                className="pt-1 pb-4 w-4/5"
                style={{
                  borderBottom: "1px solid rgb(232,229,229)",
                }}
              >
                <div
                  className="category-heading text-md flex items-center justify-start gap-2"
                  style={{
                    padding: "10px 0",
                    color: "#333",
                  }}
                >
                  {/* <MdPlace className="text-xl" /> */}
                  By Position
                </div>
                <Select
                  isMulti
                  value={position}
                  name="position"
                  options={positionOptions}
                  className="mx-auto text-md pt-0.5"
                  onChange={(e) => setPosition(e)}
                  // className="basic-multi-select"
                  // classNamePrefix="select"
                />
              </div>
              <div
                className="pb-2 w-4/5"
                style={{ borderBottom: "1px solid rgb(232,229,229)" }}
              >
                <div
                  className="category-heading text-md flex items-center justify-start gap-2"
                  style={{
                    padding: "10px 0",
                    color: "#333",
                  }}
                >
                  {/* <FaShippingFast className="text-xl" /> */}
                  Shipping Options
                </div>
                <div className="select-option flex flex-col justify-center items-center gap-4 mx-auto">
                  <div className="item w-full flex items-center justify-start gap-3">
                    <input
                      type="checkbox"
                      checked={transport[0].isCheck}
                      onChange={(e) =>
                        handleTransportOption(
                          "express",
                          e.target.checked,
                          transport
                        )
                      }
                    />
                    <label className="text-md flex-1">Express</label>
                  </div>
                  <div className="item w-full flex items-center justify-start gap-3">
                    <input
                      type="checkbox"
                      checked={transport[1].isCheck}
                      onChange={(e) =>
                        handleTransportOption(
                          "fast",
                          e.target.checked,
                          transport
                        )
                      }
                    />
                    <label className="text-md flex-1">Fast</label>
                  </div>
                  <div className="item w-full flex items-center justify-start gap-3">
                    <input
                      type="checkbox"
                      checked={transport[2].isCheck}
                      onChange={(e) =>
                        handleTransportOption(
                          "economical",
                          e.target.checked,
                          transport
                        )
                      }
                    />
                    <label className="text-md flex-1">Economical</label>
                  </div>
                </div>
              </div>
              {/* <div
                className="py-2"
                type={{ borderBottom: "1px solid rgb(241,238,238" }}
              >
                <div
                  className="category-heading text-lg font-semibold flex items-center justify-start gap-2"
                  style={{
                    padding: "16px 10px",
                    color: "#333",
                  }}
                >
                  <AiOutlineTrademarkCircle className="text-xl" />
                  TradeMark
                </div>
              </div> */}
              {/* <div className="py-2 w-full flex items-center justify-center">
                <button
                  type="text"
                  className="text-md bg-gray-400 text-headingColor font-semibold text-center py-2 rounded-sm"
                  style={{ width: "70%" }}
                >
                  Find
                </button>
              </div> */}
              <div className="py-2 w-full flex items-center justify-center">
                <button
                  type="text"
                  className="text-md bg-red-700 text-white text-sm font-semibold text-center py-2 rounded-sm"
                  style={{ width: "70%" }}
                  onClick={() => handleRemoveAll(transport)}
                >
                  Remove all
                </button>
              </div>
            </div>
          </div>
          <div
            className="products col l-10 m-grid-10 c-12"
            // style={{ minWidth: "90%", width: "90%" }}
          >
            <div className="flex items-center justify-start mb-3 text-md gap-1">
              <span className="font-semibold">RESULT OF SEARCH:</span>
              <span className="font-semibold text-red-700 uppercase">
                {/* {` "${key}"`} */}
              </span>
            </div>
            <div
              className="flex items-center justify-between mb-3"
              style={{
                height: "60px",
                backgroundColor: "rgba(0,0,0,0.08)",
                borderRadius: "2px",
                marginTop: "22px",
              }}
            >
              <div className="flex items-center gap-6 justify-start w-2/3 h-full">
                <span
                  className="content-filterControl__sort text-md"
                  style={{ margin: "0 20px", color: "#333" }}
                >
                  Sort by
                </span>
                <div
                  className="text-md block"
                  style={
                    filterOfProducts === "normal"
                      ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                      : { color: "#333", backgroundColor: "#fff" }
                  }
                  onClick={() => handleFilter("normal")}
                >
                  <span className="w-28 block px-1.5 py-1.5 text-center">
                    Normal
                  </span>
                </div>
                <div
                  className="text-md block"
                  style={
                    filterOfProducts === "newest"
                      ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                      : { color: "#333", backgroundColor: "#fff" }
                  }
                  onClick={() => handleFilter("newest")}
                >
                  <span className="w-28 block px-1.5 py-1.5 text-center">
                    Newest
                  </span>
                </div>
                <div
                  className="text-md block"
                  style={
                    filterOfProducts === "rating"
                      ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                      : { color: "#333", backgroundColor: "#fff" }
                  }
                  onClick={() => handleFilter("rating")}
                >
                  <span className="w-28 block px-1.5 py-1.5 text-center">
                    Rating
                  </span>
                </div>
                <div
                  className=" cursor-pointer flex items-center justify-between w-52 px-1.5 py-1.5 rounded-sm relative"
                  // style={
                  //   sort && (sort === "desc" || sort === "asc")
                  //     ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                  //     : { color: "#333", backgroundColor: "#fff" }
                  // }
                  // onClick={() => handleShowPrice()}
                  style={
                    filterOfProducts === "asc" || filterOfProducts === "desc"
                      ? { color: "#fff", backgroundColor: "rgb(247, 70, 46)" }
                      : { color: "#333", backgroundColor: "#fff" }
                  }
                  onClick={handleShowPrice}
                >
                  <span className="text-md">
                    {filterOfProducts
                      ? filterOfProducts === "desc"
                        ? "From max to min"
                        : filterOfProducts === "asc"
                        ? "From min to max"
                        : "Price"
                      : "Price"}
                  </span>
                  {showPrice ? (
                    <IoIosArrowUp className="text-md" />
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
                        className="flex flex-col 
                  items-start justify-center absolute top-12 left-0 w-full z-10"
                      >
                        <div
                          className="w-full px-1.5 py-2.5"
                          style={
                            filterOfProducts === "desc"
                              ? {
                                  color: "#fff",
                                  backgroundColor: "rgb(247, 70, 46)",
                                }
                              : { color: "#333", backgroundColor: "#fff" }
                          }
                          onClick={() => handleFilter("desc")}
                        >
                          <span>From max to min</span>
                        </div>
                        <hr />
                        <div
                          className="w-full px-1.5 py-2.5"
                          style={
                            filterOfProducts === "asc"
                              ? {
                                  color: "#fff",
                                  backgroundColor: "rgb(247, 70, 46)",
                                }
                              : { color: "#333", backgroundColor: "#fff" }
                          }
                          onClick={() => handleFilter("asc")}
                        >
                          <span>From min to max</span>
                        </div>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              {result?.length > 0 && (
                <div className="w-1/4 flex items-center justify-end gap-4 pr-5">
                  <div className="page-number flex items-center justify-center">
                    <span>{+pageOfNumber}</span>
                    <RxSlash />
                    <span>{pages}</span>
                  </div>
                  <div className="page-navigate flex items-center justify-center">
                    <div
                      className={`w-9 h-9 px-1.5 py-1.5 flex items-center justify-center
                    ${
                      +pageOfNumber <= 1
                        ? "opacity-50 cursor-text"
                        : "opacity-100 cursor-pointer"
                    }`}
                      style={{
                        backgroundColor: "#fff",
                        borderBottom: "1px solid rgb(209, 175, 175)",
                        borderTop: "1px solid rgb(209, 175, 175)",
                        borderLeft: "1px solid rgb(209, 175, 175)",
                      }}
                      onClick={() =>
                        pageOfNumber > 1 && setPage(+pageOfNumber - 1)
                      }
                    >
                      <MdKeyboardArrowLeft />
                    </div>
                    <div
                      className={`w-9 h-9 px-1.5 py-1.5 flex items-center justify-center 
                    ${
                      +pageOfNumber >= pages
                        ? "opacity-50 cursor-text"
                        : "opacity-100 cursor-pointer"
                    }`}
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid rgb(209, 175, 175)",
                      }}
                      onClick={() =>
                        pageOfNumber < pages && setPage(+pageOfNumber + 1)
                      }
                    >
                      <MdKeyboardArrowRight />
                    </div>
                  </div>
                </div>
              )}
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
                  {result?.length === 0 ? (
                    <div className="flex items-center justify-center w-full">
                      <img
                        src={`/assets/image/no_product.png`}
                        className="w-2/5"
                        alt="None"
                      />
                    </div>
                  ) : (
                    result?.map((item, index) => {
                      return (
                        <div
                          to={`/products/${item._id}`}
                          key={index}
                          className="col l-2-4 m-grid-4 c-6 mb-3"
                        >
                          <ProductItem product={item} />
                        </div>
                      );
                    })
                  )}
                </div>
                {/* <div className="row row-small_Gutters ml-8">
                    <Pagination
                      numberOfPage={numberOfPage?.page}
                      pages={pages}
                      handleNavigatePage={handleNavigatePage}
                    />
                  </div> */}
              </>
            )}
          </div>
        </div>
      </div>
      <hr />
      <Contact />
    </>
  );
};

export default FindBySearch;
