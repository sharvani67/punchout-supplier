import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import { BASEURL } from "../Config/Api";

const CartPage = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session");

  const handleReturn = async () => {
    const res = await fetch(`${BASEURL}/api/supplier/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, cart }),
    });

    const data = await res.json();

    await fetch(`${BASEURL}/api/buyer/cart/receive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cxml: data.cxml,
        sessionId,
      }),
    });

    window.location.href = data.redirectUrl;
  };

  return (
    <Container className="mt-5">
      <h2>🛒 Cart</h2>

      <Table bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Total</th>
    </tr>
  </thead>

  <tbody>
    {cart.map((item, i) => (
      <tr key={i}>
        <td>{item.name}</td>
        <td>₹{item.price}</td>
        <td>{item.qty || 1}</td>
        <td>₹{item.price * (item.qty || 1)}</td>
      </tr>
    ))}
  </tbody>
</Table>

      <Button variant="success" onClick={handleReturn}>
        Return to Buyer ✅
      </Button>
    </Container>
  );
};

export default CartPage;