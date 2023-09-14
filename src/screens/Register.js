import React, { useState, useEffect } from "react";
import { Header } from "components";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "api/index";
import { useDispatch, useSelector } from "react-redux";
import { loginUserShop } from "reduxToolkit/userSlice";
import { getTypeToast } from "reduxToolkit/toastSlice";
import Loading from "./../components/loadingToast/Loading";

import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [appearPw, setAppearPw] = useState(false);

  const [messageRegister, setMessageRegister] = useState("");
  const [color, setColor] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeValue = (type, value) => {
    const arr = ["name", "email", "password", "confirmPassword"];
    const arrSet = [setName, setEmail, setPassword, setConfirmPassword];
    for (let i = 0; i < arr.length; i++) {
      if (type === arr[i]) {
        arrSet[i](value);
      }
    }
  };

  const checkAdvancedRegister = () => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexPassword =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (!name || !email || !password || !confirmPassword) {
      setMessageRegister("Please enter all field.");
      return false;
    }
    if (!regexEmail.test(email)) {
      setMessageRegister("Please enter correct form of email.");
      return false;
    }
    if (!regexPassword.test(password) || !regexPassword.test(confirmPassword)) {
      setMessageRegister(
        "Password must have the least 8 characters, 1 number and 1 a special character."
      );
      return false;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setMessageRegister("Password not match. Please try again.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      setIsLoading(true);
      if (checkAdvancedRegister()) {
        setMessageRegister("");
        registerUser(name, email, password).then((data) => {
          console.log(data);
          if (data?.code === 2) {
            setMessageRegister(data?.mess);
            // dispatch(loginUserShop(user));
            setIsLoading(false);
            setColor(true);
            // localStorage.setItem("userShop", JSON.stringify(user));
            // navigate("/");
            // dispatch(getTypeToast("success"))
          } else {
            // localStorage.setItem("userShop", null);
            // setIsLoading(false);
            setMessageRegister(data?.mess);
            // dispatch(loginUserShop(user));
            setIsLoading(false);
            setColor(true);

            // dispatch(getTypeToast("danger"))
          }
        });
      }
    }, 2000);
    // setTimeout(() => {
    //     dispatch(getTypeToast(null))
    // }, 3000)
  };

  const handleAppearPassWord = () => {
    setAppearPw(!appearPw);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userShop"))) {
      navigate("/");
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "rgb(245, 245, 245)",
      }}
    >
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>
      <div className="flex items-center justify-center w-full">
        <div
          className="w-c-1/3 medium:w-1/2 sm:w-c-1 shadow-lg backdrop-blur-sm 
                rounded-sm px-2 py-4 mt-16 border border-gray-200 bg-white"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center"
            style={{ minWidth: "100%", width: "100%" }}
          >
            {isLoading && <Loading />}
            <div
              className={`flex text-center items-center justify-center pb-1 text-lg ${
                color ? "text-blue-700" : "text-red-600"
              }`}
              style={
                messageRegister
                  ? { opacity: 1, maxWidth: "90%", width: "90%" }
                  : { opacity: 0, maxWidth: "90%", width: "90%" }
              }
            >
              <span className="py-1">{messageRegister}</span>
            </div>
            <input
              className="py-3 px-4 mb-3 mt-1 bg-slate-200 text-headingColor text-lg 
                    placeholder:text-headingColor placeholder:text-lg
                    placeholder:opacity-70 mx-auto
                     medium:border-none medium:outline-none sm:border-none sm:outline-none"
              name="username"
              type="text"
              placeholder="UserName"
              style={{ maxWidth: "90%", width: "90%" }}
              value={name}
              onFocus={() => setMessageRegister("")}
              onChange={(e) => handleChangeValue("name", e.target.value)}
            />
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
              onFocus={() => setMessageRegister("")}
              onChange={(e) => handleChangeValue("email", e.target.value)}
            />
            <div className="relative" style={{ maxWidth: "90%", width: "90%" }}>
              <input
                className="py-3 px-4 mb-6 mt-1 bg-slate-200 text-headingColor text-lg
                      placeholder:text-headingColor placeholder:text-lg
                      placeholder:opacity-70 mx-auto relative w-full"
                name="password"
                type={appearPw ? "input" : "password"}
                placeholder="Password"
                value={password}
                onFocus={() => setMessageRegister("")}
                onChange={(e) => handleChangeValue("password", e.target.value)}
              />
              {appearPw ? (
                <AiFillEye
                  className="text-2xl opacity-60 hover:opacity-100 transition-all duration-300 absolute top-4 right-2 cursor-pointer"
                  onClick={handleAppearPassWord}
                />
              ) : (
                <AiFillEyeInvisible
                  className="text-2xl opacity-60 hover:opacity-100 transition-all duration-300 absolute top-4 right-2 cursor-pointer"
                  onClick={handleAppearPassWord}
                />
              )}
            </div>

            <div className="relative" style={{ maxWidth: "90%", width: "90%" }}>
              <input
                className="py-3 px-4 mb-6 mt-1 bg-slate-200 text-headingColor text-lg
                      placeholder:text-headingColor placeholder:text-lg
                      placeholder:opacity-70 mx-auto relative w-full"
                name="confirmPassword"
                type={appearPw ? "input" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onFocus={() => setMessageRegister("")}
                onChange={(e) =>
                  handleChangeValue("confirmPassword", e.target.value)
                }
              />
              {/* {appearPw ? (
                <AiFillEye
                  className="text-2xl opacity-60 hover:opacity-100 transition-all duration-300 absolute top-4 right-2 cursor-pointer"
                  onClick={handleAppearPassWord}
                />
              ) : (
                <AiFillEyeInvisible
                  className="text-2xl opacity-60 hover:opacity-100 transition-all duration-300 absolute top-4 right-2 cursor-pointer"
                  onClick={handleAppearPassWord}
                />
              )} */}
            </div>

            <input
              type="submit"
              className="py-4 px-4 mb-6 mt-1 cursor-pointer text-headingColor text-lg 
                    font-semibold opacity-80 hover:opacity-100
                    mx-auto"
              value="Register"
              style={{
                maxWidth: "90%",
                width: "90%",
                backgroundColor: "#1cb803",
              }}
            />
          </form>

          <p className="text-sm text-headingColor opacity-80 cursor-pointer mx-auto text-center">
            I have Account{" "}
            <NavLink to="/login?redirect=/">
              <span className="text-blue-700 text-lg">Login</span>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
