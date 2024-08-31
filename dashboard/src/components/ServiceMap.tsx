"use client";
import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "User Service" } },
  { id: "2", position: { x: 250, y: 0 }, data: { label: "Product Service" } },
  { id: "3", position: { x: 125, y: 150 }, data: { label: "Order Service" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, label: "20ms" },
  { id: "e1-3", source: "1", target: "3", animated: true, label: "15ms" },
  { id: "e2-3", source: "2", target: "3", animated: true, label: "25ms" },
];

// Memoize empty objects for nodeTypes and edgeTypes
const nodeTypes = {};
const edgeTypes = {};

const ServiceMap: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Memoize the ReactFlow component props
  const reactFlowProps = useMemo(
    () => ({
      nodes,
      edges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      nodeTypes,
      edgeTypes,
      fitView: true,
    }),
    [nodes, edges, onNodesChange, onEdgesChange, onConnect],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: "500px" }}>
          <ReactFlow {...reactFlowProps}>
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceMap;
