import React, { useState, useMemo, MutableRefObject } from "react";
import { scaleLinear, line as d3Line } from "d3";
import { useChartDimensions } from "../common/hooks/useChartDimensions";
import { XAxis, YAxis } from "../common/Axis";
import { ChartSettings } from "../common/types/chart";
import { Line, Circle } from "../common/DataVisualization";
import { DataPoint } from "../common/types/chart";

function calculateDomain(values: number[]): [number, number] {
  return [Math.min(...values), Math.max(...values)];
}

function separateByCategory(
  dataPoints: DataPoint[]
): Record<string, DataPoint[]> {
  const separatedData: Record<string, DataPoint[]> = {};

  dataPoints.forEach((dataPoint) => {
    if (!separatedData[dataPoint.category]) {
      separatedData[dataPoint.category] = [];
    }
    separatedData[dataPoint.category].push(dataPoint);
  });

  return separatedData;
}

function BaseChart({
  settings,
  data,
}: {
  settings: ChartSettings;
  data: DataPoint[];
}) {
  const [nearestPoint, setNearestPoint] = useState<DataPoint | null>(null);
  const [chartRef, dimensions]: [MutableRefObject<any>, any] =
    useChartDimensions(settings);
  const xDataDomain: [number, number] = calculateDomain(
    data.map((point) => point.x)
  );
  const yDataDomain: [number, number] = calculateDomain(
    data.map((point) => point.y)
  );

  const xScale = useMemo(
    () =>
      scaleLinear()
        .domain(xDataDomain)
        .range([0, dimensions.boundedWidth || 0]),
    [xDataDomain, dimensions.boundedWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(yDataDomain)
        .range([dimensions.boundedHeight || 0, 0]),
    [yDataDomain, dimensions.boundedHeight]
  );

  if (!dimensions) {
    return <div>Loading...</div>;
  }
  const separatedDataByCategory = separateByCategory(data);

  const line = d3Line<DataPoint>()
    .x((d) => {
      const x = xScale(d.x);
      return x != null ? x : 0;
    })
    .y((d) => {
      const y = yScale(d.y);
      return y != null ? y : 0;
    });

  const handleMouseMove = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const mouseX = event.nativeEvent.offsetX;
    const mouseY = event.nativeEvent.offsetY;

    let minDistance = Infinity;
    let nearestPoint = null;

    // Calculate distance from mouse cursor to each data point
    data.forEach((dataPoint) => {
      const distance = Math.sqrt(
        Math.pow(mouseX - xScale(dataPoint.x), 2) +
          Math.pow(mouseY - yScale(dataPoint.y), 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = dataPoint;
      }
    });
    console.log(nearestPoint);
    setNearestPoint(nearestPoint);
  };

  return (
    <div
      className="chart-wrapper"
      ref={chartRef}
      style={{ height: settings.height, width: settings.width }}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
      >
        <g
          transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
        >
          <YAxis
            dimensions={dimensions}
            domain={yScale.domain()}
            range={yScale.range()}
          />
          <XAxis
            dimensions={dimensions}
            domain={xScale.domain()}
            range={xScale.range()}
          />
          {Object.entries(separatedDataByCategory).map(
            ([category, dataPoints]) => (
              <Line
                key={category}
                category={category}
                dataPoints={dataPoints}
                lineGenerator={line}
              />
            )
          )}
          <rect></rect>
          <g>
            {data.map((dataPoint, index) => (
              <Circle
                key={index}
                cx={xScale(dataPoint.x)}
                cy={yScale(dataPoint.y)}
                fill={dataPoint.color}
                r={nearestPoint && nearestPoint.x === dataPoint.x ? 6 : 3}
              />
            ))}
          </g>
        </g>
      </svg>

      {nearestPoint && (
        <div>
          Home Made tooltip: {nearestPoint.name} ({nearestPoint.x},{" "}
          {nearestPoint.y})
        </div>
      )}
    </div>
  );
}

export default BaseChart;
