import type { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "./pagination";

const meta = {
  title: "Components/pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    totalPages: 10,
  },
  argTypes: {
    totalPages: { control: "number" }, // Включаем контроль для totalPages
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        query: {
          page: 2, // Мы устанавливаем query параметр для страницы на 2
        },
      },
    },
  },
};
