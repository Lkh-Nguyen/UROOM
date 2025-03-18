import React from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../../css/hotelHost/Dashboard.css";
import Sidebar from "../hotelHost/Sidebar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Image, Dropdown } from "react-bootstrap"; //
import * as Routers from "../../utils/Routes";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function HotelHostDashboard() {
  const navigate = useNavigate();
  // Data for line chart
  const lineData = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [5000, 20000, 15000, 25000, 15000, 35000, 20000, 55000],
        fill: false,
        borderColor: "#8884d8",
        tension: 0.4,
      },
    ],
  };

  // Data for bar chart
  const barData = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [25, 20, 30, 22, 17, 29],
        backgroundColor: "#3E86F5",
      },
    ],
  };

  return (
    <div className="d-flex ">
      {/* Sidebar */}
      <div className="col-md-2">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="col-md-10">
        <div className="main-content_1">
          {/* Header */}
          <nav className="navbar navbar-expand-lg navbar-light bg-transparent p-3">
            <div className="container-fluid mt-5">
              <h2 className="fw-bold text-secondary mb-4">DASHBOARD</h2>
              <div className="d-flex align-items-center">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="light"
                    className="login-btn d-flex align-items-center"
                  >
                    <span className="text-black me-2">con bò</span>
                    <Image
                      src="https://i.pinimg.com/474x/88/76/9b/88769bfce341b1599e844828ea08da87.jpg"
                      roundedCircle
                      width="30"
                      height="30"
                      className="ms-2 me-2"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        navigate(Routers.MyAccountHotelPage, { state: { id: 0 } })
                      }
                    >
                      View Information
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => {
                        console.log("User logged out");
                        navigate(Routers.HomeHotel);
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </nav>

          {/* Stats Cards */}
          <div className="container-fluid p-4">
            <div className="container-fluid p-4">
              <div className="row">
                {/* Total Invoices */}
                <div className="col-md-3">
                  <div className="card stat-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6 className="text-muted">Total invoices</h6>
                          <h3>350,897</h3>
                          <small className="text-success">
                            <i className="bi bi-arrow-up"></i> 3.48% Since last
                            month
                          </small>
                        </div>
                        <div className="stat-icon bg-primary text-white">
                          <i className="bi bi-receipt"></i> {/* Icon hóa đơn */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Paid Invoices */}
                <div className="col-md-3">
                  <div className="card stat-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6 className="text-muted">Paid invoices</h6>
                          <h3>2,356</h3>
                          <small className="text-danger">
                            <i className="bi bi-arrow-down"></i> 3.48% Since
                            last week
                          </small>
                        </div>
                        <div className="stat-icon bg-success text-white">
                          <i className="bi bi-cash"></i> {/* Icon thanh toán */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Unpaid Invoices */}
                <div className="col-md-3">
                  <div className="card stat-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6 className="text-muted">Unpaid invoices</h6>
                          <h3>924</h3>
                          <small className="text-danger">
                            <i className="bi bi-arrow-down"></i> 1.10% Since
                            yesterday
                          </small>
                        </div>
                        <div className="stat-icon bg-warning text-white">
                          <i className="bi bi-exclamation-circle"></i>{" "}
                          {/* Icon cảnh báo */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invoices Sent */}
                <div className="col-md-3">
                  <div className="card stat-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6 className="text-muted">Invoices sent</h6>
                          <h3>49.65%</h3>
                          <small className="text-success">
                            <i className="bi bi-arrow-up"></i> 12% Since last
                            month
                          </small>
                        </div>
                        <div className="stat-icon bg-info text-white">
                          <i className="bi bi-send"></i>{" "}
                          {/* Icon gửi hóa đơn */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="row mt-4">
              <div className="col-md-8">
                <div className="card chart-card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h6 className="text-muted">OVERVIEW</h6>
                        <h5>Sales value</h5>
                      </div>
                      <div className="btn-group">
                        <button className="btn btn-primary btn-sm">
                          Month
                        </button>
                        <button className="btn btn-outline-primary btn-sm">
                          Week
                        </button>
                      </div>
                    </div>
                    <Line
                      data={lineData}
                      options={{
                        plugins: { legend: { display: false } },
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: {
                              color: "rgba(200, 200, 200, 0.1)",
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
                <div className="card chart-card">
                  <div className="card-body">
                    <h6 className="text-muted">PERFORMANCE</h6>
                    <h5>Total booking</h5>
                    <Bar
                      data={barData}
                      options={{ plugins: { legend: { display: false } } }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tables */}
            <div className="row mt-4">
              <div className="col-md-8">
                <div className="card table-card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5>Transaction History</h5>
                      <button className="btn btn-primary btn-sm">
                        See all
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Payment Number</th>
                            <th>Date & Time</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Payment from #10231</td>
                            <td>Mar 19, 2020, 2.45pm</td>
                            <td>$250.00</td>
                            <td>
                              <button class="btn btn-success">Completed</button>
                            </td>
                          </tr>

                          <tr>
                            <td>Payment from #10231</td>
                            <td>Mar 19, 2020, 2.45pm</td>
                            <td>$250.00</td>
                            <td>
                              <button class="btn btn-success">Completed</button>
                            </td>
                          </tr>
                          <tr>
                            <td>Payment from #10231</td>
                            <td>Mar 19, 2020, 2.45pm</td>
                            <td>$250.00</td>
                            <td>
                              <button class="btn btn-success">Completed</button>
                            </td>
                          </tr>
                          <tr>
                            <td>Payment from #10231</td>
                            <td>Mar 19, 2020, 2.45pm</td>
                            <td>$250.00</td>
                            <td>
                              <button class="btn btn-success">Completed</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card table-card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5>Approve request</h5>
                      <button className="btn btn-primary btn-sm">
                        See all
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Hotel</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Hilton Hotel</td>
                            <td>
                              <button class="btn btn-warning">pendding</button>
                            </td>
                          </tr>
                          <tr>
                            <td>Sofitel Hotel</td>
                            <td>
                              <button class="btn btn-warning">pendding</button>
                            </td>
                          </tr>
                          <tr>
                            <td>Marriott Hotel</td>
                            <td>
                              <button class="btn btn-warning">pendding</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelHostDashboard;
