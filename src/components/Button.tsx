import React, { ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  buttonColor?: ButtonColor,
  text?: string,
  children?: ReactNode
}

enum ButtonColor {
  defaultEmpty = "defaultEmpty",
  default = "default",
  blue = "blue",
}

const Button: React.FC<ButtonProps> = ({
  buttonColor = ButtonColor.defaultEmpty,
  text,
  children
}) => {

  return <div className="button" data-color={buttonColor}>
    {text ? text : "{text}"}
    {children}
  </div>
}

export { Button, ButtonColor };
