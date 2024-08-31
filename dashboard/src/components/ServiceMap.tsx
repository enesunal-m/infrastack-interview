"use client";

import React, { useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { useServices } from "@/hooks/useServices";

const ServiceMap = () => {
  const { services, isLoading, isError } = useServices();

  const initialNodes: Node[] = services.map((service, index) => ({
    id: service.name,
    data: { label: service.name },
    position: { x: index * 200, y: 100 },
  }));

  const initialEdges: Edge[] = services.flatMap((service) =>
    service.connections.map((connection) => ({
      id: `${service.name}-${connection.target}`,
      source: service.name,
      target: connection.target,
      label: `${connection.latency}ms`,
      style: { stroke: connection.status === "OK" ? "#00ff00" : "#ff0000" },
    })),
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  if (isLoading) return <div>Loading service map...</div>;
  if (isError) return <div>Error loading service map</div>;

  return (
    <div style={{ height: "500px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ServiceMap;
