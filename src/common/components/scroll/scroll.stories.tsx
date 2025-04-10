import "app/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import { Scroll } from "./scroll";

const meta: Meta<typeof Scroll> = {
  title: "Components/Scroll",
  component: Scroll,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Scroll>;

export default meta;
type Story = StoryObj<typeof meta>;

const dataToRender = Array.from({ length: 50 }).map((_, i, a) => `some data to render ... ${a.length - i}`);

export const Default: Story = {
  args: {
    children: (
      <div style={{ width: "250px", height: "250px", padding: "10px", color: "var(--light-100)" }}>
        {dataToRender.map((el, i) => (
          <div key={i}>{el}</div>
        ))}
      </div>
    ),
  },
};
