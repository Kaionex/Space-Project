import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import "./sidebar/sidebar.css";

const variants = {
  open: {
    clipPath: "circle(1200px at 500px 5px)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(0px at 500px 5px)",
    transition: {
      delay: 0,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const UserMenu = ({ visible, setVisible, user, setLogoDropdownVisible, setUserDropdownVisible, setUserPageVisible, children, }) => {
  const node = useRef(null);

  const handleClickOutside = (event) => {
    if (node.current && !node.current.contains(event.target)) {
      setVisible(false);
      // setLogoDropdownVisible(false);
      // setUserDropdownVisible(false);
      setUserPageVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return visible ? (
    <motion.div
      ref={node}
      className={`absolute flex flex-col px-2 menuMain text-white rounded-md dropdown-menu ${visible ? 'show' : ''}`}
      style={{ top: '75%', right: '5%' }}
      variants={variants}
      initial={{ opacity: 1, scale: 1 }}
      animate={visible ? { ...variants.open, opacity: 1, scale: 1 } : { ...variants.closed, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {user && (
        <div className="flex items-center px-2 mb-2">
          <img src={user.avatar} alt="User avatar" className="bg-white rounded-full h-10 w-10 m-2" />
          <div>
            <div className="font-bold">{user.username}</div>
            <div className="text-xs font-light">{user.email}</div>
          </div>
        </div>
      )}
      <div className="border-t border-white mb-3"></div>
      <div className='pb-2 items-center'>{children}</div>
    </motion.div>
  ) : null;
};

export default UserMenu;
