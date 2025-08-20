import React, { useState, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhoneFlip } from "react-icons/fa6";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!role || !name || !phone || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundImage: 'url("/login_img.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          borderRadius: 3,
          overflow: "hidden",
          width: "100%",
          height: { xs: "auto", md: "92%" },
          maxWidth: 1300,
          bgcolor: "white",
          boxShadow: 8,
        }}
      >
        {/* Image Section - Left Side */}
        <Box
          sx={{
            flex: isSmallScreen ? "0 0 200px" : "0 0 60%",
            backgroundImage: 'url("/login1.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Form Section - Right Side */}
        <Box
          sx={{
            flex: isSmallScreen ? "1" : "0 0 40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 3, md: 6 },
            bgcolor: "#f9f9f9",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 400,
              boxShadow: "none",
              bgcolor: "transparent",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  Create a New Account
                </Typography>
              </Box>

              {/* Role Field */}
              <TextField
                select
                fullWidth
                label="Register As"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaRegUser />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="Employer">Employer</MenuItem>
                <MenuItem value="Job Seeker">Job Seeker</MenuItem>
              </TextField>

              {/* Name Field */}
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaPencilAlt />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Email Field */}
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineMailOutline />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Phone Field */}
              <TextField
                fullWidth
                label="Phone Number"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaPhoneFlip />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RiLock2Fill />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Register Button */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, py: 1.2 }}
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Register"
                )}
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{ color: "#1976d2", fontWeight: "bold" }}
                  >
                    Login Now
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
