import React, { useEffect, useState } from "react";

interface IProps {
  label: string;
  type: string;
  register: any;
  defaultValue: string | number | undefined;
  error: any;
  placeholder?: string;
}

const Input = ({
  label,
  register,
  defaultValue,
  error,
  type,
  placeholder,
}: IProps) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
        {error && (
          <p className="label-text-alt text-red-500">{error.message}</p>
        )}
      </div>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...register}
      />
    </label>
  );
};

export default Input;
