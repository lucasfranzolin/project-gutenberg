import { useAppCtx } from "@/context";
import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
} from "reactflow";

export function CharacterNetwork() {
  const [state] = useAppCtx();

  // Explicitly define state types
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    if (!state.analysis?.keyQuotes) return;

    const newNodes: Node[] = state.analysis.characters.map((character) => ({
      id: character.id.toString(),
      data: { label: character.name },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      style: {
        backgroundColor: getCharacterColor(character.sentiment),
        padding: 10,
        borderRadius: 5,
        color: "#fff",
      },
    }));

    const newEdges: Edge[] = state.analysis.interactions.map((interaction) => ({
      id: `${interaction.source}-${interaction.target}`,
      source: interaction.source.toString(),
      target: interaction.target.toString(),
      animated: true,
      label: `Strength: ${interaction.strength}`,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  }, [state.analysis]);

  return (
    <div className="w-full h-[600px]">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

function getCharacterColor(sentiment: number): string {
  if (sentiment < -0.5) return "#e74c3c"; // Strong negative
  if (sentiment < 0) return "#e67e22"; // Mild negative
  if (sentiment > 0.5) return "#2980b9"; // Strong positive
  if (sentiment > 0) return "#3498db"; // Mild positive
  return "#7f8c8d"; // Neutral
}
