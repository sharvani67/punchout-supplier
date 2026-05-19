import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { BASEURL } from "../Config/Api";

const SupplierAdmin = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all sessions
  const fetchSessions = async () => {
    const res = await fetch(`${BASEURL}/api/admin/sessions`);
    const data = await res.json();
    setSessions(data);
  };

  // ✅ Fetch session details
  const fetchSessionDetails = async (session) => {
    setLoading(true);
    setSelectedSession(session);

    const res = await fetch(`${BASEURL}/api/admin/session/${session.id}`);
    const data = await res.json();

    setDetails(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* 🔹 LEFT: Sessions List */}
        <Col md={4}>
          <Card className="shadow">
            <Card.Header className="bg-dark text-white">
              🧾 All Sessions
            </Card.Header>

            <ListGroup variant="flush">
              {sessions.map((session) => (
                <ListGroup.Item
                  key={session.id}
                  action
                  active={selectedSession === session.id}
                  onClick={() => fetchSessionDetails(session)}
                >
                  <div>
                    <strong>Session:</strong> {session.id.slice(0, 8)}...
                  </div>
                  <small>Buyer: {session.buyer_id}</small>
                  <br />
                  <small>Buyer Email: {session.buyer_email}</small>
                  <br />
                  <small>Status: {session.status}</small>
                  
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* 🔹 RIGHT: Details */}
        <Col md={8}>
          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
            </div>
          ) : details ? (
            <>
              {/* 🧍 Buyer / Session Info */}
              <Card className="mb-3 shadow">
                <Card.Header className="bg-primary text-white">
                  📌 Session Details
                </Card.Header>
                <Card.Body>
                  <p>
                    <strong>Session ID:</strong> {selectedSession.id}<br/>
                    <strong>Buyer Email ID:</strong> {selectedSession.buyer_email}
                  </p>
                </Card.Body>
              </Card>

              {/* 🛒 Cart Items */}
              <Card className="mb-3 shadow">
                <Card.Header className="bg-success text-white">
                  🛒 Cart Items
                </Card.Header>
                <Card.Body>
                  {details.items.length > 0 ? (
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {details.items.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.product_name}</td>
                            <td>₹{item.price}</td>
                            <td>{item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No cart items</p>
                  )}
                </Card.Body>
              </Card>

              {/* 📊 Activity Timeline */}
              <Card className="shadow">
                <Card.Header className="bg-warning">
                  📊 Session Activity
                </Card.Header>
                <Card.Body>
                  {details.activity.length > 0 ? (
                    <ListGroup>
                      {details.activity.map((act, index) => (
                        <ListGroup.Item key={index}>
                          <strong>{act.action}</strong>
                          <br />
                          <small>{act.created_at}</small>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p>No activity found</p>
                  )}
                </Card.Body>
              </Card>
            </>
          ) : (
            <div className="text-center mt-5">
              <h5>Select a session to view details</h5>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SupplierAdmin;