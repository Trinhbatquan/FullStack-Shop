import React from "react";
import { useTranslation } from "react-i18next";

const RuleOfWork = () => {
  const { t } = useTranslation();
  return (
    <div
      className="w-c-1 flex my-5 items-center justify-between overflow-x-auto pb-4 mx-auto"
      style={{ maxWidth: "90%", overflowX: "auto" }}
    >
      <div
        className="flex items-center cursor-pointer"
        style={{
          width: "calc(20% - 10px)",
          minWidth: "260px",
          backgroundColor: "#fdaf17",
          alignItems: "center",
          borderRadius: "8px",
          marginRight: "15px",
        }}
      >
        <div className="relative" style={{ width: "17%", height: "64px" }}>
          <img
            src="https://www.watchstore.vn/upload/original-image/icon-watch-home.svg"
            alt="None"
            style={{ width: "32px", height: "32px", margin: "14px 8px" }}
          ></img>
          <div
            className="absolute"
            style={{
              backgroundColor: "#fdaf17",
              width: "13px",
              height: "64px",
              borderTopRightRadius: "100% 50%",
              borderBottomRightRadius: "100% 50%",
              top: "0px",
              right: "-13px",
            }}
          ></div>
        </div>
        <div
          className=""
          style={{
            width: "83%",
            backgroundColor: "#fff",
            height: "64px",
            padding: "5px 5px 5px 20px",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <h4 className="font-semibold" style={{ fontSize: "13px" }}>
            {t("rule.var")}
          </h4>
          <p className="opacity-50" style={{ fontSize: "12px" }}>
            {t("rule.ref")}
          </p>
        </div>
      </div>
      <div
        className="flex items-center cursor-pointer"
        style={{
          width: "calc(20% - 10px)",
          backgroundColor: "#fdaf17",
          alignItems: "center",
          borderRadius: "8px",
          minWidth: "260px",
          marginRight: "15px",
        }}
      >
        <div className="relative" style={{ width: "17%", height: "64px" }}>
          <img
            src="https://www.watchstore.vn/upload/original-image/icon-freeship.svg"
            alt="None"
            style={{ width: "32px", height: "32px", margin: "14px 8px" }}
          ></img>
          <div
            className="absolute"
            style={{
              backgroundColor: "#fdaf17",
              width: "13px",
              height: "64px",
              borderTopRightRadius: "100% 50%",
              borderBottomRightRadius: "100% 50%",
              top: "0px",
              right: "-13px",
            }}
          ></div>
        </div>
        <div
          className=""
          style={{
            width: "83%",
            backgroundColor: "#fff",
            height: "64px",
            padding: "5px 5px 5px 20px",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <h4 className="font-semibold" style={{ fontSize: "13px" }}>
            {t("rule.fre")}
          </h4>
          <p className="opacity-50" style={{ fontSize: "12px" }}>
            {t("rule.fasts")}
          </p>
        </div>
      </div>
      <div
        className="flex items-center cursor-pointer"
        style={{
          width: "calc(20% - 10px)",
          backgroundColor: "#fdaf17",
          alignItems: "center",
          borderRadius: "8px",
          minWidth: "260px",
          marginRight: "15px",
        }}
      >
        <div className="relative" style={{ width: "17%", height: "64px" }}>
          <img
            src="https://www.watchstore.vn/upload/original-image/icon-doi-tra.svg"
            alt="None"
            style={{ width: "32px", height: "32px", margin: "14px 8px" }}
          ></img>
          <div
            className="absolute"
            style={{
              backgroundColor: "#fdaf17",
              width: "13px",
              height: "64px",
              borderTopRightRadius: "100% 50%",
              borderBottomRightRadius: "100% 50%",
              top: "0px",
              right: "-13px",
            }}
          ></div>
        </div>
        <div
          className=""
          style={{
            width: "83%",
            backgroundColor: "#fff",
            height: "64px",
            padding: "5px 5px 5px 20px",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <h4 className="font-semibold" style={{ fontSize: "13px" }}>
            {t("rule.cha")}
          </h4>
          <p className="opacity-50" style={{ fontSize: "12px" }}>
            {t("rule.one")}
          </p>
        </div>
      </div>
      <div
        className="flex items-center cursor-pointer"
        style={{
          width: "calc(20% - 10px)",
          backgroundColor: "#fdaf17",
          alignItems: "center",
          borderRadius: "8px",
          minWidth: "260px",
          marginRight: "15px",
        }}
      >
        <div className="relative" style={{ width: "17%", height: "64px" }}>
          <img
            src="https://www.watchstore.vn/upload/original-image/ShieldCheck.svg"
            alt="None"
            style={{ width: "32px", height: "32px", margin: "14px 8px" }}
          ></img>
          <div
            className="absolute"
            style={{
              backgroundColor: "#fdaf17",
              width: "13px",
              height: "64px",
              borderTopRightRadius: "100% 50%",
              borderBottomRightRadius: "100% 50%",
              top: "0px",
              right: "-13px",
            }}
          ></div>
        </div>
        <div
          className=""
          style={{
            width: "83%",
            backgroundColor: "#fff",
            height: "64px",
            padding: "5px 5px 5px 20px",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <h4 className="font-semibold" style={{ fontSize: "13px" }}>
            {t("rule.lon")}
          </h4>
          <p className="opacity-50" style={{ fontSize: "12px" }}>
            {t("rule.fasta")}
          </p>
        </div>
      </div>
      <div
        className="flex items-center cursor-pointer"
        style={{
          width: "calc(20% - 10px)",
          backgroundColor: "#fdaf17",
          alignItems: "center",
          borderRadius: "8px",
          minWidth: "260px",
        }}
      >
        <div className="relative" style={{ width: "17%", height: "64px" }}>
          <img
            src="https://www.watchstore.vn/upload/original-image/CircleWavyCheck.svg"
            alt="None"
            style={{ width: "32px", height: "32px", margin: "14px 8px" }}
          ></img>
          <div
            className="absolute"
            style={{
              backgroundColor: "#fdaf17",
              width: "13px",
              height: "64px",
              borderTopRightRadius: "100% 50%",
              borderBottomRightRadius: "100% 50%",
              top: "0px",
              right: "-13px",
            }}
          ></div>
        </div>
        <div
          className=""
          style={{
            width: "83%",
            backgroundColor: "#fff",
            height: "64px",
            padding: "5px 5px 5px 20px",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <h4 className="font-semibold" style={{ fontSize: "13px" }}>
            {t("rule.ins")}
          </h4>
          <p className="opacity-50" style={{ fontSize: "12px" }}>
            {t("rule.inst")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RuleOfWork;
