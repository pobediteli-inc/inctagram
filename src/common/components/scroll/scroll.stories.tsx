import "app/globals.css";
import { Meta, StoryObj } from "@storybook/react";
import Scroll from "./scroll";

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

export const Default: Story = {
  args: {
    children: (
      <div style={{ width: "400px", height: "400px", padding: "10px", color: "var(--light-100)"}}>
        <p>Scrollable content</p>
        <p>More content...</p>
        <p>Even more content...</p>
        <p>Keep scrolling...</p>
        <p>Still more content...</p>
        <p>Almost there...</p>
        <p>End of content</p>
      </div>
    ),
  },
};
