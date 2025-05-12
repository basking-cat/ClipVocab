import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const PaginationSample: Story = {
  args: {
    initialPage: 3,
    limit: 3,
    count: 150,
  },
};
