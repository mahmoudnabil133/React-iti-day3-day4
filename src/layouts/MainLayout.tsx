import { Outlet, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";

function MainLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Button color="inherit" component={NavLink} to="/" sx={{ mr: 2 }}>
            Products
          </Button>
          <Button color="inherit" component={NavLink} to="/cart" sx={{ mr: 2 }}>
            Cart
          </Button>
          <Button color="inherit" component={NavLink} to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 10, flex: 1 }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{ py: 3, textAlign: "center", bgcolor: "#f5f5f5" }}
      >
        <Typography variant="body2">
          © 2024 My Store | Powered by DummyJSON API
        </Typography>
      </Box>
    </Box>
  );
}

export default MainLayout;
