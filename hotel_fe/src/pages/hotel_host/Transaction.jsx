"use client";

import { useState, useEffect } from "react";
import { Row, Col, Table, Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { showToast, ToastProvider } from "@components/ToastContainer";
import { useNavigate } from "react-router-dom";
import TransactionDetail from "./TransactionDetail";

const Transaction = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Trạng thái thông tin ngân hàng
  const [hasBankInfo, setHasBankInfo] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    branch: "",
  });
  const [savedBankInfo, setSavedBankInfo] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const [showModal, setShowModal] = useState(false);
  // Mở Modal và set dữ liệu
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Dữ liệu mẫu - trong ứng dụng thực tế, dữ liệu này sẽ đến từ API
  useEffect(() => {
    // Giả lập gọi API
    const fetchPayments = () => {
      const mockPayments = [
        {
          id: 1,
          date: "2025-03-05",
          customerPaid: 5000000,
          commission: 750000,
          amountToHost: 4250000,
          status: "Completed",
          description: "Đặt phòng - Phòng Deluxe",
        },
        {
          id: 2,
          date: "2025-03-12",
          customerPaid: 3500000,
          commission: 525000,
          amountToHost: 2975000,
          status: "Pending",
          description: "Đặt phòng - Phòng Tiêu chuẩn",
        },
        {
          id: 3,
          date: "2025-03-18",
          customerPaid: 8400000,
          commission: 1260000,
          amountToHost: 7140000,
          status: "Completed",
          description: "Đặt phòng - Phòng Tổng thống",
        },
        {
          id: 4,
          date: "2025-03-25",
          customerPaid: 6000000,
          commission: 900000,
          amountToHost: 5100000,
          status: "Processing",
          description: "Đặt phòng - Phòng Gia đình",
        },
      ];
      setPayments(mockPayments);
    };

    fetchPayments();

    // Giả lập kiểm tra xem thông tin ngân hàng có tồn tại không
    // Trong ứng dụng thực tế, đây sẽ là một cuộc gọi API để lấy thông tin ngân hàng đã lưu
    const checkBankInfo = () => {
      // Cho mục đích demo, chúng ta sẽ chỉ kiểm tra xem hasBankInfo có đúng không
      if (hasBankInfo) {
        setSavedBankInfo({
          accountNumber: "9876543210",
          accountName: "NGUYỄN VĂN A",
          bankName: "Vietcombank",
          branch: "Thành phố Hồ Chí Minh",
        });
        setShowForm(false);
      } else {
        setSavedBankInfo(null);
        setShowForm(true);
      }
    };

    checkBankInfo();
  }, [selectedMonth, selectedYear, hasBankInfo]);

  const handleBankInfoChange = (e) => {
    const { name, value } = e.target;
    setBankInfo({
      ...bankInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trong ứng dụng thực tế, điều này sẽ gửi thông tin ngân hàng đến máy chủ
    console.log("Thông tin ngân hàng đã gửi:", bankInfo);
    setSavedBankInfo(bankInfo);
    setHasBankInfo(true);
    setShowForm(false);
    showToast.success("Tạo tài khoản ngân hàng thành công");
  };

  const handleEdit = () => {
    setBankInfo(savedBankInfo);
    setShowForm(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - 2 + i
  );

  // Tính tổng
  const totalCustomerPaid = payments.reduce(
    (sum, payment) => sum + payment.customerPaid,
    0
  );
  const totalCommission = payments.reduce(
    (sum, payment) => sum + payment.commission,
    0
  );
  const totalAmountToHost = payments.reduce(
    (sum, payment) => sum + payment.amountToHost,
    0
  );

  return (
    <div className="main-content_1">
      <ToastProvider />
      <h4>Bảng điều khiển thanh toán chủ khách sạn</h4>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Kỳ thanh toán</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Tháng</Form.Label>
                    <Form.Select
                      value={selectedMonth}
                      onChange={(e) =>
                        setSelectedMonth(Number.parseInt(e.target.value))
                      }
                    >
                      {months.map((month, index) => (
                        <option key={index} value={index}>
                          {month}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Năm</Form.Label>
                    <Form.Select
                      value={selectedYear}
                      onChange={(e) =>
                        setSelectedYear(Number.parseInt(e.target.value))
                      }
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Select
                      value="All"
                      onChange={(e) =>
                        setSelectedYear(Number.parseInt(e.target.value))
                      }
                    >
                      <option key="All" value="All">
                        Tất cả
                      </option>
                      <option key="Pending" value="Pending">
                        Đang chờ
                      </option>
                      <option key="Proccessing" value="Proccessing">
                        Đang xử lý
                      </option>
                      <option key="Compeleted" value="Compeleted">
                        Hoàn thành
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Lọc theo:</Form.Label>
                    <Form.Select
                      value="All"
                      onChange={(e) =>
                        setSelectedYear(Number.parseInt(e.target.value))
                      }
                    >
                      <option key="Newest" value="Newest">
                        Mới nhất
                      </option>
                      <option key="Oldest" value="Oldest">
                        Cũ nhất
                      </option>
                      <option key="Ascending" value="Ascending">
                        A -&gt; Z
                      </option>
                      <option key="Descending" value="Descending">
                        Z -&gt; A
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header as="h5">Tóm tắt thanh toán</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Tổng thanh toán của khách:</span>
                <strong>{formatCurrency(totalCustomerPaid)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tổng hoa hồng (Admin):</span>
                <strong className="text-danger">
                  {formatCurrency(totalCommission)}
                </strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tổng số tiền cho chủ khách sạn:</span>
                <strong className="text-success">
                  {formatCurrency(totalAmountToHost)}
                </strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Thanh toán Hoàn thành/Đang xử lý/Đang chờ:</span>
                <strong>3/4/5</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header as="h5">
          Danh sách thanh toán cho {months[selectedMonth]} {selectedYear}
        </Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Ngày</th>
                <th>Mô tả</th>
                <th>Khách thanh toán</th>
                <th>Hoa hồng</th>
                <th>Số tiền cho chủ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    onClick={handleShowModal}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{index + 1}</td>
                    <td>{payment.date}</td>
                    <td>
                      <a>{payment.description}</a>
                    </td>
                    <td>{formatCurrency(payment.customerPaid)}</td>
                    <td className="text-danger">
                      {formatCurrency(payment.commission)}
                    </td>
                    <td className="text-success">
                      {formatCurrency(payment.amountToHost)}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          payment.status === "Completed"
                            ? "bg-success"
                            : payment.status === "Pending"
                            ? "bg-warning"
                            : "bg-info"
                        }`}
                      >
                        {payment.status === "Completed"
                          ? "Hoàn thành"
                          : payment.status === "Pending"
                          ? "Đang chờ"
                          : "Đang xử lý"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Không tìm thấy thanh toán nào cho kỳ này
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="table-secondary">
                <td colSpan="3" className="text-end">
                  <strong>Tổng:</strong>
                </td>
                <td>
                  <strong>{formatCurrency(totalCustomerPaid)}</strong>
                </td>
                <td>
                  <strong>{formatCurrency(totalCommission)}</strong>
                </td>
                <td>
                  <strong>{formatCurrency(totalAmountToHost)}</strong>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
        </Card.Body>
      </Card>
      {/* Phần thông tin tài khoản ngân hàng */}
      <Card className="mb-4">
        <Card.Header as="h5">Thông tin tài khoản ngân hàng</Card.Header>
        <Card.Body>
          {!hasBankInfo && (
            <Alert variant="warning">
              Vui lòng thêm thông tin tài khoản ngân hàng của bạn để nhận thanh
              toán.
            </Alert>
          )}

          {showForm ? (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Số tài khoản</Form.Label>
                    <Form.Control
                      type="text"
                      name="accountNumber"
                      value={bankInfo.accountNumber}
                      onChange={handleBankInfoChange}
                      placeholder="Nhập số tài khoản của bạn"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên tài khoản</Form.Label>
                    <Form.Control
                      type="text"
                      name="accountName"
                      value={bankInfo.accountName}
                      onChange={handleBankInfoChange}
                      placeholder="Nhập tên chủ tài khoản"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên ngân hàng</Form.Label>
                    <Form.Select
                      value="Pending"
                      onChange={(e) =>
                        setSelectedYear(Number.parseInt(e.target.value))
                      }
                    >
                      <option key="Pending" value="Mbabnk">
                        MB Bank
                      </option>
                      <option key="Proccessing" value="Proccessing">
                        Techcombank
                      </option>
                      <option key="Compeleted" value="Compeleted">
                        Vietcombank
                      </option>
                      <option key="Compeleted" value="Compeleted">
                        Bidv
                      </option>
                      <option key="Compeleted" value="Compeleted">
                        HB Bank
                      </option>
                      <option key="Compeleted" value="Compeleted">
                        VP Bank
                      </option>
                      <option key="Compeleted" value="Compeleted">
                        TP Bank
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Chi nhánh</Form.Label>
                    <Form.Control
                      type="text"
                      name="branch"
                      value={bankInfo.branch}
                      onChange={handleBankInfoChange}
                      placeholder="Nhập chi nhánh ngân hàng"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                Lưu thông tin ngân hàng
              </Button>
            </Form>
          ) : (
            <>
              {savedBankInfo && (
                <div>
                  <Row className="mb-3">
                    <Col md={6}>
                      <strong>Số tài khoản:</strong>{" "}
                      {savedBankInfo.accountNumber}
                    </Col>
                    <Col md={6}>
                      <strong>Tên tài khoản:</strong>{" "}
                      {savedBankInfo.accountName}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <strong>Tên ngân hàng:</strong> {savedBankInfo.bankName}
                    </Col>
                    <Col md={6}>
                      <strong>Chi nhánh:</strong>{" "}
                      {savedBankInfo.branch || "N/A"}
                    </Col>
                  </Row>
                  <Button variant="outline-primary" onClick={handleEdit}>
                    Chỉnh sửa thông tin ngân hàng
                  </Button>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Thanh toán từ Admin</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Năm</Form.Label>
                    <Form.Select
                      value={selectedYear}
                      onChange={(e) =>
                        setSelectedYear(Number.parseInt(e.target.value))
                      }
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Lọc theo:</Form.Label>
                    <Form.Select
                      value="All"
                      onChange={(e) =>
                        setSelectedYear(Number.parseInt(e.target.value))
                      }
                    >
                      <option key="Ascending" value="Ascending">
                        A -&gt; Z
                      </option>
                      <option key="Descending" value="Descending">
                        Z -&gt; A
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header as="h5">
          Danh sách thanh toán cho năm {selectedYear}
        </Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tháng/Năm</th>
                <th>Tổng doanh thu</th>
                <th>Hoa hồng</th>
                <th>Số tiền cho chủ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr key={payment.id}>
                    <td>{index + 1}</td>
                    <td>{index + 4}/2025</td>
                    <td>{formatCurrency(payment.customerPaid)}</td>
                    <td className="text-danger">
                      {formatCurrency(payment.commission)}
                    </td>
                    <td className="text-success">
                      {formatCurrency(payment.amountToHost)}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          payment.status === "Completed"
                            ? "bg-success"
                            : payment.status === "Pending"
                            ? "bg-warning"
                            : "bg-info"
                        }`}
                      >
                        {payment.status === "Completed"
                          ? "Hoàn thành"
                          : payment.status === "Pending"
                          ? "Đang chờ"
                          : "Đang xử lý"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Không tìm thấy thanh toán nào cho kỳ này
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <TransactionDetail
        show={showModal}
        onHide={() => setShowModal(false)}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Transaction;
