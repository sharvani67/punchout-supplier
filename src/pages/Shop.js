import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

export default function Shop() {
  const [params] = useSearchParams();
  const sessionId = params.get("session");

  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mouse", price: 500 },
    { id: 3, name: "Keyboard", price: 1500 },
    { id: 4, name: "Headphones", price: 2500 },
    { id: 5, name: "Monitor", price: 12000 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // ✅ Calculate total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const checkout = async () => {
    const res = await fetch("https://skirt-willow-lodging-came.trycloudflare.com/api/supplier/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, cart }),
    });

    const html = await res.text();

    document.open();
    document.write(html);
    document.close();
  };

  return (
    <Container className="mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          🛍️ Supplier Store{" "}
          <Badge bg="success">{cart.length}</Badge>
        </h2>

        <div>
          <h5 className="mb-0">
            Total: <span className="text-success">₹{total}</span>
          </h5>
        </div>
      </div>

      {/* Product Grid */}
      <Row>
        {products.map((p) => (
          <Col md={4} key={p.id}>
            <Card className="mb-4 shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-bold">{p.name}</Card.Title>
                <Card.Text className="text-muted">
                  ₹{p.price}
                </Card.Text>

                <Button
                  variant="outline-primary"
                  onClick={() => addToCart(p)}
                  className="w-100"
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Checkout Section */}
      <div className="text-center mt-4">
        <Button
          variant="dark"
          size="lg"
          disabled={cart.length === 0}
          onClick={checkout}
        >
          Proceed to Checkout ({cart.length} items)
        </Button>
      </div>
    </Container>
  );
}