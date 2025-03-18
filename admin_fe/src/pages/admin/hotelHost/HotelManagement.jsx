import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Lock, Unlock } from "lucide-react"; // Import icon
import Sidebar from "../../admin/SidebarAdmin";
import * as Routers from "../../../utils/Routes";
import { useNavigate } from "react-router-dom";
const AccountManagement = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập danh sách tài khoản (có thể thay bằng API call)
    setTimeout(() => {
      setAccounts([
        { id: 1, email: "user1@example.com", name: "Nguyen Van A", status: "Active" },
        { id: 2, email: "user2@example.com", name: "Nguyen Van A", status: "Locked" },
        { id: 3, email: "user3@example.com", name: "Nguyen Van A", status: "Active" },
        { id: 4, email: "user4@example.com", name: "Nguyen Van A", status: "Locked" },
      ]);
      setLoading(false);
    }, 200);
  }, []);

  // Xử lý thay đổi trạng thái tài khoản
  const toggleLock = (id) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) =>
        acc.id === id
          ? { ...acc, status: acc.status === "Active" ? "Locked" : "Active" }
          : acc
      )
    );
  };

  return (
    <div className="d-flex">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        <div className="main-content_1 p-3">
          <h2 className="fw-bold text-secondary mb-4" style={{ marginTop: "2.5%" }}>
            Account Management
          </h2>
          <Row className="g-4">
            {accounts.map((account) => (
              <Col md={4} key={account.id}>
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <p>
                      <strong>Email:</strong> {account.email}
                    </p>
                    <p>
                      <strong>Role:</strong> {account.name}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`text-${account.status === "Active" ? "success" : "danger"}`}>
                        {account.status}
                      </span>
                    </p>
                  
                    <Button className="w-100" variant="outline-primary" onClick={() => {
              navigate(Routers.DetailHotelHostAdmin);
            }}>
                      View detail
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
