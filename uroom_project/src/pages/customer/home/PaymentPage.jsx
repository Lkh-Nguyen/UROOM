import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from '../../../images/banner.jpg';

const PaymentPage = () => {
    return (
        <div className="payment-page" style={{
            backgroundImage: `url(${Banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <Card className="payment-card" style={{
                maxWidth: '800px',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '15px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: 'none'
            }}>
                <Card.Body className="p-4">
                    <Row>
                        <Col md={6} className="d-flex flex-column align-items-center">
                            <div className="qr-code-container bg-white p-3 mb-3" style={{
                                borderRadius: '10px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                            }}>
                                <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=UROOM-PAYMENT-VORQ00023Snha-400USD"
                                    alt="Payment QR Code"
                                    style={{ width: '300px', height: '300px' }}
                                />
                            </div>
                            <Button
                                variant="light"
                                className="mt-2"
                                style={{
                                    backgroundColor: '#fff',
                                    color: '#007bff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '8px 30px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                                    fontWeight: 500
                                }}
                            >
                                Hủy
                            </Button>
                        </Col>
                        <Col md={6} className="payment-details d-flex align-items-center">
                            <div className="w-100">
                                <div className="mb-4">
                                    <p className="text-muted mb-1" style={{ fontSize: '0.9rem', fontSize: 16, color: "#808080", fontWeight: 500}}>Account holder</p>
                                    <h5 className="mb-3">ABC</h5>

                                    <p className="text-muted mb-1" style={{ fontSize: '0.9rem', fontSize: 16, color: "#808080", fontWeight: 500 }}>Account number</p>
                                    <h5 className="mb-3">VORQ00023Snha</h5>

                                    <p className="text-muted mb-1" style={{ fontSize: '0.9rem', fontSize: 16, color: "#808080", fontWeight: 500 }}>Amount</p>
                                    <h5 className="mb-3">$400</h5>

                                    <p className="text-muted mb-1" style={{ fontSize: '0.9rem', fontSize: 16, color: "#808080", fontWeight: 500 }}>Content</p>
                                    <h5>Payment for UROOM</h5>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PaymentPage;