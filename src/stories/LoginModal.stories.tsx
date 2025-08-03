import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LoginModal } from "./LoginModal";

const meta: Meta<typeof LoginModal> = {
  title: "Components/LoginModal",
  component: LoginModal,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof LoginModal>;

/**
 * Default story – shows the modal open by default and
 * provides a button to reopen it once closed.
 */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <button onClick={() => setOpen(true)}>Open Login Modal</button>
        <LoginModal isOpen={open} closeModal={() => setOpen(false)} />
      </>
    );
  },
};