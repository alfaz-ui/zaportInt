import React from "react";
import { Skeleton, Box, Typography } from "@mui/material";

const SkeletonLoader = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="text" width={150} height={20} />
        <Typography fontStyle={"italic"} color="#868999">
          Processing .....
        </Typography>
      </Box>
    );
  }
};

export default SkeletonLoader;
