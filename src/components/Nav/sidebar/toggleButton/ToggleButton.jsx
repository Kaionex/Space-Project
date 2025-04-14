import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ToggleButton = ({ setOpen}) => {
  const toggleButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (toggleButtonRef.current && !toggleButtonRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={toggleButtonRef} className="relative">
      <button onClick={() => setOpen((prev) => !prev)}>
        <motion.div
          className="uppercase cursor-pointer text-gray-100 font-black text-3xl hover:text-cyan-500"
          style={{
            position: "relative",
            top: "2px",
            left: "55px",
          }}
          initial={{ opacity: 1, scale: 1 }} // Initial animation state
          animate={{ opacity: 1, scale: 1 }} // Animation when clicked
          transition={{ duration: 0.5 }} // Animation duration
          whileHover={{ scale: 1.2 }} // Zoom effect on hover
        >
          StarHub
        </motion.div>
      </button>

    </div>
  );
};

export default ToggleButton;
