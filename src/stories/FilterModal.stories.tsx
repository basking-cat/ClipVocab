import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterModal } from "./FilterModal";

const meta: Meta<typeof FilterModal> = {
  title: "Components/FilterModal",
  component: FilterModal,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof FilterModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setOpen] = useState(true);

    // デモ用ダミーステート
    const [categories, setCategories] = useState([
      { id: "music", label: "Music", checked: false },
      { id: "news", label: "News", checked: true },
      { id: "sports", label: "Sports", checked: false },
    ]);
    const [stylesOpt, setStylesOpt] = useState([
      { id: "casual", label: "Casual", checked: true },
      { id: "formal", label: "Formal", checked: false },
    ]);
    const [range, setRange] = useState<[number, number]>([0, 10]);

    const applyFilters = () => {
      // Storybook なので値を表示するだけ
      console.log({ categories, stylesOpt, range });
      setOpen(false);
    };

    const clearFilters = () => {
      setCategories(categories.map((c) => ({ ...c, checked: false })));
      setStylesOpt(stylesOpt.map((s) => ({ ...s, checked: false })));
      setRange([0, 10]);
    };

    return (
      <>
        <button onClick={() => setOpen(true)}>Re-open Filter</button>
        <FilterModal
          isOpen={isOpen}
          closeModal={() => setOpen(false)}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          categories={categories}
          setCategories={setCategories}
          stylesOpt={stylesOpt}
          setStylesOpt={setStylesOpt}
          range={range}
          setRange={setRange}
        />
      </>
    );
  },
};
