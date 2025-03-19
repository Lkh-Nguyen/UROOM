import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Card, Container, Form, Modal } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Star, StarFill } from "react-bootstrap-icons";

const ReportedFeedbackHotel = ({ show, handleClose }) => {
  const [validated, setValidated] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    feedbackId: "",
    reportType: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    console.log("Submitting report:", formData);

    // Hiển thị modal cảm ơn
    setShowSuccessModal(true);
    setValidated(false);

    // Reset form
    setFormData({
      feedbackId: "",
      reportType: "",
      description: "",
    });
  };

  const renderStars = (count, total = 5) => {
    return [...Array(total)].map((_, i) =>
      i < count ? (
        <StarFill key={i} className="text-warning" />
      ) : (
        <Star key={i} className="text-warning" />
      )
    );
  };

  return (
    <>
      {/* Modal chính */}
      <Modal show={show} onHide={handleClose} size="xl">
        <div className="p-3">
          <h2 className="fw-bold text-secondary mb-4">
            Report Inappropriate Feedback
          </h2>
          <Card.Body>
            <p className="text-muted mb-4">
              Use this form to report feedback that contains incorrect
              information, fraud, threats, or other inappropriate content.
            </p>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Feedback <span className="text-danger">*</span>
                </Form.Label>
                <Card className="border-0">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <Image
                        src="https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
                        roundedCircle
                        style={{ width: "50px", height: "50px", marginRight: "10px" }}
                      />
                      <div>
                        <h6 className="mb-0">Nguyễn Văn Nam</h6>
                        <div>{renderStars(5)}</div>
                      </div>
                    </div>
                    <p>Clean hotel, great service, friendly and helpful staff!</p>
                  </Card.Body>
                </Card>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Report Type <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a reason for reporting</option>
                  <option value="incorrect">Incorrect Information</option>
                  <option value="fraud">Fraudulent Content</option>
                  <option value="threatening">Threatening or Harassing</option>
                  <option value="inappropriate">Inappropriate Content</option>
                  <option value="spam">Spam</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select a report type.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Description <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide details about the issue.
                </Form.Control.Feedback>
              </Form.Group>

              <Alert variant="warning" className="d-flex align-items-center">
                <AlertTriangle className="me-2" />
                <div>
                  False reporting may result in account restrictions. Please
                  ensure your report is accurate.
                </div>
              </Alert>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <Button
                  variant="outline-danger"
                  className="me-md-2"
                  style={{ width: "140px" }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "140px" }}
                >
                  Submit Report
                </Button>
              </div>
            </Form>
          </Card.Body>
        </div>
      </Modal>

      {/* Modal cảm ơn */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Container className="py-5">
            <Card.Body className="text-center p-5">
              <CheckCircle className="text-success mb-3" size={50} />
              <h2>Report Submitted Successfully</h2>
              <p className="mb-4">
                Thank you for your report. Our team will review it and take
                appropriate action.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setShowSuccessModal(false);
                  handleClose();
                }}
              >
                Close
              </Button>
            </Card.Body>
        </Container>
      </Modal>
    </>
  );
};

export default ReportedFeedbackHotel;
