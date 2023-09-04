import React from "react";
import { AiOutlineHeart, AiFillHome } from "react-icons/ai";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router";

const NavBar = ({ navigation }) => {
  console.log(navigation);
  const navigate = useNavigate();
  const returnHome = () => {
    navigate("/");
  };
  return (
    <div className="flex items-center justify-start gap-2">
      <AiFillHome
        onClick={returnHome}
        className="text-lg text-blue-400 hover:text-blue-600 cursor-pointer transition-all duration-300"
      />
      <MdOutlineNavigateNext className="text-lg text-blue-300" />
      <span className="text-md text-blue-400">{`${
        navigation.slice(0, 1).toUpperCase() +
        navigation.slice(1, navigation.length)
      }`}</span>
    </div>
  );
};

export default NavBar;
