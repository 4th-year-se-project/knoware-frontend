import * as React from "react";
import { Sigma,RandomizeNodePositions,RelativeSize } from "react-sigma";
import myGraph from "./Data";
import NodeDetails from "./NodeDetails";
// import NodeDetailsDrawer from './NodeDetailsDrawer';

const ResultGraph = () => {
  const nodeSettings = {
    defaultNodeBorderColor: "#000",
    defaultNodeColor: "#1976d2",
    defaultNodeSize: 50,
    drawEdges: true,
    clone: false,
    minNodeSize: 10,
    maxNodeSize: 30,
    forceAtlas2Settings: {
      edgeWeightInfluence: 0.1,
    },
  };

  const [selectedNode, setSelectedNode] = React.useState();
  const [title, setTitle] = React.useState()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleNodeClick = (event) => {
    const nodeDescription = event.data.node.description;
    const nodeTitle = event.data.node.title;
    setSelectedNode(nodeDescription);
    setTitle(nodeTitle);
    setIsDrawerOpen(true);
  };

  return (
    <div className="graph-container">
      <Sigma
        graph={myGraph}
        settings={nodeSettings}
        onClickNode={handleNodeClick} 
        className="result-graph"
      >
        <RelativeSize initialSize={50} />
        <RandomizeNodePositions />
      </Sigma>

      <NodeDetails handleNodeClick={selectedNode} />
    </div>
  );
};

export default ResultGraph;
