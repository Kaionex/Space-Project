import { Outlet } from "react-router-dom";
// import Navigation from "./Nav/Navigation";
import Footer from "./Nav/Footer";


const Layout = () => {
  return (
    <div>
      <body className="`${inter.className}` grid grid-rows-[auto_1fr_auto] h-screen">
        {/* <Navigation /> */}
        <Outlet />
        <Footer />
      </body>
    </div>
  );
};

export default Layout;
