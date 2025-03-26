import { useNavigate } from "react-router-dom";
import { Card, Image, Text, Button, Container, Center } from "@mantine/core";
import { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);


  const handleBuyNow = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("🎉 Order successfully placed!");

    if (updatedCart.length === 0) {
      navigate("/");
    }
  };


  const handleRemove = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Container style={{ padding: "30px", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "32px", fontWeight: "bold" }}>
        🛍️ My Cart
      </h1>

      {cart.length === 0 ? (
        <Center>
          <Text size="lg" color="gray">Your cart is empty.</Text>
        </Center>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {cart.map((product) => (
            <Card key={product.id} shadow="lg" padding="lg" radius="lg" style={{ width: "250px", textAlign: "center" }}>
              <Image src={product.image} width={200} height={200} alt={product.title} />
              <Text weight={700} size="lg">{product.title}</Text>
              <Text size="sm" color="gray">💰 Price: <b>${product.price}</b></Text>
              <Text size="sm" color="blue">📦 Quantity: {product.quantity}</Text>


              <Button fullWidth mt="md" color="green" onClick={() => handleBuyNow(product.id)}>
                ✅ Buy Now
              </Button>


              <Button fullWidth mt="md" color="red" variant="outline" onClick={() => handleRemove(product.id)}>
                ❌ Remove
              </Button>
            </Card>
          ))}
        </div>
      )}

      <Center mt="xl">
        <Button color="blue" variant="outline" onClick={() => navigate("/")}>
          🔙 Continue Shopping
        </Button>
      </Center>
    </Container>
  );
};

export default Cart;
