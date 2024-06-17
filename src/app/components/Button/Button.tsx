import { useState } from "react";
import React, { Component } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  id?: string;
  name?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  checked?: boolean;
}

class Button extends Component<ButtonProps> {
  render() {
    const { type, id, name, onClick, className, checked, children } = this.props;
    return (
      <>
        <button type={type} id={id} onClick={onClick} className={className}>
          {children}
        </button>
      </>
    );
  }
}

export default Button;
