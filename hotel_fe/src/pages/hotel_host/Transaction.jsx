"use client";

import { useState, useEffect } from "react";
import { Row, Col, Table, Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { showToast, ToastProvider } from "@components/ToastContainer";
import { useNavigate } from "react-router-dom";
import TransactionDetail from "./TransactionDetail";
import { useDispatch, useSelector } from "react-redux";
import ReservationActions from "../../redux/reservation/actions";

const Transaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.Reservation);
  const [payments, setPayments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedSort, setSelectedSort] = useState("desc");

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

  useEffect(() => {
    // Gọi API lấy reservation theo filter, sort, month, year
    dispatch({
      type: ReservationActions.FETCH_RESERVATIONS,
      payload: {
        status: selectedStatus !== "All" ? selectedStatus : undefined,
        month: selectedMonth + 1, // FE dùng 0-11, BE dùng 1-12
        year: selectedYear,
        sort: selectedSort,
      },
    });
  }, [dispatch, selectedMonth, selectedYear, selectedStatus, selectedSort]);

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

  const totalCustomerPaid = reservations?.reduce(
    (sum, r) => sum + r.totalPrice,
    0
  );

  const totalCommission = Math.floor(totalCustomerPaid * 0.15);

  const totalAmountToHost = Math.floor(totalCustomerPaid * 0.85);
  const completedCount =
    reservations?.filter((r) => r.status === "COMPLETED").length || 0;
  const pendingCount =
    reservations?.filter((r) => r.status === "PENDING").length || 0;
  const bookedCount =
    reservations?.filter((r) => r.status === "BOOKED").length || 0;

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
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="All">Tất cả</option>
                      <option value="BOOKED">BOOKED</option>
                      <option value="CHECKED IN">CHECKED IN</option>
                      <option value="CHECKED OUT">CHECKED OUT</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="PENDING">PENDING</option>
                      <option value="CANCELLED">CANCELLED</option>
                      <option value="NOT PAID">NOT PAID</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Lọc theo:</Form.Label>
                    <Form.Select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                    >
                      <option value="desc">Mới nhất</option>
                      <option value="asc">Cũ nhất</option>
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
                <strong>
                  {completedCount}/{pendingCount}/{bookedCount}
                </strong>
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
              {reservations && reservations.length > 0 ? (
                reservations.map((reservation, index) => (
                  <tr
                    key={reservation._id}
                    onClick={handleShowModal}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{index + 1}</td>
                    <td>
                      {new Date(reservation.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <a>
                        Đặt phòng -{" "}
                        {reservation.rooms && reservation.rooms.length > 0
                          ? reservation.rooms[0].room?.name || ""
                          : ""}
                      </a>
                    </td>
                    <td>{formatCurrency(reservation.totalPrice)}</td>
                    <td className="text-danger">
                      {/* Nếu có trường commission thì hiển thị, không thì để 0 */}
                      {formatCurrency(
                        Math.floor(reservation.totalPrice * 0.15) || 0
                      )}
                    </td>
                    <td className="text-success">
                      {/* Nếu có trường amountToHost thì hiển thị, không thì để 0 */}
                      {formatCurrency(
                        Math.floor(reservation.totalPrice * 0.85) || 0
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          reservation.status === "COMPLETED"
                            ? "bg-success"
                            : reservation.status === "PENDING"
                            ? "bg-warning"
                            : "bg-info"
                        }`}
                      >
                        {reservation.status}
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
                      name="bankName"
                      value={bankInfo.bankName}
                      onChange={handleBankInfoChange}
                      required
                    >
                      <option value="">Chọn ngân hàng</option>
                      <option value="MB Bank">MB Bank</option>
                      <option value="Techcombank">Techcombank</option>
                      <option value="Vietcombank">Vietcombank</option>
                      <option value="BIDV">BIDV</option>
                      <option value="HDBank">HDBank</option>
                      <option value="VPBank">VPBank</option>
                      <option value="TPBank">TPBank</option>
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
                        {payment.status}
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
