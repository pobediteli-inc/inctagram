import * as Tabs from "@radix-ui/react-tabs";
import { Meta, StoryObj } from "@storybook/react";
import { Props, RadixTabs } from "./radixTabs";

const meta: Meta<typeof RadixTabs> = {
  title: "Components/RadixTabs",
  component: RadixTabs,
  argTypes: {
    value: { control: "text" },
    title: { control: "text" },
    disabled: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RadixTabs>;

const Template = (args: Props) => (
  <Tabs.Root defaultValue={args.value}>
    <Tabs.List>
      <RadixTabs {...args} />
      <RadixTabs value="tab2" title="Second tab" />
    </Tabs.List>
    <Tabs.Content value={args.value}>Content for {args.title}</Tabs.Content>
    <Tabs.Content value="tab2">Content for Second tab</Tabs.Content>
  </Tabs.Root>
);

export const Primary: Story = {
  render: Template,
  args: {
    value: "tab1",
    title: "First tab",
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    value: "tab1",
    title: "First tab",
    disabled: true,
  },
};
