import React from "react";
import { Input } from "../ui/input";

interface InputRowProps {
  value: string;
  type: string;
  onChange: (value: string) => void;
  label:string
}

const InputRow = ({ value, type, onChange,label }: InputRowProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
        required
      />
    </div>
  );
};

export default InputRow;
