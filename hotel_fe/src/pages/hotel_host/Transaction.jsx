"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { showToast, ToastProvider } from "components/ToastContainer";
import * as Routers from "../../utils/Routes";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Transaction = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Bank information state
  const [hasBankInfo, setHasBankInfo] = useState(false);
  const [bankInfo, setBankInfo] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    branch: "",
  });
  const [savedBankInfo, setSavedBankInfo] = useState(null);
  const [showForm, setShowForm] = useState(true);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    const fetchPayments = () => {
      const mockPayments = [
        {
          id: 1,
          date: "2025-03-05",
          customerPaid: 5000000,
          commission: 750000,
          amountToHost: 4250000,
          status: "Completed",
          description: "Room booking - Deluxe Suite",
        },
        {
          id: 2,
          date: "2025-03-12",
          customerPaid: 3500000,
          commission: 525000,
          amountToHost: 2975000,
          status: "Pending",
          description: "Room booking - Standard Room",
        },
        {
          id: 3,
          date: "2025-03-18",
          customerPaid: 8400000,
          commission: 1260000,
          amountToHost: 7140000,
          status: "Completed",
          description: "Room booking - Presidential Suite",
        },
        {
          id: 4,
          date: "2025-03-25",
          customerPaid: 6000000,
          commission: 900000,
          amountToHost: 5100000,
          status: "Processing",
          description: "Room booking - Family Room",
        },
      ];
      setPayments(mockPayments);
    };

    fetchPayments();

    // Simulate checking if bank info exists
    // In a real app, this would be an API call to get saved bank info
    const checkBankInfo = () => {
      // For demo purposes, we'll just check if hasBankInfo is true
      if (hasBankInfo) {
        setSavedBankInfo({
          accountNumber: "9876543210",
          accountName: "NGUYEN VAN A",
          bankName: "Vietcombank",
          branch: "Ho Chi Minh City",
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
    // In a real app, this would send the bank info to the server
    console.log("Bank information submitted:", bankInfo);
    setSavedBankInfo(bankInfo);
    setHasBankInfo(true);
    setShowForm(false);
    showToast.success("Create your brank successfully");
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - 2 + i
  );

  // Calculate totals
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
    <div className="d-flex">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10 ">
        <div className="main-content_1 p-3">
          <Container className="py-4">
            <ToastProvider />
            <h1 className="mb-4">Hotel Host Payment Dashboard</h1>

            {/* Bank Account Information Section */}
            <Card className="mb-4">
              <Card.Header as="h5">Bank Account Information</Card.Header>
              <Card.Body>
                {!hasBankInfo && (
                  <Alert variant="warning">
                    Please add your bank account information to receive
                    payments.
                  </Alert>
                )}

                {showForm ? (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Account Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="accountNumber"
                            value={bankInfo.accountNumber}
                            onChange={handleBankInfoChange}
                            placeholder="Enter your account number"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Account Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="accountName"
                            value={bankInfo.accountName}
                            onChange={handleBankInfoChange}
                            placeholder="Enter account holder name"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Bank Name</Form.Label>
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
                          <Form.Label>Branch</Form.Label>
                          <Form.Control
                            type="text"
                            name="branch"
                            value={bankInfo.branch}
                            onChange={handleBankInfoChange}
                            placeholder="Enter bank branch"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                      Save Bank Information
                    </Button>
                  </Form>
                ) : (
                  <>
                    {savedBankInfo && (
                      <div>
                        <Row className="mb-3">
                          <Col md={6}>
                            <strong>Account Number:</strong>{" "}
                            {savedBankInfo.accountNumber}
                          </Col>
                          <Col md={6}>
                            <strong>Account Name:</strong>{" "}
                            {savedBankInfo.accountName}
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={6}>
                            <strong>Bank Name:</strong> {savedBankInfo.bankName}
                          </Col>
                          <Col md={6}>
                            <strong>Branch:</strong>{" "}
                            {savedBankInfo.branch || "N/A"}
                          </Col>
                        </Row>
                        <Button variant="outline-primary" onClick={handleEdit}>
                          Edit Bank Information
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
                  <Card.Header as="h5">Payment Period</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Month</Form.Label>
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
                          <Form.Label>Year</Form.Label>
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
                          <Form.Label>Status</Form.Label>
                          <Form.Select
                            value="All"
                            onChange={(e) =>
                              setSelectedYear(Number.parseInt(e.target.value))
                            }
                          >
                            <option key="All" value="All">
                              All
                            </option>
                            <option key="Pending" value="Pending">
                              Pending
                            </option>
                            <option key="Proccessing" value="Proccessing">
                              Proccessing
                            </option>
                            <option key="Compeleted" value="Compeleted">
                              Compeleted
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Filter by:</Form.Label>
                          <Form.Select
                            value="All"
                            onChange={(e) =>
                              setSelectedYear(Number.parseInt(e.target.value))
                            }
                          >
                            <option key="Newest" value="Newest">
                              Newest
                            </option>
                            <option key="Oldest" value="Oldest">
                              Oldest
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
                  <Card.Header as="h5">Payment Summary</Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Customer Payments:</span>
                      <strong>{formatCurrency(totalCustomerPaid)}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Commission (Admin):</span>
                      <strong className="text-danger">
                        {formatCurrency(totalCommission)}
                      </strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Amount to Hotel Host:</span>
                      <strong className="text-success">
                        {formatCurrency(totalAmountToHost)}
                      </strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Completed/Processing/Pending Payments:</span>
                      <strong>3/4/5</strong>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="mb-4">
              <Card.Header as="h5">
                Payment List for {months[selectedMonth]} {selectedYear}
              </Card.Header>
              <Card.Body>
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Customer Paid</th>
                      <th>Commission</th>
                      <th>Amount to Host</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.length > 0 ? (
                      payments.map((payment, index) => (
                        <tr key={payment.id}>
                          <td>{index + 1}</td>
                          <td>{payment.date}</td>
                          <td>
                            <a
                              onClick={() => {
                                navigate(Routers.TransactionDetail);
                              }}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {payment.description}
                            </a>
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
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No payments found for this period
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="table-secondary">
                      <td colSpan="3" className="text-end">
                        <strong>Total:</strong>
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

            <Row className="mb-4">
              <Col md={6}>
                <Card>
                  <Card.Header as="h5">Payment From Admin</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Year</Form.Label>
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
                          <Form.Label>Filter by:</Form.Label>
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
              <Card.Header as="h5">Payment List for {selectedYear}</Card.Header>
              <Card.Body>
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Month/Year</th>
                      <th>Total Revenue</th>
                      <th>Commission</th>
                      <th>Amount to Host</th>
                      <th>Status</th>
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
                          No payments found for this period
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
