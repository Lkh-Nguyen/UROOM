import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Spinner,
  Image,
  Pagination,
} from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../../../redux/store";
import ReportFeedbacksActions from "../../../../redux/reportedFeedback/actions";
import FeedbackActions from "../../../../redux/feedback/actions";
import { showToast } from "components/ToastContainer";
import { Star, StarFill, X, Pencil, Trash } from "react-bootstrap-icons";
import ConfirmationModal from "components/ConfirmationModal";

const STATUS_OPTIONS = ["All", "Pending", "Approved", "Rejected"];

const MyReportFeedbacks = () => {
  const dispatch = useAppDispatch();
  const Auth = useAppSelector((state) => state.Auth.Auth);
  const [reportFeedbacks, setReportFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  useEffect(() => {
    if (Auth._id) fetchUserReports(Auth._id);
  }, [Auth._id]);

  const fetchUserReports = (userId) => {
    setLoading(true);
    dispatch({
      type: ReportFeedbacksActions.FETCH_REPORTS_BY_USERID,
      payload: {
        userId,
        onSuccess: (data) => fetchAllFeedbacks(data),
        onFailed: () => setLoading(false),
        onError: (err) => {
          showToast.error("Server error while fetching report feedbacks");
          console.error(err);
          setLoading(false);
        },
      },
    });
  };

  const fetchAllFeedbacks = async (reportList) => {
    try {
      const results = await Promise.all(
        reportList.map((report) => {
          const hasHotel =
            report.feedback?.hotel?.hotelName &&
            report.feedback?.hotel?.address;
          if (hasHotel) return Promise.resolve(report);

          return new Promise((resolve, reject) => {
            dispatch({
              type: FeedbackActions.FETCH_FEEDBACK_BY_ID,
              payload: {
                feedbackId: report.feedback._id,
                onSuccess: (feedbackData) =>
                  resolve({ ...report, feedback: feedbackData }),
                onFailed: () => reject("Failed to fetch feedback"),
                onError: (err) => reject(err),
              },
            });
          });
        })
      );

      setReportFeedbacks(results);
    } catch (err) {
      console.error("Error fetching full feedbacks with hotel info:", err);
      showToast.error("Lỗi khi tải dữ liệu feedback chi tiết.");
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reportFeedbacks.filter((report) => {
    if (!report.status) return false;

    const normalizedStatus = report.status.trim().toLowerCase();
    const selectedFilter = sortOption.toLowerCase();

    return selectedFilter === "all" || normalizedStatus === selectedFilter;
  });

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPagination = () => {
    if (filteredReports.length <= itemsPerPage) return null;

    const pages = [];

    for (let page = 1; page <= totalPages; page++) {
      if (
        page === 1 ||
        page === totalPages ||
        Math.abs(page - currentPage) <= 1
      ) {
        if (pages.length > 0 && page !== pages[pages.length - 1] + 1) {
          pages.push("ellipsis");
        }
        pages.push(page);
      }
    }

    return (
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.First
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />

          {pages.map((page, index) =>
            page === "ellipsis" ? (
              <Pagination.Ellipsis key={`ellipsis-${index}`} disabled />
            ) : (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                <b
                  style={{
                    color: page === currentPage ? "white" : "#0d6efd",
                  }}
                >
                  {page}
                </b>
              </Pagination.Item>
            )
          )}

          <Pagination.Next
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    );
  };

  // Function to handle delete request
  const handleDeleteFeedback = (report) => {
    setSelectedFeedbackId(report._id);
    setShowAcceptModal(true);
  };
  console.log("hello", selectedFeedbackId);
  // Function to confirm deletion
  const confirmDeleteFeedback = () => {
    console.log("Selected Feedback ID:", selectedFeedbackId);
    if (!selectedFeedbackId) {
      showToast.error("Feedback ID is missing.");
      return;
    }

    dispatch({
      type: ReportFeedbacksActions.DELETE_REPORTED_FEEDBACK,
      payload: {
        reportId: selectedFeedbackId,
        onSuccess: () => {
          setReportFeedbacks(
            reportFeedbacks.filter(
              (report) => report._id !== selectedFeedbackId
            )
          );
          showToast.success("Feedback deleted successfully!");
          setShowAcceptModal(false);
        },
        onFailed: (msg) => {
          showToast.error(msg || "Failed to delete feedback");
          setShowAcceptModal(false);
        },
        onError: (err) => {
          showToast.error("Server error while deleting feedback");
          console.error(err);
          setShowAcceptModal(false);
        },
      },
    });
  };

  return (
    <Container fluid className="bg-light py-4">
      <h2 className="fw-bold mb-4">My Reported Feedbacks</h2>

      {/* Bộ lọc theo trạng thái */}
      <Row className="mb-4 align-items-center">
        <Col xs="auto">
          <span className="me-2">Filter by status:</span>
        </Col>
        <Col xs="auto">
          <Form.Select
            className="border-primary"
            style={{ width: "200px" }}
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Danh sách feedback */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">
            No report feedbacks found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          {paginatedReports.map((report) => (
            <Card key={report._id} className="mb-4 border-0 shadow rounded-4">
              <Card.Body className="p-4">
                <Row className="g-4 align-items-center">
                  <Col md={5} className="border-end border-2">
                    <h5 className="fw-semibold text-primary">
                      {report.feedback?.hotel?.hotelName || "Hotel Name"}
                    </h5>
                    <p className="mb-2 text-muted">
                      <strong>Address:</strong>{" "}
                      {report.feedback?.hotel?.address || "Hotel Address"}
                    </p>
                    <p className="mb-2">
                      <strong>Feedback:</strong>{" "}
                      {report.feedback?.content || "No feedback content"}
                    </p>
                    <div className="d-flex gap-3 mt-2">
                      <span className="text-primary">
                        <FaThumbsUp className="me-1" />
                        {report.feedback?.likedBy?.length || 0}
                      </span>
                      <span className="text-danger">
                        <FaThumbsDown className="me-1" />
                        {report.feedback?.dislikedBy?.length || 0}
                      </span>
                    </div>
                  </Col>

                  <Col md={7}>
                    <div className="d-flex align-items-center mb-3">
                      <Image
                        src={
                          report.user?.image?.url ||
                          "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
                        }
                        roundedCircle
                        style={{ width: 50, height: 50, marginRight: 12 }}
                      />
                      <div>
                        <h6 className="mb-0">
                          {report.user?.name || "Unknown User"}
                        </h6>
                      </div>
                    </div>

                    {report.status.toLowerCase() === "pending" && (
                      <button
                        onClick={() => handleDeleteFeedback(report)}
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          right: "0.5rem",
                          border: "none",
                          background: "transparent",
                          color: "gray",
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          cursor: "pointer",
                          zIndex: 1,
                        }}
                        aria-label="Delete"
                      >
                        &times;
                      </button>
                    )}

                    <p className="mb-1">
                      <strong>Reason:</strong> {report.reason}
                    </p>
                    <p className="mb-1">
                      <strong>Description:</strong> {report.description}
                    </p>
                    <p className="mb-0">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge px-3 py-1 rounded-pill fw-medium ${
                          report.status?.toLowerCase() === "pending"
                            ? "bg-warning text-dark"
                            : report.status?.toLowerCase() === "approved"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {report.status}
                      </span>
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
      {renderPagination()}

      {/* Modal xác nhận xóa */}
      <ConfirmationModal
        show={showAcceptModal}
        onHide={() => setShowAcceptModal(false)}
        onConfirm={confirmDeleteFeedback}
        title="Confirm Deletion"
        message="Are you sure you want to delete this feedback?"
      />
    </Container>
  );
};

export default MyReportFeedbacks;
