import { Box, Card } from "@mui/material";
import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const ResultContent = () => {
  return (
    <div className="result-content-container">
      <h2>Choose a resource to explore:</h2>
      <Card className="card-container">
        <div className="header-container">
          <div>
            <h4 className="resulting-title">
              Soufan_etal_CHIIR_2022_Searching_the_literature_an_analysis_of_an_exploratory_search_task.pdf
            </h4>
            <div className="hash-tag-container">
              <Box className="hash-tag">HCI</Box>
              <Box className="hash-tag">HCI</Box>
              <Box className="hash-tag">HCI</Box>
            </div>
          </div>
          <PictureAsPdfIcon className="resource-icon"/>
        </div>
        <h5 className="resulting-title">
          Course {">"} {"....."} {">"} Sub topic
        </h5>
        <h5>Matched Content</h5>
        <p>
          Over the past two decades, several information exploration ap-
          proaches were suggested to support a special category of search tasks
          known as exploratory search. These approaches creatively combined
          search, browsing, and information analysis steps shifting user efforts
          from recall (formulating a query) to recognition (i.e., selecting a
          link) and helping them to gradually learn more about the explored
          domain. More recently, a few projects demonstrated that personalising
          the process of information exploration with models of user interests
          can add value to information exploration systems.
        </p>
      </Card>
    </div>
  );
};

export default ResultContent;
