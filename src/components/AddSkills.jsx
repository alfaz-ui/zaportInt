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
import { useNavigate } from "react-router-dom";
import ResumeUpload from "./../utils/ResumeUpload";
import talentService from "./services/talentService";
import SnackbarUtils from "../utils/SnackbarUtils";

function AddSkills() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState({
    skill1: "",
    skill2: "",
    skill3: "",
  });
  const [resume, setResume] = useState(null); // Store uploaded resume
  const [technicalCandidate, setTechnicalCandidate] = useState(true); // Default to true

  const handleChange = (e) => {
    setSkills({
      ...skills,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioChange = (value) => {
    setTechnicalCandidate(value === "true"); // Convert string to boolean
  };

  const handleResumeUpload = (file) => {
    setResume(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const skillData = Object.values(skills).join(",");

    formData.append("skills", JSON.stringify(skillData));

    formData.append("resume", resume); // Attach file
    formData.append("technicalCandidate", technicalCandidate);

    try {
      const response = await talentService.uploadSkills(formData);

      if (response.status === 200) {
        SnackbarUtils.success("Added successfully!");
        navigate("/test");
      } else {
        SnackbarUtils.error("Sorry, something went wrong.");
      }
    } catch (error) {
      console.error("API Error:", error);
      SnackbarUtils.error("Failed to submit resume.");
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "100%", height: "auto", p: "20px 20px" }}>
        <img
          src="/tamcherry-logo.png"
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
                  value={technicalCandidate.toString()}
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
                      borderColor: technicalCandidate ? "blue" : "#c4c4c4",
                      backgroundColor: technicalCandidate ? "#E3F2FD" : "white",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                  </Box>

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
                      borderColor: !technicalCandidate ? "blue" : "#c4c4c4",
                      backgroundColor: !technicalCandidate
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

            {/* Resume Upload Component */}
            <ResumeUpload onUpload={handleResumeUpload} />

            <Button
              onClick={
                () => handleSubmit()
                // navigate("/test")
              }
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
