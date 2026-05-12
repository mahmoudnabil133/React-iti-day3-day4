import { Outlet, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';

function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Fixed Navbar using Material-UI */}
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Button 
            color="inherit" 
            component={NavLink} 
            to="/"
            sx={{ mr: 2 }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={NavLink} 
            to="/cart"
          >
            Cart
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main content area with padding to account for fixed navbar */}
      <Container sx={{ mt: 10, flex: 1 }}>
        {/* This is where child routes will render */}
        <Outlet />
      </Container>

      {/* Optional Footer */}
      <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
        <p>© 2024 My Store</p>
      </Box>
    </Box>
  );
}

export default MainLayout;