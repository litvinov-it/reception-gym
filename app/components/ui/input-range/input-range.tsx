import React from "react";

interface IProps {
  label: string;
  onChange: (value: number) => void;
  defaultValue: string | number | undefined;
  placeholder?: string;
  values: number[];
}

const InputRange = ({ label, defaultValue, onChange, values }: IProps) => {
  return (
    <div>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={25}
        defaultValue={defaultValue || 0}
        className="range"
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
      <div className="w-full flex justify-between text-xs px-2">
        {values.map((value) => (
          <span key={"range" + value}>{value}</span>
        ))}
      </div>
    </div>
  );
};

export default InputRange;
