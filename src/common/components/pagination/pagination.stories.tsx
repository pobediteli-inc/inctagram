import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./pagination";

jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: (url: string) => {
        console.log("router.push:", url);
      },
    }),
    useSearchParams: () =>
      new URLSearchParams({
        page: "2",
        size: "10",
      }),
  };
});

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    totalItems: 200,
    pageSize: 10,
  },
  argTypes: {
    totalItems: {
      control: "number",
    },
    pageSize: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
