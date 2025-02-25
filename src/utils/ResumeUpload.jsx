import React, { useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const ResumeUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setSelectedFile(file);
      onUpload(file); // Send file to parent component
    } else {
      alert("Only PDF and DOCX files are allowed.");
    }
  };

  return (
    <Box
      sx={{
        border: "2px dashed #ccc",
        borderRadius: "10px",
        padding: "20px",
        textAlign: "center",
        width: "100%",
        maxWidth: "400px",
        margin: "auto",
        bgcolor: "#fafafa",
        mt: 4,
        mb: 2,
      }}
    >
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="resume-upload"
      />
      <label htmlFor="resume-upload">
        <Button
          component="span"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          Upload Resume
        </Button>
      </label>

      {selectedFile && (
        <Box mt={2} display="flex" alignItems="center" justifyContent="center">
          <Typography
            variant="body1"
            sx={{ wordBreak: "break-word", maxWidth: "80%" }}
          >
            {selectedFile.name}
          </Typography>
          <IconButton
            color="error"
            onClick={() => {
              setSelectedFile(null);
              onUpload(null);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ResumeUpload;
