import { getAllNotification } from "api";
import { Contact, Header, Loading } from "components";
import moment from "moment";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { setNavBar } from "reduxToolkit/navBarSlice";
import NavBar from "utils/NavBar";

import "moment/locale/vi";

import { useTranslation } from "react-i18next";
import { addAllReadNotification } from "reduxToolkit/notificationSlice";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const navigation = useSelector((state) => state.navbarReducer.keyNavBar);
  const readNotifications = useSelector(
    (state) => state.notificationReducer.readNotification
  );
  const keyNavigate = i18n.language === "en" ? "Notification" : "Thông báo";
  useEffect(() => {
    setTimeout(() => {
      getAllNotification().then((res) => {
        if (res?.code === 0) {
          setNotifications(res?.notification);
          setLoading(false);
        }
      }, 1000);
    });
    dispatch(setNavBar(keyNavigate));
  }, [i18n.language]);

  if (notifications?.length > 0) {
    if (readNotifications?.length > 0) {
      for (let i = 0; i < readNotifications.length; i++) {
        for (let j = 0; j < notifications.length; j++) {
          if (notifications[j]?._id === readNotifications[i]) {
            notifications[j].isRead = true;
            break;
          }
        }
      }
    }
  }

  const handleReadAllNotification = () => {
    if (notifications?.length > 0) {
      const data = [];
      notifications.forEach((item) => {
        data.push(item?._id);
      });
      dispatch(addAllReadNotification(data));
    }
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "rgb(245,245,245)" }}>
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>
      <div className="w-full px-[10%] mx-auto pb-8 pt-3 flex flex-col items-start justify-center">
        {navigation && (
          <div className="w-full mx-auto mb-3">
            <NavBar navigation={navigation} />
          </div>
        )}

        {loading ? (
          <Loading />
        ) : (
          <>
            <p className="text-lg font-semibold py-2 w-full">{`${
              i18n.language === "en"
                ? `List of Notification (${notifications?.length})`
                : `Danh sách thông báo (${notifications?.length})`
            }`}</p>
            <div className="row row-small-Gutters" style={{ width: "100%" }}>
              <div className="products col l-12 m-grid-12 c-12">
                <div className="flex flex-col items-start justify-center">
                  <div
                    className=" w-full
                            border border-gray-200 px-3 py-5 h-[40px] hover:text-red-700 transition-all duration-300 flex items-center justify-end text-md text-headingColor bg-white"
                  >
                    <span
                      className="cursor-pointer"
                      onClick={handleReadAllNotification}
                    >
                      {" "}
                      {i18n.language === "en"
                        ? "Mark all as read"
                        : "Đánh dấu tất cả là đã đọc!"}
                    </span>
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
                                className="w-4/5"
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
                                  : moment(item?.updatedAt).format("LLL")}
                              </p>
                            </div>
                            <div className="cursor-pointer flex items-center justify-center w-28 h-10 absolute border border-gray-200 top-1/2 right-3 bg-white text-md text-headingColor opacity-80 rounded-sm hover:border-red-700 hover:text-red-700 transition-all duration-300">
                              {i18n.language === "en"
                                ? "View details"
                                : "Chi tiết"}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notification;
