//Axis.stories.ts
import type { Meta, StoryFn } from "@storybook/react";
import { XAxis } from "./XAxis";

const meta: Meta = {
  title: "Base/Axis",
  component: XAxis,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    domain: { control: "array", defaultValue: [0, 100] },
    range: { control: "array", defaultValue: [0, 250] },
  },
};

export default meta;

export const Primary = () => null;
Primary.args = {
  domain: [0, 100],
  range: [0, 250],
  orientation: "bottom",
};
