import React, { useMemo } from "react";
import * as d3 from "d3";
import LabelTicks from "./LabelTicks";
import { CombinedDimensions } from "../types/chart";
interface AxisProps {
  domain: number[];
  range: number[];
  axisColor?: string;
  orientation?: "bottom" | "top";
  dimensions: CombinedDimensions;
}

const TICK_DISTANCE = 15;
const TICK_SPACING = 40;
const getAxisLinePath = (range: number[], isTop: boolean): string =>
  isTop
    ? `M ${range[0]} -6 v 6 H ${range[1]} v -6`
    : `M ${range[0]} 6 v -6 H ${range[1]} v 6`;

export const XAxis: React.FC<AxisProps> = ({
  domain,
  range,
  axisColor = "currentColor",
  orientation = "bottom",
  dimensions,
}) => {
  const isTop = orientation === "top";

  const ticks = useMemo(() => {
    const xScale = d3.scaleLinear().domain(domain).range(range);
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.max(1, Math.floor(width / TICK_SPACING));
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [domain, range]);

  const axisLinePath = getAxisLinePath(range, isTop);
  const tickTranslation = isTop
    ? `translate(0, ${-TICK_DISTANCE})`
    : `translate(0, ${TICK_DISTANCE})`;
  const axisTranslation = isTop ? 0 : dimensions.boundedHeight;

  return (
    <g transform={`translate(0, ${axisTranslation})`}>
      <path
        d={axisLinePath}
        fill="none"
        stroke={axisColor}
        transform={`translate(0, ${isTop ? 0 : 0})`}
      />
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2={isTop ? -6 : 6} stroke={axisColor} />
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
