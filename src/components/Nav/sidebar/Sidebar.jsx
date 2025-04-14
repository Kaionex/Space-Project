import { useState } from "react";
import { motion } from "framer-motion";
import Links from "./links/Links";
import "./sidebar.css";
import ToggleButton from "./toggleButton/ToggleButton";


const variants = {
  open: {
    clipPath: "circle(1200px at 50px 45px)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(0px at 52px 55px)",
    
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
 
};
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div className="sidebar" animate={open ? "open" : "closed"}>
      <motion.div className="bg" variants={variants}>
        <Links />
      </motion.div>
      <ToggleButton setOpen={setOpen} />
    </motion.div>
  );
};

export default Sidebar;
