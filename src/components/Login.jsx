import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  Card,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins";
import OrSeparator from "./common/OrSeperator";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CLIENT_ID =
  "426835473506-24irep3jal3bbvfj135fh3fbg8irs7k9.apps.googleusercontent.com";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTalentLogin, setIsTalentLogin] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("login", true);
    navigate("/skills");

    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleGoogleLogin = async () => {
    try {
      // Redirect user to backend's Google OAuth endpoint
      window.location.href = `${process.env.REACT_APP_API_BASE_URL}/auth/google`;
    } catch (error) {
      console.error("Google authentication failed:", error);
    }
  };

  const handleTalentLogin = (event) => {
    event.preventDefault();
    setIsTalentLogin(true);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      navigate("/skills"); // Redirect to homepage or dashboard
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#F5F4F8",
        }}
        component="main"
      >
        <Card sx={{ p: 3, borderRadius: 3, maxWidth: 450, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography fontWeight={600} component="h1" variant="h5">
              {isTalentLogin ? "Talent Login" : "Company Login"}
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 2, width: "100%" }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isTalentLogin && (
                <>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                    <Link href="#" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Box>
                </>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1, padding: "1rem 2rem", borderRadius: 25 }}
              >
                Login
              </Button>
              <OrSeparator />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleGoogleLogin}
                  startIcon={
                    <img
                      src="/google-icon.svg"
                      alt="Google"
                      style={{ width: 20, height: 20 }}
                    />
                  }
                  sx={{
                    padding: "1rem 2rem",
                    fontWeight: "bold",
                    borderRadius: 25,
                    mt: 1,
                    borderColor: "#e0e0ec",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="#55555e"
                    fontWeight={500}
                    fontSize={"0.9rem"}
                    textTransform={"none"}
                  >
                    Login with Google
                  </Typography>
                </Button>
              </Box>
              <Typography
                mt={2}
                textAlign={"center"}
                fontSize={".875rem"}
                variant="body1"
              >
                By continuing, you agree to the{" "}
                <Link href="/terms-and-conditions" underline="hover">
                  terms & conditions
                </Link>
              </Typography>
            </Box>
          </Box>
        </Card>
        {!isTalentLogin && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Typography variant="body2">Are you a talent?</Typography>
            <Link
              sx={{ ml: 1 }}
              href="#"
              variant="body2"
              onClick={handleTalentLogin}
            >
              Login as talent
            </Link>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default Login;
