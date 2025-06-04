import "../../css/admin/Dashboard.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect, useRef } from "react"
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2"
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
} from "chart.js"
import { FaBell } from "react-icons/fa";

import AccountManagement from "./hotelHost/HotelManagement";
import ListCustomerAdmin from "./customer/ListCustomerAdmin";
import ReportedFeedbackAdmin from "./reported_feedback/ReportedFeedbackAdmin";
import ListPaymentHotel from "./payment/ListPaymentHotel";
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
  Filler,
)


function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Yêu cầu phê duyệt mới",
      message: "Luxury Palace Hotel đã gửi yêu cầu phê duyệt",
      time: "5 phút trước",
      isRead: false,
      type: "approval"
    },
    {
      id: 2,
      title: "Báo cáo vi phạm",
      message: "Có báo cáo mới về vi phạm từ khách hàng",
      time: "30 phút trước",
      isRead: false,
      type: "report"
    },
    {
      id: 3,
      title: "Thanh toán mới",
      message: "Giao dịch thanh toán #12345 đã hoàn tất",
      time: "2 giờ trước",
      isRead: true,
      type: "payment"
    }
  ])
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const notificationRef = useRef(null)
  const userMenuRef = useRef(null)

  // Dữ liệu thống kê tổng quan
  const overviewStats = {
    totalHotels: 1245,
    activeHotels: 987,
    pendingApprovals: 58,
    totalCustomers: 25430,
    totalRevenue: "12.5M",
    growthRate: 18.5
  }

  // Dữ liệu biểu đồ doanh thu
  const revenueData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Doanh thu thực tế",
        data: [12500, 13200, 15400, 18900, 21500, 25800, 28900, 27600, 24300, 19800, 16500, 22100],
        borderColor: "#4361ee",
        backgroundColor: "rgba(67, 97, 238, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Dự đoán (AI)",
        data: [12000, 13000, 15000, 19000, 22000, 26000, 29000, 28000, 24000, 20000, 17000, 23000],
        borderColor: "#f72585",
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
      },
    ],
  }

  // Dữ liệu biểu đồ phân bố khách sạn theo khu vực
  const hotelDistributionData = {
    labels: ["Miền Bắc", "Miền Trung", "Miền Nam", "Tây Nguyên", "Ven biển"],
    datasets: [
      {
        data: [35, 25, 30, 5, 15],
        backgroundColor: ["#4361ee", "#3a0ca3", "#4cc9f0", "#f72585", "#7209b7"],
        borderWidth: 1,
      },
    ],
  }

  // Dữ liệu biểu đồ phân loại khách sạn
  const hotelCategoryData = {
    labels: ["5 sao", "4 sao", "3 sao", "2 sao", "Khác"],
    datasets: [
      {
        data: [15, 25, 35, 20, 5],
        backgroundColor: ["#4cc9f0", "#4361ee", "#3a0ca3", "#7209b7", "#f72585"],
        borderWidth: 1,
      },
    ],
  }

  // Dữ liệu yêu cầu phê duyệt gần đây
  const recentApprovals = [
    {
      id: "A-7829",
      hotelName: "Luxury Palace Hotel",
      owner: "Nguyễn Văn A",
      location: "Hà Nội",
      category: "5 sao",
      submittedDate: "15/06/2025",
      status: "Đang chờ",
    },
    {
      id: "A-7830",
      hotelName: "Seaside Resort & Spa",
      owner: "Trần Thị B",
      location: "Đà Nẵng",
      category: "4 sao",
      submittedDate: "16/06/2025",
      status: "Đang xem xét",
    },
    {
      id: "A-7831",
      hotelName: "City Center Hotel",
      owner: "Lê Văn C",
      location: "TP.HCM",
      category: "3 sao",
      submittedDate: "16/06/2025",
      status: "Đang chờ",
    },
    {
      id: "A-7832",
      hotelName: "Mountain View Lodge",
      owner: "Phạm Thị D",
      location: "Đà Lạt",
      category: "4 sao",
      submittedDate: "17/06/2025",
      status: "Đang xem xét",
    },
    {
      id: "A-7833",
      hotelName: "Riverside Boutique Hotel",
      owner: "Hoàng Văn E",
      location: "Huế",
      category: "4 sao",
      submittedDate: "18/06/2025",
      status: "Đang chờ",
    },
  ]

  // Dữ liệu báo cáo feedback gần đây
  const recentReports = [
    {
      id: "R-7829",
      customerName: "Nguyễn Văn X",
      hotelName: "Luxury Palace Hotel",
      reportType: "Vi phạm chính sách",
      submittedDate: "15/06/2025",
      status: "Chưa xử lý",
      severity: "Cao",
    },
    {
      id: "R-7830",
      customerName: "Trần Thị Y",
      hotelName: "Seaside Resort & Spa",
      reportType: "Chất lượng dịch vụ",
      submittedDate: "16/06/2025",
      status: "Đang xử lý",
      severity: "Trung bình",
    },
    {
      id: "R-7831",
      customerName: "Lê Văn Z",
      hotelName: "City Center Hotel",
      reportType: "Sai thông tin",
      submittedDate: "16/06/2025",
      status: "Chưa xử lý",
      severity: "Thấp",
    },
    {
      id: "R-7832",
      customerName: "Phạm Thị K",
      hotelName: "Mountain View Lodge",
      reportType: "Vi phạm chính sách",
      submittedDate: "17/06/2025",
      status: "Đang xử lý",
      severity: "Cao",
    },
  ]

  

  // Dữ liệu danh sách hotel host
  const hotelHosts = [
    {
      id: "H-7829",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0901234567",
      hotels: 3,
      joinDate: "15/01/2023",
      status: "Hoạt động",
    },
    {
      id: "H-7830",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0912345678",
      hotels: 2,
      joinDate: "20/03/2023",
      status: "Hoạt động",
    },
    {
      id: "H-7831",
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0923456789",
      hotels: 1,
      joinDate: "05/05/2023",
      status: "Tạm khóa",
    },
    {
      id: "H-7832",
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      phone: "0934567890",
      hotels: 4,
      joinDate: "12/07/2023",
      status: "Hoạt động",
    },
    {
      id: "H-7833",
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      phone: "0945678901",
      hotels: 2,
      joinDate: "30/09/2023",
      status: "Hoạt động",
    },
  ]



  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Đếm số thông báo chưa đọc
  const unreadCount = notifications.filter(notif => !notif.isRead).length

  // Lấy icon cho loại thông báo
  const getNotificationIcon = (type) => {
    switch (type) {
      case "approval":
        return <i className="bi bi-check-circle-fill notification-icon approval"></i>
      case "report":
        return <i className="bi bi-flag-fill notification-icon report"></i>
      case "payment":
        return <i className="bi bi-cash-coin notification-icon payment"></i>
      default:
        return <i className="bi bi-bell-fill notification-icon"></i>
    }
  }

  // Lấy màu cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "Đã thanh toán":
      case "Hoạt động":
        return "success"
      case "Đang xử lý":
      case "Đang xem xét":
      case "Đang chờ":
        return "warning"
      case "Tạm khóa":
      case "Chưa xử lý":
        return "danger"
      default:
        return "secondary"
    }
  }

  // Lấy màu cho mức độ nghiêm trọng
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Cao":
        return "danger"
      case "Trung bình":
        return "warning"
      case "Thấp":
        return "info"
      default:
        return "secondary"
    }
  }

  return (
    <>
      <div className="admin-dashboard">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <i className="bi bi-building"></i>
              <span className="logo-text">Admin</span>
            </div>
            {/* <button 
              className="sidebar-toggle" 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <i className={`bi bi-chevron-${sidebarCollapsed ? 'right' : 'left'}`}></i>
            </button> */}
          </div>

          <div className="sidebar-content">
           

            <div className="sidebar-menu">
              <h6 className="menu-category">QUẢN LÝ CHÍNH</h6>
              <ul className="menu-items">
                <li className={`menu-item ${activeTab === "dashboard" ? "active" : ""}`}>
                  <a href="#" onClick={() => setActiveTab("dashboard")}>
                    <i className="bi bi-speedometer2"></i>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li className={`menu-item ${activeTab === "hotel-hosts" ? "active" : ""}`}>
                  <a href="#" onClick={() => setActiveTab("hotel-hosts")}>
                    <i className="bi bi-building"></i>
                    <span>Quản lý Hotel Host</span>
                  </a>
                </li>
                <li className={`menu-item ${activeTab === "customers" ? "active" : ""}`}>
                  <a href="#" onClick={() => setActiveTab("customers")}>
                    <i className="bi bi-people"></i>
                    <span>Quản lý Khách hàng</span>
                  </a>
                </li>
                <li className={`menu-item ${activeTab === "approvals" ? "active" : ""}`}>
                  <a href="#" onClick={() => setActiveTab("approvals")}>
                    <i className="bi bi-check-circle"></i>
                    <span>Phê duyệt Khách sạn</span>
                    <span className="badge bg-danger">58</span>
                  </a>
                </li>
              </ul>

              <h6 className="menu-category">BÁO CÁO & THANH TOÁN</h6>
              <ul className="menu-items">
                <li className={`menu-item ${activeTab === "payments" ? "active" : ""}`}>
                  <a href="#" onClick={() => setActiveTab("payments")}>
                    <i className="bi bi-credit-card"></i>
                    <span>Thanh toán</span>
                  </a>
                </li>
                <li className={`menu-item ${activeTab === "reports" ? "active" : ""}`}>
                  <a href="#" onClick={() => setActiveTab("reports")}>
                    <i className="bi bi-flag"></i>
                    <span>Báo cáo vi phạm</span>
                    <span className="badge bg-warning">12</span>
                  </a>
                </li>
               
              </ul>

              
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Header */}
          <header className="header">
            <div className="header-left">
              <div className="search-box">
                <i className="bi bi-search"></i>
                <input 
                  type="text" 
                  placeholder="Tìm kiếm..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="header-right">
              {/* Notification */}
              <div className="notification-container" ref={notificationRef}>
                <button 

                  className="notification-button" 
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                   <FaBell style={{ color: "black" }} />
                  {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                </button>

                {isNotificationOpen && (
                  <div className="notification-dropdown">
                    <div className="notification-header">
                      <h6>Thông báo</h6>
                      <button className="mark-all-read">Đánh dấu đã đọc</button>
                    </div>
                    <div className="notification-body">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                        >
                          <div className="notification-icon-wrapper">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="notification-content">
                            <div className="notification-title">{notification.title}</div>
                            <div className="notification-message">{notification.message}</div>
                            <div className="notification-time">{notification.time}</div>
                          </div>
                          {!notification.isRead && <div className="unread-indicator"></div>}
                        </div>
                      ))}
                    </div>
                    <div className="notification-footer">
                      <button>Xem tất cả thông báo</button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="user-menu-container" ref={userMenuRef}>
                <button 
                  className="user-menu-button" 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <img 
                    src="https://i.pinimg.com/736x/e7/06/6d/e7066d76a429f504ccf2086d09cf8da1.jpg" 
                    alt="Admin" 
                    className="user-avatar" 
                  />
                  <div className="user-info">
                    <span className="user-name">Admin System</span>
                    
                  </div>
                  <i className={`bi bi-chevron-${isUserMenuOpen ? 'up' : 'down'}`}></i>
                </button>

                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <ul>
                    
                     
                      <li className="divider"></li>
                      <li>
                        <a href="#" className="logout">
                          <i className="bi bi-box-arrow-right"></i>
                          <span>Đăng xuất</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="page-content">
            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <div className="dashboard-content">
                <div className="page-header">
                  <h1>Tổng quan hệ thống</h1>
                  <div className="page-actions">
                    <div className="date-filter">
                      <select className="form-select">
                        <option>Hôm nay</option>
                        <option>Tuần này</option>
                        <option selected>Tháng này</option>
                        <option>Năm nay</option>
                      </select>
                    </div>
                    <button className="btn btn-primary">
                      <i className="bi bi-download"></i> Xuất báo cáo
                    </button>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="stats-cards">
                  <div className="stat-card">
                    <div className="stat-card-content">
                      <h3>{overviewStats.totalHotels}</h3>
                      <p>Tổng số khách sạn</p>
                    </div>
                    <div className="stat-card-icon hotels">
                      <i className="bi bi-building"></i>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-card-content">
                      <h3>{overviewStats.activeHotels}</h3>
                      <p>Khách sạn hoạt động</p>
                    </div>
                    <div className="stat-card-icon active">
                      <i className="bi bi-check-circle"></i>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-card-content">
                      <h3>{overviewStats.pendingApprovals}</h3>
                      <p>Chờ phê duyệt</p>
                    </div>
                    <div className="stat-card-icon pending">
                      <i className="bi bi-hourglass-split"></i>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-card-content">
                      <h3>{overviewStats.totalCustomers}</h3>
                      <p>Tổng số khách hàng</p>
                    </div>
                    <div className="stat-card-icon customers">
                      <i className="bi bi-people"></i>
                    </div>
                  </div>
                </div>

                {/* Revenue Chart */}
                <div className="chart-container">
                  <div className="chart-header">
                    <h2>Doanh thu hệ thống</h2>
                    <div className="chart-actions">
                      <div className="btn-group">
                        <button className="btn btn-sm btn-outline-secondary">Ngày</button>
                        <button className="btn btn-sm btn-outline-secondary">Tuần</button>
                        <button className="btn btn-sm btn-primary">Tháng</button>
                        <button className="btn btn-sm btn-outline-secondary">Năm</button>
                      </div>
                    </div>
                  </div>
                  <div className="chart-body">
                    <Line
                      data={revenueData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
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

                {/* Distribution Charts */}
                <div className="charts-row">
                  <div className="chart-container half">
                    <div className="chart-header">
                      <h2>Phân bố khách sạn theo khu vực</h2>
                    </div>
                    <div className="chart-body">
                      <Doughnut
                        data={hotelDistributionData}
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
                  <div className="chart-container half">
                    <div className="chart-header">
                      <h2>Phân loại khách sạn</h2>
                    </div>
                    <div className="chart-body">
                      <Pie
                        data={hotelCategoryData}
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

                {/* Recent Activities */}
                <div className="recent-activities">
                  <div className="activity-container">
                    <div className="activity-header">
                      <h2>Yêu cầu phê duyệt gần đây</h2>
                      <a href="#" onClick={() => setActiveTab("approvals")} className="view-all">Xem tất cả</a>
                    </div>
                    <div className="activity-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Tên khách sạn</th>
                              <th>Chủ sở hữu</th>
                              <th>Địa điểm</th>
                              <th>Ngày gửi</th>
                              <th>Trạng thái</th>
                              <th>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentApprovals.slice(0, 3).map((approval) => (
                              <tr key={approval.id}>
                                <td>{approval.id}</td>
                                <td>{approval.hotelName}</td>
                                <td>{approval.owner}</td>
                                <td>{approval.location}</td>
                                <td>{approval.submittedDate}</td>
                                <td>
                                  <span className={`badge bg-${getStatusColor(approval.status)}`}>
                                    {approval.status}
                                  </span>
                                </td>
                                <td>
                                  <div className="action-buttons">
                                    <button className="btn btn-sm btn-primary">
                                      <i className="bi bi-eye"></i>
                                    </button>
                                    <button className="btn btn-sm btn-success">
                                      <i className="bi bi-check-lg"></i>
                                    </button>
                                    <button className="btn btn-sm btn-danger">
                                      <i className="bi bi-x-lg"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="activity-container">
                    <div className="activity-header">
                      <h2>Báo cáo vi phạm gần đây</h2>
                      <a href="#" onClick={() => setActiveTab("reports")} className="view-all">Xem tất cả</a>
                    </div>
                    <div className="activity-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Khách hàng</th>
                              <th>Khách sạn</th>
                              <th>Loại báo cáo</th>
                              <th>Mức độ</th>
                              <th>Trạng thái</th>
                              <th>Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentReports.slice(0, 3).map((report) => (
                              <tr key={report.id}>
                                <td>{report.id}</td>
                                <td>{report.customerName}</td>
                                <td>{report.hotelName}</td>
                                <td>{report.reportType}</td>
                                <td>
                                  <span className={`badge bg-${getSeverityColor(report.severity)}`}>
                                    {report.severity}
                                  </span>
                                </td>
                                <td>
                                  <span className={`badge bg-${getStatusColor(report.status)}`}>
                                    {report.status}
                                  </span>
                                </td>
                                <td>
                                  <div className="action-buttons">
                                    <button className="btn btn-sm btn-primary">
                                      <i className="bi bi-eye"></i>
                                    </button>
                                    <button className="btn btn-sm btn-warning">
                                      <i className="bi bi-pencil"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hotel Hosts Management */}
            {activeTab === "hotel-hosts" && (
              <AccountManagement/>
            )}

            {/* Customers Management */}
            {activeTab === "customers" && (
              <ListCustomerAdmin/>
            )}

            {/* Hotel Approvals */}
            {activeTab === "approvals" && (
              <div className="approvals-content">
                <div className="page-header">
                  <h1>Phê duyệt Khách sạn</h1>
                  <div className="page-actions">
                    {/* <button className="btn btn-outline-primary">
                      <i className="bi bi-filter"></i> Lọc
                    </button> */}
                    {/* <div className="btn-group">
                      <button className="btn btn-success">
                        <i className="bi bi-check-lg"></i> Phê duyệt đã chọn
                      </button>
                      <button className="btn btn-danger">
                        <i className="bi bi-x-lg"></i> Từ chối đã chọn
                      </button>
                    </div> */}
                  </div>
                </div>

                <div className="content-container">
                  <div className="filters-bar">
                    <div className="search-box">
                      <i className="bi bi-search"></i>
                      <input type="text" placeholder="Tìm kiếm yêu cầu phê duyệt..." />
                    </div>
                    <div className="filters">
                      <select className="form-select">
                        <option>Tất cả trạng thái</option>
                        <option>Đang chờ</option>
                        <option>Đang xem xét</option>
                      </select>
                      <select className="form-select">
                        <option>Sắp xếp theo</option>
                        <option>Ngày gửi (Mới nhất)</option>
                        <option>Tên khách sạn A-Z</option>
                      </select>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>
                            <input type="checkbox" className="form-check-input" />
                          </th>
                          <th>ID</th>
                          <th>Tên khách sạn</th>
                          <th>Chủ sở hữu</th>
                          <th>Địa điểm</th>
                          <th>Hạng</th>
                          <th>Ngày gửi</th>
                          <th>Trạng thái</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentApprovals.map((approval) => (
                          <tr key={approval.id}>
                            <td>
                              <input type="checkbox" className="form-check-input" />
                            </td>
                            <td>{approval.id}</td>
                            <td>{approval.hotelName}</td>
                            <td>{approval.owner}</td>
                            <td>{approval.location}</td>
                            <td>{approval.category}</td>
                            <td>{approval.submittedDate}</td>
                            <td>
                              <span className={`badge bg-${getStatusColor(approval.status)}`}>
                                {approval.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn btn-sm btn-primary" title="Xem chi tiết">
                                  <i className="bi bi-eye"></i>
                                </button>
                                <button className="btn btn-sm btn-success" title="Phê duyệt">
                                  <i className="bi bi-check-lg"></i>
                                </button>
                                <button className="btn btn-sm btn-danger" title="Từ chối">
                                  <i className="bi bi-x-lg"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pagination-container">
                    <div className="pagination-info">
                      Hiển thị 1-5 của 58 kết quả
                    </div>
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">Trước</a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">2</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">3</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">Sau</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Payments */}
            {activeTab === "payments" && (
              <ListPaymentHotel/>
            )}

            {/* Reports */}
            {activeTab === "reports" && (
              <ReportedFeedbackAdmin/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
