import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Routers from "./utils/Routes";
import LoginPage from "./pages/customer/login_register/LoginPage";
import RegisterPage from "./pages/customer/login_register/RegisterPage";
import ForgetPasswordPage from "./pages/customer/login_register/ForgetPasswordPage";
import VerifyCodePage from "./pages/customer/login_register/VerifyCodePage";
import ResetPasswordPage from "./pages/customer/login_register/ResetPasswordPage";
import MyAccountPage from "./pages/customer/information/MyAccountPage";
import Home_detail from "./pages/customer/home/home_detail";
import Home from "./pages/customer/home/home.jsx";


function App() {
  return (
    <Router>
      <Routes>

        {/*Customer And Guest */}
        {/*Login, Register, Forget Password */}
        <Route path={Routers.LoginPage} element={<LoginPage/>} />
        <Route path={Routers.RegisterPage} element={<RegisterPage/>} />
        <Route path={Routers.ForgetPasswordPage} element={<ForgetPasswordPage/>} />
        <Route path={Routers.VerifyCodePage} element={<VerifyCodePage/>} />
        <Route path={Routers.ResetPasswordPage} element={<ResetPasswordPage/>} />
        {/*Infomation, Avatar */}
        <Route path={Routers.MyAccountPage} element={<MyAccountPage/>} />
        <Route path={Routers.Home_detail} element={<Home_detail/>} />
        <Route path={Routers.Home} element={<Home/>} />

      </Routes>
    </Router>
  );
}

export default App;
