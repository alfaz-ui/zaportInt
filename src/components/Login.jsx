import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
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
    setShowPassword((prev) => !prev); // Toggle password visibility
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("login", true);
    navigate("/dashboard");

    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Google login clicked");
  };

  const handleTalentLogin = (event) => {
    event.preventDefault(); // Prevent default link behavior
    setIsTalentLogin(true); // Update state
  };

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
              {isTalentLogin ? null : (
                <>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"} // Show password if 'showPassword' is true
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
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
        {isTalentLogin ? null : (
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
