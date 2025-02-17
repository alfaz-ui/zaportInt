import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function AddSkills() {
  const [skills, setSkills] = useState({
    skill1: "",
    skill2: "",
    skill3: "",
  });
  const [isSoftwareEngineer, setIsSoftwareEngineer] = useState(true); // Default to true

  const handleChange = (e) => {
    setSkills({
      ...skills,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioChange = (value) => {
    setIsSoftwareEngineer(value === "true"); // Convert string to boolean
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted skills:", skills);
    console.log("Are you a software engineer?", isSoftwareEngineer);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%", height: "auto", p: "20px 20px" }}>
        <img
          src="/tamcherry-logo.jpg"
          alt="Logo of tamcherry"
          style={{ width: 120, height: "auto" }}
        />
      </Box>

      <CssBaseline />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, maxWidth: 496, margin: "0px auto" }}
      >
        <Typography
          fontWeight={600}
          fontSize={"1.5rem"}
          fontFamily={"Poppins"}
          textAlign={"start"}
        >
          Tell us your top skills
        </Typography>
        <Typography fontSize={".875rem"} mt={2} textAlign={"start"}>
          You're about to take an AI Interview based on the skills and
          experiences displayed in your resume. This will take 42 minutes and
          will give us valuable insight into your skillset. Please enter your
          top 3 preferred skills.
        </Typography>

        <Box mt={3} mb={3} component={"form"} onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Main Skill #1"
              variant="outlined"
              name="skill1"
              value={skills.skill1}
              onChange={handleChange}
            />
            <TextField
              label="Main Skill #2"
              variant="outlined"
              name="skill2"
              value={skills.skill2}
              onChange={handleChange}
            />
            <TextField
              label="Main Skill #3"
              variant="outlined"
              name="skill3"
              value={skills.skill3}
              onChange={handleChange}
            />

            <Box mt={3} sx={{ display: "flex", width: "100%" }}>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel
                  sx={{
                    color: "black",
                    mb: 2,
                    "&.Mui-focused": { color: "black" },
                  }}
                >
                  Are you a software engineer?
                </FormLabel>

                <RadioGroup
                  row
                  name="softwareEngineer"
                  value={isSoftwareEngineer.toString()}
                  onChange={(e) => handleRadioChange(e.target.value)}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="label"
                    onClick={() => handleRadioChange("true")}
                    sx={{
                      width: 200,
                      height: 50,
                      display: "flex",
                      padding: "0 10px",
                      border: "2px solid #c4c4c4",
                      borderRadius: "8px",
                      cursor: "pointer",
                      borderColor: isSoftwareEngineer ? "blue" : "#c4c4c4",
                      backgroundColor: isSoftwareEngineer ? "#E3F2FD" : "white",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />} // Hide actual radio button
                      label="Yes"
                    />
                  </Box>

                  {/* No Option */}
                  <Box
                    component="label"
                    onClick={() => handleRadioChange("false")}
                    sx={{
                      width: 200,
                      height: 50,
                      display: "flex",
                      padding: "0 10px",
                      border: "2px solid #c4c4c4",
                      borderRadius: "8px",
                      cursor: "pointer",
                      borderColor: !isSoftwareEngineer ? "blue" : "#c4c4c4",
                      backgroundColor: !isSoftwareEngineer
                        ? "#E3F2FD"
                        : "white",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </Box>
                </RadioGroup>
              </FormControl>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 1,
                padding: "1rem 2rem",
                borderRadius: 25,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Start the AI Interview
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default AddSkills;
