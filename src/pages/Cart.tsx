import { Container, Typography, Paper } from "@mui/material";

function Cart() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Your cart is currently empty.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Cart;