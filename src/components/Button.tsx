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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      {text ? text : null}
      {children}
    </div>
  </div>
}

export { Button, ButtonColor };
