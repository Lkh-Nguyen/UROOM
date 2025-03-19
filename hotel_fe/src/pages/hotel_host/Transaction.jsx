import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { Calendar, DollarSign, CheckCircle, Clock } from "lucide-react"; // Import icon
import Sidebar from "./Sidebar";
import * as Routers from "../../utils/Routes";
import { useNavigate } from "react-router-dom";

 
import "react-datepicker/dist/react-datepicker.css";

const Transaction = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setRooms([
        {
          dateStart: "13/06/2024",
          dateEnd: "15/06/2024",
          price: "$250",
          status: "Đã thanh toán",
        },
        {
          dateStart: "12/06/2024",
          dateEnd: "14/06/2024",
          price: "$260",
          status: "Đang xử lí",
        },
        {
          dateStart: "11/06/2024",
          dateEnd: "13/06/2024",
          price: "$270",
          status: "Đã thanh toán",
        },
        {
          dateStart: "10/06/2024",
          dateEnd: "12/06/2024",
          price: "$280",
          status: "Đang xử lí",
        },
        {
          dateStart: "10/06/2024",
          dateEnd: "12/06/2024",
          price: "$280",
          status: "Đã thanh toán",
        },
        {
          dateStart: "10/06/2024",
          dateEnd: "12/06/2024",
          price: "$280",
          status: "Đang xử lí",
        },
        {
          dateStart: "10/06/2024",
          dateEnd: "12/06/2024",
          price: "$280",
          status: "Đang xử lí",
        },

        {
          dateStart: "10/06/2024",
          dateEnd: "12/06/2024",
          price: "$280",
          status: "Đang xử lí",
        },

        {
          dateStart: "10/06/2024",
          dateEnd: "12/06/2024",
          price: "$280",
          status: "Đang xử lí",
        },

        {
          dateStart: "10/06/2024",
          dateEnd: "12/06/2024",
          price: "$280",
          status: "Đang xử lí",
        },

        {
          dateStart: "10/06/2024",
          dateEnd: "12/06/2024",
          price: "$280",
          status: "Đang xử lí",
        },
      ]);
      setLoading(false);
    }, 200);
  }, []);

  return (
    <div className="d-flex">
      
      
        <div className="main-content_1 p-3">
        <h4>Quản lí giao dịch</h4>
          <div className="bg-white p-3 rounded shadow-sm mb-4">
            <Row className="g-3">
              <Col md={4}>
                <Form.Select>
                  <option>Doanh thu</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Select>
                  <option>Loại</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Control type="date" />
              </Col>
            </Row>
          </div>
          <Row className="g-4">
            {rooms?.map((room, index) => (
              <Col md={4} key={index}>
                <Card >
                  <Card.Body>
                    {/* Ngày bắt đầu & kết thúc */}
                    <div className="d-flex">
                      <div className="col-md-4">
                        <Calendar size={16} className="text-primary" />

                        <small>{room.dateStart}</small>
                      </div>
                      <div className="col-md-4">
                        <small style={{ marginLeft: "30%" }}>→</small>
                      </div>
                      <div className="col-md-4">
                        <Calendar size={16} className="text-primary" />

                        <small>{room.dateEnd}</small>
                      </div>
                    </div>

                    {/* Giá tiền */}
                    <div className="d-flex ">
                      <div className="col-md-8">
                        <DollarSign size={16} className="text-success" />
                        <strong>{room.price}</strong>
                      </div>

                      {/* Trạng thái */}
                      <div className="col-md-4">
                        {room.status.trim() === "Đã thanh toán" ? (
                          <CheckCircle size={16} className="text-success" />
                        ) : (
                          <Clock size={16} className="text-warning" />
                        )}
                        <small
                          className={`text-${
                            room.status.trim() === "Đã thanh toán"
                              ? "success"
                              : "warning"
                          } text-uppercase`}
                        >
                          {room.status}
                        </small>
                      </div>
                    </div>

                    <Button variant="primary" className="mt-3 w-100"  onClick={() => {
              navigate(Routers.TransactionDetail);
            }}>
                      Xem chi tiết
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
     
    </div>
  );
};

export default Transaction;
