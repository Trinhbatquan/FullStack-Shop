import React from "react";
import { useTranslation } from "react-i18next";

const RuleOfWork = () => {
  const { t } = useTranslation();
  return (
    <div
      className="w-c-1 flex my-5 items-center justify-between overflow-x-auto lg:overflow-x-auto pb-4 mx-auto
      sm:w-[98%] md:hidden sm:hidden"
      style={{ overflowX: "auto" }}
    >
      <div
        className="flex items-center cursor-pointer w-[25%] min-w-[25%] lg:w-[25%] lg:min-w-[25%] md:hidden sm:hidden sm:overflow-hidden sm:w-[48%] sm:min-w-[48%] mr-[15px] sm:mr-[10px]"
        style={{
          backgroundColor: "#fdaf17",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <div className="relative h-[64px] sm:h-[45px] w-[17%] sm:w-[10%]">
          <img
            className="w-[32px] h-[32px] sm:w-[26px] sm:h-[26px] my-[14px] mx-[8px] sm:mt-[50%] sm:ml-[1px] sm:mb-0 sm:mr-0"
            src="https://www.watchstore.vn/upload/original-image/icon-watch-home.svg"
            alt="None"
          ></img>
          <div
            className="absolute h-[64px] sm:h-[45px] right-[-13px] sm:right-[-12px]"
            style={{
              backgroundColor: "#fdaf17",
              width: "13px",
              borderTopRightRadius: "100% 50%",
              borderBottomRightRadius: "100% 50%",
              top: "0px",
            }}
          ></div>
        </div>
        <div
          className="h-[64px] sm:h-[45px] w-[83%] sm:w-[90%]"
          style={{
            backgroundColor: "#fff",
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
        className="flex items-center cursor-pointer w-[25%] min-w-[25%] lg:w-[25%] lg:min-w-[25%] md:hidden sm:hidden sm:overflow-hidden sm:w-[48%] sm:min-w-[48%] mr-[15px] sm:mr-[10px]"
        style={{
          backgroundColor: "#fdaf17",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <div className="relative h-[64px] sm:h-[45px] w-[17%] sm:w-[10%]">
          <img
            className="w-[32px] h-[32px] sm:w-[26px] sm:pt[1px] sm:h-[26px] my-[14px] mx-[8px] sm:mt-[50%] sm:ml-[1px] sm:mb-0 sm:mr-0"
            src="https://www.watchstore.vn/upload/original-image/icon-freeship.svg"
            alt="None"
          ></img>
          <div
            className="absolute h-[64px] sm:h-[45px] right-[-13px] sm:right-[-12px]"
            style={{
              backgroundColor: "#fdaf17",
              width: "13px",
              borderTopRightRadius: "100% 50%",
              borderBottomRightRadius: "100% 50%",
              top: "0px",
            }}
          ></div>
        </div>
        <div
          className="h-[64px] sm:h-[45px] w-[83%] sm:w-[90%]"
          style={{
            backgroundColor: "#fff",
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
        className="flex items-center cursor-pointer w-[25%] min-w-[25%] lg:w-[25%] lg:min-w-[25%] md:hidden sm:hidden sm:overflow-hidden sm:w-[48%] sm:min-w-[48%] mr-[15px] sm:mr-[10px]"
        style={{
          backgroundColor: "#fdaf17",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <div className="relative h-[64px] sm:h-[45px] w-[17%] sm:w-[10%]">
          <img
            className="w-[32px] h-[32px] sm:w-[26px] sm:pt[1px] sm:h-[26px] my-[14px] mx-[8px] sm:mt-[50%] sm:ml-[1px] sm:mb-0 sm:mr-0"
            src="https://www.watchstore.vn/upload/original-image/icon-doi-tra.svg"
            alt="None"
          ></img>
          <div
            className="absolute h-[64px] sm:h-[45px] right-[-13px] sm:right-[-12px]"
            style={{
              backgroundColor: "#fdaf17",
              width: "13px",
              borderTopRightRadius: "100% 50%",
              borderBottomRightRadius: "100% 50%",
              top: "0px",
            }}
          ></div>
        </div>
        <div
          className="h-[64px] sm:h-[45px] w-[83%] sm:w-[90%]"
          style={{
            backgroundColor: "#fff",
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
        className="flex items-center cursor-pointer lg:w-[25%] lg:min-w-[25%] md:w-[30%] md:min-w-[30%] w-[25%] min-w-[25%] sm:w-[48%] sm:hidden"
        style={{
          // width: "calc(20% - 10px)",
          backgroundColor: "#fdaf17",
          alignItems: "center",
          borderRadius: "8px",
          // minWidth: "260px",
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
        className="flex items-center cursor-pointer lg:w-[25%] lg:min-w-[25%] md:w-[30%] md:min-w-[30%] w-[25%] min-w-[25%] sm:w-[48%] sm:hidden"
        style={{
          // width: "calc(20% - 10px)",
          backgroundColor: "#fdaf17",
          alignItems: "center",
          borderRadius: "8px",
          // minWidth: "260px",
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
