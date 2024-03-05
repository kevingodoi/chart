import React from "react";
import { Line as d3Line } from "d3";
import { DataPoint } from "../../types/chart";
interface LineProps {
  category: string;
  dataPoints: DataPoint[];
  lineGenerator: d3Line<DataPoint>;
}

const Line: React.FC<LineProps> = ({ category, dataPoints, lineGenerator }) => {
  const color = dataPoints[0]?.color || "steelblue";
  const linePath = lineGenerator(dataPoints) || "";

  return (
    <path
      key={category}
      className="line"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      d={linePath}
    />
  );
};

export default Line;
