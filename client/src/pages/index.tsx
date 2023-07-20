import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Homepage from "./Home/Home";
import LoginPage from "./Auth/Login";
import RegsiterPage from "./Auth/Register";
import CoursesPage from "./Course/Courses";
import PricingPage from "./Pricing/Pricing";
import AppContext from "../shared/context";
import { useContext } from "react";
import { toast } from "react-toastify";

export const ROUTE = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  COURSE: "/course",
  PLAN: "/plan/pricing",
};

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE.HOME} element={<Homepage />} />
        <Route path={ROUTE.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE.REGISTER} element={<RegsiterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTE.COURSE} element={<CoursesPage />} />
          <Route path={ROUTE.PLAN} element={<PricingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const ProtectedRoute: React.FC<any> = () => {
  const { token } = useContext(AppContext);

  let isAuth: string | boolean | null = false;
  const parseJwt = (token: string | null) => {
    try {
      if (token) {
        return JSON.parse(atob(token.split(".")[1]));
      }
    } catch (e) {
      return null;
    }
  };
  const decodedToken = parseJwt(token);
  try {
    if (decodedToken) {
      const tokenIsExpired = decodedToken.exp * 1000 < Date.now();
      isAuth = token || !tokenIsExpired;
      if (!isAuth) {
        toast.error("Token expired- Login again!!");
      }
    } else {
      // throw new Error("You have to login!!");
    }
  } catch (e:any) {
     toast.error(e.message);
    console.log("error", e);
  }
  return !isAuth ? <Outlet /> : <Navigate to={ROUTE.LOGIN} />;
};

export { default as OfflinePage } from "./Offline/Offline";
