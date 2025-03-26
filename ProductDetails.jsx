import { useParams, useNavigate } from "react-router-dom";
import { Card, Image, Text, Button, Container, Loader, Center } from "@mantine/core";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Center style={{ height: "100vh" }}><Loader size="xl" color="blue" /></Center>;
  if (error) return <p style={{ textAlign: "center", color: "red", fontSize: "18px", fontWeight: "bold" }}>⚠️ Failed to load product details.</p>;

  return (
    <Container style={{ padding: "30px", minHeight: "100vh" }}>
     

      <Card shadow="lg" padding="lg" radius="lg" style={{ textAlign: "center", maxWidth: "500px", margin: "30px auto" }}>
        <Image src={product.image} width={250} height={250} alt={product.title} />
        <Text weight={700} size="xl">{product.title}</Text>
        <Text size="md" color="gray">{product.description}</Text>
        <Text size="lg" color="blue">💰 Price: <b>${product.price}</b></Text>
        <Button fullWidth color="green" onClick={() => navigate("/cart")}>
        🛒 Go to Cart
      </Button>
      <Button color="gray" variant="outline" onClick={() => navigate("/")}>
        🔙 Back to Home
      </Button>
      </Card>

     
    </Container>
  );
};

export default ProductDetails;
