import { useState } from "react";
import {
  Container,
  Table,
  Form,
  Row,
  Col,
  Pagination,
  InputGroup,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Routers from "../../../utils/Routes";
import { useNavigate } from "react-router-dom";
import Sidebar from "../SidebarAdmin";

function ListCustomerAdmin() {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="d-flex">
      <div className="col-md-2"></div>
      <Sidebar />
      <div className="col-md-10">
        <div className="main-content_1 p-3">
          <h2 className="text-secondary mb-4">List Customer</h2>

          {/* Table Controls */}
          <Row className="mb-3 align-items-center">
            <Col xs={12} md={6} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <span className="me-2">Show</span>
                <Form.Select
                  style={{ width: "80px" }}
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(e.target.value)}
                  className="me-2"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </Form.Select>
                <span>entries</span>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-white">Search:</InputGroup.Text>
                <Form.Control
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by Id, phone, email and name customer"
                />
              </InputGroup>
            </Col>
          </Row>

          {/* Table */}
          <Table className="bg-white">
            <thead>
              <tr>
                <th className="text-center">ID Customer</th>
                <th className="text-center">Full Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">1</td>
                <td className="text-center">Lê Kim Hoàng Nguyên</td>
                <td className="text-center">lkhnguyen3006@gmail.com</td>
                <td className="text-center">Active</td>
                <td
                  className="text-center"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outline-danger"
                    style={{ width: "80px", marginRight: "10px" }}
                  >
                    Lock
                  </Button>
                  <Button
                    variant="outline-warning"
                    style={{ width: "80px" }}
                    onClick={() => {
                      navigate(Routers.DetailCustomerAdmin);
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="text-center">2</td>
                <td className="text-center">Trương Thị Thiện Duyên</td>
                <td className="text-center">duyenttt@gmail.com</td>
                <td className="text-center">Inactive</td>
                <td
                  className="text-center"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outline-success"
                    style={{ width: "80px", marginRight: "10px" }}
                  >
                    Unlock
                  </Button>
                  <Button
                    variant="outline-warning"
                    style={{ width: "80px" }}
                    onClick={() => {
                      navigate(Routers.DetailCustomerAdmin);
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>

          {/* Table Footer */}
          <Row className="align-items-center mt-3">
            <Col>
              <p className="mb-0">Showing 0 to 0 of 0 entries</p>
            </Col>
            <Col className="d-flex justify-content-end">
              <Pagination className="mb-0">
                <Pagination.Item disabled>Previous</Pagination.Item>
                <Pagination.Item disabled>Next</Pagination.Item>
              </Pagination>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ListCustomerAdmin;
