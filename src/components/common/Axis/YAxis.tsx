import React, { useMemo } from "react";
import * as d3 from "d3";
import LabelTicks from "./LabelTicks";
import { CombinedDimensions } from "../types/chart";

interface AxisProps {
  domain: number[];
  range: number[];
  axisColor?: string;
  orientation?: "left" | "right";
  dimensions: CombinedDimensions;
}

const TICK_DISTANCE = 20;

const getAxisLinePath = (range: number[], isLeft: boolean): string =>
  isLeft
    ? `M 0 ${range[0]} L 0 ${range[1]} M 0 ${range[0]} L -6 ${range[0]} M 0 ${range[1]} L -6 ${range[1]}`
    : `M 0 ${range[0]} L 0 ${range[1]} M 0 ${range[0]} L 6 ${range[0]} M 0 ${range[1]} L 6 ${range[1]}`;

export const YAxis: React.FC<AxisProps> = ({
  domain,
  range,
  axisColor = "currentColor",
  orientation = "left",
  dimensions,
}) => {
  const isLeft = orientation === "left";

  const ticks = useMemo(() => {
    const yScale = d3.scaleLinear().domain(domain).range(range);
    return yScale.ticks().map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [domain, range]);

  const axisLinePath = getAxisLinePath(range, isLeft);
  const tickTranslation = isLeft
    ? `translate(${-TICK_DISTANCE}, 0)`
    : `translate(${TICK_DISTANCE}, 0)`;
  const axisTranslation = isLeft ? 0 : dimensions.boundedWidth;

  return (
    <g transform={`translate(${axisTranslation}, 0)`}>
      <path d={axisLinePath} fill="none" stroke={axisColor} />
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          <line x2={isLeft ? -6 : 6} stroke={axisColor} />
          <LabelTicks
            value={value}
            color={axisColor}
            translation={tickTranslation}
          />
        </g>
      ))}
    </g>
  );
};
