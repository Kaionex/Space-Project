import { motion } from "framer-motion";
import { NavLink as RouterNavLink } from "react-router-dom";

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

const NavLink = ({ ...props }) => {
  const className = `hover:text-cyan-500 hover:bg-transparent `;
  return <RouterNavLink className={className} {...props} />;
};

const Links = () => {
  const items = [
    { name: "Home", path: "/" },
    { name: "Solar System", path: "/SolarSystem" },
    { name: "Live Feeds", path: "/LiveVids" },
    // { name: "Your Likes", path: "/Likes" },
    { name: "Live Chat", path: "/live-chat" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/Contact" },
  ];

  return (
    <motion.div className="links" variants={variants}>
      {items.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.name}
        </NavLink>
      ))}
    </motion.div>
  );
};

export default Links;
