import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Image, Pagination } from "react-bootstrap";
import { CheckCircle, TriangleIcon as ExclamationTriangle } from "lucide-react";
import { Star, StarFill, X } from "react-bootstrap-icons";
import * as Routers from "../../../utils/Routes";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const ReportedFeedbackHotel = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    feedbackId: "",
    reportType: "",
    description: "",
    contactEmail: "",
    attachEvidence: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // Here you would normally send the data to your API
    console.log("Submitting report:", formData);

    // Show success message
    setSubmitted(true);
    setValidated(false);

    // Reset form
    setFormData({
      feedbackId: "",
      reportType: "",
      description: "",
    });
  };

  if (submitted) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm">
          <Card.Body className="text-center p-5">
            <CheckCircle className="text-success mb-3" size={50} />
            <h2>Report Submitted Successfully</h2>
            <p className="mb-4">
              Thank you for your report. Our team will review it and take
              appropriate action.
            </p>
            <Button variant="primary" onClick={() => setSubmitted(false)}>
              Submit Another Report
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const renderStars = (count, total = 5) => {
    const stars = [];
    for (let i = 0; i < total; i++) {
      if (i < count) {
        stars.push(<StarFill key={i} className="text-warning" />);
      } else {
        stars.push(<Star key={i} className="text-warning" />);
      }
    }
    return stars;
  };

  return (
    <div className="d-flex">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        <div className="main-content_1 p-3">
            <h2
              className="fw-bold text-secondary mb-4"
            >
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
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="d-flex align-items-center">
                          <Image
                            src="https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
                            roundedCircle
                            style={{
                              width: "50px",
                              height: "50px",
                              marginRight: "10px",
                            }}
                          />
                          <div>
                            <h6 className="mb-0">Nguyễn Văn Nam</h6>
                            <div>
                              {renderStars(5)}
                              <small className="text-muted ms-2">
                                12:03:04 12/03/2025
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        Clean hotel, great service, friendly and helpful staff!
                      </p>
                      <div>
                        <b
                          className="text-primary p-0 me-3"
                          style={{ textDecoration: "none" }}
                        >
                          5 lượt thích
                        </b>
                        <b
                          className="text-danger p-0"
                          style={{ textDecoration: "none" }}
                        >
                          7 lượt không thích
                        </b>
                      </div>
                    </Card.Body>
                  </Card>
                  <Form.Control.Feedback type="invalid">
                    Please provide the feedback identifier.
                  </Form.Control.Feedback>
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
                    <option value="threatening">
                      Threatening or Harassing
                    </option>
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
                    placeholder="Please describe why this feedback is being reported"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide details about the issue.
                  </Form.Control.Feedback>
                </Form.Group>

                <Alert variant="warning" className="d-flex align-items-center">
                  <ExclamationTriangle className="me-2" />
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
                    onClick={() => {
                      navigate(-1);
                    }}
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
      </div>
    </div>
  );
};

export default ReportedFeedbackHotel;
