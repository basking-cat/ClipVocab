import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";


const meta: Meta<typeof Checkbox> = {
    component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const CheckboxSample: Story = {
    args: {
        label: 'チェックボックス',
        checked: true,
    }
}