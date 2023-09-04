import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";

// import success from "../assets/image/success.png";
import Loading from "../components/loadingToast/Loading";
import Button from "./ButtonCustom";
import { identify } from "api";
import { loginUserShop } from "reduxToolkit/userSlice";

const EmailIdentify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [loading, setLoading] = useState(true);
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        let token = encodeURIComponent(param.token);
        identify(param.email, token).then((data) => {
          if (data?.code === 0) {
            setValidUrl(true);
            dispatch(loginUserShop(data?.user));
            localStorage.setItem("userShop", JSON.stringify(data?.user));
            navigate("/");
          } else {
            setValidUrl(false);
            localStorage.setItem("userShop", null);
          }
          setLoading(false);
        });
      } catch (e) {
        console.log("verify email uel error /n" + e);
      }
    }, 3000);
  }, []);

  return (
    <div
      className=" flex items-center justify-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      {loading ? (
        <Loading />
      ) : (
        !validUrl && (
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-black font-semibold text-2xl">Oh oh...</p>
            <p className="text-black opacity-80 text-md">
              Có lỗi xảy ra trong quá trình xác thực. Vui lòng thử lại.
            </p>
            <NavLink to="/register/redirect=again">
              <Button text="Return" />
            </NavLink>
          </div>
        )
      )}
    </div>
  );
};

export default EmailIdentify;
