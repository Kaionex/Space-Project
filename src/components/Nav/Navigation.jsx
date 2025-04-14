import React, { useEffect, useState, useContext } from "react";
import {
  NavLink as RouterNavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { UserAuth, AuthContext } from "../../context/AuthContext";
import { FiArrowUpCircle } from "react-icons/fi";
import styled from "styled-components";
import Sidebar from "./sidebar/Sidebar";
import UserMenu from "./UserMenu";
import UserPage from "./UserPage";
import {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineDown,
  AiOutlineRight,
} from "react-icons/ai";
import { motion } from "framer-motion";

const NavLink = ({ isActive, textColor, ...props }) => {
  const className = `py-2 px-6 hover:text-cyan-500 hover:bg-transparent hover:text-cyan-500 hover:border-2 hover:border-cyan-500 hover:rounded-md ${
    isActive ? "underline" : ""
  }`;
  return <RouterNavLink className={className} {...props} />;
};

const DropdownItem = ({ isActive, ...props }) => {
  const className = `py-2 px-6 hover:text-cyan-500 hover:rounded-md cursor-pointer ${
    isActive ? "underline" : ""
  }`;
  return <RouterNavLink className={className} {...props} />;
};

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  z-index: 2;
  background-color: rgba(0, 0, 0, ${(props) => props.navOpacity});
  opacity: ${(props) => (props.isTop ? 1 : 0)};
  visibility: ${(props) => (props.isTop ? "visible" : "hidden")};
  transition: background-color 2s, opacity 2s, visibility 2s;
  height: 100px;
`;

const Navigation = () => {
  let location = useLocation();

  const { user, refreshNav, triggerNavRefresh } = useContext(AuthContext);
  const { logOut } = UserAuth();
  const navigate = useNavigate();
  const [isTop, setIsTop] = useState(true);
  const [navOpacity, setNavOpacity] = useState(1);
  const [logoDropdownVisible, setLogoDropdownVisible] = useState(false);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleUserPage = () => {
    // setUserPageVisible(!userPageVisible);
    setMenuOpen(!menuOpen);
  };

  const toggleUserMenu = () => {
    setLogoDropdownVisible(false);
    setUserDropdownVisible(false);
    setUserMenuVisible(!userMenuVisible);
  };

  useEffect(() => {
    triggerNavRefresh();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY === 0;
      setIsTop(isTop);
      if (isTop) {
        setNavOpacity(0);
      } else {
        setNavOpacity(0);
      }
      setShowBackToTop(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    setTimeout(() => {
      setNavOpacity(0);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [refreshNav]);

  const isActive = (path) => location.pathname === path;

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: "-10%" },
    visible: { opacity: 1, y: "0%" },
  };

  return (
    <header className="w-full z-20 fixed top-0 transition-opacity duration-1000 ease-in-out">
      <StyledNav isTop={isTop} navOpacity={navOpacity}>
        <Sidebar />
        <div className="flex items-center">
          <nav className="font-sen text-gray-100 uppercase text-xl lg:flex items-center hidden px-6">
            <NavLink to="/" isActive={isActive("/")}>
              Home
            </NavLink>
            <NavLink to="/SolarSystem" isActive={isActive("/SolarSystem")}>
              Solar System
            </NavLink>
            <NavLink to="/LiveVids" isActive={isActive("/LiveVids")}>
              Live Feeds
            </NavLink>
            <NavLink to="/live-chat" isActive={isActive("/live-chat")}>
              Live Chat
            </NavLink>
            {user ? (
              <>
                <NavLink to="/comingsoon" isActive={isActive("/comingsoon")}>
                  Coming Soon
                </NavLink>
                <NavLink to="/about" isActive={isActive("/about")}>
                  About
                </NavLink>
                <NavLink to="/contact" isActive={isActive("/contact")}>
                  Contact
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/signup" isActive={isActive("/signup")}>
                  Sign Up
                </NavLink>
                <NavLink to="/login" isActive={isActive("/login")}>
                  Log In
                </NavLink>
              </>
            )}
          </nav>
        </div>
        {user && (
          <div className="order-1 -m-20 text-xs text-white flex items-center ">
            <div className="text-right mr-2">
              <span className="font-bold">{user.username}</span>
            </div>
            <img
              src={user.avatar || "default-avatar.png"}
              alt="User avatar"
              className="order-2 border-white bg-white rounded-full h-8 w-8 m-2 z-10 hover:scale-150 hover:border-cyan-500 hover:border-4 duration-1000 transition-all cursor-pointer"
              onClick={toggleUserMenu}
            />
            {user.userBadge && (
              <img
                src={"/src/assets/" + user.userBadge + ".png"}
                alt="User badge"
                className="order-2   rounded-full h-7  m-2 z-50"
              />
            )}
            <UserMenu
              visible={userMenuVisible}
              setVisible={setUserMenuVisible}
              user={user}
              setLogoDropdownVisible={setLogoDropdownVisible}
              setUserDropdownVisible={setUserDropdownVisible}
              setUserPageVisible={setMenuOpen}
            >
              <div className="flex flex-col justify-center">
                <DropdownItem to="/likes" isActive={isActive("/likes")}>
                  <div className="flex items-center">
                    <AiOutlineHeart className="mr-2" />
                    Your Likes
                  </div>
                </DropdownItem>
                <div className="border-t border-gray-400 my-3"></div>
                <button
                  onClick={toggleUserPage}
                  className="px-6 py-2 hover:text-cyan-500 hover:bg-transparent"
                >
                  <div className="flex items-center">
                    <AiOutlineUser className="mr-2" />
                    Account
                    {menuOpen ? (
                      <AiOutlineDown className="ml-2" />
                    ) : (
                      <AiOutlineRight className="ml-2" />
                    )}
                  </div>
                </button>
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate={menuOpen ? "visible" : "hidden"}
                  transition={{ duration: 0.5 }}
                >
                  <UserPage visible={menuOpen} setVisible={setMenuOpen} />
                </motion.div>
                <div className="border-t border-gray-400 my-3 x-4"></div>
                <DropdownItem to="/" onClick={handleLogout}>
                  <div className="flex items-center">
                    <AiOutlineLogout className="mr-2" />
                    Log Out
                  </div>
                </DropdownItem>
              </div>
            </UserMenu>
          </div>
        )}
      </StyledNav>
      {showBackToTop && (
        <button
          className="fixed bottom-10 right-10 hover:text-cyan-500 text-white py-2 px-2 rounded-full shadow-md"
          onClick={handleScrollToTop}
        >
          <FiArrowUpCircle size={30} />
        </button>
      )}
    </header>
  );
};

export default Navigation;
