import { useFetchProducts } from "../hooks/useFetchProducts";
import { Link, useNavigate } from "react-router-dom";
import { Card, Image, Text, Button, Container, Loader, Center, NumberInput, Title } from "@mantine/core";
import { useState } from "react";

const Home = () => {
  const { data: products, isLoading, isError } = useFetchProducts();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  if (isLoading) {
    return <Center style={{ height: "100vh" }}><Loader size="xl" color="blue" /></Center>;
  }

  if (isError) return <p style={{ textAlign: "center", color: "red", fontSize: "18px", fontWeight: "bold" }}>⚠️ Failed to load products.</p>;

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({ ...prev, [productId]: value }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <Container style={{ padding: "40px", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Title align="center" order={1} style={{ marginBottom: "30px", color: "#2C3E50" }}>🛒 AirtribeBuy - Trending Products</Title>

      <Button 
        style={{
          marginBottom: "20px", 
          fontSize: "16px", 
          background: "linear-gradient(135deg, #4CAF50, #2E8B57)",
          color: "white",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease",
        }}
        fullWidth 
        onClick={() => navigate("/cart")}
      >
        🛒 Go to My Cart
      </Button>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
        {products.map((product) => (
          <Card 
            key={product.id} 
            shadow="xl" 
            padding="lg" 
            radius="md" 
            style={{ 
              width: "280px", 
              textAlign: "center", 
              transition: "transform 0.3s", 
              cursor: "pointer", 
              background: "white", 
              borderRadius: "15px",
              boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Image src={product.image} width={220} height={220} alt={product.title} style={{ margin: "0 auto", borderRadius: "10px" }} />
            <Text weight={700} size="lg" mt="md" color="#34495E">{product.title}</Text>
            <Text size="md" color="gray" mt="xs">💰 Price: <b>${product.price}</b></Text>
            
            {/* <NumberInput
              min={1}
              defaultValue={1}
              onChange={(value) => handleQuantityChange(product.id, value)}
              style={{ marginTop: "10px" }}
            /> */}

            <Button 
              fullWidth 
              mt="md" 
              style={{ 
                background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                color: "white",
                fontWeight: "bold",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease"
              }}
              onClick={() => handleAddToCart(product)}
            >
              ➕ Add to Cart
            </Button>

            <Button 
              fullWidth 
              mt="md" 
              style={{
                backgroundColor: "#FF9800", 
                color: "white", 
                border:"black",
                fontWeight: "bold", 
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease"
                
              }}
              component={Link} 
              to={`/product/${product.id}`}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              🔍 View Details
            </Button>
          <br/><br/>
          </Card>
         
        ))}
      </div>
    </Container>
  );
};

export default Home;