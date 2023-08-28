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

  const [selectedNode, setSelectedNode] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleNodeClick = (event) => {
    const nodeId = event.data.node.id;
    setSelectedNode(nodeId);
    setIsDrawerOpen(true);
    alert(nodeId)
  };

  return (
    <div className="graph-container">
      <Sigma
        graph={myGraph}
        settings={nodeSettings}
        onClickNode={handleNodeClick} 
      >
        <RelativeSize initialSize={50} />
        <RandomizeNodePositions />
      </Sigma>
      <NodeDetails />
    </div>
  );
};

export default ResultGraph;
