import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
  thumbnail: string;
}

function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  // State for API data
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 10; // 10 items per page as required

  // Fetch products when page or filter changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // Calculate skip based on current page (0-based for API)
      const skip = (currentPage - 1) * itemsPerPage;

      // Build URL with pagination parameters
      let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        // If category filter is active, filter the products client-side
        // (DummyJSON doesn't support category filtering with pagination easily)
        let filteredProducts = data.products;
        if (categoryFilter) {
          filteredProducts = data.products.filter(
            (product: Product) => product.category === categoryFilter,
          );
        }

        setProducts(filteredProducts);
        setTotalProducts(data.total); // Total from API (unfiltered)
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, categoryFilter]); // Re-fetch when page or filter changes

  const getHeading = () => {
    if (!categoryFilter) return "All Products";
    const categoryName =
      categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1);
    return `Currently Browsing: ${categoryName}`;
  };

  const handleFilter = (category: string | null) => {
    if (category) {
      setSearchParams({ category: category });
      setCurrentPage(1); // Reset to first page when filtering
    } else {
      setSearchParams({});
      setCurrentPage(1); // Reset to first page when clearing filter
    }
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  // Calculate total pages (using filtered products count for better UX)
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

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

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        {getHeading()}
      </Typography>

      {/* Filter Buttons */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          gap: 1.5,
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        <Button
          size="small"
          variant={!categoryFilter ? "contained" : "outlined"}
          onClick={() => handleFilter(null)}
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            padding: { xs: "6px 12px", sm: "8px 16px" },
          }}
        >
          All Products
        </Button>
        {[
          "mobile-accessories",
          "mens-watches",
          "mens-shirts",
          "laptops",
          "kitchen-accessories",
          "home-decoration",
          "groceries",
          "furniture",
          "beauty",
        ].map((category) => (
          <Button
            key={category}
            size="small"
            variant={categoryFilter === category ? "contained" : "outlined"}
            onClick={() => handleFilter(category)}
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              padding: { xs: "6px 12px", sm: "8px 16px" },
              textTransform: "capitalize",
              whiteSpace: "nowrap",
            }}
          >
            {category.replace(/-/g, " ")}
          </Button>
        ))}
      </Box>

      {/* Products Grid */}
      {products.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography variant="h6">
            No products found in this category.
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(3, minmax(0, 1fr))",
              },
            }}
          >
            {products.map((product) => (
              <Box key={product.id}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>

          {/* Pagination Controls */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default ProductsList;
