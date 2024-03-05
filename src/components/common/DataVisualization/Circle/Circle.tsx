import React from "react";

interface CirclesProps {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  onMouseOver?: () => void;
}

const Circles: React.FC<CirclesProps> = ({ cx, cy, r, fill, onMouseOver }) => {
  return <circle cx={cx} cy={cy} r={r} fill={fill} onMouseOver={onMouseOver} />;
};

export default Circles;
