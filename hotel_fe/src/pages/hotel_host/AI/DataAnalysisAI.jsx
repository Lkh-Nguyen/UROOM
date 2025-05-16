// import DataAnalysisAI from "pages/hotel_host/RoomAvailabilityCalendar"

import { useState } from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import RoomAvailabilityCalendar from "@pages/hotel_host/RoomAvailabilityCalendar";
import Transaction from "@pages/hotel_host/Transaction";
import AdditionalServicesPage from "../service/AdditionalServicesPage";
import RoomListingPage from "../create_hotel/RoomListingPage";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as Routers from "../../../utils/Routes";
import MyAccountHotelPage from "../information/MyAccountHotelPage";
import HotelManagement from "../hotel/HotelManagement";
import ListFeedbackHotelPage from "../Feedback/ListFeedbackHotelPage";
import Chat from "../Chat";
import { useAppSelector } from "@redux/store";
import { Dropdown, Image } from "react-bootstrap";
import { useAppDispatch } from "@redux/store";
import AuthActions from "@redux/auth/actions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const Auth = useAppSelector((state) => state.Auth.Auth);
  console.log("Auth: ", Auth);
  const navigate = useNavigate();
  const dispatch= useAppDispatch();
  // Dữ liệu biểu đồ doanh thu
  const revenueData = {
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
    datasets: [
      {
        label: "Doanh thu thực tế",
        data: [
          12500, 13200, 15400, 18900, 21500, 25800, 28900, 27600, 24300, 19800,
          16500, 22100,
        ],
        borderColor: "#4361ee",
        backgroundColor: "rgba(67, 97, 238, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Dự đoán (AI)",
        data: [
          12000, 13000, 15000, 19000, 22000, 26000, 29000, 28000, 24000, 20000,
          17000, 23000,
        ],
        borderColor: "#f72585",
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Dữ liệu biểu đồ tỷ lệ lấp đầy
  const occupancyData = {
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
    datasets: [
      {
        label: "Tỷ lệ lấp đầy (%)",
        data: [65, 68, 72, 78, 82, 88, 92, 90, 85, 76, 70, 80],
        backgroundColor: "#4cc9f0",
        borderColor: "#4361ee",
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu biểu đồ phân khúc khách hàng
  const customerSegmentData = {
    labels: [
      "Doanh nhân",
      "Gia đình",
      "Cặp đôi",
      "Du lịch một mình",
      "Đoàn du lịch",
    ],
    datasets: [
      {
        data: [35, 25, 20, 10, 10],
        backgroundColor: [
          "#4361ee",
          "#3a0ca3",
          "#4cc9f0",
          "#f72585",
          "#7209b7",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu biểu đồ kênh đặt phòng
  const bookingChannelData = {
    labels: [
      "Website khách sạn",
      "OTAs",
      "Đại lý du lịch",
      "Trực tiếp",
      "Khác",
    ],
    datasets: [
      {
        data: [30, 40, 15, 10, 5],
        backgroundColor: [
          "#4cc9f0",
          "#4361ee",
          "#3a0ca3",
          "#7209b7",
          "#f72585",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu AI Insights
  const aiInsights = [
    {
      id: 1,
      title: "Dự đoán nhu cầu cao điểm",
      description:
        "Dự kiến nhu cầu tăng 23% vào tháng 7-8. Cân nhắc tăng giá phòng và chuẩn bị nhân sự.",
      impact: "high",
      category: "demand",
    },
    {
      id: 2,
      title: "Phân tích tỷ lệ hoàn trả",
      description:
        "Tỷ lệ hoàn trả giảm 5% so với quý trước. Chính sách hủy linh hoạt đang phát huy hiệu quả.",
      impact: "medium",
      category: "operations",
    },
    {
      id: 3,
      title: "Phân khúc khách hàng mới nổi",
      description:
        "Phát hiện sự gia tăng 15% khách du lịch một mình. Cân nhắc tạo gói dịch vụ đặc biệt.",
      impact: "medium",
      category: "customers",
    },
    {
      id: 4,
      title: "Cơ hội tăng doanh thu",
      description:
        "Phân tích cho thấy tiềm năng tăng 18% doanh thu từ dịch vụ spa nếu có gói combo với phòng.",
      impact: "high",
      category: "revenue",
    },
    {
      id: 5,
      title: "Tối ưu hóa nhân sự",
      description:
        "Mô hình dự đoán cho thấy có thể giảm 7% chi phí nhân sự bằng cách điều chỉnh lịch làm việc.",
      impact: "medium",
      category: "operations",
    },
  ];

  // Dữ liệu đặt phòng gần đây
  const recentBookings = [
    {
      id: "B-7829",
      guest: "Nguyễn Văn A",
      room: "Deluxe 301",
      checkin: "15/06/2025",
      checkout: "18/06/2025",
      status: "Đã xác nhận",
      amount: "4,500,000 VND",
    },
    {
      id: "B-7830",
      guest: "Trần Thị B",
      room: "Suite 502",
      checkin: "16/06/2025",
      checkout: "20/06/2025",
      status: "Đã thanh toán",
      amount: "12,800,000 VND",
    },
    {
      id: "B-7831",
      guest: "Lê Văn C",
      room: "Standard 205",
      checkin: "16/06/2025",
      checkout: "17/06/2025",
      status: "Đang xử lý",
      amount: "1,200,000 VND",
    },
    {
      id: "B-7832",
      guest: "Phạm Thị D",
      room: "Deluxe 305",
      checkin: "17/06/2025",
      checkout: "22/06/2025",
      status: "Đã xác nhận",
      amount: "7,500,000 VND",
    },
    {
      id: "B-7833",
      guest: "Hoàng Văn E",
      room: "Suite 501",
      checkin: "18/06/2025",
      checkout: "25/06/2025",
      status: "Đã thanh toán",
      amount: "18,900,000 VND",
    },
  ];

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f8f9fa;
            overflow-x: hidden;
          }
          
          .sidebar {
            width: 250px;
            min-height: 100vh;
            padding: 0;
            display: flex;
            flex-direction: column;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 100;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            background-color: #212529;
            color: white;
          }
          
          .sidebar-brand {
            background-color: #212529;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 0;
          }
          
          .main-content {
            flex-grow: 1;
            margin-left: 250px;
            min-height: 100vh;
            background-color: #f8f9fa;
          }
          
          .nav-item {
            margin-bottom: 2px;
          }
          
          .nav-link {
            padding: 12px 20px;
            transition: all 0.3s;
            color: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
          }
          
          .nav-link:hover {
            background-color: rgba(255, 255, 255, 0.1);
            color: #fff !important;
          }
          
          .nav-link.active {
            background-color: #0d6efd;
            color: #fff;
          }
          
          .nav-icon {
            width: 20px;
            margin-right: 10px;
            text-align: center;
          }
          
          .card {
            border-radius: 10px;
            transition: transform 0.3s, box-shadow 0.3s;
            margin-bottom: 20px;
            border: none;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
          }
          
          .stat-icon {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }
          
          .light-primary {
            background-color: rgba(13, 110, 253, 0.1);
            color: #0d6efd;
          }
          
          .light-success {
            background-color: rgba(25, 135, 84, 0.1);
            color: #198754;
          }
          
          .light-warning {
            background-color: rgba(255, 193, 7, 0.1);
            color: #ffc107;
          }
          
          .light-info {
            background-color: rgba(13, 202, 240, 0.1);
            color: #0dcaf0;
          }
          
          .ai-assistant-card {
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
          }
          
          .ai-insight-item {
            transition: all 0.3s;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            background-color: #f8f9fa;
            border-left: 5px solid #0d6efd;
          }
          
          .ai-insight-item:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          
          .insight-icon {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }
          
          .chart-container {
            height: 250px;
          }
          
          .table th {
            font-weight: 600;
            font-size: 0.85rem;
          }
          
          .table-hover tbody tr:hover {
            background-color: rgba(13, 110, 253, 0.05);
          }
          
          @media (max-width: 992px) {
            .sidebar {
              width: 70px !important;
            }
            
            .sidebar .nav-link span, .sidebar-brand h4 {
              display: none;
            }
            
            .main-content {
              margin-left: 70px !important;
            }
          }
          
          @media (max-width: 768px) {
            .sidebar {
              width: 0 !important;
              transform: translateX(-100%);
            }
            
            .main-content {
              margin-left: 0 !important;
            }
          }
        `}
      </style>
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-brand d-flex align-items-center justify-content-center">
            <i className="bi bi-building fs-2 me-2"></i>
            <h4 className="mb-0">Hotel partner</h4>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "dashboard" ? "active" : ""
                }`}
                href="#"
                onClick={() => setActiveTab("dashboard")}
              >
                <i className="bi bi-speedometer2 nav-icon"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "bookings" ? "active" : ""
                }`}
                href="#"
                onClick={() => setActiveTab("bookings")}
              >
                <i className="bi bi-calendar-check nav-icon"></i>
                <span>Đặt phòng</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "transaction" ? "active" : ""
                }`}
                href="#"
                onClick={() => setActiveTab("transaction")}
              >
                <i className="bi bi-calendar-check nav-icon"></i>
                <span>Giao dịch</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "hotels" ? "active" : ""}`}
                href="#"
                onClick={() => setActiveTab("hotels")}
              >
                <i className="bi bi-people nav-icon"></i>
                <span>Quản lý khách sạn</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "rooms" ? "active" : ""}`}
                href="#"
                onClick={() => setActiveTab("rooms")}
              >
                <i className="bi bi-people nav-icon"></i>
                <span>Quản lý phòng</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "services" ? "active" : ""
                }`}
                href="#"
                onClick={() => setActiveTab("services")}
              >
                <i className="bi bi-people nav-icon"></i>
                <span>Quản lý dịch vụ</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "revenue" ? "active" : ""
                }`}
                href="#"
                onClick={() => setActiveTab("revenue")}
              >
                <i className="bi bi-graph-up nav-icon"></i>
                <span>Doanh thu</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "ai-insights" ? "active" : ""
                }`}
                href="#"
                onClick={() => setActiveTab("ai-insights")}
              >
                <i className="bi bi-robot nav-icon"></i>
                <span>AI Insights</span>
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "feedbacks" ? "active" : ""
                }`}
                href="#"
                onClick={() => setActiveTab("feedbacks")}
              >
                <i className="bi-chat-left-text"/>
                <span style={{marginLeft: '10px'}}>Đánh giá khách sạn</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "mess" ? "active" : ""}`}
                href="#"
                onClick={() => setActiveTab("mess")}
              >
                <i className="bi bi-robot nav-icon"></i>
                <span>Tin nhắn</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "setting" ? "active" : ""}`}
                href="#"
                onClick={() => setActiveTab("setting")}
              >
                <i className="bi bi-gear nav-icon"></i>
                <span>Cài đặt</span>
              </a>
            </li>
          </ul>

          <div className="mt-auto p-3">
            <div className="ai-assistant-card p-3">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-robot fs-3 me-2"></i>
                <h6 className="mb-0">Trợ lý AI</h6>
              </div>
              <p className="small mb-2">
                Hỏi tôi bất cứ điều gì về khách sạn của bạn
              </p>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nhập câu hỏi..."
                />
                <button className="btn btn-primary btn-sm">
                  <i className="bi bi-send"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="main-content">
          {/* Header */}
          <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container-fluid">
              <button className="btn btn-sm" type="button">
                <i className="bi bi-list fs-5"></i>
              </button>
              <div className="d-flex align-items-center">
                <div className="dropdown me-3">
                  <button
                    className="btn btn-sm position-relative"
                    type="button"
                  >
                    <i className="bi bi-bell fs-5"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      3
                    </span>
                  </button>
                </div>
                {Auth._id !== -1 && (
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="light"
                      className="login-btn d-flex align-items-center"
                    >
                      <a
                        style={{
                          display: "inline-block",
                          maxWidth: "150px", // hoặc width tùy bạn
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {Auth.name}
                      </a>{" "}
                      <Image
                        src={
                          Auth?.image?.url != "" &&
                          Auth?.image?.url != undefined
                            ? Auth?.image?.url
                            : "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
                        }
                        roundedCircle
                        width="30"
                        height="30"
                        className="ms-2 me-2"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() =>{
                          navigate(Routers.MyAccountHotelPage)
                        }}
                      >
                        View Information
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          navigate(Routers.HomeHotel, {
                            state: {
                              message: "Logout account successfully !!!",
                            },
                          });
                        }}
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            </div>
          </nav>

          {/* Dashboard Content */}
          <div className="container-fluid p-4">
            {activeTab === "dashboard" && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4>Tổng quan khách sạn</h4>
                  <div className="d-flex">
                    <select className="form-select form-select-sm me-2">
                      <option>Hôm nay</option>
                      <option>Tuần này</option>
                      <option defaultValue="selected">Tháng này</option>
                      <option>Quý này</option>
                      <option>Năm nay</option>
                    </select>
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-download me-1"></i> Xuất báo cáo
                    </button>
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="text-muted">Tỷ lệ lấp đầy</h6>
                            <h3 className="mb-0">82.5%</h3>
                            <small className="text-success">
                              <i className="bi bi-arrow-up"></i> 4.2% so với
                              tháng trước
                            </small>
                          </div>
                          <div className="stat-icon light-primary">
                            <i className="bi bi-house-door fs-4"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="text-muted">
                              Doanh thu trung bình/phòng
                            </h6>
                            <h3 className="mb-0">2.4M</h3>
                            <small className="text-success">
                              <i className="bi bi-arrow-up"></i> 6.8% so với
                              tháng trước
                            </small>
                          </div>
                          <div className="stat-icon light-success">
                            <i className="bi bi-cash-stack fs-4"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="text-muted">Đánh giá trung bình</h6>
                            <h3 className="mb-0">4.7/5</h3>
                            <small className="text-success">
                              <i className="bi bi-arrow-up"></i> 0.2 so với
                              tháng trước
                            </small>
                          </div>
                          <div className="stat-icon light-warning">
                            <i className="bi bi-star fs-4"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="text-muted">Tỷ lệ khách quay lại</h6>
                            <h3 className="mb-0">28.3%</h3>
                            <small className="text-danger">
                              <i className="bi bi-arrow-down"></i> 1.5% so với
                              tháng trước
                            </small>
                          </div>
                          <div className="stat-icon light-info">
                            <i className="bi bi-repeat fs-4"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="row mb-4">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <h5 className="card-title">Phân tích doanh thu</h5>
                            <p className="text-muted small mb-0">
                              So sánh doanh thu thực tế với dự đoán AI
                            </p>
                          </div>
                          <div className="btn-group">
                            <button className="btn btn-sm btn-outline-secondary">
                              Ngày
                            </button>
                            <button className="btn btn-sm btn-outline-secondary">
                              Tuần
                            </button>
                            <button className="btn btn-sm btn-primary">
                              Tháng
                            </button>
                            <button className="btn btn-sm btn-outline-secondary">
                              Năm
                            </button>
                          </div>
                        </div>
                        <Line
                          data={revenueData}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                position: "top",
                              },
                            },
                            scales: {
                              y: {
                                beginAtZero: false,
                                grid: {
                                  drawBorder: false,
                                },
                                ticks: {
                                  callback: (value) => value / 1000 + "K",
                                },
                              },
                              x: {
                                grid: {
                                  display: false,
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">Phân khúc khách hàng</h5>
                        <p className="text-muted small mb-4">
                          Phân tích theo loại khách hàng
                        </p>
                        <div className="chart-container">
                          <Doughnut
                            data={customerSegmentData}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: {
                                  position: "bottom",
                                },
                              },
                              cutout: "70%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insights and Bookings */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="card-title">AI Insights</h5>
                          <a
                            href="#"
                            className="btn btn-sm btn-link text-decoration-none"
                            onClick={() => setActiveTab("ai-insights")}
                          >
                            Xem tất cả
                          </a>
                        </div>
                        <div className="ai-insights-list">
                          {aiInsights.slice(0, 3).map((insight) => (
                            <div key={insight.id} className="ai-insight-item">
                              <div className="d-flex align-items-center mb-2">
                                <span
                                  className={`badge ${
                                    insight.impact === "high"
                                      ? "bg-danger"
                                      : "bg-warning"
                                  } me-2`}
                                >
                                  {insight.impact === "high"
                                    ? "Quan trọng"
                                    : "Trung bình"}
                                </span>
                                <h6 className="mb-0">{insight.title}</h6>
                              </div>
                              <p className="mb-0 small">
                                {insight.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="card-title">Đặt phòng gần đây</h5>
                          <a
                            href="#"
                            className="btn btn-sm btn-link text-decoration-none"
                            onClick={() => setActiveTab("bookings")}
                          >
                            Xem tất cả
                          </a>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead className="table-light">
                              <tr>
                                <th>ID</th>
                                <th>Khách hàng</th>
                                <th>Check-in</th>
                                <th>Trạng thái</th>
                                <th>Số tiền</th>
                              </tr>
                            </thead>
                            <tbody>
                              {recentBookings.slice(0, 4).map((booking) => (
                                <tr key={booking.id}>
                                  <td>{booking.id}</td>
                                  <td>{booking.guest}</td>
                                  <td>{booking.checkin}</td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        booking.status === "Đã xác nhận"
                                          ? "bg-success"
                                          : booking.status === "Đã thanh toán"
                                          ? "bg-primary"
                                          : "bg-warning"
                                      }`}
                                    >
                                      {booking.status}
                                    </span>
                                  </td>
                                  <td>{booking.amount}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "ai-insights" && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h4>AI Insights</h4>
                    <p className="text-muted">
                      Phân tích thông minh và dự đoán từ AI
                    </p>
                  </div>
                  <div className="d-flex">
                    <select className="form-select form-select-sm me-2">
                      <option>Tất cả danh mục</option>
                      <option>Nhu cầu</option>
                      <option>Doanh thu</option>
                      <option>Khách hàng</option>
                      <option>Vận hành</option>
                    </select>
                    <select className="form-select form-select-sm me-2">
                      <option>Tất cả mức độ</option>
                      <option>Cao</option>
                      <option>Trung bình</option>
                      <option>Thấp</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  {aiInsights.map((insight) => (
                    <div key={insight.id} className="col-md-6 mb-4">
                      <div className="card h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-3">
                            <div
                              className={`insight-icon me-3 ${
                                insight.category === "demand"
                                  ? "light-primary"
                                  : insight.category === "revenue"
                                  ? "light-success"
                                  : insight.category === "customers"
                                  ? "light-info"
                                  : "light-warning"
                              }`}
                            >
                              <i
                                className={`bi ${
                                  insight.category === "demand"
                                    ? "bi-graph-up"
                                    : insight.category === "revenue"
                                    ? "bi-cash-coin"
                                    : insight.category === "customers"
                                    ? "bi-people"
                                    : "bi-gear"
                                } fs-4`}
                              ></i>
                            </div>
                            <div>
                              <span
                                className={`badge ${
                                  insight.impact === "high"
                                    ? "bg-danger"
                                    : "bg-warning"
                                } mb-1`}
                              >
                                {insight.impact === "high"
                                  ? "Quan trọng"
                                  : "Trung bình"}
                              </span>
                              <h5 className="mb-0">{insight.title}</h5>
                            </div>
                          </div>
                          <p className="mb-3">{insight.description}</p>
                          <div className="d-flex justify-content-between">
                            <span className="badge bg-light text-dark">
                              {insight.category === "demand"
                                ? "Nhu cầu"
                                : insight.category === "revenue"
                                ? "Doanh thu"
                                : insight.category === "customers"
                                ? "Khách hàng"
                                : "Vận hành"}
                            </span>
                            <button className="btn btn-sm btn-outline-primary">
                              Xem chi tiết
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title mb-4">
                      Dự đoán nhu cầu theo mùa
                    </h5>
                    <Bar
                      data={{
                        labels: [
                          "T1",
                          "T2",
                          "T3",
                          "T4",
                          "T5",
                          "T6",
                          "T7",
                          "T8",
                          "T9",
                          "T10",
                          "T11",
                          "T12",
                        ],
                        datasets: [
                          {
                            label: "Tỷ lệ lấp đầy dự kiến (%)",
                            data: [
                              65, 68, 72, 78, 82, 88, 92, 90, 85, 76, 70, 80,
                            ],
                            backgroundColor: "#4cc9f0",
                          },
                          {
                            label: "Giá phòng trung bình dự kiến (triệu VND)",
                            data: [
                              1.2, 1.3, 1.4, 1.5, 1.6, 1.8, 2.0, 2.0, 1.7, 1.5,
                              1.4, 1.6,
                            ],
                            backgroundColor: "#f72585",
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: "top",
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === "bookings" && (
              <>
                <RoomAvailabilityCalendar />
              </>
            )}

            {activeTab === "transaction" && (
              <>
                <Transaction />
              </>
            )}

            {activeTab === "hotels" && (
              <>
                <HotelManagement />
              </>
            )}

            {activeTab === "rooms" && (
              <>
                <RoomListingPage />
              </>
            )}

            {activeTab === "services" && (
              <>
                <AdditionalServicesPage />
              </>
            )}

            {activeTab === "settings" && (
              <>
                <MyAccountHotelPage />
              </>
            )}

            {activeTab === "feedbacks" && (
              <>
                <ListFeedbackHotelPage />
              </>
            )}
            {activeTab === "mess" && (
              <>
                <Chat />
              </>
            )}
            {activeTab === "setting" && (
              <>
                <MyAccountHotelPage />
              </>
            )}

            {activeTab === "revenue" && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h4>Phân tích doanh thu</h4>
                    <p className="text-muted">
                      Theo dõi và phân tích doanh thu của khách sạn
                    </p>
                  </div>
                  <div className="d-flex">
                    <select className="form-select form-select-sm me-2">
                      <option>Tháng này</option>
                      <option>Quý này</option>
                      <option>Năm nay</option>
                      <option>Tùy chỉnh</option>
                    </select>
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-download me-1"></i> Xuất báo cáo
                    </button>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="text-muted">Tổng doanh thu</h6>
                        <h3 className="mb-0">1.25 Tỷ</h3>
                        <small className="text-success">
                          <i className="bi bi-arrow-up"></i> 12.5% so với kỳ
                          trước
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="text-muted">RevPAR</h6>
                        <h3 className="mb-0">1.8M</h3>
                        <small className="text-success">
                          <i className="bi bi-arrow-up"></i> 8.3% so với kỳ
                          trước
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="text-muted">ADR</h6>
                        <h3 className="mb-0">2.2M</h3>
                        <small className="text-success">
                          <i className="bi bi-arrow-up"></i> 5.2% so với kỳ
                          trước
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="text-muted">Lợi nhuận</h6>
                        <h3 className="mb-0">420M</h3>
                        <small className="text-success">
                          <i className="bi bi-arrow-up"></i> 15.8% so với kỳ
                          trước
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title mb-4">Xu hướng doanh thu</h5>
                        <Line
                          data={revenueData}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                position: "top",
                              },
                            },
                            scales: {
                              y: {
                                beginAtZero: false,
                                grid: {
                                  drawBorder: false,
                                },
                                ticks: {
                                  callback: (value) => value / 1000 + "K",
                                },
                              },
                              x: {
                                grid: {
                                  display: false,
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title mb-4">Kênh đặt phòng</h5>
                        <div className="chart-container">
                          <Pie
                            data={bookingChannelData}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: {
                                  position: "bottom",
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title mb-4">
                      Phân tích doanh thu theo loại phòng
                    </h5>
                    <div className="table-responsive">
                      <table className="table">
                        <thead className="table-light">
                          <tr>
                            <th>Loại phòng</th>
                            <th>Số lượng</th>
                            <th>Tỷ lệ lấp đầy</th>
                            <th>Giá trung bình</th>
                            <th>Doanh thu</th>
                            <th>% Tổng doanh thu</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Standard</td>
                            <td>20</td>
                            <td>85%</td>
                            <td>1.2M</td>
                            <td>408M</td>
                            <td>32.6%</td>
                          </tr>
                          <tr>
                            <td>Deluxe</td>
                            <td>15</td>
                            <td>78%</td>
                            <td>1.8M</td>
                            <td>421M</td>
                            <td>33.7%</td>
                          </tr>
                          <tr>
                            <td>Suite</td>
                            <td>8</td>
                            <td>65%</td>
                            <td>3.5M</td>
                            <td>364M</td>
                            <td>29.1%</td>
                          </tr>
                          <tr>
                            <td>Presidential</td>
                            <td>2</td>
                            <td>45%</td>
                            <td>6.5M</td>
                            <td>58.5M</td>
                            <td>4.6%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
