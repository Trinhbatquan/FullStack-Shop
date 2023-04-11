import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { BsFacebook, BsSearch } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useLocation } from "react-router-dom";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiFillGithub,
  AiFillShopping,
} from "react-icons/ai";
import { FaShopify} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch} from "react-redux";
import { loginUserShop } from "reduxToolkit/userSlice";
import { getProductsBySearch } from "reduxToolkit/productSlice";

const Header = () => {
  
  const cartProduct = useSelector((state) => state.cartSlice.carts);
  const user = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch()

  const location = useLocation().pathname;

  const [input, setInput] = useState("");

  const [isProfile, setIsProfile] = useState(false);

  const [inputSearch, setInputSearch] = useState(false);

  const handleProfile = () => {
    setIsProfile(!isProfile);
  };

  const handleSearch = () => {
    if (location === "/") {
      dispatch(getProductsBySearch(input))
    }
  }


  const handleLogOut = () => {
    dispatch(loginUserShop(null))
    localStorage.setItem('userShop',null)
  }

  return (
    <div className="w-full flex flex-col">
      <div
        className="w-full flex items-center justify-between py-3"
        style={{ backgroundColor: "#1cb803" }}
      >
        <div className="flex items-center justify-evenly flex-1">
          <span className="text-white font-semibold text-lg">079xxxxxx</span>
          <span className="text-white font-semibold text-lg">
            admin@gmail.com
          </span>
        </div>
        <div className="flex flex-1 items-center justify-end pr-8 ">
          <BsFacebook
            className="text-white text-2xl hover:opacity-80 mr-6"
            cursor="pointer"
          />
          <AiFillGithub
            className="text-white text-2xl hover:opacity-80 mr-6"
            cursor="pointer"
          />
          <AiFillInstagram
            className="text-white text-2xl hover:opacity-80 mr-6"
            cursor="pointer"
          />
          <AiFillYoutube
            className="text-white text-2xl hover:opacity-80 mr-6"
            cursor="pointer"
          />
        </div>
      </div>

      <div
        className="w-full flex items-center justify-between py-6 mx-auto"
        style={{ maxWidth: "90%", width: "90%" }}
      >
        <div>
          <Link to="/">
            <FaShopify className="text-6xl mr-32 cursor-pointer text-slate-400" />
          </Link>
        </div>
        <div
          className=" ml-32 rounded-3xl relative"
          style={{ minWidth: "50%", width: "50%" }}
        >
          <input
            onFocus={() => setInputSearch(true)}
            onBlur={() => setInputSearch(false)}
            type="text"
            value={input}
            placeholder="Search"
            className={`py-3 pl-6 placeholder:text-lg text-black outline-none 
            text-lg w-full rounded-md ${
              inputSearch
                ? "bg-white backdrop-blur-md shadow-xl duration-200 transition-all border border-gray-100"
                : "bg-inputColor duration-200 transition-all"
            }`}
            onChange={(e) => setInput(e.target.value)}
          />
          <BsSearch className="absolute font-semibold text-2xl top-3 right-6 cursor-pointer text-headingColor" 
            onClick={handleSearch}
          />
        </div>

        <div className="flex items-center justify-center relative flex-1 ml-56">
          {/* {user?.name || (
            <div>
              <NavLink to="/register">
              <span className="mr-4 font-semibold text-headingColor cursor-pointer">
                REGISTER
              </span>
              </NavLink>
              <NavLink to="/login">
              <span className="ml-1 font-semibold text-headingColor cursor-pointer">
                LOGIN
              </span>
              </NavLink>
            </div>
          )} */}
          {user?.name ? (
            <div
              className="w-32 px-1 py-1 h-12 flex items-center justify-center relative  border border-gray-300 cursor-pointer rounded-sm "
              onClick={handleProfile}
            >
              <span>Hi, {user?.name}</span>
              <MdOutlineKeyboardArrowDown
                className={`${isProfile ? "rotate-180" : "rotate-0"}`}
              />
              <AnimatePresence>
                {isProfile && (
                  <motion.div
                    initial={{ opacity: 0, translateY: -50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -50 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute top-12 left-0 w-28 z-40 bg-black text-white rounded-sm"
                  >
                    <ul className="w-full">
                      <NavLink to="/profile"
                       
                      >
                        <li  className="text-sm py-2 pl-2 w-full hover:bg-backColor hover:text-black duration-300 transition-all ease-in-out">
                          Profile
                        </li>
                      </NavLink>
                      <li 
                        className="text-sm py-2 pl-2 w-full hover:bg-backColor hover:text-black duration-300 transition-all ease-in-out"
                        onClick={handleLogOut}
                      >
                        Logout
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div>
              <NavLink to="/register">
                <span className="mr-4 font-semibold text-headingColor cursor-pointer">
                  REGISTER
                </span>
              </NavLink>
              <NavLink to="/login">
                <span className="ml-1 font-semibold text-headingColor cursor-pointer">
                  LOGIN
                </span>
              </NavLink>
            </div>
          )}
          <NavLink to="/cart">
            <AiFillShopping className="h-8 w-6 ml-8 cursor-pointer" />
          </NavLink>
          <span
            className="rounded-full bg-red-700 text-white absolute -top-4 -right-2 w-6 h-6 text-center"
            style={{ lineHeight: "24px" }}
          >
            {cartProduct.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
