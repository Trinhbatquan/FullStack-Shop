import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Loading, Header } from "../components";

import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { forgetPassword, verifyAndUpdatePass } from "api";

const UpdatePassword = () => {
  const param = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(param?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState(false);
  const [appearPw, setAppearPw] = useState(false);
  const [expired, setExpired] = useState(4 * 60);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    let time = setInterval(() => {
      setExpired((prevState) => {
        if (prevState > 0) {
          return prevState - 1;
        } else {
          clearInterval();
          return 0;
        }
      });
    }, 1000);
    return () => {
      clearInterval(time);
    };
  }, []);

  const handleChangeValue = (type, value) => {
    const arr = ["email", "password", "confirmPassword"];
    const arrSet = [setEmail, setPassword, setConfirmPassword];
    for (let i = 0; i < arr.length; i++) {
      if (type === arr[i]) {
        arrSet[i](value);
      }
    }
  };

  const handleAppearPassWord = () => {
    setAppearPw(!appearPw);
  };

  const checkAdvancedRegister = () => {
    // let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexPassword =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (!password || !confirmPassword) {
      setMessage("Vui lòng nhập đủ các ô.");
      return false;
    }
    // if (!regexEmail.test(email)) {
    //   setMessage("Vui lòng nhập đúng định dạng email.");
    //   return false;
    // }
    if (!regexPassword.test(password) || !regexPassword.test(confirmPassword)) {
      setMessage(
        "Mật khẩu phải có từ 7 đến 15 kí tự, trong đó phải có ít nhất một số và một kí tự đặc biệt. "
      );
      return false;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setMessage("Mật khẩu không khớp, vui lòng nhập lại.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      if (checkAdvancedRegister()) {
        setIsLoading(true);
        setMessage("");
        verifyAndUpdatePass(email, param?.token, password).then((data) => {
          if (data?.code === 0) {
            setColor(true);
            setMessage(data?.mess);
            setDisableButton(true);
          } else if (data?.code === 3) {
            setColor(false);
            setMessage(data?.mess);
          } else {
            setColor(false);
            setMessage(
              "Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ quản trị viên."
            );
          }
          setIsLoading(false);
        });
      }
    }, 2000);
  };

  const handleSendAgainLink = () => {
    setIsLoading(true);
    setMessage("");
    forgetPassword(email).then((data) => {
      if (data?.code === 2) {
        setMessage(data?.mess);
        setColor(true);
      } else {
        setMessage(data?.mess);
        setColor(false);
      }
      setIsLoading(false);
    });
  };

  return (
    <>
      <Header />
      <div className="flex-col items-center justify-center w-full ">
        <p className="text-headingColor text-lg mt-16 py-2 mx-auto flex items-center justify-center gap-2">
          Vui lòng nhập mật khẩu để cập nhật.
          <span>{`Thời gian còn lại: ${expired}s`}</span>
        </p>
        <div
          className="w-c-1/3 medium:w-1/2 sm:w-c-1 shadow-lg backdrop-blur-sm 
                rounded-sm px-2 py-4 mt-2 border border-gray-200 mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center"
            style={{ minWidth: "100%", width: "100%" }}
          >
            {isLoading && <Loading />}
            <div
              className={`flex text-center items-center justify-center text-md ${
                color ? "text-blue-700" : "text-red-600"
              }`}
              style={
                message
                  ? { opacity: 1, maxWidth: "90%", width: "90%" }
                  : { opacity: 0, maxWidth: "90%", width: "90%" }
              }
            >
              <span className="py-1">{message}</span>
            </div>

            <input
              className=" disabled py-3 px-4 mb-3 mt-1 bg-slate-200 opacity-40 text-headingColor text-lg 
                    placeholder:text-headingColor placeholder:text-lg
                    placeholder:opacity-70 mx-auto
                     medium:border-none medium:outline-none sm:border-none sm:outline-none"
              name="email"
              type="email"
              placeholder="Email"
              style={{ maxWidth: "90%", width: "90%" }}
              value={email}
              onFocus={() => setMessage("")}
              // onChange={(e) => handleChangeValue("email", e.target.value)}
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
                onFocus={() => setMessage("")}
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
                onFocus={() => setMessage("")}
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
              type={disableButton ? "text" : "submit"}
              className={`py-4 px-4 mb-6 mt-1  text-headingColor text-lg 
                    font-semibold opacity-80 hover:opacity-100
                    mx-auto ${
                      disableButton
                        ? "opacity-30 cursor-default"
                        : "cursor-pointer"
                    }`}
              value="Gửi"
              style={{
                maxWidth: "90%",
                width: "90%",
                backgroundColor: "#1cb803",
              }}
            />
          </form>

          <p className="text-sm text-headingColor opacity-80 cursor-pointer mx-auto text-center flex items-center justify-center gap-2">
            Token hết hạn.{" "}
            <div>
              <span
                className="text-blue-700 text-lg"
                onClick={handleSendAgainLink}
              >
                Gửi link mới.
              </span>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
