import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          component={Link} 
          to={`/product/${product.id}`}
          variant="contained" 
          fullWidth
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;