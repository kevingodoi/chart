import type { Meta, StoryFn } from "@storybook/react";
import React, { createElement, useEffect, useState } from "react";
import BaseChart from "./BaseChart";

let value = 16;
const meta: Meta = {
  title: "Base/BaseChart",
  component: BaseChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryFn<typeof BaseChart>;

export const Primary: Story = () => {
  const [data, setData] = useState<
    { name: string; color: string; category: string; x: number; y: number }[]
  >([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const categories = ["kevin", "mateus"];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const color = randomCategory === "kevin" ? "#999123" : "#540F57";

      const newDataPoint = {
        name: "graph1",
        color: color,
        category: randomCategory,
        x: value,
        y: Math.random() * (80 - -80) + -80,
      };
      value = value + 2;

      setData((prevData) => [...prevData, newDataPoint]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  return createElement(BaseChart, {
    settings: {
      width: 450,
      height: 250,
      marginTop: 40,
      marginLeft: 40,
      marginRight: 40,
    },
    data: data,
  });
};
