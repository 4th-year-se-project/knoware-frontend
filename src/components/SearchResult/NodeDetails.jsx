import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

const NodeDetails = () => {
  return (
    <div className="node-details-container">
      <Box>
        <p>Soufan_etal_CHIIR_2022_Searching_the_.pdf</p>
        <Divider />
        <h4>Matched content</h4>
        Over the past two decades, several information exploration ap- proaches
        were suggested to support a special category of search tasks known as
        exploratory search. These approaches creatively combined search,
        browsing, and information analysis steps shifting user efforts from
        recall (formulating a query) to recognition (i.e., selecting a link) and
        helping them to gradually learn more about the explored domain. More
        recently, a few projects demonstrated that personalising the process of
        information exploration with models of user interests can add value to
        information exploration systems.
      </Box>
    </div>
  );
};

export default NodeDetails;
