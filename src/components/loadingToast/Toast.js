import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import {AiFillCheckCircle} from 'react-icons/ai'
import {CiCircleRemove} from 'react-icons/ci'

const Toast = () => {

  const type = useSelector((state) => state.toastSlice.type)
  return (
    <AnimatePresence>
      {type && (
        <motion.div
            initial={{opacity: 0, translateX: 200}}
            animate={{opacity: 1, translateX: 0}}
            exit={{opacity: 0, translateX: 200}}
          className={`${
            type === "success"
              ? "bg-green-700 text-white"
              : "bg-red-500 text-white"
          } fixed top-36 right-2 rounded-md shadow-md backdrop-blur-sm text-center flex items-center justify-center`}
          style={{ width: "13%", maxWidth: "13%", height: "40px" }}
        >
          {type === "success" ? <AiFillCheckCircle className="mr-2 text-2xl"/> : <CiCircleRemove className="mr-2 text-2xl font-semibold"/>}
          {type === "success" ? "Successful action" : "Failed Action"}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
