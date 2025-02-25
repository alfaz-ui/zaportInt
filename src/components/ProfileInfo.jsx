import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function ProfileInfo() {
  const profileDetails = useSelector((state) => state.profile.profileDetails);

  return (
    <Box>
      <img
        alt="thumbnail"
        src={profileDetails.profilePicUrl}
        width="140px"
        className="me-3 rounded"
        style={{ objectFit: "contain" }}
      />
      {profileDetails.skills &&
        profileDetails.skills.map((skill, index) => (
          <Typography key={index}>{skill}</Typography>
        ))}
    </Box>
  );
}

export default ProfileInfo;
