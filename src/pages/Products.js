import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session");
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Laptop", price: 75000 },
    { id: 2, name: "Headphones", price: 2500 },
    { id: 3, name: "Keyboard", price: 1500 },
    { id: 4, name: "Mouse", price: 800 },
    { id: 5, name: "Monitor", price: 12000 },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">
        🛍️ Supplier Store
        <Badge bg="success" className="ms-2">{cart.length}</Badge>
      </h2>

      <Row>
        {products.map((p) => (
          <Col md={4} key={p.id}>
            <Card className="mb-4 shadow">
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>₹{p.price}</Card.Text>

                <Button onClick={() => addToCart(p)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center">
        <Button
          variant="dark"
          onClick={() =>
            navigate(`/cart?session=${sessionId}`, { state: { cart } })
          }
        >
          Go to Cart 🛒
        </Button>
      </div>
    </Container>
  );
};

export default ProductPage;