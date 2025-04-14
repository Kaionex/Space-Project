import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";

import initGoogleApi from "./initGoogleApi";
import SpaceDashboard from "./pages/SpaceDashboard";
import Login from "./pages/Login";
import Signup from "./pages/signup/Signup";
import NotFound from "./components/NotFound";
import SolarSystem from "./pages/SolarSystem";
import ChatPage from "./components/Chat/ChatPage";
import LiveVids from "./pages/LiveVids";
import YourLikes from "./pages/YourLikes";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ComingSoon from "./pages/ComingSoon";

function App() {
  useEffect(() => {
    const initializeGoogleApi = async () => {
      try {
        await initGoogleApi();
        console.log("Google API is ready.");
      } catch (error) {
        console.error("Failed to initialize Google API", error);
      }
    };

    initializeGoogleApi();
  }, []);

  return (
    <NextUIProvider>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SpaceDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/SolarSystem" element={<SolarSystem />} />
          <Route path="/LiveVids" element={<LiveVids />} />
          <Route path="/live-chat" element={<ChatPage />} />
          <Route path="/likes" element={<YourLikes />} />
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </NextUIProvider>
  );
}

export default App;
