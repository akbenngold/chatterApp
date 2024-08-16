import React from "react";

interface InputProps {
  type: any;
  title: string;
  form: { [key: string]: string };
  setForm: (form: { [key: string]: string }) => void;
}

const Input: React.FC<InputProps> = ({ type, title, form, setForm }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm capitalize">{title}</label>
      <input
        className="text-center border-b border-black outline-none"
        type={type}
        name={title}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
