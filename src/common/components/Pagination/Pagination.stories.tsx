import type { Meta, StoryObj } from '@storybook/react';

import Pagination from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    totalPages: 10,
    currentPage: 2,  // Установим текущую страницу на 2 по умолчанию
  },
  argTypes: {
    totalPages: { control: 'number' },  // Включаем контроль для totalPages
    currentPage: { control: 'number' },  // Включаем контроль для currentPage
  },
  decorators: [
    (Story) => (
      <div >
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
          page: 2,  // Мы устанавливаем query параметр для страницы на 2
        },
      },
    },
  },
};
