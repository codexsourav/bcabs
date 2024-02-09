import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ExploreRoutes from "./routes/ExploreRoutes";
import NotFoundPage from "./pages/error/NotFoundPage";
import BookingRoutes from "./routes/BookingRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { AdminTabContext } from "./context/InitContext";
import { useEffect, useState } from "react";
import Loader from "./pages/error/Loader";
import { StorageKEY, getLocalStorageData } from "./helper/storageKeys";
function App() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [auth, setAuth] = useState(false);
  const [adminTabIndex, setAdminTabIndex] = useState<number>(0);

  useEffect(() => {
    const checkAuth = () => {
      if (
        location.pathname.startsWith("/admin") &&
        !location.pathname.startsWith("/admin/login")
      ) {
        if (!getLocalStorageData(StorageKEY.admin)) {
          setAuth(false);
          window.location.replace("/admin/login");
        } else {
          setAuth(true);
        }
      } else {
        setAuth(true);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBicErnm5MQhQ9TEC8PHfQoBxQZEdv7v40&libraries=places&loading=async";
      script.onload = () => {
        console.log("Google Maps API script loaded.");
        if (auth) setScriptLoaded(true);
      };
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    };

    loadScript();
  }, [auth]);

  if (!scriptLoaded) {
    return <Loader className="w-screen h-screen flex justify-center items-center" />;
  }

  return (
    <AdminTabContext.Provider value={{ adminTabIndex, setAdminTabIndex }}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {ExploreRoutes()}
          {BookingRoutes()}
          {AuthRoutes()}
          {UserRoutes()}
          {AdminRoutes()}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AdminTabContext.Provider>
  );
}

export default App;
