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

function ReportedFeedbackAdmin() {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="d-flex">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        <div className="main-content_1 p-3">
          <h2 className="text-secondary mb-4">Report Feedback List</h2>

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
                  placeholder="Search by Id Feedback"
                />
              </InputGroup>
            </Col>
          </Row>

          {/* Table */}
          <Table className="bg-white">
            <thead>
              <tr>
                <th className="text-center" style={{ width: "30px" }}>
                  ID
                </th>
                <th>Description</th>
                <th className="text-center" style={{ width: "30px" }}>
                  Rating
                </th>
                <th className="text-center" style={{ width: "180px" }}>
                  Date
                </th>
                <th className="text-center" style={{ width: "30px" }}>
                  Likes
                </th>
                <th className="text-center" style={{ width: "30px" }}>
                  Dislike
                </th>
                <th className="text-center" style={{ width: "30px" }}>
                  Reports
                </th>
                <th className="text-center" style={{ width: "100px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">1</td>
                <td>
                  The hotel offers great service, clean rooms, and a relaxing
                  atmosphere, but breakfast options could improve.
                </td>
                <td className="text-center">4</td>
                <td className="text-center">12:03:12 20/10/2003</td>
                <td className="text-center">12</td>
                <td className="text-center">36</td>
                <td className="text-center">4</td>
                <td style={{ display: "flex" }}>
                  <Button
                    variant="outline-warning"
                    style={{ width: "80px", marginRight: "10px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline-danger"
                    style={{ width: "80px", marginRight: "10px" }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline-success"
                    style={{ width: "80px" }}
                    onClick={() => {
                      navigate(Routers.DetailReportedAdmin);
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

export default ReportedFeedbackAdmin;
