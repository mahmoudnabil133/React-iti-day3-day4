import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

interface FormData {
  email: string;
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

function Register() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Errors state
  const [errors, setErrors] = useState<FormErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  // Password validation helpers
  const [passwordChecks, setPasswordChecks] = useState({
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasDigit: false,
    hasSpecialChar: false,
  });

  // Update password checks in real-time
  const updatePasswordChecks = (password: string) => {
    setPasswordChecks({
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasDigit: /\d/.test(password),
      hasSpecialChar: /[@%$#]/.test(password),
    });
  };

  // Validation function - returns true if valid
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Email validation (required + email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Please enter a valid email address (e.g., name@example.com)";
    }

    // 2. Name validation (required)
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // 3. Username validation (required, no spaces)
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.includes(" ")) {
      newErrors.username = "Username cannot contain spaces";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // 4. Password validation (complex regex)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%$#])[A-Za-z\d@%$#]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password does not meet requirements";
    }

    // 5. Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    if (validateForm()) {
      // Alert the object data (as required by lab)
      const userData = {
        email: formData.email,
        name: formData.name,
        username: formData.username,
        password: formData.password,
      };

      alert(JSON.stringify(userData, null, 2));

      // Store user data in localStorage (optional)
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect to home page
      navigate("/");
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update password checks in real-time
    if (name === "password") {
      updatePasswordChecks(value);
    }

    // Clear specific error when user starts typing
    if (showErrors && errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", color: "primary.main" }}
        >
          Create an Account
        </Typography>

        <Typography variant="body1" sx={{ textAlign: "center", mb: 3 }}>
          Please fill in the form below to register
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={showErrors && !!errors.email}
              helperText={showErrors && errors.email}
              placeholder="john.doe@example.com"
            />

            {/* Name Field */}
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={showErrors && !!errors.name}
              helperText={showErrors && errors.name}
              placeholder="John Doe"
            />

            {/* Username Field */}
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={showErrors && !!errors.username}
              helperText={showErrors && errors.username}
              placeholder="johndoe (no spaces allowed)"
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={showErrors && !!errors.password}
              helperText={showErrors && errors.password}
            />

            {/* Password Requirements Checklist */}
            {formData.password && (
              <Box sx={{ ml: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", mb: 1.5 }}
                >
                  Password Requirements:
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: passwordChecks.minLength
                        ? "success.main"
                        : "error.main",
                    }}
                  >
                    {passwordChecks.minLength ? "✓" : "✗"} At least 8 characters
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: passwordChecks.hasLowercase
                        ? "success.main"
                        : "error.main",
                    }}
                  >
                    {passwordChecks.hasLowercase ? "✓" : "✗"} At least one
                    lowercase letter
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: passwordChecks.hasUppercase
                        ? "success.main"
                        : "error.main",
                    }}
                  >
                    {passwordChecks.hasUppercase ? "✓" : "✗"} At least one
                    uppercase letter
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: passwordChecks.hasDigit
                        ? "success.main"
                        : "error.main",
                    }}
                  >
                    {passwordChecks.hasDigit ? "✓" : "✗"} At least one digit
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: passwordChecks.hasSpecialChar
                        ? "success.main"
                        : "error.main",
                    }}
                  >
                    {passwordChecks.hasSpecialChar ? "✓" : "✗"} At least one
                    special character (@ % $ #)
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={showErrors && !!errors.confirmPassword}
              helperText={showErrors && errors.confirmPassword}
            />

            <Divider sx={{ my: 2 }} />

            {/* Submit and Cancel Buttons */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ minWidth: 150 }}
              >
                Register
              </Button>
              <Button
                type="button"
                variant="outlined"
                size="large"
                onClick={() => navigate("/")}
                sx={{ minWidth: 150 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
