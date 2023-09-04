import { getAllNotification } from "api";
import { Contact, Header } from "components";
import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { setNavBar } from "reduxToolkit/navBarSlice";
import NavBar from "utils/NavBar";

import "moment/locale/vi";

import { useTranslation } from "react-i18next";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const location = useLocation();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const navigation = useSelector((state) => state.navbarReducer.keyNavBar);
  const keyNavigate = location?.pathname?.split("/")[1];
  useEffect(() => {
    getAllNotification().then((res) => {
      if (res?.code === 0) {
        setNotifications(res?.notification);
      }
    });
    dispatch(setNavBar(keyNavigate));
  }, []);

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>
      <div className="w-full px-[10%] mx-auto pb-8 pt-3 flex flex-col items-start justify-center">
        {navigation && (
          <div className="w-full mx-auto mb-3">
            <NavBar navigation={navigation} />
          </div>
        )}
        <p className="text-lg font-semibold py-2 w-full">{`List of Notification `}</p>
        <div className="row row-small-Gutters" style={{ width: "100%" }}>
          <div className="products col l-12 m-grid-12 c-12">
            <div className="flex flex-col items-start justify-center">
              <div
                className="cursor-pointer w-full
                        border border-gray-200 px-3 py-5 h-[40px] hover:text-red-700 transition-all duration-300 flex items-center justify-end text-md text-headingColor bg-white"
              >
                {i18n.language === "en"
                  ? "Mark all as read"
                  : "Đánh dấu tất cả là đã đọc!"}
              </div>
              <div className="flex flex-col items-start justify-center w-full bg-white border border-gray-200">
                {notifications.length > 0 &&
                  notifications.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex items-center justify-start gap-3 relative py-4 px-3"
                        style={
                          item?.isRead
                            ? { backgroundColor: "#fff" }
                            : { backgroundColor: "#f5f5f5" }
                        }
                      >
                        <img
                          src={item?.image}
                          alt="none"
                          style={{ width: "80px", height: "80px" }}
                        />
                        <div className="flex-1">
                          <p
                            className="text-lg"
                            style={{
                              color: "rgba(0,0,0,.8)",
                              fontWeight: "400",
                              marginBottom: "2px",
                            }}
                          >
                            {i18n.language === "en"
                              ? item?.titleEn
                              : item?.titleVn}
                          </p>
                          <p
                            style={{
                              color: "rgba(0,0,0,.54)",
                              marginBottom: "1px",
                            }}
                          >
                            {i18n.language === "en"
                              ? item?.detailEn
                              : item?.detailVn}
                          </p>
                          <p style={{ color: "rgba(0,0,0,.54)" }}>
                            {i18n.language === "en"
                              ? moment(item?.updatedAt)
                                  .locale("en")
                                  .format("MMMM Do YYYY, h:mm:ss a")
                              : moment(item?.updatedAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                          </p>
                        </div>
                        <div className="cursor-pointer flex items-center justify-center w-28 h-10 absolute border border-gray-200 top-1/2 right-3 bg-white text-md text-headingColor opacity-80 rounded-sm hover:border-red-700 hover:text-red-700 transition-all duration-300">
                          {i18n.language === "en" ? "View details" : "Chi tiết"}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* <Contact /> */}
    </div>
  );
};

export default Notification;
