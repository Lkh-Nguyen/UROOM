import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Routers from "./utils/Routes";
import LoginPage from "./pages/customer/login_register/LoginPage";
import RegisterPage from "./pages/customer/login_register/RegisterPage";
import ForgetPasswordPage from "./pages/customer/login_register/ForgetPasswordPage";
import VerifyCodePage from "./pages/customer/login_register/VerifyCodePage";
import ResetPasswordPage from "./pages/customer/login_register/ResetPasswordPage";
import MyAccountPage from "./pages/customer/information/MyAccountPage";
import Home_detail from "./pages/customer/home/HomeDetailPage";
import Home from "./pages/customer/home/HomePage.jsx";

import BookingBill from "./pages/customer/information/BookingBill";
import CreateFeedback from "./pages/customer/information/CreateFeedback";
import BannedPage from "./pages/BannedPage";
import ErrorPage from "./pages/ErrorPage";
import BookingCheckPage from "pages/customer/home/BookingCheckPage";
import PaymentPage from "pages/customer/home/PaymentPage";
import PaymentSuccessPage from "pages/customer/home/PaymentSuccessPage";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path={Routers.BannedPage} element={<BannedPage/>} />
        <Route path={Routers.ErrorPage} element={<ErrorPage/>} />

        {/*Customer And Guest */}
        {/*Login, Register, Forget Password */}
        <Route path={Routers.LoginPage} element={<LoginPage/>} />
        <Route path={Routers.RegisterPage} element={<RegisterPage/>} />
        <Route path={Routers.ForgetPasswordPage} element={<ForgetPasswordPage/>} />
        <Route path={Routers.VerifyCodePage} element={<VerifyCodePage/>} />
        <Route path={Routers.ResetPasswordPage} element={<ResetPasswordPage/>} />

        {/*Infomation, Avatar */}
        <Route path={Routers.MyAccountPage} element={<MyAccountPage/>} />
        <Route path={`${Routers.BookingBill}/:id`} element={<BookingBill/>} />
        <Route path={Routers.BookingBill} element={<BookingBill/>} />
        <Route path={Routers.CreateFeedback} element={<CreateFeedback/>} />

        {/*Home*/}
        <Route path={Routers.BookingCheckPage} element={<BookingCheckPage/>} />
        <Route path={Routers.PaymentPage} element={<PaymentPage/>} />
        <Route path={Routers.PaymentSuccessPage} element={<PaymentSuccessPage/>} />
        <Route path={Routers.Home} element={<Home/>} />
        <Route path={Routers.Home_detail} element={<Home_detail/>} />

      </Routes>
    </Router>
  );
}

export default App;
