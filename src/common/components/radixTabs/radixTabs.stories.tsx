import * as Tabs from "@radix-ui/react-tabs";
import { Meta, StoryObj } from "@storybook/react";
import { Props, RadixTabs } from "./radixTabs";

const meta: Meta<typeof RadixTabs> = {
  title: "Components/RadixTabs",
  component: RadixTabs,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
    value: { control: "text" },
    title: { control: "text" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RadixTabs>;

const Template = (args: Props) => (
  <Tabs.Root defaultValue={args.value}>
    <Tabs.List>
      <RadixTabs {...args} />
    </Tabs.List>
  </Tabs.Root>
);

export const Primary: Story = {
  render: Template,
  args: {
    variant: "secondary",
    value: "tab1",
    title: "Tabs",
  },
};

export const Secondary: Story = {
  render: Template,
  args: {
    variant: "secondary",
    value: "tab2",
    title: "Tabs",
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    variant: "secondary",
    value: "tab2",
    title: "Tabs",
    disabled: true,
  },
};
