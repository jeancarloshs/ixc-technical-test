import React, { useState, Component } from "react";

interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class Input extends Component<InputProps> {
  render() {
    const { type, name, value, onChange } = this.props;

    return (
      <>
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900 mt-[10px]"
        >
          {name}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="block w-96 rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </>
    );
  }
}

export default Input;
