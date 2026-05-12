import { useSearchParams } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import ProductCard from "../components/ProductCard";

// Mock data
const MOCK_PRODUCTS = [
  { id: 1, title: 'Laptop Pro', price: 1299, category: 'electronics' },
  { id: 2, title: 'Cotton T-Shirt', price: 29, category: 'clothing' },
  { id: 3, title: 'Smartphone X', price: 899, category: 'electronics' },
  { id: 4, title: 'Jeans', price: 79, category: 'clothing' },
  { id: 5, title: 'Headphones', price: 199, category: 'electronics' },
  { id: 6, title: 'Jacket', price: 149, category: 'clothing' },
];

function ProductsList() {
  // Using useSearchParams for query parameters (works the same in data router)
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const getHeading = () => {
    if (!categoryFilter) return 'All Products';
    const categoryName = categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1);
    return `Currently Browsing: ${categoryName}`;
  };
  
  const filteredProducts = categoryFilter
    ? MOCK_PRODUCTS.filter(product => product.category === categoryFilter)
    : MOCK_PRODUCTS;
  
  const handleFilter = (category: string | null) => {
    if (category) {
      setSearchParams({ category: category });
    } else {
      setSearchParams({});
    }
  };
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        {getHeading()}
      </Typography>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button 
          variant={!categoryFilter ? "contained" : "outlined"}
          onClick={() => handleFilter(null)}
        >
          All Products
        </Button>
        <Button 
          variant={categoryFilter === 'electronics' ? "contained" : "outlined"}
          onClick={() => handleFilter('electronics')}
        >
          Electronicss
        </Button>
        <Button 
          variant={categoryFilter === 'clothing' ? "contained" : "outlined"}
          onClick={() => handleFilter('clothing')}
        >
          Clothing
        </Button>
      </Box>
      
      {/* Responsive Product Cards */}
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(3, minmax(0, 1fr))',
          },
        }}
      >
        {filteredProducts.map((product) => (
          <Box key={product.id}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default ProductsList;