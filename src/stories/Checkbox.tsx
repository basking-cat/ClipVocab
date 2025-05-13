import React, { useState } from "react";

type CheckboxProps = {
  label: string; // チェックボックスのラベル
  checked: boolean; // チェックされたかどうか
};

export const Checkbox = ({label, checked}: CheckboxProps) => {
    const [ischecked, SetisChecked] = useState(false);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetisChecked(event.target.checked);
    };
    return (
        <label>
            <input 
            type="checkbox"
            checked={ischecked}
            id="checkbox"
            onChange={handleCheckboxChange}
             />
             {label}
        </label>
    )

}