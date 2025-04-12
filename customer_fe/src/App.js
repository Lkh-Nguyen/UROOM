import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Routers from "./utils/Routes";

//customer
import BannedPage from "./pages/BannedPage";
import ErrorPage from "./pages/ErrorPage";
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
import BookingCheckPage from "pages/customer/home/BookingCheckPage";
import PaymentPage from "pages/customer/home/PaymentPage";
import PaymentSuccessPage from "pages/customer/home/PaymentSuccessPage";
import HotelSearchPage from "pages/customer/home/HotelSearchPage";
import VerifyCodeRegisterPage from "pages/customer/login_register/VerifyCodeRegisterPage";
import PaymentFailedPage from "pages/customer/home/PaymentFailedPage";
import RoomDetailPage from "pages/customer/home/RoomDetailPage";
import ReportedFeedback from "pages/customer/home/ReportedFeedback";
import ChatPage from "pages/customer/home/ChatPage";
import { useEffect } from "react";
import { getToken } from "utils/handleToken";
import { useDispatch } from "react-redux";
import AuthActions from "./redux/auth/actions";
import { useAppSelector } from "./redux/store";


function App() {
   const SearchInformation = useAppSelector(
      (state) => state.Search.SearchInformation
    );
  return (
    <Router>
      <Routes>
        <Route path={Routers.LoginPage} element={<LoginPage />} />

        <Route path={Routers.RegisterPage} element={<RegisterPage />} />
        <Route path={Routers.VerifyCodeRegisterPage} element={<VerifyCodeRegisterPage />} />
        
        <Route path={Routers.ForgetPasswordPage} element={<ForgetPasswordPage />} />
        <Route path={Routers.VerifyCodePage} element={<VerifyCodePage />} />
        <Route path={Routers.ResetPasswordPage} element={<ResetPasswordPage />} />

        {/*Infomation, Avatar */}
        <Route path={Routers.MyAccountPage} element={<MyAccountPage />} />
        <Route path={`${Routers.BookingBill}/:id`} element={<BookingBill />} />
        <Route path={Routers.BookingBill} element={<BookingBill />} />
        <Route path={Routers.CreateFeedback} element={<CreateFeedback />} />

        {/*Home*/}
        <Route path={Routers.Home} element={<Home />} />
        <Route path={Routers.HotelSearchPage} element={<HotelSearchPage />} />
        <Route path={Routers.Home_detail} element={<Home_detail />} />
        <Route path={Routers.RoomDetailPage} element={<RoomDetailPage />} />
        <Route path={Routers.BookingCheckPage} element={<BookingCheckPage />} />
        <Route path={Routers.ReportedFeedback} element={<ReportedFeedback />} />
        <Route path={Routers.PaymentPage} element={<PaymentPage />} />
        <Route path={Routers.PaymentSuccessPage} element={<PaymentSuccessPage/>}/>
        <Route path={Routers.PaymentFailedPage} element={<PaymentFailedPage/>}/>

        <Route path={Routers.BannedPage} element={<BannedPage />} />
        <Route path={Routers.ErrorPage} element={<ErrorPage />} />
        <Route path={Routers.ChatPage} element={<ChatPage />} />

      </Routes>
    </Router>
  );
}

export default App;
