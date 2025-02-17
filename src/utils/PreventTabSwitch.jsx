import React, { useEffect, useState } from "react";

const PreventTabSwitch = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Please do not switch tabs!");
        window.location.reload(); // Optionally force a reload
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <>{count}</>;
};

export default PreventTabSwitch;
