import React, { useState } from "react";

import { Loading, Header } from "../components";
import { forgetPassword } from "api";
const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState(false);

  const checkAdvancedRegister = () => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      setMessage("Please enter email.");
      return false;
    }
    if (!regexEmail.test(email)) {
      setMessage("Please enter correct email format.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkAdvancedRegister()) {
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
    }
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "rgb(245,245,245)" }}>
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>
      <div className="flex-col items-center justify-center w-full mx-auto">
        <p className="text-headingColor text-lg mt-16 py-2 mx-auto flex items-center justify-center">
          Please enter email to update your password.
        </p>
        <div
          className="w-c-1/3 medium:w-1/2 sm:w-c-1 shadow-lg backdrop-blur-sm 
                  rounded-sm px-2 py-4  border border-gray-200 bg-white mx-auto"
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
                message
                  ? { opacity: 1, maxWidth: "90%", width: "90%" }
                  : { opacity: 0, maxWidth: "90%", width: "90%" }
              }
            >
              <span className="py-1">{message}</span>
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
              onFocus={() => setMessage("")}
            />

            <input
              type="submit"
              className="py-4 px-4 mb-6 mt-1 cursor-pointer text-headingColor text-lg 
                      font-semibold opacity-80 hover:opacity-100
                      mx-auto"
              value="Confirm"
              style={{
                maxWidth: "90%",
                width: "90%",
                backgroundColor: "#1cb803",
              }}
            />
          </form>

          {/* <NavLink to="/register?redirect=/">
            <p className="text-lg text-headingColor opacity-80 cursor-pointer mx-auto text-center">
              Create Account
            </p>
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
