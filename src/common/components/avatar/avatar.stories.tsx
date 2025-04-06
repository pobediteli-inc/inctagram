import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./avatar";

const meta = {
  argTypes: {},
  component: Avatar,
  tags: ["autodocs"],
  title: "Components/Avatar",
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvatarWithPhotoSmall: Story = {
  args: {
    src: "https://assetsio.gnwcdn.com/netflix-airbender-hedaline-aang.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
  },
};
export const AvatarWithPhotoLarge: Story = {
  args: {
    size: "large",
    src: "https://assetsio.gnwcdn.com/netflix-airbender-hedaline-aang.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp",
  },
};
