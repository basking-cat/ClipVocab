// import type { Meta, StoryObj } from "@storybook/react";
// import { ModalWindow } from "./ModalWindow";

// const meta: Meta<typeof ModalWindow> = {
//   component: ModalWindow,
// };
// export default meta;

// type Story = StoryObj<typeof ModalWindow>;

// export const ModalWindowSample: Story = {
//   args: {
//     isOpen: true,
//     size: "medium",
//     children: {},
//   },
// };

import type { Meta, StoryObj } from "@storybook/react";
import { ModalWindow } from "./ModalWindow";

const meta: Meta<typeof ModalWindow> = {
  title: "Components/ModalWindow",
  component: ModalWindow,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModalWindow>;

export const Default: Story = {
  args: {
    isOpen: true,
    closeModal: () => {},
    size: "medium",
    children: (
      <div>
        <h2>モーダルの中身</h2>
        <p>これは中に入れたい要素です</p>
        <h2>モーダルの中身</h2>
        <p>これは中に入れたい要素です</p>
        <h2>モーダルの中身</h2>
        <p>これは中に入れたい要素です</p>
      </div>
    ),
  },
};
