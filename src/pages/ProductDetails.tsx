import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  brand: string;
  rating: number;
  thumbnail: string;
  images: string[];
}

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch product data when ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <Paper sx={{ p: 5, textAlign: "center", mt: 5 }}>
          <Typography variant="h4" color="error" gutterBottom>
            Product Not Found
          </Typography>
          <Typography variant="body1" component="p">
            No product found with ID: {id}
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>

      {/* Required output from lab */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: "#f0f8ff" }}>
        <Typography variant="h6" color="primary">
          📦 Fetching detailed data for Product ID: {id}
        </Typography>
      </Paper>

      {/* Product Details Grid */}
      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
        }}
      >
        {/* Product Images */}
        <Box>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box
              component="img"
              src={product.thumbnail}
              alt={product.title}
              sx={{
                width: "100%",
                borderRadius: 1,
                mb: 2,
              }}
            />
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              }}
            >
              {product.images?.slice(0, 3).map((img, index) => (
                <Box key={index}>
                  <Box
                    component="img"
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Product Info */}
        <Box>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              {product.title}
            </Typography>

            <Typography variant="h4" color="primary" gutterBottom>
              ${product.price}
            </Typography>

            <Box sx={{ my: 2 }}>
              {product.stock === 0 ? (
                <Chip label="OUT OF STOCK" color="error" size="medium" />
              ) : (
                <Chip
                  label={`IN STOCK (${product.stock} units available)`}
                  color="success"
                  size="medium"
                />
              )}
            </Box>

            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              <strong>Brand:</strong> {product.brand}
            </Typography>

            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              <strong>Category:</strong> {product.category}
            </Typography>

            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              <strong>Rating:</strong> ⭐ {product.rating} / 5
            </Typography>

            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              <strong>Description:</strong> {product.description}
            </Typography>

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button variant="outlined" onClick={() => navigate("/")}>
                Back to Products
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductDetails;
