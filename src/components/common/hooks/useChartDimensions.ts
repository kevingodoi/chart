import React, { useRef, useState, useEffect } from "react";
import { ResizeObserver } from "@juggle/resize-observer";
import { useCombineChartDimensions } from "./useCombineChartDimensions";
import { ChartSettings, CombinedDimensions } from "../types/chart";

export const useChartDimensions = (settings: ChartSettings) => {
  const ref = useRef<HTMLElement | null>(null);
  const [dimensions, setDimensions] = useState<ChartSettings>({
    width: settings.width || 0,
    height: settings.height || 0,
    marginTop: settings.marginTop || 0,
    marginRight: settings.marginRight || 0,
    marginBottom: settings.marginBottom || 0,
    marginLeft: settings.marginLeft || 0,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions((prevDimensions) => ({
          ...prevDimensions,
          width,
          height,
        }));
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
    };
  }, [ref]);

  const combinedDimensions: CombinedDimensions =
    useCombineChartDimensions(dimensions);

  return [ref, combinedDimensions] as [
    React.MutableRefObject<HTMLElement | null>,
    CombinedDimensions
  ];
};
