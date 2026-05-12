import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Paper, Box } from "@mui/material";

// Mock data
const MOCK_PRODUCTS: Record<number, any> = {
  1: { id: 1, title: 'Laptop Pro', price: 1299, category: 'electronics', description: 'High-performance laptop' },
  2: { id: 2, title: 'Cotton T-Shirt', price: 29, category: 'clothing', description: 'Comfortable t-shirt' },
  3: { id: 3, title: 'Smartphone X', price: 899, category: 'electronics', description: 'Latest smartphone' },
  4: { id: 4, title: 'Jeans', price: 79, category: 'clothing', description: 'Classic blue jeans' },
  5: { id: 5, title: 'Headphones', price: 199, category: 'electronics', description: 'Noise-cancelling' },
  6: { id: 6, title: 'Jacket', price: 149, category: 'clothing', description: 'Warm winter jacket' },
};

function ProductDetails() {
  // Extract the 'id' parameter from URL - matches "product/:id" in router config
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = MOCK_PRODUCTS[Number(id)];
  
  if (!product) {
    return (
      <Container>
        <Typography variant="h4" color="error" gutterBottom>
          Product Not Found
        </Typography>
        <Typography>No product found with ID: {id}</Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      
      {/* Required output format from lab */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#f0f8ff' }}>
        <Typography variant="h6" color="primary">
          📦 Fetching detailed data for Product ID: {id}
        </Typography>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          ${product.price}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <strong>Category:</strong> {product.category}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <strong>Description:</strong> {product.description}
        </Typography>
      </Paper>
      
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => navigate('/')}>
          ← Back to Home
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
}

export default ProductDetails;