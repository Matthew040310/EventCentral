import { useState, ReactNode } from 'react';
import Typography from '@mui/material/Typography';

const ToggleSampleResponse = ({ children }: { children: ReactNode; }) => {
  const [visibility, setVisibility] = useState("none");

  const toggle = () => {
    if (visibility === "block") {
      setVisibility("none")
    }
    else {
      setVisibility("block")
    }
  };

  return (
    <Typography variant="caption" sx={{ mt: 3, mb: 0.5, color: "grey" }}>
      <span style={{ cursor: 'pointer' }} onClick={() => toggle()}>
        <b><u>View Sample Response</u></b>
      </span>
      <br />
      <div style={{ display: visibility }}>
        {children}
      </div>
    </Typography>
  );
};

export default ToggleSampleResponse