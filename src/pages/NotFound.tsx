import { Container, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Paper sx={{ p: 5, textAlign: 'center', mt: 5 }}>
        <Typography variant="h1" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 2 }}>
          The page you're looking for doesn't exist.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Paper>
    </Container>
  );
}

export default NotFound;