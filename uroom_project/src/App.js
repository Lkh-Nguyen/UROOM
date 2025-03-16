import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Routers from "./utils/Routes";

//customer
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
import RoomDetailPage from "pages/customer/home/RoomDetailPage";
import ReportedFeedback from "pages/customer/home/ReportedFeedback";
//hotel_host
import LoginHotelPage from "pages/hotel_host/login_register/LoginHotelPage";
import RegisterHotelPage from "pages/hotel_host/login_register/RegisterHotelPage";
import ForgetPasswordHotelPage from "pages/hotel_host/login_register/ForgetPasswordHotelPage";
import VerifyCodeHotelPage from "pages/hotel_host/login_register/VerifyCodeHotelPage";
import ResetPasswordHotelPage from "pages/hotel_host/login_register/ResetPasswordHotelPage";
import MyAccountHotelPage from "pages/hotel_host/information/MyAccountHotelPage";
import ListFeedbackHotelPage from "pages/hotel_host/Feedback/ListFeedbackHotelPage";
import ReportedFeedbackHotel from "pages/hotel_host/Feedback/ReportedFeedbackHotel";

//admin
import ListFeedbackAdminPage from "pages/admin/feedback/ListFeedbackAdminPage";
import ReportedFeedbackAdmin from "pages/admin/reported_feedback/ReportedFeedbackAdmin";
import DetailReportedAdmin from "pages/admin/reported_feedback/DetailReportedAdmin";
import ListCustomerAdmin from "pages/admin/customer/ListCustomerAdmin";
import DetailCustomerAdmin from "pages/admin/customer/DetailCustomerAdmin";
import DocumentUpload from "pages/customer/login_register/DocumentUpload";
import ExmapleConfirmationModal from "components/css/ExmapleConfirmationModal";
import HomeNotLogin from "pages/customer/home/HomePageNotLogin";
import PaymentFailedPage from "pages/customer/home/PaymentFailedPage";
import VerifyCodeRegisterPage from "pages/customer/login_register/VerifyCodeRegisterPage";

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
        <Route path={Routers.VerifyCodeRegisterPage} element={<VerifyCodeRegisterPage/>} />
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
        <Route path={Routers.PaymentFailedPage} element={<PaymentFailedPage/>} />
        <Route path={Routers.Home} element={<Home/>} />
        <Route path={Routers.Home_detail} element={<Home_detail/>} />
        <Route path={Routers.HotelSearchPage} element={<HotelSearchPage/>} />
        <Route path={Routers.RoomDetailPage} element={<RoomDetailPage/>} />
        <Route path={Routers.ReportedFeedback} element={<ReportedFeedback/>} />

        {/*|Hotel Host */}
        <Route path={Routers.LoginHotelPage} element={<LoginHotelPage/>} />
        <Route path={Routers.RegisterHotelPage} element={<RegisterHotelPage/>} />
        <Route path={Routers.ForgetPasswordHotelPage} element={<ForgetPasswordHotelPage/>} />
        <Route path={Routers.VerifyCodeHotelPage} element={<VerifyCodeHotelPage/>} />
        <Route path={Routers.ResetPasswordHotelPage} element={<ResetPasswordHotelPage/>} />
        <Route path={Routers.MyAccountHotelPage} element={<MyAccountHotelPage/>} />
        <Route path={Routers.ListFeedbackHotelPage} element={<ListFeedbackHotelPage/>} />
        <Route path={Routers.ReportedFeedbackHotel} element={<ReportedFeedbackHotel/>} />
        <Route path={Routers.DocumentUpload} element={<DocumentUpload/>} />

        {/*Admin */}
        
        <Route path={Routers.ListFeedbackAdminPage} element={<ListFeedbackAdminPage/>} />
        <Route path={Routers.ReportedFeedbackAdmin} element={<ReportedFeedbackAdmin/>} />
        <Route path={Routers.DetailReportedAdmin} element={<DetailReportedAdmin/>} />
        <Route path={Routers.ListCustomerAdmin} element={<ListCustomerAdmin/>} />
        <Route path={Routers.ListCustomerAdmin} element={<ListCustomerAdmin/>} />
        <Route path={Routers.DetailCustomerAdmin} element={<DetailCustomerAdmin/>} />

        {/*Example Components */}
        <Route path={Routers.ExmapleConfirmationModal} element={<ExmapleConfirmationModal/>} />
        <Route path={Routers.HomeNotLogin} element={<HomeNotLogin/>} />

      </Routes>
    </Router>
  );
}

export default App;
