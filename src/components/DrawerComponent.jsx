import React, { useState } from "react";
import { Box, Button, Divider, Drawer, Typography } from "@mui/material";

function DrawerComponent({ children }) {
  const [drawer, setDrawer] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button
        fullWidth
        onClick={() => {
          if (count < 3) {
            setCount(count + 1);
          } else setCount(0);
          setDrawer(!drawer);
        }}
      >
        Open drawer
      </Button>
      <Drawer
        anchor={"bottom"}
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "20px 20px 0 0",
          },
        }}
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        <Box fullWidth sx={{ p: 3 }}>
          {/* Header with underline */}
          <Typography variant="h4" fontWeight="bold">
            Information
          </Typography>
          <Divider sx={{ mb: 2 }} /> {/* Adds an underline effect */}
        </Box>
        <Box sx={{ p: 3 }}>{children}</Box>
      </Drawer>
    </div>
  );
}

export default DrawerComponent;
