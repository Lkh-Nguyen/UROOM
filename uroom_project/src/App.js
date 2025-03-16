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
import HotelSearchPage from "pages/customer/home/HotelSearchPage";
import LoginHotelHostPage from "pages/hotel_host/login_register/LoginHotelHostPage";
import RoomDetailPage from "pages/customer/home/RoomDetailPage";
import HotelHostDashboard from "pages/hotelHost/Dashboard";
import Transaction from "pages/hotelHost/Transaction";
import BookingSchedule from "pages/hotelHost/BookingSchedule";
import TransactionDetail from "pages/hotelHost/TransactionDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Routers.BannedPage} element={<BannedPage />} />
        <Route path={Routers.ErrorPage} element={<ErrorPage />} />

        {/*Customer And Guest */}
        {/*Login, Register, Forget Password */}
        <Route path={Routers.LoginPage} element={<LoginPage />} />
        <Route path={Routers.RegisterPage} element={<RegisterPage />} />
        <Route
          path={Routers.ForgetPasswordPage}
          element={<ForgetPasswordPage />}
        />
        <Route path={Routers.VerifyCodePage} element={<VerifyCodePage />} />
        <Route
          path={Routers.ResetPasswordPage}
          element={<ResetPasswordPage />}
        />

        {/*Infomation, Avatar */}
        <Route path={Routers.MyAccountPage} element={<MyAccountPage />} />
        <Route path={`${Routers.BookingBill}/:id`} element={<BookingBill />} />
        <Route path={Routers.BookingBill} element={<BookingBill />} />
        <Route path={Routers.CreateFeedback} element={<CreateFeedback />} />

        {/*Home*/}
<<<<<<< HEAD
        <Route path={Routers.BookingCheckPage} element={<BookingCheckPage />} />
        <Route path={Routers.PaymentPage} element={<PaymentPage />} />
        <Route
          path={Routers.PaymentSuccessPage}
          element={<PaymentSuccessPage />}
        />
        <Route path={Routers.Home} element={<Home />} />
        <Route path={Routers.Home_detail} element={<Home_detail />} />
        <Route path={Routers.HotelSearchPage} element={<HotelSearchPage />} />
        <Route path={Routers.RoomDetailPage} element={<RoomDetailPage />} />

        {/*|Hotel Host */}
        <Route
          path={Routers.LoginHotelHostPage}
          element={<LoginHotelHostPage />}
        />
        <Route
          path={Routers.HotelHostDashboard}
          element={<HotelHostDashboard />}
        />
        <Route path={Routers.Transaction} element={<Transaction />} />
        <Route path={Routers.BookingSchedule} element={<BookingSchedule />} />
        <Route path={Routers.TransactionDetail} element={<TransactionDetail />} />
=======
        <Route path={Routers.BookingCheckPage} element={<BookingCheckPage/>} />
        <Route path={Routers.PaymentPage} element={<PaymentPage/>} />
        <Route path={Routers.PaymentSuccessPage} element={<PaymentSuccessPage/>} />
        <Route path={Routers.Home} element={<Home/>} />
        <Route path={Routers.Home_detail} element={<Home_detail/>} />
        <Route path={Routers.HotelSearchPage} element={<HotelSearchPage/>} />
        <Route path={Routers.RoomDetailPage} element={<RoomDetailPage/>} />

        {/*|Hotel Host */}
        <Route path={Routers.LoginHotelHostPage} element={<LoginHotelHostPage/>} />



>>>>>>> 8e125424ba5354dc8ab7d86b78a62b16ff936f31
      </Routes>
    </Router>
  );
}

export default App;
