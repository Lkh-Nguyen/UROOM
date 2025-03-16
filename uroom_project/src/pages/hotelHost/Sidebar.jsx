import React from "react";
import "../../css/hotelHost/Sidebar.css";
import image1 from "../../images/LOGO_WEBSITE-removebg-preview.png";
import * as Routers from "../../utils/Routes";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar_1">
      {/* Logo */}
      <div className="mb-4 d-flex justify-content-center mt-3">
        <img src={image1} width="140" height="30" alt="Logo" />
      </div>

      {/* Menu */}
      <ul className="nav flex-column " style={{ marginTop: "25px" }}>
        <li className="nav-item_1">
          <a
            className="nav-link_1 active"
            onClick={() => {
              navigate(Routers.HotelHostDashboard);
            }}
          >
            <i className="bi bi-grid me-2"></i> Dashboard
          </a>
        </li>
        <li className="nav-item_1">
          <a
            className="nav-link_1"
            onClick={() => {
              navigate(Routers.Transaction);
            }}
          >
            <i className="bi bi-palette me-2"></i> Transaction
          </a>
        </li>
        <li className="nav-item_1">
          <a className="nav-link_1" href="#">
            <i className="bi bi-map me-2"></i> Hotel management
          </a>
        </li>
        <li className="nav-item_1">
          <a className="nav-link_1" href="#">
            <i className="bi bi-person me-2"></i> Service management
          </a>
        </li>
        <li className="nav-item_1">
          <a
            className="nav-link_1"
            onClick={() => {
              navigate();
            }}
          >
            <i className="bi bi-door-open me-2"></i> Room management
          </a>
        </li>
        <li className="nav-item_1">
          <a
            className="nav-link_1"
            onClick={() => {
              navigate(Routers.BookingSchedule);
            }}
          >
            <i className="bi bi-table me-2"></i> Booking Schedule
          </a>
        </li>
        <li className="nav-item_1">
          <a className="nav-link_1" href="#">
            <i className="bi bi-book me-2"></i> Feedback
          </a>
        </li>
      </ul>

      {/* Upgrade Link */}
      <div className="mt-auto">
        <a className="nav-link_1 upgrade-link_1" href="#">
          <i className="bi bi-arrow-up-circle me-2"></i> Upgrade to PRO
        </a>
      </div>
    </div>
  );
}
