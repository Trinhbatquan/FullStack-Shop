import { Contact, Header } from "components";
import React from "react";

import { BsFacebook, BsGithub } from "react-icons/bs";
import { AiOutlineMail, AiFillLinkedin } from "react-icons/ai";

const Support = () => {
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>
      <div className="w-full px-[10%] md:px-[5%] sm:px-[2%] mx-auto py-8 bg-white flex items-center justify-evenly md:flex-col md:items-center sm:flex-col sm:items-center ">
        <div className="mx-4 p-4 flex flex-col items-center justify-center gap-2 md:flex-row md:justify-start">
          <p className="text-textColor text-lg">
            Thank you for your attention!
          </p>
          <p className="text-textColor text-lg">Have a nice day!!!</p>
        </div>
        <div className=" mx-4 p-4 flex flex-col items-center justify-center gap-2">
          <span className="text-textColor text-lg sm:text-center">
            If you have questions, please contact to me by:
          </span>
          <div className="flex items-center justify-center">
            <a
              className="p-1 ml-4"
              href="https://www.facebook.com/profile.php?id=100017371533248"
              alt="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsFacebook className="text-blue-700 text-lg" />
            </a>
            <a
              className="p-1 ml-4"
              href="https://github.com/Trinhbatquan"
              alt="Git"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub className="text-blue-700 text-lg" />
            </a>
            <a
              className="p-1 ml-4"
              href="mailto:trinhbatquan2001@gmail.com"
              alt="Mail"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineMail className="text-blue-700 text-lg" />
            </a>
            <a
              className="p-1 ml-4"
              href="https://www.linkedin.com/in/trinhbatquan/"
              alt="Linkedln"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillLinkedin className="text-blue-700 text-lg" />
            </a>
          </div>
        </div>
      </div>
      <hr />

      {/* <Contact /> */}
    </div>
  );
};

export default Support;
