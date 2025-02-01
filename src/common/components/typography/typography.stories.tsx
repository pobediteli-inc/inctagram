import { Meta, StoryObj } from "@storybook/react";
import { Typography, TypographyProps } from "./typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "large",
        "h1",
        "h2",
        "h3",
        "regular_16",
        "bold_16",
        "regular_14",
        "medium_14",
        "bold_14",
        "small",
        "bold_small",
        "regular_link",
        "small_link",
      ],
    },
    color: {
      control: "select",
      options: ["light", "dark", "blue", "lightBlue", "deepBlue", "error", "disabled"],
    },
    textAlign: {
      control: "select",
      options: ["inherit", "left", "center", "right", "justify", "initial", "unset"],
    },
    asChild: {
      control: "boolean",
    },
  },
  parameters: {
    layout: "textAlign",
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: "Default Typography",
    color: "dark",
    variant: "large",
    textAlign: "center",
  },
};

export const Variants: Story = {
  args: {
    color: "dark",
  },
  render: (args: TypographyProps) => (
    <div>
      <Typography {...args} variant="h1">
        H1 Variant
      </Typography>
      <Typography {...args} variant="h2">
        H2 Variant
      </Typography>
      <Typography {...args} variant="small">
        Small Variant
      </Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: (args: TypographyProps) => (
    <div>
      <Typography {...args} color="dark">
        Light Color
      </Typography>
      <Typography {...args} color="error">
        Error Color
      </Typography>
      <Typography {...args} color="blue">
        Blue Color
      </Typography>
    </div>
  ),
};

export const WithAsChild: Story = {
  args: {
    asChild: true,
    color: "dark",
    children: <span>Typography with asChild (renders as a span)</span>,
  },
};
