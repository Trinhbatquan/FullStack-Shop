import React, { useState, useEffect } from "react";
import { Header } from "components";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "api/index";
import Loading from "./../components/loadingToast/Loading";
import { useSelector, useDispatch } from "react-redux";
import { loginUserShop } from "reduxToolkit/userSlice";
import { getTypeToast } from "reduxToolkit/toastSlice";
import { useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [appearPw, setAppearPw] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageLogin, setMessageLogin] = useState("");
  const location = useLocation()?.search?.split("?");
  let redirectProduct = "";
  let productIdRedirect = "";
  let redirectFavorite = "";
  let favoriteIdRedirect = "";
  let favoriteProductList = "";
  if (location) {
    redirectProduct = location[1]?.split("=/")[1];
    productIdRedirect = location[2]?.split("=")[1];
    redirectFavorite = location[1]?.split("=/")[1];
    favoriteIdRedirect = location[2]?.split("=")[1];
    favoriteProductList = location[1]?.split("=/")[1];
  }

  // const currentUser = useSelector((state) => state.userSlice.user)
  // console.log({currentUser})

  const checkAdvancedRegister = () => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexPassword =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (!email || !password) {
      setMessageLogin("Vui lòng nhập đủ các ô.");
      return false;
    }
    if (!regexEmail.test(email)) {
      setMessageLogin("Vui lòng nhập đúng định dạng email.");
      return false;
    }
    if (!regexPassword.test(password)) {
      setMessageLogin(
        "Mật khẩu phải có từ 7 đến 15 kí tự, trong đó phải có ít nhất một số và một kí tự đặc biệt. "
      );
      return false;
    }
    return true;
  };

  const handleAppearPassWord = () => {
    setAppearPw(!appearPw);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkAdvancedRegister()) {
      setIsLoading(true);
      setMessageLogin("");
      loginUser(email, password).then((data) => {
        if (data?.code === 0) {
          dispatch(loginUserShop(data?.user));
          setIsLoading(false);
          localStorage.setItem("userShop", JSON.stringify(data?.user));
          if (redirectProduct === "product") {
            navigate(`/products/${productIdRedirect}`);
          } else if (redirectProduct === "deliveryAddress") {
            navigate("/deliveryAddress");
          } else if (redirectFavorite === "favorite") {
            navigate(`/products/${favoriteIdRedirect}`);
          } else if (favoriteProductList === "favoriteProductList") {
            navigate("/favorite");
          } else {
            navigate("/");
          }

          //    dispatch(getTypeToast("success"))
        } else {
          setIsLoading(false);
          localStorage.setItem("userShop", null);
          setMessageLogin(data?.mess);
          // toast.error("Login Failed", {
          //     theme: "colored",
          //     autoClose: 3000
          // })
        }
      });
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userShop"))) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-full">
        <ToastContainer />

        <div
          className="w-c-1/3 medium:w-1/2 sm:w-c-1 shadow-lg backdrop-blur-sm 
                rounded-sm px-2 py-4 mt-16 border border-gray-200"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center"
            style={{ minWidth: "100%", width: "100%" }}
          >
            {isLoading && <Loading />}

            <div
              className={`flex text-center items-center justify-center text-lg ${
                messageLogin?.code ? "text-blue-700" : "text-red-600"
              }`}
              style={
                messageLogin
                  ? { opacity: 1, maxWidth: "90%", width: "90%" }
                  : { opacity: 0, maxWidth: "90%", width: "90%" }
              }
            >
              <span className="py-1">
                {messageLogin?.code ? messageLogin.mess : messageLogin}
              </span>
            </div>
            <input
              className="py-3 px-4 mb-3 mt-1 bg-slate-200 text-headingColor text-lg 
                    placeholder:text-headingColor placeholder:text-lg
                    placeholder:opacity-70 mx-auto
                    medium:border-none medium:outline-none sm:border-none sm:outline-none"
              name="email"
              type="email"
              placeholder="Email"
              style={{ maxWidth: "90%", width: "90%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setMessageLogin("")}
            />
            <div className="relative" style={{ maxWidth: "90%", width: "90%" }}>
              <input
                className="py-3 px-4 mb-1 mt-1 bg-slate-200 text-headingColor text-lg 
                      placeholder:text-headingColor placeholder:text-lg
                      placeholder:opacity-70 mx-auto
                      medium:border-none medium:outline-none sm:border-none sm:outline-none w-full"
                name="password"
                type={appearPw ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setMessageLogin("")}
              />
              {appearPw ? (
                <AiFillEye
                  className="text-2xl opacity-60 hover:opacity-100 transition-all duration-300 absolute top-5 right-2 cursor-pointer"
                  onClick={handleAppearPassWord}
                />
              ) : (
                <AiFillEyeInvisible
                  className="text-2xl opacity-60 hover:opacity-100 transition-all duration-300 absolute top-5 right-2 cursor-pointer"
                  onClick={handleAppearPassWord}
                />
              )}
            </div>

            <NavLink
              to="/forgetPassword"
              className="flex items-center justify-start"
              style={{ maxWidth: "90%", width: "90%" }}
            >
              <p className="w-full text-md my-3 text-headingColor">
                Forgot Password?
              </p>
            </NavLink>

            <input
              type="submit"
              className="py-4 px-4 mb-6 mt-1 cursor-pointer text-headingColor text-lg 
                    font-semibold opacity-80 hover:opacity-100
                    mx-auto"
              value="LOGIN"
              style={{
                maxWidth: "90%",
                width: "90%",
                backgroundColor: "#1cb803",
              }}
            />
          </form>

          <NavLink to="/register?redirect=/">
            <p className="text-lg text-headingColor opacity-80 cursor-pointer mx-auto text-center">
              Create Account
            </p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Login;
