import * as React from "react";
import { Sigma,RandomizeNodePositions,RelativeSize } from "react-sigma";
import myGraph from "./Data";
// import NodeDetailsDrawer from './NodeDetailsDrawer';

const ResultGraph = () => {
  const nodeSettings = {
    defaultNodeBorderColor: "#000",
    defaultNodeColor: "#1976d2",
    defaultNodeSize: 50,
    drawEdges: true,
    clone: false,
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
    <>
      <Sigma
        graph={myGraph}
        settings={nodeSettings}
        onClickNode={handleNodeClick} 
      >
        <RelativeSize initialSize={50} />
        <RandomizeNodePositions />
      </Sigma>

      {/* Node Details Drawer */}
      {/* {isDrawerOpen && (
        <NodeDetailsDrawer
          selectedNode={selectedNode}
          onClose={() => setIsDrawerOpen(false)}
        />
      )} */}
    </>
  );
};

export default ResultGraph;
