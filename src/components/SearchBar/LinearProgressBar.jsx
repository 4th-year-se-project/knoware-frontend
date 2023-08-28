import * as React from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import Button from "@mui/material/Button";

export default function LinearProgressBar() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="progress-bar-container">
      <LinearProgress
        determinate
        variant="outlined"
        color="neutral"
        size="sm"
        thickness={32}
        value={progress}
        sx={{
          "--LinearProgress-radius": "0px",
          "--LinearProgress-progressThickness": "24px",
          boxShadow: "sm",
          borderColor: "neutral.500",
        }}
        className="linear-progress-bar"
      >
        <Typography
          level="body-xs"
          fontWeight="xl"
          textColor="common.white"
          sx={{ mixBlendMode: "difference" }}
        >
          PARSING… {`${Math.round(progress)}%`}
        </Typography>
      </LinearProgress>
      <Button className="cancel-btn" variant="contained" component="label">
        Cancel
      </Button>
    </div>
  );
}
