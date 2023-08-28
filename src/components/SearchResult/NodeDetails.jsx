import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

const NodeDetails = ({handleNodeClick}) => {
  return (
    <div className="node-details-container">
      <Box>
        <p>Soufan_etal_CHIIR_2022_Searching_the_.pdf</p>
        <Divider />
        <h4>Matched content</h4>
        {handleNodeClick}
      </Box>
    </div>
  );
};

export default NodeDetails;
