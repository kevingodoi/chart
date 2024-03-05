import React from "react";

interface LabelTicksProps {
  value: number;
  color: string;
  translation: string;
}
export const LabelTicks: React.FC<LabelTicksProps> = ({
  value,
  color,
  translation,
}) => {
  return (
    <text
      key={`${value}-${translation}`}
      fill={color}
      fontSize="10px"
      textAnchor="middle"
      transform={translation}
      dy="0.3em"
    >
      {value}
    </text>
  );
};
