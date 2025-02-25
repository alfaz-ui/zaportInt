import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import talentService from "./services/talentService";
import SnackbarUtils from "../utils/SnackbarUtils";

// Reusable component for handling switch/checkbox
const OptionToggle = ({ label, checked, onChange, name, isSwitch = false }) => (
  <FormControlLabel
    control={
      isSwitch ? (
        <Switch
          checked={checked}
          onChange={() => onChange(name)}
          name={name}
          color="secondary"
        />
      ) : (
        <Checkbox
          checked={checked}
          onChange={() => onChange(name)}
          name={name}
          color="secondary"
        />
      )
    }
    label={label}
  />
);

function AdditionalInfo() {
  const navigate = useNavigate();

  const [additionalData, setAdditionalData] = useState({
    desiredSalary: { from: "", to: "" },
    workStyle: {
      remote: false,
      hybrid: false,
      onsite: false,
    },
    jobType: "fullTime", // Updated to use a string for RadioGroup
    noticePeriod: "lessthan7", // Updated to use a string for RadioGroup
  });

  const handleSalaryChange = (event) => {
    const { name, value } = event.target;
    setAdditionalData((prevData) => ({
      ...prevData,
      desiredSalary: {
        ...prevData.desiredSalary,
        [name]: value,
      },
    }));
  };

  // Handle changes for workStyle, jobType, and noticePeriod
  const handleChange = (category, key) => {
    setAdditionalData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [key]: !prevData[category][key],
      },
    }));
  };

  const handleJobTypeChange = (value) => {
    setAdditionalData((prevData) => ({
      ...prevData,
      jobType: value,
    }));
  };

  const handleNoticePeriodChange = (value) => {
    setAdditionalData((prevData) => ({
      ...prevData,
      noticePeriod: value,
    }));
  };

  const handleSubmit = async () => {
    const selectedWorkStyles = Object.entries(additionalData.workStyle)
      .filter(([_, value]) => value) // Keep only key-value pairs where value is true
      .map(([key]) => key);
    const data = {
      desiredSalary: additionalData.desiredSalary,
      workStyle: selectedWorkStyles,
      preferredJobType: additionalData.jobType,
      availability: additionalData.noticePeriod,
    };

    try {
      const response = await talentService.additionalInfo(data);
      if (response.status === 200) {
        SnackbarUtils.success("Success");
      } else {
        SnackbarUtils.error("Couldn't add the data");
      }
      navigate("/profile");
    } catch (error) {
      SnackbarUtils.error("Something went wrong");
    }
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
          Additional Information
        </Typography>
        <Typography fontSize={".875rem"} mt={2} textAlign={"start"}>
          For proper matching please provide the following details.
        </Typography>

        <Box mt={3} mb={3} component={"form"} onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
              Select Desired Salary:
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Min Salary */}
              <FormControl sx={{ flex: 1 }} variant="filled">
                <InputLabel htmlFor="filled-adornment-salary-min">
                  Min Salary
                </InputLabel>
                <FilledInput
                  id="filled-adornment-salary-min"
                  name="from"
                  type="number"
                  value={additionalData.desiredSalary.from}
                  onChange={handleSalaryChange}
                  endAdornment={
                    <InputAdornment position="end">/month</InputAdornment>
                  }
                  aria-describedby="filled-salary-min-helper-text"
                  inputProps={{
                    "aria-label": "salary-min",
                    style: { MozAppearance: "textfield" },
                  }}
                  sx={{
                    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                      {
                        display: "none",
                      },
                  }}
                />
              </FormControl>

              <Typography>to</Typography>

              {/* Max Salary */}
              <FormControl sx={{ flex: 1 }} variant="filled">
                <InputLabel htmlFor="filled-adornment-salary-max">
                  Max Salary
                </InputLabel>
                <FilledInput
                  id="filled-adornment-salary-max"
                  name="to"
                  type="number"
                  value={additionalData.desiredSalary.to}
                  onChange={handleSalaryChange}
                  endAdornment={
                    <InputAdornment position="end">/month</InputAdornment>
                  }
                  aria-describedby="filled-salary-max-helper-text"
                  inputProps={{
                    "aria-label": "salary-max",
                    style: { MozAppearance: "textfield" },
                  }}
                  sx={{
                    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                      {
                        display: "none",
                      },
                  }}
                />
              </FormControl>
            </Box>
            <FormHelperText id="filled-salary-range-helper-text">
              Enter your expected salary range in rupees
            </FormHelperText>

            <Typography variant="h6" sx={{ mb: 1 }}>
              Select Work Style:
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              {["remote", "hybrid", "onsite"].map((style) => (
                <OptionToggle
                  key={style}
                  label={style.charAt(0).toUpperCase() + style.slice(1)}
                  checked={additionalData.workStyle[style]}
                  onChange={(name) => handleChange("workStyle", name)}
                  name={style}
                  isSwitch
                />
              ))}
            </Box>
            <FormHelperText>Select your preferred work style</FormHelperText>

            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
              Select Preferred Job Type:
            </Typography>
            <RadioGroup
              row
              name="jobType"
              value={additionalData.jobType}
              onChange={(e) => handleJobTypeChange(e.target.value)}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {["fullTime", "partTime", "contract"].map((type) => (
                <Box
                  key={type}
                  component="label"
                  onClick={() => handleJobTypeChange(type)}
                  sx={{
                    width: 200,
                    height: 50,
                    mt: 1,
                    display: "flex",
                    padding: "0 10px",
                    border: "2px solid #c4c4c4",
                    borderRadius: "8px",
                    cursor: "pointer",
                    borderColor:
                      additionalData.jobType === type ? "blue" : "#c4c4c4",
                    backgroundColor:
                      additionalData.jobType === type ? "#E3F2FD" : "white",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <FormControlLabel
                    value={type}
                    control={<Radio />} // Hide actual radio button
                    label={
                      type === "fullTime"
                        ? "Full-time"
                        : type === "partTime"
                        ? "Part-time"
                        : "Contract"
                    }
                  />
                </Box>
              ))}
            </RadioGroup>
            <FormHelperText>Select your preferred job type.</FormHelperText>

            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
              How soon can you start ?
            </Typography>
            <RadioGroup
              row
              name="noticePeriod"
              value={additionalData.noticePeriod}
              onChange={(e) => handleNoticePeriodChange(e.target.value)}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {["lessthan7", "seventofifteen", "fifteenplus"].map((period) => (
                <Box
                  key={period}
                  component="label"
                  onClick={() => handleNoticePeriodChange(period)}
                  sx={{
                    width: 200,
                    height: 50,
                    mt: 1,
                    display: "flex",
                    padding: "0 10px",
                    border: "2px solid #c4c4c4",
                    borderRadius: "8px",
                    cursor: "pointer",
                    borderColor:
                      additionalData.noticePeriod === period
                        ? "blue"
                        : "#c4c4c4",
                    backgroundColor:
                      additionalData.noticePeriod === period
                        ? "#E3F2FD"
                        : "white",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <FormControlLabel
                    value={period}
                    control={<Radio />} // Hide actual radio button
                    label={
                      period === "lessthan7"
                        ? "Less than 7 days"
                        : period === "seventofifteen"
                        ? "7 - 15 days"
                        : "15 + days"
                    }
                  />
                </Box>
              ))}
            </RadioGroup>
            <FormHelperText>Select your notice period.</FormHelperText>
          </Box>

          <Button
            onClick={() => handleSubmit()}
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
            Proceed
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AdditionalInfo;
