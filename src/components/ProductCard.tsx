import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Chip,
} from "@mui/material";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
  thumbnail: string;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Product Image */}
      <Box
        component="img"
        src={product.thumbnail}
        alt={product.title}
        sx={{
          height: 200,
          objectFit: "cover",
          borderBottom: "1px solid #e0e0e0",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Category: {product.category}
        </Typography>

        {/* Conditional Rendering for Stock Status */}
        <Box sx={{ mt: 1 }}>
          {product.stock === 0 ? (
            <Chip
              label="OUT OF STOCK"
              color="error"
              size="small"
              sx={{ fontWeight: "bold" }}
            />
          ) : (
            <Chip
              label={`IN STOCK (${product.stock} available)`}
              color="success"
              size="small"
              sx={{ fontWeight: "bold" }}
            />
          )}
        </Box>
      </CardContent>

      <CardActions>
        <Button
          component={Link}
          to={`/product/${product.id}`}
          variant="contained"
          fullWidth
          disabled={product.stock === 0} // Disable if out of stock
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
